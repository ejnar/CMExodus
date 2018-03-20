import { Routes } from '@angular/router';
import { Route } from '@angular/router';

import { errorRoute, adminNavbarRoute } from '.././layouts';
import { CmExodusAdminComponent } from './admin.component';
import { UserRouteAccessService } from '../shared';

import {
    auditsRoute,
    configurationRoute,
    docsRoute,
    healthRoute,
    logsRoute,
    metricsRoute,
    trackerRoute,
    userMgmtRoute,
    userDialogRoute
} from './';

import { ACCOUNT_ROUTES } from '../account';
import { ENTITIES_ROUTES } from '../entities';

export const ADMIN_ROUTES = [
    auditsRoute,
    configurationRoute,
    docsRoute,
    healthRoute,
    logsRoute,
    metricsRoute,
    trackerRoute,
    ...userMgmtRoute
];

export const ADMIN_HOME_ROUTE: Route = {
    path: '',
    component: CmExodusAdminComponent,
    data: {
        authorities: [],
        pageTitle: 'home.title'
    }
};

export const cmExodusAdminRoute: Routes = [
{
    path: 'admin',
    data: { authorities: ['ROLE_ADMIN'], },
    canActivate: [UserRouteAccessService],
    children: [
        adminNavbarRoute,
        ...ADMIN_ROUTES,
        ...ACCOUNT_ROUTES,
        ...ENTITIES_ROUTES,
        ...errorRoute
    ]
},
    ...userDialogRoute
];
