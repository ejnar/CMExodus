import { BaseEntity } from './../../shared';

export class CmSubTopicCm implements BaseEntity {
    constructor(
        public id?: number,
        public name?: string,
        public cmTopicId?: number,
        public pages?: BaseEntity[],
    ) {
    }
}
