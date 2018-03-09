import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { CmSubTopicCm } from './cm-sub-topic-cm.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<CmSubTopicCm>;

@Injectable()
export class CmSubTopicCmService {

    private resourceUrl =  SERVER_API_URL + 'api/cm-sub-topics';

    constructor(private http: HttpClient) { }

    create(cmSubTopic: CmSubTopicCm): Observable<EntityResponseType> {
        const copy = this.convert(cmSubTopic);
        return this.http.post<CmSubTopicCm>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(cmSubTopic: CmSubTopicCm): Observable<EntityResponseType> {
        const copy = this.convert(cmSubTopic);
        return this.http.put<CmSubTopicCm>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<CmSubTopicCm>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<CmSubTopicCm[]>> {
        const options = createRequestOption(req);
        return this.http.get<CmSubTopicCm[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<CmSubTopicCm[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: CmSubTopicCm = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<CmSubTopicCm[]>): HttpResponse<CmSubTopicCm[]> {
        const jsonResponse: CmSubTopicCm[] = res.body;
        const body: CmSubTopicCm[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to CmSubTopicCm.
     */
    private convertItemFromServer(cmSubTopic: CmSubTopicCm): CmSubTopicCm {
        const copy: CmSubTopicCm = Object.assign({}, cmSubTopic);
        return copy;
    }

    /**
     * Convert a CmSubTopicCm to a JSON which can be sent to the server.
     */
    private convert(cmSubTopic: CmSubTopicCm): CmSubTopicCm {
        const copy: CmSubTopicCm = Object.assign({}, cmSubTopic);
        return copy;
    }
}
