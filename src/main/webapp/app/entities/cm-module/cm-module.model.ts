import { BaseEntity } from './../../shared';
import { CmText, TextType } from '../cm-text/cm-text.model';
import { CmItemList } from '../cm-item-list/cm-item-list.model';
import { CmImage } from '../cm-image/cm-image.model';

export const enum ModuleType {
    TEXT = 'TEXT',
    IMAGE = 'IMAGE',
    TEXT_IMAGE = 'TEXT_IMAGE',
    TEXT_LIST = 'TEXT_LIST',
    IMAGE_LIST = 'IMAGE_LIST',
    PROGRAM_LIST = 'PROGRAM_LIST'
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

export const enum ColumnLayout {
    'MAIN',
    'COLUMN1',
    'COLUMN2'
}

export class CmModule implements BaseEntity {
    constructor(
        public id?: number,
        public sorted?: number,
        // public publishDate?: any,
        public publish?: boolean,
        public moduleType?: ModuleType,
        public layout?: LayoutType,
        public columnLayout?: ColumnLayout,
        public items?: BaseEntity[],
        public itemLists?: BaseEntity[],
        public texts?: BaseEntity[],
        public images?: BaseEntity[],
    ) {
        this.publish = false;
        this.texts = [];
        this.items = [];
        this.images = [];
        this.itemLists = [];
    }

    init() {
        if (this.moduleType === 'TEXT') {
            this.initTEXT();
        } else if (this.moduleType === 'TEXT_LIST') {
            this.init_TEXTLIST();
        } else if (this.moduleType === 'TEXT_IMAGE') {
            this.initTEXT_IMAGE();
        } else if (this.moduleType === 'PROGRAM_LIST') {
            this.init_PROGRAM_LIST();
        }else if (this.moduleType === 'IMAGE') {
            this.initIMAGE();
        }
    }

    initTEXT() {
        const title = new CmText();
        title.initTitle();
        this.texts.push(title);

        const text = new CmText();
        text.initText();
        this.texts.push(text);
    }

    initIMAGE() {
        // const img = new CmImage();
        // this.images.push(img);
    }

    initTEXT_IMAGE() {
        const title = new CmText();
        title.initTitle();
        this.texts.push(title);

        const text = new CmText();
        text.initTextImage();
        this.texts.push(text);
    }

    init_TEXTLIST() {
        const text = new CmText();
        text.initText();
        this.texts.push(text);
    }

    init_PROGRAM_LIST() {
        this.itemLists = new Array<CmItemList> ();
        const item = new CmItemList();
        item.textSv = '';
        item.titleSv = '';
        this.itemLists.push(item);
    }
}
