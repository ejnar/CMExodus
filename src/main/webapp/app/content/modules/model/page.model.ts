import { ContentItem } from '../../content-item';
export class Page {
    public metaTitle: string;
    public metaDescription: string;
    constructor(
        public title: string,
        public pageLayout: string,
        public items: ContentItem[]
    ) { }
}
