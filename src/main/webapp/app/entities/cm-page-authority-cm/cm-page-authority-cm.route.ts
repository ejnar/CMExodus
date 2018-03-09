import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { CmPageAuthorityCmComponent } from './cm-page-authority-cm.component';
import { CmPageAuthorityCmDetailComponent } from './cm-page-authority-cm-detail.component';
import { CmPageAuthorityCmPopupComponent } from './cm-page-authority-cm-dialog.component';
import { CmPageAuthorityCmDeletePopupComponent } from './cm-page-authority-cm-delete-dialog.component';

export const cmPageAuthorityRoute: Routes = [
    {
        path: 'cm-page-authority-cm',
        component: CmPageAuthorityCmComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'cmExodusApp.cmPageAuthority.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'cm-page-authority-cm/:id',
        component: CmPageAuthorityCmDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'cmExodusApp.cmPageAuthority.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const cmPageAuthorityPopupRoute: Routes = [
    {
        path: 'cm-page-authority-cm-new',
        component: CmPageAuthorityCmPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'cmExodusApp.cmPageAuthority.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'cm-page-authority-cm/:id/edit',
        component: CmPageAuthorityCmPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'cmExodusApp.cmPageAuthority.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'cm-page-authority-cm/:id/delete',
        component: CmPageAuthorityCmDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'cmExodusApp.cmPageAuthority.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
