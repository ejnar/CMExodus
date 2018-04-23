import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { CmItemComponent } from './cm-item.component';
import { CmItemDetailComponent } from './cm-item-detail.component';
import { CmItemPopupComponent } from './cm-item-dialog.component';
import { CmItemDeletePopupComponent } from './cm-item-delete-dialog.component';

export const cmItemRoute: Routes = [
    {
        path: 'cm-item',
        component: CmItemComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'cmExodusApp.cmItem.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'cm-item/:id',
        component: CmItemDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'cmExodusApp.cmItem.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const cmItemPopupRoute: Routes = [
    {
        path: 'cm-item-new',
        component: CmItemPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'cmExodusApp.cmItem.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'cm-item/:id/edit',
        component: CmItemPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'cmExodusApp.cmItem.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'cm-item/:id/delete',
        component: CmItemDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'cmExodusApp.cmItem.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
