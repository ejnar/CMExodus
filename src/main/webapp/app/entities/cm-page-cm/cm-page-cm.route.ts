import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil } from 'ng-jhipster';

import { UserRouteAccessService } from '../../shared';
import { CmPageCmComponent } from './cm-page-cm.component';
import { CmPageCmDetailComponent } from './cm-page-cm-detail.component';
import { CmPageCmPopupComponent } from './cm-page-cm-dialog.component';
import { CmPageCmDeletePopupComponent } from './cm-page-cm-delete-dialog.component';

@Injectable()
export class CmPageCmResolvePagingParams implements Resolve<any> {

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

export const cmPageRoute: Routes = [
    {
        path: 'cm-page-cm',
        component: CmPageCmComponent,
        resolve: {
            'pagingParams': CmPageCmResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'cmExodusApp.cmPage.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'cm-page-cm/:id',
        component: CmPageCmDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'cmExodusApp.cmPage.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const cmPagePopupRoute: Routes = [
    {
        path: 'cm-page-cm-new',
        component: CmPageCmPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'cmExodusApp.cmPage.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'cm-page-cm/:id/edit',
        component: CmPageCmPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'cmExodusApp.cmPage.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'cm-page-cm/:id/delete',
        component: CmPageCmDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'cmExodusApp.cmPage.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
