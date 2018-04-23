import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil } from 'ng-jhipster';

import { UserRouteAccessService } from '../../shared';
import { CmPageComponent } from './cm-page.component';
import { CmPageDetailComponent } from './cm-page-detail.component';
import { CmPagePopupComponent } from './cm-page-dialog.component';
import { CmPageDeletePopupComponent } from './cm-page-delete-dialog.component';

@Injectable()
export class CmPageResolvePagingParams implements Resolve<any> {

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
        path: 'cm-page',
        component: CmPageComponent,
        resolve: {
            'pagingParams': CmPageResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'cmExodusApp.cmPage.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'cm-page/:id',
        component: CmPageDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'cmExodusApp.cmPage.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const cmPagePopupRoute: Routes = [
    {
        path: 'cm-page-new',
        component: CmPagePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'cmExodusApp.cmPage.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'cm-page/:id/edit',
        component: CmPagePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'cmExodusApp.cmPage.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'cm-page/:id/delete',
        component: CmPageDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'cmExodusApp.cmPage.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
