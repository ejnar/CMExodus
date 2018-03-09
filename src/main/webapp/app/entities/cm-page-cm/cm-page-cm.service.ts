import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { CmPageCm } from './cm-page-cm.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<CmPageCm>;

@Injectable()
export class CmPageCmService {

    private resourceUrl =  SERVER_API_URL + 'api/cm-pages';

    constructor(private http: HttpClient) { }

    create(cmPage: CmPageCm): Observable<EntityResponseType> {
        const copy = this.convert(cmPage);
        return this.http.post<CmPageCm>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(cmPage: CmPageCm): Observable<EntityResponseType> {
        const copy = this.convert(cmPage);
        return this.http.put<CmPageCm>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<CmPageCm>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<CmPageCm[]>> {
        const options = createRequestOption(req);
        return this.http.get<CmPageCm[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<CmPageCm[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: CmPageCm = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<CmPageCm[]>): HttpResponse<CmPageCm[]> {
        const jsonResponse: CmPageCm[] = res.body;
        const body: CmPageCm[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to CmPageCm.
     */
    private convertItemFromServer(cmPage: CmPageCm): CmPageCm {
        const copy: CmPageCm = Object.assign({}, cmPage);
        return copy;
    }

    /**
     * Convert a CmPageCm to a JSON which can be sent to the server.
     */
    private convert(cmPage: CmPageCm): CmPageCm {
        const copy: CmPageCm = Object.assign({}, cmPage);
        return copy;
    }
}
