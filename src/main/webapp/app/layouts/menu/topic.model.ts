import { SubTopic } from './subtopic.model';

export class Topic {
    constructor(
        public name: string,
        public subTopics: SubTopic[],
    ) { }
}
