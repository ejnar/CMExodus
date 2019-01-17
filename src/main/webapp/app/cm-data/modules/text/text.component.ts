import { NGXLogger } from 'ngx-logger';
import { Component, Directive, Input, OnInit, AfterViewInit } from '@angular/core';
import { ComponentInterface } from '../../../content/component-interface';
import { CmText, TextType } from '../../../entities/cm-text/cm-text.model';

@Component({
    templateUrl: './text.component.html',
    styleUrls: [
        '../content/styles.scss'
    ]
})
export class TextComponent implements ComponentInterface, OnInit, AfterViewInit {
    @Input() data: any;
    title: CmText;
    text: CmText;

    constructor(private logger: NGXLogger) {
        this.logger.debug('TextComponent.constructor');
    }

    ngOnInit() {
        this.logger.debug('TextComponent.ngOnInit');
        this.loadComponent();
    }

    ngAfterViewInit() {
        this.logger.debug('TextComponent.ngAfterViewInit');
    }

    loadComponent() {
        this.logger.debug('TextComponent.loadComponent');
        this.data.module.texts.forEach((item) => {
            if (item.textType === 'TITLE') {
                this.title = item;
            } else if (item.textType === 'TEXT') {
                this.text = item;
            }
        });
    }

    onChange(publish) {
        this.data.module.texts.forEach((item) => {
            item.publish = publish;
        });
    }
}
