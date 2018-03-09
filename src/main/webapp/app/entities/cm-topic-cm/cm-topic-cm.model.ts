import { BaseEntity } from './../../shared';

export class CmTopicCm implements BaseEntity {
    constructor(
        public id?: number,
        public name?: string,
        public subTopics?: BaseEntity[],
    ) {
    }
}
