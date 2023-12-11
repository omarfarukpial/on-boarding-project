import { OnInit, OnDestroy, EventEmitter } from '@angular/core';
import { TreeNode } from 'primeng/api';
import { EndecapodService } from '@ibfd/endecapod';
import { MessageService } from 'primeng/api';
import { TopicService } from '../service/topic.service';
import { TopicServiceConfig } from '../model/topic-service-config';
import * as i0 from "@angular/core";
export declare class TopicTreeExposeService extends EndecapodService {
    static ɵfac: i0.ɵɵFactoryDeclaration<TopicTreeExposeService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<TopicTreeExposeService>;
}
export declare class TopicSearchPanelComponent implements OnInit, OnDestroy {
    private messageService;
    private topicService;
    private topicExposeService;
    private endecapodService;
    private readonly DEFAULT_MSG_LIFE;
    /** @internal */
    topicConfig: TopicServiceConfig;
    /** @internal */
    loading: boolean;
    isLoading: EventEmitter<boolean>;
    /** @internal */
    topicTreeNodes: TreeNode[];
    /** @internal */
    selectedTopics: TreeNode[];
    /** @internal */
    expandedNodeIds: Set<number>;
    /** @internal */
    isPanelCollapsed: boolean;
    private subscription;
    constructor(messageService: MessageService, topicService: TopicService, topicExposeService: TopicTreeExposeService, endecapodService: EndecapodService);
    ngOnInit(): void;
    /** @internal */
    togglePanel(): boolean;
    nodeSelect(event: any): void;
    nodeUnselect(event: any): void;
    nodeExpand(event: any): void;
    nodeCollapse(event: any): void;
    private nodePath;
    private expandParents;
    ngOnDestroy(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<TopicSearchPanelComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<TopicSearchPanelComponent, "app-topic-search-panel", never, { "topicConfig": "topicConfig"; "loading": "loading"; }, { "isLoading": "isLoading"; }, never, never>;
}
