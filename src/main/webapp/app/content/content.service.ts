import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../app.constants';
import { NGXLogger } from 'ngx-logger';

import { CmPageCm } from '../entities/cm-page-cm/cm-page-cm.model';
import { CmPageCmService } from '../entities/cm-page-cm/cm-page-cm.service';

import { ContentItem } from './content-item';

import { HeroJobContentComponent } from './modules/herojob/hero-job-content.component';
import { HeroProfileComponent } from './modules/heroprofile/hero-profile.component';
import { ProgramListComponent } from './modules/programList/program-list.component';

@Injectable()
export class ContentService {
    private resourceUrl =  SERVER_API_URL + 'api/cm-pages';
    private results: ContentItem[];

    constructor(private http: HttpClient, private logger: NGXLogger, private cmPageService: CmPageCmService ) {}

    getContent(pageId: number): Promise<ContentItem[]> {
        this.logger.debug(' --- ContentService.getContent: pageId=' + pageId);
        return new Promise<ContentItem[]> ((resolve, reject) => {
            this.http.get(`${this.resourceUrl}/${pageId}`)
              .toPromise()
              .then( (res) => { // Success
                    this.onSuccess(res);
                    resolve(this.results);
              },
                  (msg) => { // Error
                    reject(msg);
                  }
              );
        });
        // return [ new ContentItem(ProgramListComponent, {test: 'testData', list: [{name: 'Program List1' }, {name: 'Program List2' }]}) ];
    }

    private onSuccess(data) {
        this.logger.debug(data);
        this.results = new Array<ContentItem>();
        data.modules.forEach((module) => {
            if (module.moduleType === 'PROGRAM_LIST') {
                this.results.push(new ContentItem(ProgramListComponent, {type: module.moduleType, layout: module.layout, itemList: module.itemLists} ));
            } else if (module.moduleType === 'TEXT') {
                this.logger.debug(module);
            }
        });
    }
}
