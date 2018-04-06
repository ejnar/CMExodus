import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { JhiDateUtils } from 'ng-jhipster';

import { CmImageCm } from './cm-image-cm.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<CmImageCm>;

@Injectable()
export class CmImageCmService {

    private resourceUrl =  SERVER_API_URL + 'api/cm-images';

    constructor(private http: HttpClient, private dateUtils: JhiDateUtils) { }

    create(cmImage: CmImageCm): Observable<EntityResponseType> {
        const copy = this.convert(cmImage);
        return this.http.post<CmImageCm>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(cmImage: CmImageCm): Observable<EntityResponseType> {
        const copy = this.convert(cmImage);
        return this.http.put<CmImageCm>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<CmImageCm>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<CmImageCm[]>> {
        const options = createRequestOption(req);
        return this.http.get<CmImageCm[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<CmImageCm[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: CmImageCm = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<CmImageCm[]>): HttpResponse<CmImageCm[]> {
        const jsonResponse: CmImageCm[] = res.body;
        const body: CmImageCm[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to CmImageCm.
     */
    private convertItemFromServer(cmImage: CmImageCm): CmImageCm {
        const copy: CmImageCm = Object.assign({}, cmImage);
        copy.publishDate = this.dateUtils
            .convertLocalDateFromServer(cmImage.publishDate);
        return copy;
    }

    /**
     * Convert a CmImageCm to a JSON which can be sent to the server.
     */
    private convert(cmImage: CmImageCm): CmImageCm {
        const copy: CmImageCm = Object.assign({}, cmImage);
        copy.publishDate = this.dateUtils
            .convertLocalDateToServer(cmImage.publishDate);
        return copy;
    }
}
