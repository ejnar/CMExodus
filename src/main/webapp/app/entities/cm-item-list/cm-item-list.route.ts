import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { CmItemListComponent } from './cm-item-list.component';
import { CmItemListDetailComponent } from './cm-item-list-detail.component';
import { CmItemListPopupComponent } from './cm-item-list-dialog.component';
import { CmItemListDeletePopupComponent } from './cm-item-list-delete-dialog.component';

export const cmItemListRoute: Routes = [
    {
        path: 'cm-item-list',
        component: CmItemListComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'cmExodusApp.cmItemList.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'cm-item-list/:id',
        component: CmItemListDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'cmExodusApp.cmItemList.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const cmItemListPopupRoute: Routes = [
    {
        path: 'cm-item-list-new',
        component: CmItemListPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'cmExodusApp.cmItemList.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'cm-item-list/:id/edit',
        component: CmItemListPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'cmExodusApp.cmItemList.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'cm-item-list/:id/delete',
        component: CmItemListDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'cmExodusApp.cmItemList.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
