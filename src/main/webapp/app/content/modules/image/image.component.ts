import { Component, Directive, Input, OnInit } from '@angular/core';
import { ComponentInterface } from './../../component-interface';

import { CmImage, CmImageService} from '../../../entities/cm-image';

@Component({
    templateUrl: './image.component.html',
    styleUrls: [
        '../content/styles.scss'
    ]
})
export class ImageComponent implements ComponentInterface, OnInit {
    @Input() data: any;
    image: CmImage;

    constructor() { }
    ngOnInit() {
        this.data.items.forEach((item) => {
            if (item.textType === 'IMAGE') {
                this.image = item;
            }
        });
    }
}
