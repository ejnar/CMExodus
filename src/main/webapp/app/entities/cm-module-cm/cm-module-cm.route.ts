import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { CmModuleCmComponent } from './cm-module-cm.component';
import { CmModuleCmDetailComponent } from './cm-module-cm-detail.component';
import { CmModuleCmPopupComponent } from './cm-module-cm-dialog.component';
import { CmModuleCmDeletePopupComponent } from './cm-module-cm-delete-dialog.component';

export const cmModuleRoute: Routes = [
    {
        path: 'cm-module-cm',
        component: CmModuleCmComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'cmExodusApp.cmModule.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'cm-module-cm/:id',
        component: CmModuleCmDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'cmExodusApp.cmModule.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const cmModulePopupRoute: Routes = [
    {
        path: 'cm-module-cm-new',
        component: CmModuleCmPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'cmExodusApp.cmModule.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'cm-module-cm/:id/edit',
        component: CmModuleCmPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'cmExodusApp.cmModule.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'cm-module-cm/:id/delete',
        component: CmModuleCmDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'cmExodusApp.cmModule.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
