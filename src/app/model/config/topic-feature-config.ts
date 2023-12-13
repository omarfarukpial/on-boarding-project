import { TopicConfig } from 'local_modules/topic/dist';

export class TopicTypeConfig {
  constructor(private config) { }

  getOldTaxonomy(): TopicConfig {
    return this.config['use_old_taxonomy'];
  }

  getNewTaxonomy(): TopicConfig {
    return this.config['use_new_taxonomy'];
  }

  getEnabledDimensions(): number[] {
    return this.getEnabledTaxonomies()
      .map(t => t.dimensions).reduce((acc, dims) => [...acc, ...dims], [])
      .map(dimension => dimension.id);
  }

  getEnabledTaxonomies(): TopicConfig[] {
    return [this.getOldTaxonomy(), this.getNewTaxonomy()]
      .filter(t => t.enabled);
  }

  get numberOfEnabledTaxonomies(): number {
    return this.getEnabledTaxonomies().length;
  }
}

export class TopicFeatureConfig {
  constructor(private config: any) { }

  getTopicSearchConfig(): TopicTypeConfig {
    return new TopicTypeConfig(this.config['topic_search']);
  }

  getTopicNavigationConfig(): TopicTypeConfig {
    return new TopicTypeConfig(this.config['topic_navigation']);
  }
}
