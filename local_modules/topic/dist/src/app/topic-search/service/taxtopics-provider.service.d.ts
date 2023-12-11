import { Observable } from 'rxjs';
import * as i0 from "@angular/core";
export interface TaxtopicGroupInfo {
    totalGroups: number;
    groups: TaxtopicGroups;
}
interface TaxtopicGroups {
    [id: string]: any[];
}
export declare class TaxtopicsProviderService {
    private taxtopicsGroupProvider;
    constructor();
    addTaxtopicsGroup(taxonomy: any[], id: string): void;
    getTaxtopicGroupInfo(): Observable<TaxtopicGroupInfo>;
    getTaxtopics(id: string): Observable<any[]>;
    isTaxtopicsGroupExist(id: string): Observable<boolean>;
    static ɵfac: i0.ɵɵFactoryDeclaration<TaxtopicsProviderService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<TaxtopicsProviderService>;
}
export {};
