import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { CmItemListCmComponent } from './cm-item-list-cm.component';
import { CmItemListCmDetailComponent } from './cm-item-list-cm-detail.component';
import { CmItemListCmPopupComponent } from './cm-item-list-cm-dialog.component';
import { CmItemListCmDeletePopupComponent } from './cm-item-list-cm-delete-dialog.component';

export const cmItemListRoute: Routes = [
    {
        path: 'cm-item-list-cm',
        component: CmItemListCmComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'cmExodusApp.cmItemList.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'cm-item-list-cm/:id',
        component: CmItemListCmDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'cmExodusApp.cmItemList.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const cmItemListPopupRoute: Routes = [
    {
        path: 'cm-item-list-cm-new',
        component: CmItemListCmPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'cmExodusApp.cmItemList.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'cm-item-list-cm/:id/edit',
        component: CmItemListCmPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'cmExodusApp.cmItemList.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'cm-item-list-cm/:id/delete',
        component: CmItemListCmDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'cmExodusApp.cmItemList.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
