import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { JhiDateUtils } from 'ng-jhipster';

import { CmImage } from './cm-image.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<CmImage>;

@Injectable()
export class CmImageService {

    private resourceUrl =  SERVER_API_URL + 'api/cm-images';

    constructor(private http: HttpClient, private dateUtils: JhiDateUtils) { }

    create(cmImage: CmImage): Observable<EntityResponseType> {
        const copy = this.convert(cmImage);
        return this.http.post<CmImage>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(cmImage: CmImage): Observable<EntityResponseType> {
        const copy = this.convert(cmImage);
        return this.http.put<CmImage>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<CmImage>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<CmImage[]>> {
        const options = createRequestOption(req);
        return this.http.get<CmImage[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<CmImage[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: CmImage = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<CmImage[]>): HttpResponse<CmImage[]> {
        const jsonResponse: CmImage[] = res.body;
        const body: CmImage[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to CmImage.
     */
    private convertItemFromServer(cmImage: CmImage): CmImage {
        const copy: CmImage = Object.assign({}, cmImage);
        copy.publishDate = this.dateUtils
            .convertLocalDateFromServer(cmImage.publishDate);
        return copy;
    }

    /**
     * Convert a CmImage to a JSON which can be sent to the server.
     */
    private convert(cmImage: CmImage): CmImage {
        const copy: CmImage = Object.assign({}, cmImage);
        copy.publishDate = this.dateUtils
            .convertLocalDateToServer(cmImage.publishDate);
        return copy;
    }
}
