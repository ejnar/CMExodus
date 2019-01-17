import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { PageAuthorityPopupComponent } from './page-authority-dialog.component';

export const pageAuthorityRoute: Routes = [
];

export const pageAuthorityPopupRoute: Routes = [
    {
        path: 'page-authority/:pageId',
        component: PageAuthorityPopupComponent,
        data: {
            authorities: ['ROLE_ADMIN', 'ROLE_MANAGER'],
            pageTitle: 'cmExodusApp.cmPageAuthority.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'page-authority/:id/edit',
        component: PageAuthorityPopupComponent,
        data: {
            authorities: ['ROLE_ADMIN', 'ROLE_MANAGER'],
            pageTitle: 'cmExodusApp.cmPageAuthority.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
