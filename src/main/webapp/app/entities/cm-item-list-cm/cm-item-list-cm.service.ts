import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { JhiDateUtils } from 'ng-jhipster';

import { CmItemListCm } from './cm-item-list-cm.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<CmItemListCm>;

@Injectable()
export class CmItemListCmService {

    private resourceUrl =  SERVER_API_URL + 'api/cm-item-lists';

    constructor(private http: HttpClient, private dateUtils: JhiDateUtils) { }

    create(cmItemList: CmItemListCm): Observable<EntityResponseType> {
        const copy = this.convert(cmItemList);
        return this.http.post<CmItemListCm>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(cmItemList: CmItemListCm): Observable<EntityResponseType> {
        const copy = this.convert(cmItemList);
        return this.http.put<CmItemListCm>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<CmItemListCm>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<CmItemListCm[]>> {
        const options = createRequestOption(req);
        return this.http.get<CmItemListCm[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<CmItemListCm[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: CmItemListCm = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<CmItemListCm[]>): HttpResponse<CmItemListCm[]> {
        const jsonResponse: CmItemListCm[] = res.body;
        const body: CmItemListCm[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to CmItemListCm.
     */
    private convertItemFromServer(cmItemList: CmItemListCm): CmItemListCm {
        const copy: CmItemListCm = Object.assign({}, cmItemList);
        copy.itemDate = this.dateUtils
            .convertDateTimeFromServer(cmItemList.itemDate);
        copy.publishDate = this.dateUtils
            .convertLocalDateFromServer(cmItemList.publishDate);
        return copy;
    }

    /**
     * Convert a CmItemListCm to a JSON which can be sent to the server.
     */
    private convert(cmItemList: CmItemListCm): CmItemListCm {
        const copy: CmItemListCm = Object.assign({}, cmItemList);

        copy.itemDate = this.dateUtils.toDate(cmItemList.itemDate);
        copy.publishDate = this.dateUtils
            .convertLocalDateToServer(cmItemList.publishDate);
        return copy;
    }
}
