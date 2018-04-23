import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { CmSubTopic } from './cm-sub-topic.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<CmSubTopic>;

@Injectable()
export class CmSubTopicService {

    private resourceUrl =  SERVER_API_URL + 'api/cm-sub-topics';

    constructor(private http: HttpClient) { }

    create(cmSubTopic: CmSubTopic): Observable<EntityResponseType> {
        const copy = this.convert(cmSubTopic);
        return this.http.post<CmSubTopic>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(cmSubTopic: CmSubTopic): Observable<EntityResponseType> {
        const copy = this.convert(cmSubTopic);
        return this.http.put<CmSubTopic>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<CmSubTopic>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<CmSubTopic[]>> {
        const options = createRequestOption(req);
        return this.http.get<CmSubTopic[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<CmSubTopic[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: CmSubTopic = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<CmSubTopic[]>): HttpResponse<CmSubTopic[]> {
        const jsonResponse: CmSubTopic[] = res.body;
        const body: CmSubTopic[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to CmSubTopic.
     */
    private convertItemFromServer(cmSubTopic: CmSubTopic): CmSubTopic {
        const copy: CmSubTopic = Object.assign({}, cmSubTopic);
        return copy;
    }

    /**
     * Convert a CmSubTopic to a JSON which can be sent to the server.
     */
    private convert(cmSubTopic: CmSubTopic): CmSubTopic {
        const copy: CmSubTopic = Object.assign({}, cmSubTopic);
        return copy;
    }
}
