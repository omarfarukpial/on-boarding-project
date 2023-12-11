import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TopicSearchPanelComponent } from './topic-search-panel/topic-search-panel.component';
import { TreeModule } from 'primeng/tree';
import { TopicService } from './service/topic.service';
import { CollapseModule } from 'ngx-bootstrap/collapse';
import { PtreeFilterDirective } from './directive/ptree-filter.directive';
import * as i0 from "@angular/core";
import * as i1 from "ngx-bootstrap/collapse";
export class TopicSearchModule {
}
TopicSearchModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.4.0", ngImport: i0, type: TopicSearchModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
TopicSearchModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "13.4.0", ngImport: i0, type: TopicSearchModule, declarations: [TopicSearchPanelComponent, PtreeFilterDirective], imports: [CommonModule,
        TreeModule, i1.CollapseModule], exports: [TopicSearchPanelComponent, PtreeFilterDirective] });
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
export { TopicService } from './service/topic.service';
export { TopicServiceConfig } from './model/topic-service-config';
export { TaxtopicsProviderService } from './service/taxtopics-provider.service';
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidG9waWMtc2VhcmNoLm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3NyYy9hcHAvdG9waWMtc2VhcmNoL3RvcGljLXNlYXJjaC5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUN6QyxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDL0MsT0FBTyxFQUFFLHlCQUF5QixFQUFFLE1BQU0sbURBQW1ELENBQUM7QUFDOUYsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGNBQWMsQ0FBQztBQUMxQyxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0seUJBQXlCLENBQUM7QUFDdkQsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLHdCQUF3QixDQUFDO0FBQ3hELE9BQU8sRUFBRSxvQkFBb0IsRUFBRSxNQUFNLG9DQUFvQyxDQUFDOzs7QUFZMUUsTUFBTSxPQUFPLGlCQUFpQjs7OEdBQWpCLGlCQUFpQjsrR0FBakIsaUJBQWlCLGlCQUpiLHlCQUF5QixFQUFFLG9CQUFvQixhQUo1RCxZQUFZO1FBQ1osVUFBVSxnQ0FJRix5QkFBeUIsRUFBRSxvQkFBb0I7K0dBRzlDLGlCQUFpQixhQUZqQixDQUFDLFlBQVksQ0FBQyxZQVBoQjtZQUNQLFlBQVk7WUFDWixVQUFVO1lBQ1YsY0FBYyxDQUFDLE9BQU8sRUFBRTtTQUN6QjsyRkFLVSxpQkFBaUI7a0JBVjdCLFFBQVE7bUJBQUM7b0JBQ1IsT0FBTyxFQUFFO3dCQUNQLFlBQVk7d0JBQ1osVUFBVTt3QkFDVixjQUFjLENBQUMsT0FBTyxFQUFFO3FCQUN6QjtvQkFDRCxZQUFZLEVBQUUsQ0FBQyx5QkFBeUIsRUFBRSxvQkFBb0IsQ0FBQztvQkFDL0QsT0FBTyxFQUFFLENBQUMseUJBQXlCLEVBQUUsb0JBQW9CLENBQUM7b0JBQzFELFNBQVMsRUFBRSxDQUFDLFlBQVksQ0FBQztpQkFDMUI7O0FBRUQsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLHlCQUF5QixDQUFDO0FBQ3ZELE9BQU8sRUFBRSxrQkFBa0IsRUFBRSxNQUFNLDhCQUE4QixDQUFDO0FBRWxFLE9BQU8sRUFBRSx3QkFBd0IsRUFBRSxNQUFNLHNDQUFzQyxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBUb3BpY1NlYXJjaFBhbmVsQ29tcG9uZW50IH0gZnJvbSAnLi90b3BpYy1zZWFyY2gtcGFuZWwvdG9waWMtc2VhcmNoLXBhbmVsLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBUcmVlTW9kdWxlIH0gZnJvbSAncHJpbWVuZy90cmVlJztcbmltcG9ydCB7IFRvcGljU2VydmljZSB9IGZyb20gJy4vc2VydmljZS90b3BpYy5zZXJ2aWNlJztcbmltcG9ydCB7IENvbGxhcHNlTW9kdWxlIH0gZnJvbSAnbmd4LWJvb3RzdHJhcC9jb2xsYXBzZSc7XG5pbXBvcnQgeyBQdHJlZUZpbHRlckRpcmVjdGl2ZSB9IGZyb20gJy4vZGlyZWN0aXZlL3B0cmVlLWZpbHRlci5kaXJlY3RpdmUnO1xuXG5ATmdNb2R1bGUoe1xuICBpbXBvcnRzOiBbXG4gICAgQ29tbW9uTW9kdWxlLFxuICAgIFRyZWVNb2R1bGUsXG4gICAgQ29sbGFwc2VNb2R1bGUuZm9yUm9vdCgpXG4gIF0sXG4gIGRlY2xhcmF0aW9uczogW1RvcGljU2VhcmNoUGFuZWxDb21wb25lbnQsIFB0cmVlRmlsdGVyRGlyZWN0aXZlXSxcbiAgZXhwb3J0czogW1RvcGljU2VhcmNoUGFuZWxDb21wb25lbnQsIFB0cmVlRmlsdGVyRGlyZWN0aXZlXSxcbiAgcHJvdmlkZXJzOiBbVG9waWNTZXJ2aWNlXVxufSlcbmV4cG9ydCBjbGFzcyBUb3BpY1NlYXJjaE1vZHVsZSB7IH1cbmV4cG9ydCB7IFRvcGljU2VydmljZSB9IGZyb20gJy4vc2VydmljZS90b3BpYy5zZXJ2aWNlJztcbmV4cG9ydCB7IFRvcGljU2VydmljZUNvbmZpZyB9IGZyb20gJy4vbW9kZWwvdG9waWMtc2VydmljZS1jb25maWcnO1xuZXhwb3J0IHsgVG9waWNDb25maWcgfSBmcm9tICcuL21vZGVsL3RvcGljLWNvbmZpZyc7XG5leHBvcnQgeyBUYXh0b3BpY3NQcm92aWRlclNlcnZpY2UgfSBmcm9tICcuL3NlcnZpY2UvdGF4dG9waWNzLXByb3ZpZGVyLnNlcnZpY2UnO1xuZXhwb3J0IHsgVGF4dG9waWNHcm91cEluZm8gfSBmcm9tICcuL3NlcnZpY2UvdGF4dG9waWNzLXByb3ZpZGVyLnNlcnZpY2UnO1xuIl19