import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';
import { JhiDateUtils } from 'ng-jhipster';
import { NGXLogger } from 'ngx-logger';
import { CmModule } from './cm-module.model';
import { createRequestOption } from '../../shared';
import { CmItemList } from '../cm-item-list/cm-item-list.model';
export type EntityResponseType = HttpResponse<CmModule>;

@Injectable()
export class CmModuleService {

    private resourceUrl =  SERVER_API_URL + 'api/cm-modules';

    constructor(private dateUtils: JhiDateUtils, private http: HttpClient, private logger: NGXLogger) { }

    create(cmModule: CmModule): Observable<EntityResponseType> {
        const copy = this.convert(cmModule);
        return this.http.post<CmModule>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(cmModule: CmModule): Observable<EntityResponseType> {
        const copy = this.convert(cmModule);
        return this.http.put<CmModule>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<CmModule>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<CmModule[]>> {
        const options = createRequestOption(req);
        return this.http.get<CmModule[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<CmModule[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: CmModule = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<CmModule[]>): HttpResponse<CmModule[]> {
        const jsonResponse: CmModule[] = res.body;
        const body: CmModule[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to CmModule.
     */
    private convertItemFromServer(cmModule: CmModule): CmModule {
        const copy: CmModule = Object.assign({}, cmModule);
        return copy;
    }

    /**
     * Convert a CmModule to a JSON which can be sent to the server.
     */
    private convert(cmModule: CmModule): CmModule {
        const copy: CmModule = Object.assign({}, cmModule);

        copy.itemLists = [];
        for (let i = 0; i < cmModule.itemLists.length; i++) {
            const cmItemList = this.convertItemList(cmModule.itemLists[i]);
            copy.itemLists.push(cmItemList);
        }
        this.logger.debug(copy);
        return copy;
    }

    /**
     * Convert a CmItemList to a JSON which can be sent to the server.
     */
    private convertItemList(cmItemList: CmItemList): CmItemList {
        const copy: CmItemList = Object.assign({}, cmItemList);

        copy.itemDate = this.dateUtils.toDate(cmItemList.itemDate);
        copy.publishDate = this.dateUtils
            .convertLocalDateToServer(cmItemList.publishDate);
        return copy;
    }
}
