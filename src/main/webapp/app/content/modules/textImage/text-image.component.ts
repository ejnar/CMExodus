import { Component, Directive, Input, OnInit } from '@angular/core';

import { ComponentInterface } from './../../component-interface';
import { CmText, TextType, LayoutType } from '../../../entities/cm-text/cm-text.model';
import { CmImage, CmImageService} from '../../../entities/cm-image';

@Component({
    templateUrl: './text-image.component.html',
    styleUrls: [
        '../content/styles.scss'
    ]
})
export class TextImageComponent implements ComponentInterface, OnInit {
    @Input() data: any;
    private imageBase64Path = 'data:image/jpeg;base64,';
    private imagePath = '../../../../content/images/';
    title: CmText;
    text: CmText;
    image: CmImage;
    dataImage: string;

    ngOnInit() {
        this.data.texts.forEach((item) => {
            if (item.textType === 'TITLE') {
                this.title = item;
            } else if (item.textType === 'TEXT_IMAGE') {
                this.text = item;
                this.image = item.image;
                if (item.image) {
                    if (item.image.data) {
                        this.dataImage = this.imageBase64Path + item.image.data;
                    } else {
                        this.dataImage = this.imagePath + item.image.name;
                    }
                }
            }
        });
    }
}
