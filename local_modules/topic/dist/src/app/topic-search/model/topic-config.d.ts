import { Dimension } from '@ibfd/endecapod';
export interface TopicConfig {
    id: string;
    query: string;
    dimensions: Dimension[];
    enabled: boolean;
    prefix?: string;
    name: string;
}
