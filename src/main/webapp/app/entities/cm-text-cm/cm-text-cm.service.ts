import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { JhiDateUtils } from 'ng-jhipster';

import { CmTextCm } from './cm-text-cm.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<CmTextCm>;

@Injectable()
export class CmTextCmService {

    private resourceUrl =  SERVER_API_URL + 'api/cm-texts';

    constructor(private http: HttpClient, private dateUtils: JhiDateUtils) { }

    create(cmText: CmTextCm): Observable<EntityResponseType> {
        const copy = this.convert(cmText);
        return this.http.post<CmTextCm>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(cmText: CmTextCm): Observable<EntityResponseType> {
        const copy = this.convert(cmText);
        return this.http.put<CmTextCm>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<CmTextCm>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<CmTextCm[]>> {
        const options = createRequestOption(req);
        return this.http.get<CmTextCm[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<CmTextCm[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: CmTextCm = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<CmTextCm[]>): HttpResponse<CmTextCm[]> {
        const jsonResponse: CmTextCm[] = res.body;
        const body: CmTextCm[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to CmTextCm.
     */
    private convertItemFromServer(cmText: CmTextCm): CmTextCm {
        const copy: CmTextCm = Object.assign({}, cmText);
        copy.date = this.dateUtils
            .convertLocalDateFromServer(cmText.date);
        copy.publishDate = this.dateUtils
            .convertLocalDateFromServer(cmText.publishDate);
        return copy;
    }

    /**
     * Convert a CmTextCm to a JSON which can be sent to the server.
     */
    private convert(cmText: CmTextCm): CmTextCm {
        const copy: CmTextCm = Object.assign({}, cmText);
        copy.date = this.dateUtils
            .convertLocalDateToServer(cmText.date);
        copy.publishDate = this.dateUtils
            .convertLocalDateToServer(cmText.publishDate);
        return copy;
    }
}
