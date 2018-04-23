import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil } from 'ng-jhipster';

import { UserRouteAccessService } from '../../shared';
import { CmTextComponent } from './cm-text.component';
import { CmTextDetailComponent } from './cm-text-detail.component';
import { CmTextPopupComponent } from './cm-text-dialog.component';
import { CmTextDeletePopupComponent } from './cm-text-delete-dialog.component';

@Injectable()
export class CmTextResolvePagingParams implements Resolve<any> {

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
        path: 'cm-text',
        component: CmTextComponent,
        resolve: {
            'pagingParams': CmTextResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'cmExodusApp.cmText.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'cm-text/:id',
        component: CmTextDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'cmExodusApp.cmText.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const cmTextPopupRoute: Routes = [
    {
        path: 'cm-text-new',
        component: CmTextPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'cmExodusApp.cmText.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'cm-text/:id/edit',
        component: CmTextPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'cmExodusApp.cmText.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'cm-text/:id/delete',
        component: CmTextDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'cmExodusApp.cmText.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
