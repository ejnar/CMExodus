import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil } from 'ng-jhipster';

import { UserRouteAccessService } from '../../shared';
import { CmTextCmComponent } from './cm-text-cm.component';
import { CmTextCmDetailComponent } from './cm-text-cm-detail.component';
import { CmTextCmPopupComponent } from './cm-text-cm-dialog.component';
import { CmTextCmDeletePopupComponent } from './cm-text-cm-delete-dialog.component';

@Injectable()
export class CmTextCmResolvePagingParams implements Resolve<any> {

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

export const cmTextRoute: Routes = [
    {
        path: 'cm-text-cm',
        component: CmTextCmComponent,
        resolve: {
            'pagingParams': CmTextCmResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'cmExodusApp.cmText.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'cm-text-cm/:id',
        component: CmTextCmDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'cmExodusApp.cmText.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const cmTextPopupRoute: Routes = [
    {
        path: 'cm-text-cm-new',
        component: CmTextCmPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'cmExodusApp.cmText.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'cm-text-cm/:id/edit',
        component: CmTextCmPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'cmExodusApp.cmText.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'cm-text-cm/:id/delete',
        component: CmTextCmDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'cmExodusApp.cmText.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
