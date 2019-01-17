import { BaseEntity } from './../../shared';
import { CmImage } from '../cm-image/cm-image.model';

export const enum TextType {
    'TITLE',
    'INGRESS',
    'TEXT',
    'TEXT_IMAGE',
    'LIST'
}

export const enum LayoutType {
    'LEFT',
    'RIGHT',
    'MIDDLE',
    'CENTER',
    'TOP',
    'BOTTOM',
    'SIDEBYSIDE'
}

export const enum FontWeight {
    'NORMAL',
    'BOLD'
}

export class CmText implements BaseEntity {
    constructor(
        public id?: number,
        public textSv?: string,
        public textEn?: string,
        public fontSize?: string,
        public fontWeight?: string,
        public textType?: TextType,
        public sorted?: number,
        public layout?: LayoutType,
        public textDate?: any,
        public publishDate?: any,
        public publish?: boolean,
        public cmModuleId?: number,
        public cmItemId?: number,
        public imageId?: number,
        public image?: any,
    ) {
        this.sorted = 0;
        this.publish = false;
    }

    initTitle() {
        this.textSv = '';
        this.textType = TextType.TITLE;
        this.layout = LayoutType.CENTER;
    }

    initText() {
        this.textSv = '';
        this.textType = TextType.TEXT;
        this.layout = LayoutType.CENTER;
    }

    initTextImage() {
        this.textSv = '';
        this.image = new CmImage();
        this.textType = TextType.TEXT_IMAGE;
        this.layout = LayoutType.CENTER;
    }
}
