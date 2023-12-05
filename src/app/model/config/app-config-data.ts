import { Dimension, SortCriterium } from "@ibfd/endecapod";
import { SelectItem } from "primeng/api";

export interface Sortings {
    name: string;
    asc: SortCriterium[];
    desc: SortCriterium[];
    default: string;
}


export class AppConfigData {
    private readonly configMap = {};
    
    constructor(data: any) {
        Object.keys(data).forEach(key => (this.configMap[key] = data[key]));
    }

    
    public sortCollection(a: Dimension, b: Dimension): number {
        const collections = this.getCollections();
        const aN = collections.findIndex(c => c['N'] === a.id);
        const bN = collections.findIndex(c => c['N'] === b.id);
        if (aN === bN) { return 0; }
        if (aN > bN) { return 1; }
        return -1;
    }

    getCollections(): Object[] {
        return this.configMap['collections'];
    }

    getCollectionDimension(): Dimension {
        return this.configMap['collection_dimension'];
    }

    getCountryDimension(): Dimension {
        return this.configMap['country_dimension'];
    }

    getRelatedCountryDimension(): Dimension {
        return this.configMap['related_country_dimension'];
    }

    getDWayURL(): string {
        return this.configMap['d-way_url'];
    }    


    getEndecapodURL(): string {
        return this.configMap['endecapod']['url'];
    }

    getAwareURL(): string {
        return this.configMap['endecapod']['aware_url'];
    }

    getInitQuery(): string {
        return this.configMap['endecapod']['initial_query'];
    }

    getCollectionAlias(collectionId: number): string {
        const collection = this.getCollections()
          .find(col => col['N'] === collectionId);
        return collection && collection['alias'] ? collection['alias'] : undefined;
    }

    getConfiguredSortings(): Sortings[] {
        return this.configMap['sortings'];
      }

    getCollectionConfiguredSortOptions(collectionId: number): SelectItem[] {
    const collection = this.getCollections()
        .find(col => col['N'] === collectionId);
    return collection && collection['sorting'] ? collection['sorting'] : this.getDefaultCollectionConfiguredSortOptions();
    }

    private getDefaultCollectionConfiguredSortOptions(): SelectItem {
        return this.getCollections()
          .find(col => col['N'] === 0)['sorting'];
      }

}
