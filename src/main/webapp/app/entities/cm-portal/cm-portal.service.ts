import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { CmPortal } from './cm-portal.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<CmPortal>;

@Injectable()
export class CmPortalService {

    private resourceUrl =  SERVER_API_URL + 'api/cm-portals';

    constructor(private http: HttpClient) { }

    create(cmPortal: CmPortal): Observable<EntityResponseType> {
        const copy = this.convert(cmPortal);
        return this.http.post<CmPortal>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(cmPortal: CmPortal): Observable<EntityResponseType> {
        const copy = this.convert(cmPortal);
        return this.http.put<CmPortal>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<CmPortal>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<CmPortal[]>> {
        const options = createRequestOption(req);
        return this.http.get<CmPortal[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<CmPortal[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: CmPortal = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<CmPortal[]>): HttpResponse<CmPortal[]> {
        const jsonResponse: CmPortal[] = res.body;
        const body: CmPortal[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to CmPortal.
     */
    private convertItemFromServer(cmPortal: CmPortal): CmPortal {
        const copy: CmPortal = Object.assign({}, cmPortal);
        return copy;
    }

    /**
     * Convert a CmPortal to a JSON which can be sent to the server.
     */
    private convert(cmPortal: CmPortal): CmPortal {
        const copy: CmPortal = Object.assign({}, cmPortal);
        return copy;
    }
}
