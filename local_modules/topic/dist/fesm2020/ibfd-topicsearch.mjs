import * as i0 from '@angular/core';
import { Injectable, Directive, Input, EventEmitter, Component, Output, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import * as i1 from '@ibfd/endecapod';
import { EndecapodService, SearchResult } from '@ibfd/endecapod';
import { BehaviorSubject, of, Subject } from 'rxjs';
import { map, filter, take, catchError, concatMap, first } from 'rxjs/operators';
import { cloneDeep } from 'lodash-es';
import * as i3 from '@angular/router';
import * as i4 from '@angular/common/http';
import * as i1$1 from 'primeng/api';
import * as i4$1 from 'primeng/tree';
import { TreeModule } from 'primeng/tree';
import * as i5 from 'ngx-bootstrap/collapse';
import { CollapseModule } from 'ngx-bootstrap/collapse';

class TaxtopicsProviderService {
    constructor() {
        this.taxtopicsGroupProvider = new BehaviorSubject({ totalGroups: 0, groups: {} });
    }
    addTaxtopicsGroup(taxonomy, id) {
        const groups = { ...this.taxtopicsGroupProvider.value.groups, [id]: taxonomy };
        this.taxtopicsGroupProvider.next({
            totalGroups: Object.keys(groups).length,
            groups
        });
    }
    getTaxtopicGroupInfo() {
        return this.taxtopicsGroupProvider.asObservable();
    }
    getTaxtopics(id) {
        return this.getTaxtopicGroupInfo().pipe(map(tg => tg.groups[id]));
    }
    isTaxtopicsGroupExist(id) {
        return this.getTaxtopicGroupInfo().pipe(map(tg => !!tg.totalGroups && !!tg.groups[id]));
    }
}
TaxtopicsProviderService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.4.0", ngImport: i0, type: TaxtopicsProviderService, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
TaxtopicsProviderService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "13.4.0", ngImport: i0, type: TaxtopicsProviderService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.4.0", ngImport: i0, type: TaxtopicsProviderService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root'
                }]
        }], ctorParameters: function () { return []; } });

class TopicService {
    constructor(urlSerializer, taxtopicProviderSvc, router, http) {
        this.urlSerializer = urlSerializer;
        this.taxtopicProviderSvc = taxtopicProviderSvc;
        this.error = new BehaviorSubject(false);
        this.initTopicSvc = new EndecapodService(http, router, urlSerializer);
    }
    registerConfig(config) {
        this.topicConfig = config.topicConfig;
        this._endecaUrl = config.endecapodUrl;
        this._awareUrl = config.awareUrl;
        this._suppressedChips = config.suppressedChips;
    }
    loadInitTaxTopics() {
        this.shouldFetchInitialTaxtopics()
            .pipe(filter(Boolean), take(1))
            .subscribe(() => this.fetchInitialTaxtopics());
        this.getTopicValues(this.initTopicSvc.Result())
            .pipe(map(res => {
            const topics = res.topics;
            Object.keys(topics).map(e => topics[e])
                .forEach(obj => obj['selectable'] = false);
            return topics;
        }), take(1), catchError(this.handle_error))
            .subscribe(t => {
            this.taxtopicProviderSvc.addTaxtopicsGroup(t, this.topicConfig.id);
        });
        return true;
    }
    shouldFetchInitialTaxtopics() {
        const initQuery = this.topicConfig.query;
        if (!initQuery || initQuery.length === 0) {
            return of(true);
        }
        return this.taxtopicProviderSvc.isTaxtopicsGroupExist(this.topicConfig.id)
            .pipe(map(exist => !exist));
    }
    fetchInitialTaxtopics() {
        this.initTopicSvc.setName('TopicTreeInitService');
        this.initTopicSvc.setURL(this._endecaUrl, this._awareUrl);
        this.initTopicSvc.RegisterParams(this.urlSerializer.parse('?' + this.topicConfig.query).queryParamMap);
        this.initTopicSvc.DoSearch();
    }
    buildTopicTree(searchedTopics, expandedNodes) {
        this.taxtopicProviderSvc.getTaxtopics(this.topicConfig.id)
            .pipe(filter(taxtopics => !!taxtopics))
            .subscribe({
            next: taxtopics => {
                // Updating taxonomy taxtopics by searched topics from endeca
                const clonedTaxtopics = cloneDeep(taxtopics);
                this.updateAvailableTopics(clonedTaxtopics, Object.keys(searchedTopics['topics']));
                this.topicTreeProvider.next(this.buildPrimeNgTree(clonedTaxtopics, searchedTopics['chips'], expandedNodes));
            },
            error: err => { this.error.next(err); }
        });
    }
    buildDocTopicTree(topicCodes) {
        this.taxtopicProviderSvc.getTaxtopics(this.topicConfig.id)
            .pipe(filter(taxtopics => !!taxtopics))
            .subscribe({
            next: taxtopics => {
                const clonedTaxtopics = cloneDeep(taxtopics);
                this.updateAvailableDocTopics(clonedTaxtopics, topicCodes);
                const docTopicTree = this.buildPrimeNgTree(clonedTaxtopics, [], new Set()).data;
                this.docTopicTreeProvider.next(docTopicTree);
            },
            error: err => { this.error.next(err); }
        });
    }
    updateAvailableDocTopics(taxtopics, topicCodes) {
        topicCodes.forEach(topicCode => {
            const taxtopic = taxtopics[topicCode];
            if (taxtopic) {
                taxtopic.selectable = true;
                let parentLabel = this.getTaxtopicParentLabel(topicCode);
                while (parentLabel.lastIndexOf('_') > 0) {
                    const parent = taxtopics[parentLabel];
                    if (parent) {
                        parent.selectable = true;
                    }
                    parentLabel = this.getTaxtopicParentLabel(parentLabel);
                }
            }
        });
    }
    updateAvailableTopics(taxtopics, topicCodes) {
        topicCodes.forEach(topicCode => {
            const taxtopic = taxtopics[topicCode];
            if (taxtopic) {
                taxtopic.selectable = true;
            }
        });
    }
    getTopicTree() {
        return (this.topicTreeProvider = this.topicTreeProvider || new Subject()).asObservable();
    }
    getDocTopicTree() {
        return (this.docTopicTreeProvider = this.docTopicTreeProvider || new Subject()).asObservable();
    }
    buildPrimeNgTree(taxtopics, chips, expandedNodes) {
        return Object.keys(taxtopics)
            .map(e => taxtopics[e])
            .reduce((acc, taxtopic) => {
            const node = {
                label: taxtopic['label'],
                data: taxtopic['code'],
                selectable: taxtopic['selectable'],
                id: taxtopic['id'],
                key: taxtopic['code']
            };
            if (chips.find(id => id === node.id)) {
                acc.selected.push(node);
            }
            node['expanded'] = expandedNodes.has(node.id);
            const parent = this.getTaxtopicParent(acc.data, this.getTaxtopicParentLabel(node.data));
            if (parent) {
                if (!parent['children']) {
                    parent['children'] = [];
                }
                node['parent'] = parent;
                parent['children'].push(node);
            }
            else {
                acc.data.push(node);
            }
            return acc;
        }, { data: [], selected: [] });
    }
    getTaxtopicParentLabel(tc) {
        return tc.substring(0, tc.lastIndexOf('_'));
    }
    getTaxtopicParent(acc, parentLabel) {
        for (let i = 0; i < acc.length; i++) {
            const taxtopic = acc[i];
            if (taxtopic['data'] === parentLabel) {
                return taxtopic;
            }
            if (taxtopic['children']) {
                const taxtopicParent = this.getTaxtopicParent(taxtopic['children'], parentLabel);
                if (taxtopicParent) {
                    return taxtopicParent;
                }
            }
        }
    }
    searchTopics(topicExposeService, endecapodService) {
        return endecapodService.runningquery().pipe(filter(rq => !!rq), concatMap(q => {
            topicExposeService.ExposeMultipleOnExisting(endecapodService, this.topicConfig.dimensions.map(dim => dim.id), this.topicConfig.dimensions.map(dim => dim.name).join(','));
            return this.getTopicValues(topicExposeService.Result());
        }));
    }
    getTopicValues(searchresult) {
        return searchresult.pipe(filter(res => res instanceof SearchResult), map((res) => {
            let topics = [];
            this.topicConfig.dimensions
                .forEach(d => {
                topics = topics.concat(res.getDimensionValuesOrAssociated(d));
            });
            const chips = res.getChips()
                .filter(c1 => !this._suppressedChips.find(s => c1.parent.id === s))
                .map(chip => chip.dimension.id);
            return { topics: topics, chips: chips };
        }), first(), map(obj => {
            const topics = obj.topics
                .map(topic => {
                const name = topic.name;
                return {
                    code: name.substring(0, name.indexOf(' ')),
                    label: name.substring(name.indexOf(' ') + 1),
                    id: topic.id
                };
            })
                .sort((t1, t2) => t1.code.localeCompare(t2.code, undefined, { numeric: true, sensitivity: 'base' }))
                .reduce((acc, topic) => {
                return Object.assign(acc, { [topic['code']]: topic });
            }, {});
            return { topics: topics, chips: obj.chips };
        }), first(), catchError(this.handle_error));
    }
    handle_error(error, caught) {
        let errMsg;
        if (error instanceof Response) {
            const err = error.json().then(json => JSON.stringify(json)) || '';
            errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
        }
        else {
            errMsg = error.message ? error.message : error.toString();
        }
        throw (new Error(errMsg));
    }
    getError() {
        return this.error.asObservable();
    }
}
TopicService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.4.0", ngImport: i0, type: TopicService, deps: [{ token: i1.EdcaUrlSerializer }, { token: TaxtopicsProviderService }, { token: i3.Router }, { token: i4.HttpClient }], target: i0.ɵɵFactoryTarget.Injectable });
TopicService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "13.4.0", ngImport: i0, type: TopicService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.4.0", ngImport: i0, type: TopicService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root'
                }]
        }], ctorParameters: function () { return [{ type: i1.EdcaUrlSerializer }, { type: TaxtopicsProviderService }, { type: i3.Router }, { type: i4.HttpClient }]; } });

class PtreeFilterDirective {
    constructor(elemRef) {
        this.elemRef = elemRef;
        this.nodes = [];
    }
    set value(nodes) {
        this.nodes = nodes || [];
    }
    ngOnChanges() {
        setTimeout(() => this.disableFilter());
    }
    disableFilter() {
        const filterContainer = this.filterContainerElement;
        if (!filterContainer) {
            return;
        }
        const CLASS_IB_DISABLED = 'ib-disabled';
        filterContainer.classList.remove(CLASS_IB_DISABLED);
        if (!this.isAnyNodeSelectable()) {
            filterContainer.classList.add(CLASS_IB_DISABLED);
        }
    }
    get filterContainerElement() {
        return this.elemRef.nativeElement.querySelector('div.ui-tree-filter-container');
    }
    isAnyNodeSelectable() {
        return this.nodes.some(n => n.selectable);
    }
}
PtreeFilterDirective.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.4.0", ngImport: i0, type: PtreeFilterDirective, deps: [{ token: i0.ElementRef }], target: i0.ɵɵFactoryTarget.Directive });
PtreeFilterDirective.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "13.4.0", type: PtreeFilterDirective, selector: "[ptreeFilter]", inputs: { value: ["ptreeFilter", "value"] }, usesOnChanges: true, ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.4.0", ngImport: i0, type: PtreeFilterDirective, decorators: [{
            type: Directive,
            args: [{
                    selector: '[ptreeFilter]'
                }]
        }], ctorParameters: function () { return [{ type: i0.ElementRef }]; }, propDecorators: { value: [{
                type: Input,
                args: ['ptreeFilter']
            }] } });

class TopicTreeExposeService extends EndecapodService {
}
TopicTreeExposeService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.4.0", ngImport: i0, type: TopicTreeExposeService, deps: null, target: i0.ɵɵFactoryTarget.Injectable });
TopicTreeExposeService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "13.4.0", ngImport: i0, type: TopicTreeExposeService });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.4.0", ngImport: i0, type: TopicTreeExposeService, decorators: [{
            type: Injectable
        }] });
class TopicSearchPanelComponent {
    constructor(messageService, topicService, topicExposeService, endecapodService) {
        this.messageService = messageService;
        this.topicService = topicService;
        this.topicExposeService = topicExposeService;
        this.endecapodService = endecapodService;
        this.DEFAULT_MSG_LIFE = 5000;
        /** @internal */
        this.loading = false;
        this.isLoading = new EventEmitter();
        /** @internal */
        this.expandedNodeIds = new Set();
        /** @internal */
        this.isPanelCollapsed = false;
    }
    ngOnInit() {
        this.topicService.registerConfig(this.topicConfig);
        this.topicExposeService.setName('TopicTreeService');
        this.topicExposeService.setURL(this.topicConfig.endecapodUrl, this.topicConfig.awareUrl);
        this.topicService.loadInitTaxTopics();
        this.subscription = this.topicService.searchTopics(this.topicExposeService, this.endecapodService)
            .subscribe({
            next: searchedTopics => this.topicService.buildTopicTree(searchedTopics, this.expandedNodeIds),
            error: err => this.messageService.add({ severity: 'error', summary: '', detail: err, life: this.DEFAULT_MSG_LIFE })
        });
        this.subscription.add(this.topicService.getTopicTree().subscribe({
            next: topicTree => {
                this.topicTreeNodes = topicTree.data;
                this.selectedTopics = topicTree.selected;
                this.expandParents(this.selectedTopics);
                this.isLoading.emit(false);
            },
            error: err => this.messageService.add({ severity: 'error', summary: '', detail: err, life: this.DEFAULT_MSG_LIFE })
        }));
        this.subscription.add(this.topicExposeService.Error().subscribe(res => {
            if (res) {
                this.messageService.add({ severity: 'error', summary: '', detail: res.toString(), life: this.DEFAULT_MSG_LIFE });
            }
        }, err => this.messageService.add({ severity: 'error', summary: '', detail: err, life: this.DEFAULT_MSG_LIFE })));
        this.subscription.add(this.topicService.getError().subscribe(res => {
            if (res) {
                this.messageService.add({ severity: 'error', summary: '', detail: res.toString(), life: this.DEFAULT_MSG_LIFE });
            }
        }, err => this.messageService.add({ severity: 'error', summary: '', detail: err, life: this.DEFAULT_MSG_LIFE })));
    }
    /** @internal */
    togglePanel() {
        this.isPanelCollapsed = !this.isPanelCollapsed;
        return false;
    }
    nodeSelect(event) {
        this.endecapodService.Add(event.node.id);
        console.log('nodeSelect: ' + this.nodePath(event.node).join(' > '));
        this.isLoading.emit(true);
    }
    nodeUnselect(event) {
        this.endecapodService.Remove(event.node.id);
        this.isLoading.emit(true);
    }
    nodeExpand(event) {
        this.expandedNodeIds.add(event.node.id);
    }
    nodeCollapse(event) {
        this.expandedNodeIds.delete(event.node.id);
    }
    nodePath(node) {
        const labels = [node.label];
        while (node.parent) {
            node = node.parent;
            labels.push(node.label);
        }
        return labels.reverse();
    }
    expandParents(nodes) {
        nodes.forEach(node => {
            node.selectable = true;
            let parent = node.parent;
            while (parent) {
                parent.expanded = true;
                this.expandedNodeIds.add(parent['id']);
                parent = parent.parent;
            }
        });
    }
    ngOnDestroy() {
        this.subscription.unsubscribe();
    }
}
TopicSearchPanelComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.4.0", ngImport: i0, type: TopicSearchPanelComponent, deps: [{ token: i1$1.MessageService }, { token: TopicService }, { token: TopicTreeExposeService }, { token: i1.EndecapodService }], target: i0.ɵɵFactoryTarget.Component });
TopicSearchPanelComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.4.0", type: TopicSearchPanelComponent, selector: "app-topic-search-panel", inputs: { topicConfig: "topicConfig", loading: "loading" }, outputs: { isLoading: "isLoading" }, providers: [
        { provide: TopicTreeExposeService, useClass: TopicTreeExposeService }, TopicService
    ], ngImport: i0, template: "<a class=\"ib-collapse-panel ib-filters {{isPanelCollapsed? 'collapsed': ''}}\" (click)=\"togglePanel()\"\n  [attr.aria-expanded]=\"!isPanelCollapsed\" href=\"#ib-topic-search\" role=\"button\" aria-controls=\"ib-topic-search\">\n  <i class=\"fa fa-list\"></i>\n  Topic Search\n  <i class=\"ib-angle-down-up\" aria-hidden=\"true\"></i>\n</a>\n<div class=\"row ib-padding-20\">\n  <div class=\"ib-topic-search\">\n    <div class=\"multi-collapse\" [collapse]=\"isPanelCollapsed\" [isAnimated]=\"true\" id=\"ib-topic-search\">\n\n      <p-tree [value]=\"topicTreeNodes\" selectionMode=\"checkbox\" [metaKeySelection]=\"false\" [(selection)]=\"selectedTopics\" [loading]=\"loading\"\n        (onNodeSelect)=\"nodeSelect($event)\" (onNodeUnselect)=\"nodeUnselect($event)\" (onNodeCollapse)=\"nodeCollapse($event)\" (onNodeExpand)=\"nodeExpand($event)\"\n        [filter]=\"topicTreeNodes ? true : false\" [filterPlaceholder]=\"'Find topics'\" [ptreeFilter]=\"topicTreeNodes\"></p-tree>\n    </div>\n  </div>\n</div>\n", styles: [""], components: [{ type: i4$1.Tree, selector: "p-tree", inputs: ["value", "selectionMode", "selection", "style", "styleClass", "contextMenu", "layout", "draggableScope", "droppableScope", "draggableNodes", "droppableNodes", "metaKeySelection", "propagateSelectionUp", "propagateSelectionDown", "loading", "loadingIcon", "emptyMessage", "ariaLabel", "togglerAriaLabel", "ariaLabelledBy", "validateDrop", "filter", "filterBy", "filterMode", "filterPlaceholder", "filteredNodes", "filterLocale", "scrollHeight", "virtualScroll", "virtualNodeHeight", "minBufferPx", "maxBufferPx", "indentation", "trackBy"], outputs: ["selectionChange", "onNodeSelect", "onNodeUnselect", "onNodeExpand", "onNodeCollapse", "onNodeContextMenuSelect", "onNodeDrop", "onFilter"] }], directives: [{ type: i5.CollapseDirective, selector: "[collapse]", inputs: ["display", "isAnimated", "collapse"], outputs: ["collapsed", "collapses", "expanded", "expands"], exportAs: ["bs-collapse"] }, { type: PtreeFilterDirective, selector: "[ptreeFilter]", inputs: ["ptreeFilter"] }] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.4.0", ngImport: i0, type: TopicSearchPanelComponent, decorators: [{
            type: Component,
            args: [{ selector: 'app-topic-search-panel', providers: [
                        { provide: TopicTreeExposeService, useClass: TopicTreeExposeService }, TopicService
                    ], template: "<a class=\"ib-collapse-panel ib-filters {{isPanelCollapsed? 'collapsed': ''}}\" (click)=\"togglePanel()\"\n  [attr.aria-expanded]=\"!isPanelCollapsed\" href=\"#ib-topic-search\" role=\"button\" aria-controls=\"ib-topic-search\">\n  <i class=\"fa fa-list\"></i>\n  Topic Search\n  <i class=\"ib-angle-down-up\" aria-hidden=\"true\"></i>\n</a>\n<div class=\"row ib-padding-20\">\n  <div class=\"ib-topic-search\">\n    <div class=\"multi-collapse\" [collapse]=\"isPanelCollapsed\" [isAnimated]=\"true\" id=\"ib-topic-search\">\n\n      <p-tree [value]=\"topicTreeNodes\" selectionMode=\"checkbox\" [metaKeySelection]=\"false\" [(selection)]=\"selectedTopics\" [loading]=\"loading\"\n        (onNodeSelect)=\"nodeSelect($event)\" (onNodeUnselect)=\"nodeUnselect($event)\" (onNodeCollapse)=\"nodeCollapse($event)\" (onNodeExpand)=\"nodeExpand($event)\"\n        [filter]=\"topicTreeNodes ? true : false\" [filterPlaceholder]=\"'Find topics'\" [ptreeFilter]=\"topicTreeNodes\"></p-tree>\n    </div>\n  </div>\n</div>\n", styles: [""] }]
        }], ctorParameters: function () { return [{ type: i1$1.MessageService }, { type: TopicService }, { type: TopicTreeExposeService }, { type: i1.EndecapodService }]; }, propDecorators: { topicConfig: [{
                type: Input
            }], loading: [{
                type: Input
            }], isLoading: [{
                type: Output
            }] } });

class TopicServiceConfig {
    constructor(endecapodUrl, awareUrl, topicConfig, suppressedChips) {
        this.endecapodUrl = endecapodUrl;
        this.awareUrl = awareUrl;
        this.topicConfig = topicConfig;
        this.suppressedChips = suppressedChips;
    }
}

class TopicSearchModule {
}
TopicSearchModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.4.0", ngImport: i0, type: TopicSearchModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
TopicSearchModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "13.4.0", ngImport: i0, type: TopicSearchModule, declarations: [TopicSearchPanelComponent, PtreeFilterDirective], imports: [CommonModule,
        TreeModule, i5.CollapseModule], exports: [TopicSearchPanelComponent, PtreeFilterDirective] });
TopicSearchModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "13.4.0", ngImport: i0, type: TopicSearchModule, providers: [TopicService], imports: [[
            CommonModule,
            TreeModule,
            CollapseModule.forRoot()
        ]] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.4.0", ngImport: i0, type: TopicSearchModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [
                        CommonModule,
                        TreeModule,
                        CollapseModule.forRoot()
                    ],
                    declarations: [TopicSearchPanelComponent, PtreeFilterDirective],
                    exports: [TopicSearchPanelComponent, PtreeFilterDirective],
                    providers: [TopicService]
                }]
        }] });

/**
 * Generated bundle index. Do not edit.
 */

export { PtreeFilterDirective, TaxtopicsProviderService, TopicSearchModule, TopicSearchPanelComponent, TopicService, TopicServiceConfig, TopicTreeExposeService };
//# sourceMappingURL=ibfd-topicsearch.mjs.map
