import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { CmModuleComponent } from './cm-module.component';
import { CmModuleDetailComponent } from './cm-module-detail.component';
import { CmModulePopupComponent } from './cm-module-dialog.component';
import { CmModuleDeletePopupComponent } from './cm-module-delete-dialog.component';

export const cmModuleRoute: Routes = [
    {
        path: 'cm-module',
        component: CmModuleComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'cmExodusApp.cmModule.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'cm-module/:id',
        component: CmModuleDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'cmExodusApp.cmModule.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const cmModulePopupRoute: Routes = [
    {
        path: 'cm-module-new',
        component: CmModulePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'cmExodusApp.cmModule.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'cm-module/:id/edit',
        component: CmModulePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'cmExodusApp.cmModule.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'cm-module/:id/delete',
        component: CmModuleDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'cmExodusApp.cmModule.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
