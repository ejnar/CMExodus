import { ContentItem } from '../../../content/content-item';
export class Page {
    public metaTitle: string;
    public metaDescription: string;
    constructor(
        public id: number,
        public titleSv: string,
        public titleEn: string,
        public pageLayout: string,
        public items: ContentItem[]
    ) { }
}
