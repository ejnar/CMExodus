import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { CmPageAuthority } from './cm-page-authority.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<CmPageAuthority>;

@Injectable()
export class CmPageAuthorityService {

    private resourceUrl =  SERVER_API_URL + 'api/cm-page-authorities';

    constructor(private http: HttpClient) { }

    create(cmPageAuthority: CmPageAuthority): Observable<EntityResponseType> {
        const copy = this.convert(cmPageAuthority);
        return this.http.post<CmPageAuthority>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(cmPageAuthority: CmPageAuthority): Observable<EntityResponseType> {
        const copy = this.convert(cmPageAuthority);
        return this.http.put<CmPageAuthority>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<CmPageAuthority>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<CmPageAuthority[]>> {
        const options = createRequestOption(req);
        return this.http.get<CmPageAuthority[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<CmPageAuthority[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: CmPageAuthority = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<CmPageAuthority[]>): HttpResponse<CmPageAuthority[]> {
        const jsonResponse: CmPageAuthority[] = res.body;
        const body: CmPageAuthority[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to CmPageAuthority.
     */
    private convertItemFromServer(cmPageAuthority: CmPageAuthority): CmPageAuthority {
        const copy: CmPageAuthority = Object.assign({}, cmPageAuthority);
        return copy;
    }

    /**
     * Convert a CmPageAuthority to a JSON which can be sent to the server.
     */
    private convert(cmPageAuthority: CmPageAuthority): CmPageAuthority {
        const copy: CmPageAuthority = Object.assign({}, cmPageAuthority);
        return copy;
    }
}
