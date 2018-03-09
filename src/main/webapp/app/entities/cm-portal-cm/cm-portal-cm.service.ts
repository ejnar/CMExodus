import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { CmPortalCm } from './cm-portal-cm.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<CmPortalCm>;

@Injectable()
export class CmPortalCmService {

    private resourceUrl =  SERVER_API_URL + 'api/cm-portals';

    constructor(private http: HttpClient) { }

    create(cmPortal: CmPortalCm): Observable<EntityResponseType> {
        const copy = this.convert(cmPortal);
        return this.http.post<CmPortalCm>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(cmPortal: CmPortalCm): Observable<EntityResponseType> {
        const copy = this.convert(cmPortal);
        return this.http.put<CmPortalCm>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<CmPortalCm>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<CmPortalCm[]>> {
        const options = createRequestOption(req);
        return this.http.get<CmPortalCm[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<CmPortalCm[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: CmPortalCm = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<CmPortalCm[]>): HttpResponse<CmPortalCm[]> {
        const jsonResponse: CmPortalCm[] = res.body;
        const body: CmPortalCm[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to CmPortalCm.
     */
    private convertItemFromServer(cmPortal: CmPortalCm): CmPortalCm {
        const copy: CmPortalCm = Object.assign({}, cmPortal);
        return copy;
    }

    /**
     * Convert a CmPortalCm to a JSON which can be sent to the server.
     */
    private convert(cmPortal: CmPortalCm): CmPortalCm {
        const copy: CmPortalCm = Object.assign({}, cmPortal);
        return copy;
    }
}
