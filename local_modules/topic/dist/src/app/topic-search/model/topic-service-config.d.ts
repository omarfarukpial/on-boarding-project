import { TopicConfig } from './topic-config';
export declare class TopicServiceConfig {
    readonly endecapodUrl: string;
    readonly awareUrl: string;
    readonly topicConfig: TopicConfig;
    readonly suppressedChips: number[];
    constructor(endecapodUrl: string, awareUrl: string, topicConfig: TopicConfig, suppressedChips: number[]);
}
