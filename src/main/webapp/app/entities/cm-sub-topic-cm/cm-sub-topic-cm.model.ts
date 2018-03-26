import { BaseEntity } from './../../shared';

export class CmSubTopicCm implements BaseEntity {
    constructor(
        public id?: number,
        public name?: string,
        public visable?: boolean,
        public cmTopicId?: number,
        public pageId?: number,
    ) {
        this.visable = false;
    }
}
