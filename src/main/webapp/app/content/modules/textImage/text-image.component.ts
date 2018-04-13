import { Component, Directive, Input, OnInit } from '@angular/core';

import { ComponentInterface } from './../../component-interface';
import { Text } from '../model/text.model';
import { Image } from '../model/image.model';

@Component({
    templateUrl: './text-image.component.html',
    styleUrls: [
        '../content/styles.scss'
    ]
})
export class TextImageComponent implements ComponentInterface, OnInit {
    @Input() data: any;
    title: Text;
    text: Text;
    image: Image;

    ngOnInit() {
        this.data.texts.forEach((item) => {
            if (item.textType === 'TITLE') {
                this.title = item;
            } else if (item.textType === 'TEXT_IMAGE') {
                this.text = item;
                this.image = item.image;
            }
        });
    }
}
