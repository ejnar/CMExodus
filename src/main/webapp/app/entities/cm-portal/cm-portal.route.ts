import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { CmPortalComponent } from './cm-portal.component';
import { CmPortalDetailComponent } from './cm-portal-detail.component';
import { CmPortalPopupComponent } from './cm-portal-dialog.component';
import { CmPortalDeletePopupComponent } from './cm-portal-delete-dialog.component';

export const cmPortalRoute: Routes = [
    {
        path: 'cm-portal',
        component: CmPortalComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'cmExodusApp.cmPortal.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'cm-portal/:id',
        component: CmPortalDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'cmExodusApp.cmPortal.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const cmPortalPopupRoute: Routes = [
    {
        path: 'cm-portal-new',
        component: CmPortalPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'cmExodusApp.cmPortal.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'cm-portal/:id/edit',
        component: CmPortalPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'cmExodusApp.cmPortal.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'cm-portal/:id/delete',
        component: CmPortalDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'cmExodusApp.cmPortal.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
