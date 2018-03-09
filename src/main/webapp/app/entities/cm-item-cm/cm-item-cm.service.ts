import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { JhiDateUtils } from 'ng-jhipster';

import { CmItemCm } from './cm-item-cm.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<CmItemCm>;

@Injectable()
export class CmItemCmService {

    private resourceUrl =  SERVER_API_URL + 'api/cm-items';

    constructor(private http: HttpClient, private dateUtils: JhiDateUtils) { }

    create(cmItem: CmItemCm): Observable<EntityResponseType> {
        const copy = this.convert(cmItem);
        return this.http.post<CmItemCm>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(cmItem: CmItemCm): Observable<EntityResponseType> {
        const copy = this.convert(cmItem);
        return this.http.put<CmItemCm>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<CmItemCm>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<CmItemCm[]>> {
        const options = createRequestOption(req);
        return this.http.get<CmItemCm[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<CmItemCm[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: CmItemCm = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<CmItemCm[]>): HttpResponse<CmItemCm[]> {
        const jsonResponse: CmItemCm[] = res.body;
        const body: CmItemCm[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to CmItemCm.
     */
    private convertItemFromServer(cmItem: CmItemCm): CmItemCm {
        const copy: CmItemCm = Object.assign({}, cmItem);
        copy.date = this.dateUtils
            .convertLocalDateFromServer(cmItem.date);
        return copy;
    }

    /**
     * Convert a CmItemCm to a JSON which can be sent to the server.
     */
    private convert(cmItem: CmItemCm): CmItemCm {
        const copy: CmItemCm = Object.assign({}, cmItem);
        copy.date = this.dateUtils
            .convertLocalDateToServer(cmItem.date);
        return copy;
    }
}
