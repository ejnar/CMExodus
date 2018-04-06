import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';
import { Topic } from '../model/topic.model';

@Injectable()
export class NavbarService {
    constructor(private http: HttpClient) {}

    getAny(): Observable<any> {
        return this.http.get(SERVER_API_URL + 'api/cm-topics', {observe : 'response'});
    }

    get(): Observable<HttpResponse<Topic>> {
        return this.http.get<Topic>(SERVER_API_URL + 'api/cm-topics', {observe : 'response'});
    }
}
