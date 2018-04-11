import { Component, Directive, Input, OnInit } from '@angular/core';

import { ComponentInterface } from './../../component-interface';
import { Text } from './text.model';

@Component({
    templateUrl: './text.component.html',
    styleUrls: [
        'content.scss'
    ]
})
export class TextComponent implements ComponentInterface, OnInit {
    @Input() data: any;
    title: Text;
    text: Text;
    ngOnInit() {
        this.data.texts.forEach((item) => {
            console.log(item);
            if (item.textType === 'TITLE') {
                this.title = item;
            } else if (item.textType === 'TEXT') {
                this.text = item;
            }
        });
    }
}
