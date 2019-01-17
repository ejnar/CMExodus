import { Injectable } from '@angular/core';
import { HttpClient, HttpEvent, HttpRequest, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { JhiDateUtils } from 'ng-jhipster';

import { createRequestOption } from '../../shared';
import { CmImage } from '../cm-image/cm-image.model';

export type EntityResponseType = HttpResponse<CmImage>;

@Injectable()
export class CmUploadService {

    private resourceUrl =  SERVER_API_URL + 'api/cm-upload';

    constructor(private http: HttpClient, private dateUtils: JhiDateUtils) { }

    pushFileToStorage(file: File): Observable<HttpEvent<{}>> {
        const formdata: FormData = new FormData();
        formdata.append('file', file);
        const req = new HttpRequest('POST', this.resourceUrl, formdata, {
                reportProgress: true,
                responseType: 'text'
            }
        );
        return this.http.request(req);
    }

    upload(file: File): Observable<EntityResponseType> {
        const formdata: FormData = new FormData();
        formdata.append('file', file);
        return this.http.post<CmImage>(this.resourceUrl, formdata, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: CmImage = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to CmPage.
     */
    private convertItemFromServer(cmImage: CmImage): CmImage {
        const copy: CmImage = Object.assign({}, cmImage);
        return copy;
    }

}
