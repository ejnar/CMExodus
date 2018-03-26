import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { errorRoute, navbarRoute, adminNavbarRoute } from './layouts';
import { DEBUG_INFO_ENABLED } from './app.constants';

import { homeRoute } from './home';
import { contentRoute } from './content';
import { auditsRoute, logsRoute } from './admin';

import { ADMIN_HOME_ROUTE, cmExodusAdminRoute } from './admin';

const LAYOUT_ROUTES = [
    { path: '', redirectTo: 'app', pathMatch: 'full' },
    // Public main page
    {
        path: 'app', children: [
            navbarRoute,
            homeRoute,
            contentRoute,
            auditsRoute,
            logsRoute,
            ...errorRoute
        ]
    },
    // Admin home page without authorization
    {
        path: 'admin', children: [
            adminNavbarRoute,
            ADMIN_HOME_ROUTE,
            ...errorRoute
        ]
    },
        ...cmExodusAdminRoute
];

@NgModule({
    imports: [
        RouterModule.forRoot(LAYOUT_ROUTES, { useHash: true , enableTracing: DEBUG_INFO_ENABLED })
    ],
    exports: [
        RouterModule
    ]
})
export class CmExodusAppRoutingModule {}
