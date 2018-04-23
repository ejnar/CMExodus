import { Component, Directive, Input, OnInit } from '@angular/core';
import { ComponentInterface } from './../../component-interface';
import { Text } from '../model/text.model';

@Component({
    templateUrl: './text-list.component.html',
    styleUrls: [
        '../content/styles.scss'
    ]
})
export class TextListComponent implements ComponentInterface, OnInit {
    @Input() data: any;
    title: Text;
    texts: Text[];

    constructor() { }
    ngOnInit() {
        this.texts = new Array<Text>();
        this.data.texts.forEach((item) => {
            console.log(item);
            if (item.textType === 'TITLE') {
                this.title = item;
            } else if (item.textType === 'TEXT') {
                this.texts.push(item);
            }
        });
    }
}
