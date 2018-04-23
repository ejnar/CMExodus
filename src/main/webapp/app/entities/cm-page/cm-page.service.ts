import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { CmPage } from './cm-page.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<CmPage>;

@Injectable()
export class CmPageService {

    private resourceUrl =  SERVER_API_URL + 'api/cm-pages';

    constructor(private http: HttpClient) { }

    create(cmPage: CmPage): Observable<EntityResponseType> {
        const copy = this.convert(cmPage);
        return this.http.post<CmPage>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(cmPage: CmPage): Observable<EntityResponseType> {
        const copy = this.convert(cmPage);
        return this.http.put<CmPage>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<CmPage>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    findByUser(): Observable<HttpResponse<CmPage[]>> {
        return this.http.get<CmPage[]>(`${this.resourceUrl}/user`, { observe: 'response'})
            .map((res: HttpResponse<CmPage[]>) => this.convertArrayResponse(res));
    }

    query(req?: any): Observable<HttpResponse<CmPage[]>> {
        const options = createRequestOption(req);
        return this.http.get<CmPage[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<CmPage[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: CmPage = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<CmPage[]>): HttpResponse<CmPage[]> {
        const jsonResponse: CmPage[] = res.body;
        const body: CmPage[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to CmPage.
     */
    private convertItemFromServer(cmPage: CmPage): CmPage {
        const copy: CmPage = Object.assign({}, cmPage);
        return copy;
    }

    /**
     * Convert a CmPage to a JSON which can be sent to the server.
     */
    private convert(cmPage: CmPage): CmPage {
        const copy: CmPage = Object.assign({}, cmPage);
        return copy;
    }
}
