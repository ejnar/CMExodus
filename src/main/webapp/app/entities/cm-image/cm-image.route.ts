import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil } from 'ng-jhipster';

import { UserRouteAccessService } from '../../shared';
import { CmImageComponent } from './cm-image.component';
import { CmImageDetailComponent } from './cm-image-detail.component';
import { CmImagePopupComponent } from './cm-image-dialog.component';
import { CmImageDeletePopupComponent } from './cm-image-delete-dialog.component';

@Injectable()
export class CmImageResolvePagingParams implements Resolve<any> {

    constructor(private paginationUtil: JhiPaginationUtil) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const page = route.queryParams['page'] ? route.queryParams['page'] : '1';
        const sort = route.queryParams['sort'] ? route.queryParams['sort'] : 'id,asc';
        return {
            page: this.paginationUtil.parsePage(page),
            predicate: this.paginationUtil.parsePredicate(sort),
            ascending: this.paginationUtil.parseAscending(sort)
      };
    }
}

export const cmImageRoute: Routes = [
    {
        path: 'cm-image',
        component: CmImageComponent,
        resolve: {
            'pagingParams': CmImageResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'cmExodusApp.cmImage.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'cm-image/:id',
        component: CmImageDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'cmExodusApp.cmImage.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const cmImagePopupRoute: Routes = [
    {
        path: 'cm-image-new',
        component: CmImagePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'cmExodusApp.cmImage.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'cm-image/:id/edit',
        component: CmImagePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'cmExodusApp.cmImage.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'cm-image/:id/delete',
        component: CmImageDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'cmExodusApp.cmImage.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
