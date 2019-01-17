import { NGXLogger } from 'ngx-logger';
import { Component, Directive, Input, OnInit } from '@angular/core';
import { ComponentInterface } from '../../../content/component-interface';
import { Text } from '../model/text.model';
import { CmText, TextType, LayoutType } from '../../../entities/cm-text/cm-text.model';

@Component({
    templateUrl: './text-list.component.html',
    styleUrls: [
        '../content/styles.scss'
    ]
})
export class TextListComponent implements ComponentInterface, OnInit {
    @Input() data: any;
    title: CmText;
    texts: CmText[];

    constructor(private logger: NGXLogger) { }
    ngOnInit() {
        this.texts = new Array<CmText>();
        this.loadComponent();
    }

    loadComponent() {
        this.logger.debug('TextListComponent.loadComponent');
        this.data.module.texts.forEach((item) => {
            if (item.textType === 'TITLE') {
                this.title = item;
            } else if (item.textType === 'TEXT') {
                this.texts.push(item);
            }
        });
        this.sort();
    }

    sort() {
        this.texts.sort ( ( t1 , t2 ) => {
            return t1.sorted - t2.sorted;
        } );
    }

    addRow() {
        const sort = this.data.module.texts[this.data.module.texts.length - 1].sorted;
        const text = new CmText();
        text.textSv = '';
        text.sorted = sort + 1;
        text.textType = TextType.TEXT;
        text.layout = LayoutType.CENTER;
        this.texts.push(text);
        this.data.module.texts.push(text);
    }

    removeRow(index) {
        this.texts.splice(index, 1);
        this.data.module.texts.splice(index, 1);
    }
}
