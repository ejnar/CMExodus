import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { CmModule } from '../../entities/cm-module/cm-module.model';
import { CmPage } from '../../entities/cm-page/cm-page.model';
import { CmPageAuthority } from '../../entities/cm-page-authority/cm-page-authority.model';
import { createRequestOption } from '../../shared';

export type EntityPageResponseType = HttpResponse<CmPage>;
export type EntityModuleResponseType = HttpResponse<CmModule[]>;
export type EntityPageAuthResponseType = HttpResponse<CmPageAuthority[]>;

@Injectable()
export class ExtendedPageService {

    private resourceUrl =  SERVER_API_URL + 'api/cm-pages';
    private resourceModuleUrl =  SERVER_API_URL + 'api/cm-modules';
    private resourcePageAuthUrl = SERVER_API_URL + 'api/cm-page-authorities';

    constructor(private http: HttpClient) { }

    findResources(id: number) {
        const urlPage = this.http.get<CmPage>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityPageResponseType) => this.convertPageResponse(res));

        const urlModule = this.http.get<CmModule[]>(this.resourceModuleUrl, { observe: 'response' })
            .map((res: EntityModuleResponseType) => this.convertModuleArrayResponse(res));

        // const urlPageAuth = this.http.get<CmPageAuthority[]>(`${this.resourcePageAuthUrl}/${id}`, { observe: 'response'})
        //    .map((res: EntityPageAuthResponseType) => this.convertPageAuthResponse(res));

        return Observable.forkJoin([urlPage, urlModule]);
    }

    private convertPageResponse(res: EntityPageResponseType): EntityPageResponseType {
        const body: CmPage = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertModuleArrayResponse(res: EntityModuleResponseType): EntityModuleResponseType {
        const jsonResponse: CmModule[] = res.body;
        const body: CmModule[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemModuleFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    private convertPageAuthResponse(res: EntityPageAuthResponseType): EntityPageAuthResponseType {
        const jsonResponse: CmPageAuthority[] = res.body;
        const body: CmPageAuthority[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertPageAuthFromServer(jsonResponse[i]));
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

    private convertItemModuleFromServer(cmModule: CmModule): CmModule {
        const copy: CmModule = Object.assign({}, cmModule);
        return copy;
    }

    private convertPageAuthFromServer(cmPageAuthority: CmPageAuthority): CmPageAuthority {
        const copy: CmPageAuthority = Object.assign({}, cmPageAuthority);
        return copy;
    }
}
