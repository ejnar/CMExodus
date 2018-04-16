import { BaseEntity } from './../../shared';

export class CmTopicCm implements BaseEntity {
    constructor(
        public id?: number,
        public nameEn?: string,
        public nameSv?: string,
        public icon?: string,
        public subTopics?: BaseEntity[],
    ) {
    }
}
