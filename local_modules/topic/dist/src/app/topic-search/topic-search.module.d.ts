import * as i0 from "@angular/core";
import * as i1 from "./topic-search-panel/topic-search-panel.component";
import * as i2 from "./directive/ptree-filter.directive";
import * as i3 from "@angular/common";
import * as i4 from "primeng/tree";
import * as i5 from "ngx-bootstrap/collapse";
export declare class TopicSearchModule {
    static ɵfac: i0.ɵɵFactoryDeclaration<TopicSearchModule, never>;
    static ɵmod: i0.ɵɵNgModuleDeclaration<TopicSearchModule, [typeof i1.TopicSearchPanelComponent, typeof i2.PtreeFilterDirective], [typeof i3.CommonModule, typeof i4.TreeModule, typeof i5.CollapseModule], [typeof i1.TopicSearchPanelComponent, typeof i2.PtreeFilterDirective]>;
    static ɵinj: i0.ɵɵInjectorDeclaration<TopicSearchModule>;
}
export { TopicService } from './service/topic.service';
export { TopicServiceConfig } from './model/topic-service-config';
export { TopicConfig } from './model/topic-config';
export { TaxtopicsProviderService } from './service/taxtopics-provider.service';
export { TaxtopicGroupInfo } from './service/taxtopics-provider.service';
