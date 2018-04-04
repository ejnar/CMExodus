import { PageModule } from './page-module.model';

export class Page {
    constructor(
        public id: number,
        public title: string,
        public sorted: number,
        public metaTitle: string,
        public metaDescription: string,
        public pageLayout: string,
        public modules: PageModule[],
    ) { }
}
