import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { CmTopicCm } from './cm-topic-cm.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<CmTopicCm>;

@Injectable()
export class CmTopicCmService {

    private resourceUrl =  SERVER_API_URL + 'api/cm-topics';

    constructor(private http: HttpClient) { }

    create(cmTopic: CmTopicCm): Observable<EntityResponseType> {
        const copy = this.convert(cmTopic);
        return this.http.post<CmTopicCm>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(cmTopic: CmTopicCm): Observable<EntityResponseType> {
        const copy = this.convert(cmTopic);
        return this.http.put<CmTopicCm>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<CmTopicCm>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<CmTopicCm[]>> {
        const options = createRequestOption(req);
        return this.http.get<CmTopicCm[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<CmTopicCm[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: CmTopicCm = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<CmTopicCm[]>): HttpResponse<CmTopicCm[]> {
        const jsonResponse: CmTopicCm[] = res.body;
        const body: CmTopicCm[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to CmTopicCm.
     */
    private convertItemFromServer(cmTopic: CmTopicCm): CmTopicCm {
        const copy: CmTopicCm = Object.assign({}, cmTopic);
        return copy;
    }

    /**
     * Convert a CmTopicCm to a JSON which can be sent to the server.
     */
    private convert(cmTopic: CmTopicCm): CmTopicCm {
        const copy: CmTopicCm = Object.assign({}, cmTopic);
        return copy;
    }
}
