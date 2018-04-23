import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { CmTopic } from './cm-topic.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<CmTopic>;

@Injectable()
export class CmTopicService {

    private resourceUrl =  SERVER_API_URL + 'api/cm-topics';

    constructor(private http: HttpClient) { }

    create(cmTopic: CmTopic): Observable<EntityResponseType> {
        const copy = this.convert(cmTopic);
        return this.http.post<CmTopic>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(cmTopic: CmTopic): Observable<EntityResponseType> {
        const copy = this.convert(cmTopic);
        return this.http.put<CmTopic>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<CmTopic>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<CmTopic[]>> {
        const options = createRequestOption(req);
        return this.http.get<CmTopic[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<CmTopic[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: CmTopic = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<CmTopic[]>): HttpResponse<CmTopic[]> {
        const jsonResponse: CmTopic[] = res.body;
        const body: CmTopic[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to CmTopic.
     */
    private convertItemFromServer(cmTopic: CmTopic): CmTopic {
        const copy: CmTopic = Object.assign({}, cmTopic);
        return copy;
    }

    /**
     * Convert a CmTopic to a JSON which can be sent to the server.
     */
    private convert(cmTopic: CmTopic): CmTopic {
        const copy: CmTopic = Object.assign({}, cmTopic);
        return copy;
    }
}
