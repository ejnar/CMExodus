import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../app.constants';
import { NGXLogger } from 'ngx-logger';

import { ContentItem } from './content-item';
import { Page } from './modules/model/page.model';

import { ProgramListComponent } from './modules/programList/program-list.component';
import { TextComponent } from './modules/text/text.component';
import { TextImageComponent } from './modules/textImage/text-image.component';
import { TextListComponent } from './modules/textList/text-list.component';

@Injectable()
export class ContentService {
    private resourceUrl =  SERVER_API_URL + 'api/cm-pages';
    constructor(private http: HttpClient, private logger: NGXLogger ) {}

    getContent(pageId: number): Promise<Page> {
        this.logger.debug(' --- ContentService.getContent: pageId=' + pageId);
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
        const page = new Page(data.titleSv, data.titleEn, data.pageLayout, new Array<ContentItem>());
        page.metaTitle = data.metaTitle;
        page.metaDescription = data.metaDescription;
        data.modules.forEach((module) => {
            if (module.moduleType === 'PROGRAM_LIST') {
                page.items.push(new ContentItem(ProgramListComponent, {type: module.moduleType, layout: module.layout, itemList: module.itemLists} ));
            } else if (module.moduleType === 'TEXT') {
                page.items.push(new ContentItem(TextComponent, {type: module.moduleType, layout: module.layout, texts: module.texts} ));
            } else if (module.moduleType === 'TEXT_IMAGE') {
                page.items.push(new ContentItem(TextImageComponent, {type: module.moduleType, layout: module.layout, texts: module.texts} ));
            } else if (module.moduleType === 'TEXT_LIST') {
                page.items.push(new ContentItem(TextListComponent, {type: module.moduleType, layout: module.layout, texts: module.texts} ));
            }
        });
        return page;
    }
}
