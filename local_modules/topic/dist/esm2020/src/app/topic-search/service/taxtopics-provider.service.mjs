import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import * as i0 from "@angular/core";
export class TaxtopicsProviderService {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGF4dG9waWNzLXByb3ZpZGVyLnNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9zcmMvYXBwL3RvcGljLXNlYXJjaC9zZXJ2aWNlL3RheHRvcGljcy1wcm92aWRlci5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDM0MsT0FBTyxFQUFFLGVBQWUsRUFBYyxNQUFNLE1BQU0sQ0FBQztBQUNuRCxPQUFPLEVBQUUsR0FBRyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7O0FBYXJDLE1BQU0sT0FBTyx3QkFBd0I7SUFHbkM7UUFEUSwyQkFBc0IsR0FBRyxJQUFJLGVBQWUsQ0FBb0IsRUFBQyxXQUFXLEVBQUUsQ0FBQyxFQUFFLE1BQU0sRUFBRSxFQUFFLEVBQUMsQ0FBQyxDQUFDO0lBQ3ZGLENBQUM7SUFHVCxpQkFBaUIsQ0FBQyxRQUFlLEVBQUUsRUFBVTtRQUVsRCxNQUFNLE1BQU0sR0FBRyxFQUFDLEdBQUcsSUFBSSxDQUFDLHNCQUFzQixDQUFDLEtBQUssQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxRQUFRLEVBQUMsQ0FBQztRQUU3RSxJQUFJLENBQUMsc0JBQXNCLENBQUMsSUFBSSxDQUM5QjtZQUNFLFdBQVcsRUFBRSxNQUFNLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLE1BQU07WUFDdkMsTUFBTTtTQUNQLENBQ0YsQ0FBQztJQUNKLENBQUM7SUFFTSxvQkFBb0I7UUFDekIsT0FBTyxJQUFJLENBQUMsc0JBQXNCLENBQUMsWUFBWSxFQUFFLENBQUM7SUFDcEQsQ0FBQztJQUVNLFlBQVksQ0FBQyxFQUFVO1FBQzVCLE9BQU8sSUFBSSxDQUFDLG9CQUFvQixFQUFFLENBQUMsSUFBSSxDQUNyQyxHQUFHLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQ3pCLENBQUM7SUFDSixDQUFDO0lBRU0scUJBQXFCLENBQUMsRUFBVTtRQUNyQyxPQUFPLElBQUksQ0FBQyxvQkFBb0IsRUFBRSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLFdBQVcsSUFBSSxDQUFDLENBQUMsRUFBRSxDQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDMUYsQ0FBQzs7cUhBOUJVLHdCQUF3Qjt5SEFBeEIsd0JBQXdCLGNBRnZCLE1BQU07MkZBRVAsd0JBQXdCO2tCQUhwQyxVQUFVO21CQUFDO29CQUNWLFVBQVUsRUFBRSxNQUFNO2lCQUNuQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEJlaGF2aW9yU3ViamVjdCwgT2JzZXJ2YWJsZSB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgbWFwIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuXG5leHBvcnQgaW50ZXJmYWNlIFRheHRvcGljR3JvdXBJbmZvIHtcbiAgdG90YWxHcm91cHM6IG51bWJlcjtcbiAgZ3JvdXBzOiBUYXh0b3BpY0dyb3Vwcztcbn1cblxuaW50ZXJmYWNlIFRheHRvcGljR3JvdXBzIHtcbiAgW2lkOiBzdHJpbmddOiBhbnlbXTtcbn1cbkBJbmplY3RhYmxlKHtcbiAgcHJvdmlkZWRJbjogJ3Jvb3QnXG59KVxuZXhwb3J0IGNsYXNzIFRheHRvcGljc1Byb3ZpZGVyU2VydmljZSB7XG5cbiAgcHJpdmF0ZSB0YXh0b3BpY3NHcm91cFByb3ZpZGVyID0gbmV3IEJlaGF2aW9yU3ViamVjdDxUYXh0b3BpY0dyb3VwSW5mbz4oe3RvdGFsR3JvdXBzOiAwLCBncm91cHM6IHt9fSk7XG4gIGNvbnN0cnVjdG9yKCkge31cblxuXG4gIHB1YmxpYyBhZGRUYXh0b3BpY3NHcm91cCh0YXhvbm9teTogYW55W10sIGlkOiBzdHJpbmcpIHtcblxuICAgIGNvbnN0IGdyb3VwcyA9IHsuLi50aGlzLnRheHRvcGljc0dyb3VwUHJvdmlkZXIudmFsdWUuZ3JvdXBzLCBbaWRdOiB0YXhvbm9teX07XG5cbiAgICB0aGlzLnRheHRvcGljc0dyb3VwUHJvdmlkZXIubmV4dChcbiAgICAgIHtcbiAgICAgICAgdG90YWxHcm91cHM6IE9iamVjdC5rZXlzKGdyb3VwcykubGVuZ3RoLFxuICAgICAgICBncm91cHNcbiAgICAgIH1cbiAgICApO1xuICB9XG5cbiAgcHVibGljIGdldFRheHRvcGljR3JvdXBJbmZvKCk6IE9ic2VydmFibGU8VGF4dG9waWNHcm91cEluZm8+IHtcbiAgICByZXR1cm4gdGhpcy50YXh0b3BpY3NHcm91cFByb3ZpZGVyLmFzT2JzZXJ2YWJsZSgpO1xuICB9XG5cbiAgcHVibGljIGdldFRheHRvcGljcyhpZDogc3RyaW5nKTogT2JzZXJ2YWJsZTxhbnlbXT4ge1xuICAgIHJldHVybiB0aGlzLmdldFRheHRvcGljR3JvdXBJbmZvKCkucGlwZShcbiAgICAgIG1hcCh0ZyA9PiB0Zy5ncm91cHNbaWRdKVxuICAgICk7XG4gIH1cblxuICBwdWJsaWMgaXNUYXh0b3BpY3NHcm91cEV4aXN0KGlkOiBzdHJpbmcpOiBPYnNlcnZhYmxlPGJvb2xlYW4+IHtcbiAgICByZXR1cm4gdGhpcy5nZXRUYXh0b3BpY0dyb3VwSW5mbygpLnBpcGUobWFwKHRnID0+ICEhdGcudG90YWxHcm91cHMgJiYgISF0Zy5ncm91cHNbaWRdKSk7XG4gIH1cblxufVxuIl19