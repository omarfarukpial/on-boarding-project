import { Dimension, SortCriterium } from "@ibfd/endecapod";
import { SelectItem } from "primeng/api";
import { TopicFeatureConfig } from "./topic-feature-config";

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


    getCollectionFilters(collectionId: number): Object[] {
        const collection = this.getCollections()
            .find(col => col['N'] === collectionId);
        return collection && collection['filters'] ? collection['filters'] : this.getDefaultCollectionFilters();
    }

    private getDefaultCollectionFilters(): Object[] {
        return this.getCollections()
            .find(col => col['N'] === 0)['filters'];
    }


    getDimensionAlias(dimensionId: number, collectionId: number): string {
        const dim = this.getCollections()
            .find(col => col['N'] === collectionId)['dimensions'];
        const a = dim && dim.find(f => (f['id'] === dimensionId));
        return a ? a['alias'] : this.getDefaultDimensionAlias(dimensionId);
    }


    getDefaultDimensionAlias(dimensionId: number): string {
        const dim = this.getCollections()
            .find(col => col['N'] === 0)['dimensions'];
        const a = dim && dim.find(f => (f['id'] === dimensionId));
        return a ? a['alias'] : undefined;
    }


    getLoadOnScroll(): boolean {
        return this.configMap['load_on_scroll'];
    }


    getTopicFeatureConfig(): TopicFeatureConfig {
        return new TopicFeatureConfig(this.configMap['topic']);
    }


    getSuppressedChips(): number[] {
        return this.configMap['chips'] ? this.configMap['chips']['suppress'] : [];
    }




}
