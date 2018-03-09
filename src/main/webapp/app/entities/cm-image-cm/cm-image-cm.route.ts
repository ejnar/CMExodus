import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil } from 'ng-jhipster';

import { UserRouteAccessService } from '../../shared';
import { CmImageCmComponent } from './cm-image-cm.component';
import { CmImageCmDetailComponent } from './cm-image-cm-detail.component';
import { CmImageCmPopupComponent } from './cm-image-cm-dialog.component';
import { CmImageCmDeletePopupComponent } from './cm-image-cm-delete-dialog.component';

@Injectable()
export class CmImageCmResolvePagingParams implements Resolve<any> {

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
        path: 'cm-image-cm',
        component: CmImageCmComponent,
        resolve: {
            'pagingParams': CmImageCmResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'cmExodusApp.cmImage.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'cm-image-cm/:id',
        component: CmImageCmDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'cmExodusApp.cmImage.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const cmImagePopupRoute: Routes = [
    {
        path: 'cm-image-cm-new',
        component: CmImageCmPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'cmExodusApp.cmImage.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'cm-image-cm/:id/edit',
        component: CmImageCmPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'cmExodusApp.cmImage.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'cm-image-cm/:id/delete',
        component: CmImageCmDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'cmExodusApp.cmImage.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
