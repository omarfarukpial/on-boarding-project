import { Component, Input, Output, EventEmitter, Injectable } from '@angular/core';
import { EndecapodService } from '@ibfd/endecapod';
import { TopicService } from '../service/topic.service';
import * as i0 from "@angular/core";
import * as i1 from "primeng/api";
import * as i2 from "../service/topic.service";
import * as i3 from "@ibfd/endecapod";
import * as i4 from "primeng/tree";
import * as i5 from "ngx-bootstrap/collapse";
import * as i6 from "../directive/ptree-filter.directive";
export class TopicTreeExposeService extends EndecapodService {
}
TopicTreeExposeService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.4.0", ngImport: i0, type: TopicTreeExposeService, deps: null, target: i0.ɵɵFactoryTarget.Injectable });
TopicTreeExposeService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "13.4.0", ngImport: i0, type: TopicTreeExposeService });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.4.0", ngImport: i0, type: TopicTreeExposeService, decorators: [{
            type: Injectable
        }] });
export class TopicSearchPanelComponent {
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
TopicSearchPanelComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.4.0", ngImport: i0, type: TopicSearchPanelComponent, deps: [{ token: i1.MessageService }, { token: i2.TopicService }, { token: TopicTreeExposeService }, { token: i3.EndecapodService }], target: i0.ɵɵFactoryTarget.Component });
TopicSearchPanelComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.4.0", type: TopicSearchPanelComponent, selector: "app-topic-search-panel", inputs: { topicConfig: "topicConfig", loading: "loading" }, outputs: { isLoading: "isLoading" }, providers: [
        { provide: TopicTreeExposeService, useClass: TopicTreeExposeService }, TopicService
    ], ngImport: i0, template: "<a class=\"ib-collapse-panel ib-filters {{isPanelCollapsed? 'collapsed': ''}}\" (click)=\"togglePanel()\"\n  [attr.aria-expanded]=\"!isPanelCollapsed\" href=\"#ib-topic-search\" role=\"button\" aria-controls=\"ib-topic-search\">\n  <i class=\"fa fa-list\"></i>\n  Topic Search\n  <i class=\"ib-angle-down-up\" aria-hidden=\"true\"></i>\n</a>\n<div class=\"row ib-padding-20\">\n  <div class=\"ib-topic-search\">\n    <div class=\"multi-collapse\" [collapse]=\"isPanelCollapsed\" [isAnimated]=\"true\" id=\"ib-topic-search\">\n\n      <p-tree [value]=\"topicTreeNodes\" selectionMode=\"checkbox\" [metaKeySelection]=\"false\" [(selection)]=\"selectedTopics\" [loading]=\"loading\"\n        (onNodeSelect)=\"nodeSelect($event)\" (onNodeUnselect)=\"nodeUnselect($event)\" (onNodeCollapse)=\"nodeCollapse($event)\" (onNodeExpand)=\"nodeExpand($event)\"\n        [filter]=\"topicTreeNodes ? true : false\" [filterPlaceholder]=\"'Find topics'\" [ptreeFilter]=\"topicTreeNodes\"></p-tree>\n    </div>\n  </div>\n</div>\n", styles: [""], components: [{ type: i4.Tree, selector: "p-tree", inputs: ["value", "selectionMode", "selection", "style", "styleClass", "contextMenu", "layout", "draggableScope", "droppableScope", "draggableNodes", "droppableNodes", "metaKeySelection", "propagateSelectionUp", "propagateSelectionDown", "loading", "loadingIcon", "emptyMessage", "ariaLabel", "togglerAriaLabel", "ariaLabelledBy", "validateDrop", "filter", "filterBy", "filterMode", "filterPlaceholder", "filteredNodes", "filterLocale", "scrollHeight", "virtualScroll", "virtualNodeHeight", "minBufferPx", "maxBufferPx", "indentation", "trackBy"], outputs: ["selectionChange", "onNodeSelect", "onNodeUnselect", "onNodeExpand", "onNodeCollapse", "onNodeContextMenuSelect", "onNodeDrop", "onFilter"] }], directives: [{ type: i5.CollapseDirective, selector: "[collapse]", inputs: ["display", "isAnimated", "collapse"], outputs: ["collapsed", "collapses", "expanded", "expands"], exportAs: ["bs-collapse"] }, { type: i6.PtreeFilterDirective, selector: "[ptreeFilter]", inputs: ["ptreeFilter"] }] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.4.0", ngImport: i0, type: TopicSearchPanelComponent, decorators: [{
            type: Component,
            args: [{ selector: 'app-topic-search-panel', providers: [
                        { provide: TopicTreeExposeService, useClass: TopicTreeExposeService }, TopicService
                    ], template: "<a class=\"ib-collapse-panel ib-filters {{isPanelCollapsed? 'collapsed': ''}}\" (click)=\"togglePanel()\"\n  [attr.aria-expanded]=\"!isPanelCollapsed\" href=\"#ib-topic-search\" role=\"button\" aria-controls=\"ib-topic-search\">\n  <i class=\"fa fa-list\"></i>\n  Topic Search\n  <i class=\"ib-angle-down-up\" aria-hidden=\"true\"></i>\n</a>\n<div class=\"row ib-padding-20\">\n  <div class=\"ib-topic-search\">\n    <div class=\"multi-collapse\" [collapse]=\"isPanelCollapsed\" [isAnimated]=\"true\" id=\"ib-topic-search\">\n\n      <p-tree [value]=\"topicTreeNodes\" selectionMode=\"checkbox\" [metaKeySelection]=\"false\" [(selection)]=\"selectedTopics\" [loading]=\"loading\"\n        (onNodeSelect)=\"nodeSelect($event)\" (onNodeUnselect)=\"nodeUnselect($event)\" (onNodeCollapse)=\"nodeCollapse($event)\" (onNodeExpand)=\"nodeExpand($event)\"\n        [filter]=\"topicTreeNodes ? true : false\" [filterPlaceholder]=\"'Find topics'\" [ptreeFilter]=\"topicTreeNodes\"></p-tree>\n    </div>\n  </div>\n</div>\n", styles: [""] }]
        }], ctorParameters: function () { return [{ type: i1.MessageService }, { type: i2.TopicService }, { type: TopicTreeExposeService }, { type: i3.EndecapodService }]; }, propDecorators: { topicConfig: [{
                type: Input
            }], loading: [{
                type: Input
            }], isLoading: [{
                type: Output
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidG9waWMtc2VhcmNoLXBhbmVsLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3NyYy9hcHAvdG9waWMtc2VhcmNoL3RvcGljLXNlYXJjaC1wYW5lbC90b3BpYy1zZWFyY2gtcGFuZWwuY29tcG9uZW50LnRzIiwiLi4vLi4vLi4vLi4vLi4vLi4vc3JjL2FwcC90b3BpYy1zZWFyY2gvdG9waWMtc2VhcmNoLXBhbmVsL3RvcGljLXNlYXJjaC1wYW5lbC5jb21wb25lbnQuaHRtbCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFxQixLQUFLLEVBQUUsTUFBTSxFQUFFLFlBQVksRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFFdEcsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFHbkQsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLDBCQUEwQixDQUFDOzs7Ozs7OztBQUl4RCxNQUFNLE9BQU8sc0JBQXVCLFNBQVEsZ0JBQWdCOzttSEFBL0Msc0JBQXNCO3VIQUF0QixzQkFBc0I7MkZBQXRCLHNCQUFzQjtrQkFEbEMsVUFBVTs7QUFXWCxNQUFNLE9BQU8seUJBQXlCO0lBc0JwQyxZQUNVLGNBQThCLEVBQzlCLFlBQTBCLEVBQzFCLGtCQUEwQyxFQUMxQyxnQkFBa0M7UUFIbEMsbUJBQWMsR0FBZCxjQUFjLENBQWdCO1FBQzlCLGlCQUFZLEdBQVosWUFBWSxDQUFjO1FBQzFCLHVCQUFrQixHQUFsQixrQkFBa0IsQ0FBd0I7UUFDMUMscUJBQWdCLEdBQWhCLGdCQUFnQixDQUFrQjtRQXpCM0IscUJBQWdCLEdBQUcsSUFBSSxDQUFDO1FBS3pDLGdCQUFnQjtRQUVoQixZQUFPLEdBQUcsS0FBSyxDQUFDO1FBQ04sY0FBUyxHQUEwQixJQUFJLFlBQVksRUFBRSxDQUFDO1FBTWhFLGdCQUFnQjtRQUNoQixvQkFBZSxHQUFHLElBQUksR0FBRyxF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QUFFLE9BQU8sRUFBRSxzQkFBc0IsRUFBRSxRQUFRLEVBQUUsc0JBQXNCLEVBQUUsRUFBRSxZQUFZO0tBQ3BGLDBCQ2pCSCx1L0JBZ0JBOzJGREdhLHlCQUF5QjtrQkFSckMsU0FBUzsrQkFDRSx3QkFBd0IsYUFHdkI7d0JBQ1QsRUFBRSxPQUFPLEVBQUUsc0JBQXNCLEVBQUUsUUFBUSxFQUFFLHNCQUFzQixFQUFFLEVBQUUsWUFBWTtxQkFDcEY7a0hBMkI2QixzQkFBc0IseURBckJwRCxXQUFXO3NCQURWLEtBQUs7Z0JBS04sT0FBTztzQkFETixLQUFLO2dCQUVJLFNBQVM7c0JBQWxCLE1BQU0iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCwgT25EZXN0cm95LCBJbnB1dCwgT3V0cHV0LCBFdmVudEVtaXR0ZXIsIEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFRyZWVOb2RlIH0gZnJvbSAncHJpbWVuZy9hcGknO1xuaW1wb3J0IHsgRW5kZWNhcG9kU2VydmljZSB9IGZyb20gJ0BpYmZkL2VuZGVjYXBvZCc7XG5pbXBvcnQgeyBTdWJzY3JpcHRpb24gfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IE1lc3NhZ2VTZXJ2aWNlIH0gZnJvbSAncHJpbWVuZy9hcGknO1xuaW1wb3J0IHsgVG9waWNTZXJ2aWNlIH0gZnJvbSAnLi4vc2VydmljZS90b3BpYy5zZXJ2aWNlJztcbmltcG9ydCB7IFRvcGljU2VydmljZUNvbmZpZyB9IGZyb20gJy4uL21vZGVsL3RvcGljLXNlcnZpY2UtY29uZmlnJztcblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIFRvcGljVHJlZUV4cG9zZVNlcnZpY2UgZXh0ZW5kcyBFbmRlY2Fwb2RTZXJ2aWNlIHt9XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2FwcC10b3BpYy1zZWFyY2gtcGFuZWwnLFxuICB0ZW1wbGF0ZVVybDogJy4vdG9waWMtc2VhcmNoLXBhbmVsLmNvbXBvbmVudC5odG1sJyxcbiAgc3R5bGVVcmxzOiBbJy4vdG9waWMtc2VhcmNoLXBhbmVsLmNvbXBvbmVudC5jc3MnXSxcbiAgcHJvdmlkZXJzOiBbXG4gICAgeyBwcm92aWRlOiBUb3BpY1RyZWVFeHBvc2VTZXJ2aWNlLCB1c2VDbGFzczogVG9waWNUcmVlRXhwb3NlU2VydmljZSB9LCBUb3BpY1NlcnZpY2VcbiAgXVxufSlcbmV4cG9ydCBjbGFzcyBUb3BpY1NlYXJjaFBhbmVsQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0LCBPbkRlc3Ryb3kge1xuICBwcml2YXRlIHJlYWRvbmx5IERFRkFVTFRfTVNHX0xJRkUgPSA1MDAwO1xuICAvKiogQGludGVybmFsICovXG4gIEBJbnB1dCgpXG4gIHRvcGljQ29uZmlnOiBUb3BpY1NlcnZpY2VDb25maWc7XG5cbiAgLyoqIEBpbnRlcm5hbCAqL1xuICBASW5wdXQoKVxuICBsb2FkaW5nID0gZmFsc2U7XG4gIEBPdXRwdXQoKSBpc0xvYWRpbmc6IEV2ZW50RW1pdHRlcjxib29sZWFuPiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcblxuICAvKiogQGludGVybmFsICovXG4gIHRvcGljVHJlZU5vZGVzOiBUcmVlTm9kZVtdO1xuICAvKiogQGludGVybmFsICovXG4gIHNlbGVjdGVkVG9waWNzOiBUcmVlTm9kZVtdO1xuICAvKiogQGludGVybmFsICovXG4gIGV4cGFuZGVkTm9kZUlkcyA9IG5ldyBTZXQ8bnVtYmVyPigpO1xuICAvKiogQGludGVybmFsICovXG4gIGlzUGFuZWxDb2xsYXBzZWQgPSBmYWxzZTtcblxuICBwcml2YXRlIHN1YnNjcmlwdGlvbjogU3Vic2NyaXB0aW9uO1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHByaXZhdGUgbWVzc2FnZVNlcnZpY2U6IE1lc3NhZ2VTZXJ2aWNlLFxuICAgIHByaXZhdGUgdG9waWNTZXJ2aWNlOiBUb3BpY1NlcnZpY2UsXG4gICAgcHJpdmF0ZSB0b3BpY0V4cG9zZVNlcnZpY2U6IFRvcGljVHJlZUV4cG9zZVNlcnZpY2UsXG4gICAgcHJpdmF0ZSBlbmRlY2Fwb2RTZXJ2aWNlOiBFbmRlY2Fwb2RTZXJ2aWNlXG4gICkge1xuICB9XG5cbiAgbmdPbkluaXQoKSB7XG4gICAgdGhpcy50b3BpY1NlcnZpY2UucmVnaXN0ZXJDb25maWcodGhpcy50b3BpY0NvbmZpZyk7XG4gICAgdGhpcy50b3BpY0V4cG9zZVNlcnZpY2Uuc2V0TmFtZSgnVG9waWNUcmVlU2VydmljZScpO1xuICAgIHRoaXMudG9waWNFeHBvc2VTZXJ2aWNlLnNldFVSTCh0aGlzLnRvcGljQ29uZmlnLmVuZGVjYXBvZFVybCwgdGhpcy50b3BpY0NvbmZpZy5hd2FyZVVybCk7XG4gICAgdGhpcy50b3BpY1NlcnZpY2UubG9hZEluaXRUYXhUb3BpY3MoKTtcblxuICAgIHRoaXMuc3Vic2NyaXB0aW9uID0gdGhpcy50b3BpY1NlcnZpY2Uuc2VhcmNoVG9waWNzKHRoaXMudG9waWNFeHBvc2VTZXJ2aWNlLCB0aGlzLmVuZGVjYXBvZFNlcnZpY2UpXG4gICAgICAuc3Vic2NyaWJlKHtcbiAgICAgICAgbmV4dDogc2VhcmNoZWRUb3BpY3MgPT4gdGhpcy50b3BpY1NlcnZpY2UuYnVpbGRUb3BpY1RyZWUoc2VhcmNoZWRUb3BpY3MsIHRoaXMuZXhwYW5kZWROb2RlSWRzKSxcbiAgICAgICAgZXJyb3I6IGVyciA9PiB0aGlzLm1lc3NhZ2VTZXJ2aWNlLmFkZCh7IHNldmVyaXR5OiAnZXJyb3InLCBzdW1tYXJ5OiAnJywgZGV0YWlsOiBlcnIsIGxpZmU6IHRoaXMuREVGQVVMVF9NU0dfTElGRSB9KVxuICAgICAgfSk7XG5cbiAgICB0aGlzLnN1YnNjcmlwdGlvbi5hZGQoXG4gICAgICB0aGlzLnRvcGljU2VydmljZS5nZXRUb3BpY1RyZWUoKS5zdWJzY3JpYmUoe1xuICAgICAgICBuZXh0OiB0b3BpY1RyZWUgPT4ge1xuICAgICAgICAgIHRoaXMudG9waWNUcmVlTm9kZXMgPSA8VHJlZU5vZGVbXT50b3BpY1RyZWUuZGF0YTtcbiAgICAgICAgICB0aGlzLnNlbGVjdGVkVG9waWNzID0gPFRyZWVOb2RlW10+dG9waWNUcmVlLnNlbGVjdGVkO1xuICAgICAgICAgIHRoaXMuZXhwYW5kUGFyZW50cyh0aGlzLnNlbGVjdGVkVG9waWNzKTtcbiAgICAgICAgICB0aGlzLmlzTG9hZGluZy5lbWl0KGZhbHNlKTtcbiAgICAgICAgfSxcbiAgICAgICAgZXJyb3I6IGVyciA9PiB0aGlzLm1lc3NhZ2VTZXJ2aWNlLmFkZCh7IHNldmVyaXR5OiAnZXJyb3InLCBzdW1tYXJ5OiAnJywgZGV0YWlsOiBlcnIsIGxpZmU6IHRoaXMuREVGQVVMVF9NU0dfTElGRSB9KX0pXG4gICAgKTtcblxuICAgIHRoaXMuc3Vic2NyaXB0aW9uLmFkZCh0aGlzLnRvcGljRXhwb3NlU2VydmljZS5FcnJvcigpLnN1YnNjcmliZShcbiAgICAgIHJlcyA9PiB7XG4gICAgICAgIGlmIChyZXMpIHtcbiAgICAgICAgICB0aGlzLm1lc3NhZ2VTZXJ2aWNlLmFkZCh7IHNldmVyaXR5OiAnZXJyb3InLCBzdW1tYXJ5OiAnJywgZGV0YWlsOiByZXMudG9TdHJpbmcoKSwgbGlmZTogdGhpcy5ERUZBVUxUX01TR19MSUZFIH0pO1xuICAgICAgICB9XG4gICAgICB9LFxuICAgICAgZXJyID0+IHRoaXMubWVzc2FnZVNlcnZpY2UuYWRkKHsgc2V2ZXJpdHk6ICdlcnJvcicsIHN1bW1hcnk6ICcnLCBkZXRhaWw6IGVyciwgbGlmZTogdGhpcy5ERUZBVUxUX01TR19MSUZFIH0pXG4gICAgKSk7XG5cbiAgICB0aGlzLnN1YnNjcmlwdGlvbi5hZGQodGhpcy50b3BpY1NlcnZpY2UuZ2V0RXJyb3IoKS5zdWJzY3JpYmUoXG4gICAgICByZXMgPT4ge1xuICAgICAgICBpZiAocmVzKSB7XG4gICAgICAgICAgdGhpcy5tZXNzYWdlU2VydmljZS5hZGQoeyBzZXZlcml0eTogJ2Vycm9yJywgc3VtbWFyeTogJycsIGRldGFpbDogcmVzLnRvU3RyaW5nKCksIGxpZmU6IHRoaXMuREVGQVVMVF9NU0dfTElGRSB9KTtcbiAgICAgICAgfVxuICAgICAgfSxcbiAgICAgIGVyciA9PiB0aGlzLm1lc3NhZ2VTZXJ2aWNlLmFkZCh7IHNldmVyaXR5OiAnZXJyb3InLCBzdW1tYXJ5OiAnJywgZGV0YWlsOiBlcnIsIGxpZmU6IHRoaXMuREVGQVVMVF9NU0dfTElGRSB9KVxuICAgICkpO1xuICB9XG5cbiAgLyoqIEBpbnRlcm5hbCAqL1xuICB0b2dnbGVQYW5lbCgpIHtcbiAgICB0aGlzLmlzUGFuZWxDb2xsYXBzZWQgPSAhdGhpcy5pc1BhbmVsQ29sbGFwc2VkO1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIG5vZGVTZWxlY3QoZXZlbnQpIHtcbiAgICB0aGlzLmVuZGVjYXBvZFNlcnZpY2UuQWRkKGV2ZW50Lm5vZGUuaWQpO1xuICAgIGNvbnNvbGUubG9nKCdub2RlU2VsZWN0OiAnICsgdGhpcy5ub2RlUGF0aChldmVudC5ub2RlKS5qb2luKCcgPiAnKSk7XG4gICAgdGhpcy5pc0xvYWRpbmcuZW1pdCh0cnVlKTtcbiAgfVxuXG4gIG5vZGVVbnNlbGVjdChldmVudCkge1xuICAgIHRoaXMuZW5kZWNhcG9kU2VydmljZS5SZW1vdmUoZXZlbnQubm9kZS5pZCk7XG4gICAgdGhpcy5pc0xvYWRpbmcuZW1pdCh0cnVlKTtcbiAgfVxuXG4gIG5vZGVFeHBhbmQoZXZlbnQpIHtcbiAgICB0aGlzLmV4cGFuZGVkTm9kZUlkcy5hZGQoZXZlbnQubm9kZS5pZCk7XG4gIH1cblxuICBub2RlQ29sbGFwc2UoZXZlbnQpIHtcbiAgICB0aGlzLmV4cGFuZGVkTm9kZUlkcy5kZWxldGUoZXZlbnQubm9kZS5pZCk7XG4gIH1cblxuICBwcml2YXRlIG5vZGVQYXRoKG5vZGU6IFRyZWVOb2RlKTogc3RyaW5nW10ge1xuICAgIGNvbnN0IGxhYmVscyA9IFtub2RlLmxhYmVsXTtcbiAgICB3aGlsZSAobm9kZS5wYXJlbnQpIHtcbiAgICAgIG5vZGUgPSBub2RlLnBhcmVudDtcbiAgICAgIGxhYmVscy5wdXNoKG5vZGUubGFiZWwpO1xuICAgIH1cbiAgICByZXR1cm4gbGFiZWxzLnJldmVyc2UoKTtcbiAgfVxuXG4gIHByaXZhdGUgZXhwYW5kUGFyZW50cyhub2RlczogVHJlZU5vZGVbXSkge1xuICAgIG5vZGVzLmZvckVhY2gobm9kZSA9PiB7XG4gICAgICBub2RlLnNlbGVjdGFibGUgPSB0cnVlO1xuICAgICAgbGV0IHBhcmVudCA9IG5vZGUucGFyZW50O1xuICAgICAgd2hpbGUgKHBhcmVudCkge1xuICAgICAgICBwYXJlbnQuZXhwYW5kZWQgPSB0cnVlO1xuICAgICAgICB0aGlzLmV4cGFuZGVkTm9kZUlkcy5hZGQocGFyZW50WydpZCddKTtcbiAgICAgICAgcGFyZW50ID0gcGFyZW50LnBhcmVudDtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG4gIG5nT25EZXN0cm95KCk6IHZvaWQge1xuICAgIHRoaXMuc3Vic2NyaXB0aW9uLnVuc3Vic2NyaWJlKCk7XG4gIH1cbn1cbiIsIjxhIGNsYXNzPVwiaWItY29sbGFwc2UtcGFuZWwgaWItZmlsdGVycyB7e2lzUGFuZWxDb2xsYXBzZWQ/ICdjb2xsYXBzZWQnOiAnJ319XCIgKGNsaWNrKT1cInRvZ2dsZVBhbmVsKClcIlxuICBbYXR0ci5hcmlhLWV4cGFuZGVkXT1cIiFpc1BhbmVsQ29sbGFwc2VkXCIgaHJlZj1cIiNpYi10b3BpYy1zZWFyY2hcIiByb2xlPVwiYnV0dG9uXCIgYXJpYS1jb250cm9scz1cImliLXRvcGljLXNlYXJjaFwiPlxuICA8aSBjbGFzcz1cImZhIGZhLWxpc3RcIj48L2k+XG4gIFRvcGljIFNlYXJjaFxuICA8aSBjbGFzcz1cImliLWFuZ2xlLWRvd24tdXBcIiBhcmlhLWhpZGRlbj1cInRydWVcIj48L2k+XG48L2E+XG48ZGl2IGNsYXNzPVwicm93IGliLXBhZGRpbmctMjBcIj5cbiAgPGRpdiBjbGFzcz1cImliLXRvcGljLXNlYXJjaFwiPlxuICAgIDxkaXYgY2xhc3M9XCJtdWx0aS1jb2xsYXBzZVwiIFtjb2xsYXBzZV09XCJpc1BhbmVsQ29sbGFwc2VkXCIgW2lzQW5pbWF0ZWRdPVwidHJ1ZVwiIGlkPVwiaWItdG9waWMtc2VhcmNoXCI+XG5cbiAgICAgIDxwLXRyZWUgW3ZhbHVlXT1cInRvcGljVHJlZU5vZGVzXCIgc2VsZWN0aW9uTW9kZT1cImNoZWNrYm94XCIgW21ldGFLZXlTZWxlY3Rpb25dPVwiZmFsc2VcIiBbKHNlbGVjdGlvbildPVwic2VsZWN0ZWRUb3BpY3NcIiBbbG9hZGluZ109XCJsb2FkaW5nXCJcbiAgICAgICAgKG9uTm9kZVNlbGVjdCk9XCJub2RlU2VsZWN0KCRldmVudClcIiAob25Ob2RlVW5zZWxlY3QpPVwibm9kZVVuc2VsZWN0KCRldmVudClcIiAob25Ob2RlQ29sbGFwc2UpPVwibm9kZUNvbGxhcHNlKCRldmVudClcIiAob25Ob2RlRXhwYW5kKT1cIm5vZGVFeHBhbmQoJGV2ZW50KVwiXG4gICAgICAgIFtmaWx0ZXJdPVwidG9waWNUcmVlTm9kZXMgPyB0cnVlIDogZmFsc2VcIiBbZmlsdGVyUGxhY2Vob2xkZXJdPVwiJ0ZpbmQgdG9waWNzJ1wiIFtwdHJlZUZpbHRlcl09XCJ0b3BpY1RyZWVOb2Rlc1wiPjwvcC10cmVlPlxuICAgIDwvZGl2PlxuICA8L2Rpdj5cbjwvZGl2PlxuIl19