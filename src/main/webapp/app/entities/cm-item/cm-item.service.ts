import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { JhiDateUtils } from 'ng-jhipster';

import { CmItem } from './cm-item.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<CmItem>;

@Injectable()
export class CmItemService {

    private resourceUrl =  SERVER_API_URL + 'api/cm-items';

    constructor(private http: HttpClient, private dateUtils: JhiDateUtils) { }

    create(cmItem: CmItem): Observable<EntityResponseType> {
        const copy = this.convert(cmItem);
        return this.http.post<CmItem>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(cmItem: CmItem): Observable<EntityResponseType> {
        const copy = this.convert(cmItem);
        return this.http.put<CmItem>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<CmItem>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<CmItem[]>> {
        const options = createRequestOption(req);
        return this.http.get<CmItem[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<CmItem[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: CmItem = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<CmItem[]>): HttpResponse<CmItem[]> {
        const jsonResponse: CmItem[] = res.body;
        const body: CmItem[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to CmItem.
     */
    private convertItemFromServer(cmItem: CmItem): CmItem {
        const copy: CmItem = Object.assign({}, cmItem);
        copy.itemDate = this.dateUtils
            .convertDateTimeFromServer(cmItem.itemDate);
        copy.publishDate = this.dateUtils
            .convertLocalDateFromServer(cmItem.publishDate);
        return copy;
    }

    /**
     * Convert a CmItem to a JSON which can be sent to the server.
     */
    private convert(cmItem: CmItem): CmItem {
        const copy: CmItem = Object.assign({}, cmItem);

        copy.itemDate = this.dateUtils.toDate(cmItem.itemDate);
        copy.publishDate = this.dateUtils
            .convertLocalDateToServer(cmItem.publishDate);
        return copy;
    }
}
