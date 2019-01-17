import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil } from 'ng-jhipster';
import { UserRouteAccessService } from '../../shared';

import { PageComponent } from './page.component';
import { PageEditComponent } from './page-edit.component';
import { PagePopupComponent } from './page-dialog.component';
import { PageDeletePopupComponent } from './page-delete-dialog.component';

import { ModulePopupComponent } from './module-dialog.component';

@Injectable()
export class PageResolvePagingParams implements Resolve<any> {

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

export const pageRoute: Routes = [
    {
        path: 'page',
        component: PageComponent,
        resolve: {
            'pagingParams': PageResolvePagingParams
        },
        data: {
            authorities: ['ROLE_ADMIN', 'ROLE_MANAGER'],
            pageTitle: 'global.menu.cm.admin.page'
        }
    },
    {
        path: 'page/:id/edit',
        component: PageEditComponent,
        data: {
            authorities: ['ROLE_ADMIN', 'ROLE_MANAGER'],
            pageTitle: 'cmExodusApp.cmPage.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const pagePopupRoute: Routes = [
    {
        path: 'add-module/:id',
        component: ModulePopupComponent,
        data: {
            authorities: ['ROLE_ADMIN', 'ROLE_MANAGER'],
            pageTitle: 'cmExodusApp.cmPage.home.title'
        },
        outlet: 'popup'
    },
    {
        path: 'edit-module/:pageId/module/:moduleId',
        component: ModulePopupComponent,
        data: {
            authorities: ['ROLE_ADMIN', 'ROLE_MANAGER'],
            pageTitle: 'cmExodusApp.cmPage.home.title'
        },
        outlet: 'popup'
    },
    {
        path: 'page-new',
        component: PagePopupComponent,
        data: {
            authorities: ['ROLE_ADMIN', 'ROLE_MANAGER'],
            pageTitle: 'cmExodusApp.cmPage.home.title'
        },
        outlet: 'popup'
    },
    {
        path: 'page/:id/edit',
        component: PagePopupComponent,
        data: {
            authorities: ['ROLE_ADMIN', 'ROLE_MANAGER'],
            pageTitle: 'cmExodusApp.cmPage.home.title'
        },
        outlet: 'popup'
    },
    {
        path: 'page/:id/delete',
        component: PageDeletePopupComponent,
        data: {
            authorities: ['ROLE_ADMIN'],
            pageTitle: 'cmExodusApp.cmPage.home.title'
        },
        outlet: 'popup'
    }
];
