import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { CmItemCmComponent } from './cm-item-cm.component';
import { CmItemCmDetailComponent } from './cm-item-cm-detail.component';
import { CmItemCmPopupComponent } from './cm-item-cm-dialog.component';
import { CmItemCmDeletePopupComponent } from './cm-item-cm-delete-dialog.component';

export const cmItemRoute: Routes = [
    {
        path: 'cm-item-cm',
        component: CmItemCmComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'cmExodusApp.cmItem.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'cm-item-cm/:id',
        component: CmItemCmDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'cmExodusApp.cmItem.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const cmItemPopupRoute: Routes = [
    {
        path: 'cm-item-cm-new',
        component: CmItemCmPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'cmExodusApp.cmItem.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'cm-item-cm/:id/edit',
        component: CmItemCmPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'cmExodusApp.cmItem.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'cm-item-cm/:id/delete',
        component: CmItemCmDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'cmExodusApp.cmItem.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
