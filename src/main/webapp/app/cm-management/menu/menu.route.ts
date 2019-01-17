import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { MenuComponent } from './menu.component';
import { SubMenuComponent } from './sub-menu.component';

export const menuRoute: Routes = [
    {
        path: 'menu',
        component: MenuComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'cmExodusApp.cmTopic.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'sub-menu/:id',
        component: SubMenuComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'cmExodusApp.cmSubTopic.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];
