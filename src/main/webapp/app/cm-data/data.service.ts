import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../app.constants';
import { NGXLogger } from 'ngx-logger';

import { ContentItem } from '../content/content-item';

import { Page } from './modules/model/page.model';
import { ProgramListComponent } from './modules/programList/program-list.component';
import { TextComponent } from './modules/text/text.component';
import { TextImageComponent } from './modules/textImage/text-image.component';
import { TextListComponent } from './modules/textList/text-list.component';
import { ImageComponent } from './modules/image/image.component';

import { CmText, TextType } from '../entities/cm-text/cm-text.model';

@Injectable()
export class DataService {
    private resourceUrl =  SERVER_API_URL + 'api/cm-pages';
    constructor(private http: HttpClient, private logger: NGXLogger ) {}

    getContent(pageId: number): Promise<Page> {
        this.logger.debug(' --- ContentService.getContent: pageId=' + pageId);
        if (!pageId) {
            return;
        }

        return new Promise<Page> ((resolve, reject) => {
            this.http.get(`${this.resourceUrl}/${pageId}`)
              .toPromise()
              .then( (res) => { // Success
                    resolve(this.onSuccess(res));
              },
                  (msg) => { // Error
                    reject(msg);
                  }
              );
        });
        // return [ new ContentItem(ProgramListComponent, {test: 'testData', list: [{name: 'Program List1' }, {name: 'Program List2' }]}) ];
    }

    private onSuccess(data) {
        this.logger.debug(' onSuccess ');
        const page = new Page(data.id, data.titleSv, data.titleEn, data.pageLayout, new Array<ContentItem>());
        page.metaTitle = data.metaTitle;
        page.metaDescription = data.metaDescription;
        // const page = Object.assign({}, data);
        data.modules.forEach((_module) => {
            this.logger.debug(_module);
            if (_module.moduleType === 'TEXT') {
                page.items.push(new ContentItem(TextComponent, {type: _module.moduleType, module: _module} ));
            } else if (_module.moduleType === 'TEXT_LIST') {
                page.items.push(new ContentItem(TextListComponent, {type: _module.moduleType, module: _module} ));
            } else if (_module.moduleType === 'TEXT_IMAGE') {
                page.items.push(new ContentItem(TextImageComponent, {type: _module.moduleType, module: _module} ));
            } else if (_module.moduleType === 'PROGRAM_LIST') {
                page.items.push(new ContentItem(ProgramListComponent, {type: _module.moduleType, module: _module} ));
            }else if (_module.moduleType === 'IMAGE') {
                this.logger.debug('Type IMAGE is not supported yet');
                page.items.push(new ContentItem(ImageComponent, {type: _module.moduleType, module: _module} ));
            }
        });
        this.logger.debug(page);
        return page;
    }

    createTextComponent(module) {
        this.logger.debug('TextComponent.createComponent');
        if (true) {
            const title = new CmText();
            title.textSv = '';
            title.textEn = '';
            title.textType = TextType.TITLE;
            module.texts.push(title);

            const text = new CmText();
            text.textSv = '';
            text.textEn = '';
            text.textType = TextType.TEXT;
            module.texts.push(text);
        }
    }
}
