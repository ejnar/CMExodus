import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../app.constants';
import { NGXLogger } from 'ngx-logger';

import { ContentItem } from './content-item';

import { HeroJobContentComponent } from './modules/herojob/hero-job-content.component';
import { HeroProfileComponent } from './modules/heroprofile/hero-profile.component';
import { ProgramListComponent } from './modules/programList/program-list.component';

@Injectable()
export class ContentService {

    constructor(private http: HttpClient, private logger: NGXLogger) {}

    getContent(page: String) {
        this.logger.info(' ------------------------- Your log message goes here ' + page);
        return [
            new ContentItem(ProgramListComponent, {name: 'Program List' }),
            new ContentItem(HeroProfileComponent, {name: 'Bombasto', bio: 'Brave as they come'}),
            new ContentItem(HeroProfileComponent, {name: 'Dr IQ', bio: 'Smart as they come'}),
            new ContentItem(HeroJobContentComponent,   {headline: 'Hiring for several positions',
                                            body: 'Submit your resume today!'}),
            new ContentItem(HeroJobContentComponent,   {headline: 'Openings in all departments',
                                            body: 'Apply today'}),
        ];
    }
}
