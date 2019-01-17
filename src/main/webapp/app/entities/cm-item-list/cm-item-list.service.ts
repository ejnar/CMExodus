import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';
import { NGXLogger } from 'ngx-logger';
import { JhiDateUtils } from 'ng-jhipster';

import { CmItemList } from './cm-item-list.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<CmItemList>;

@Injectable()
export class CmItemListService {

    private resourceUrl =  SERVER_API_URL + 'api/cm-item-lists';

    constructor(private http: HttpClient, private dateUtils: JhiDateUtils, private logger: NGXLogger) { }

    create(cmItemList: CmItemList): Observable<EntityResponseType> {
        const copy = this.convert(cmItemList);
        return this.http.post<CmItemList>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(cmItemList: CmItemList): Observable<EntityResponseType> {
        const copy = this.convert(cmItemList);
        return this.http.put<CmItemList>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<CmItemList>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<CmItemList[]>> {
        const options = createRequestOption(req);
        return this.http.get<CmItemList[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<CmItemList[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: CmItemList = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<CmItemList[]>): HttpResponse<CmItemList[]> {
        const jsonResponse: CmItemList[] = res.body;
        const body: CmItemList[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to CmItemList.
     */
    private convertItemFromServer(cmItemList: CmItemList): CmItemList {
        const copy: CmItemList = Object.assign({}, cmItemList);
        copy.itemDate = this.dateUtils
            .convertDateTimeFromServer(cmItemList.itemDate);
        copy.publishDate = this.dateUtils
            .convertLocalDateFromServer(cmItemList.publishDate);
        return copy;
    }

    /**
     * Convert a CmItemList to a JSON which can be sent to the server.
     */
    private convert(cmItemList: CmItemList): CmItemList {
        const copy: CmItemList = Object.assign({}, cmItemList);

        copy.itemDate = this.dateUtils.toDate(cmItemList.itemDate);
        copy.publishDate = this.dateUtils
            .convertLocalDateToServer(cmItemList.publishDate);

        this.logger.debug(copy);
        return copy;
    }
}
