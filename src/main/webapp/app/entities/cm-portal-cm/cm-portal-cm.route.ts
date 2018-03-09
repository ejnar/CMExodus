import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { CmPortalCmComponent } from './cm-portal-cm.component';
import { CmPortalCmDetailComponent } from './cm-portal-cm-detail.component';
import { CmPortalCmPopupComponent } from './cm-portal-cm-dialog.component';
import { CmPortalCmDeletePopupComponent } from './cm-portal-cm-delete-dialog.component';

export const cmPortalRoute: Routes = [
    {
        path: 'cm-portal-cm',
        component: CmPortalCmComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'cmExodusApp.cmPortal.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'cm-portal-cm/:id',
        component: CmPortalCmDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'cmExodusApp.cmPortal.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const cmPortalPopupRoute: Routes = [
    {
        path: 'cm-portal-cm-new',
        component: CmPortalCmPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'cmExodusApp.cmPortal.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'cm-portal-cm/:id/edit',
        component: CmPortalCmPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'cmExodusApp.cmPortal.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'cm-portal-cm/:id/delete',
        component: CmPortalCmDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'cmExodusApp.cmPortal.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
