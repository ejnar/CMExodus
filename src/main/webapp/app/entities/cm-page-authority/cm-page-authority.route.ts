import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { CmPageAuthorityComponent } from './cm-page-authority.component';
import { CmPageAuthorityDetailComponent } from './cm-page-authority-detail.component';
import { CmPageAuthorityPopupComponent } from './cm-page-authority-dialog.component';
import { CmPageAuthorityDeletePopupComponent } from './cm-page-authority-delete-dialog.component';

export const cmPageAuthorityRoute: Routes = [
    {
        path: 'cm-page-authority',
        component: CmPageAuthorityComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'cmExodusApp.cmPageAuthority.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'cm-page-authority/:id',
        component: CmPageAuthorityDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'cmExodusApp.cmPageAuthority.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const cmPageAuthorityPopupRoute: Routes = [
    {
        path: 'cm-page-authority-new',
        component: CmPageAuthorityPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'cmExodusApp.cmPageAuthority.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'cm-page-authority/:id/edit',
        component: CmPageAuthorityPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'cmExodusApp.cmPageAuthority.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'cm-page-authority/:id/delete',
        component: CmPageAuthorityDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'cmExodusApp.cmPageAuthority.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
