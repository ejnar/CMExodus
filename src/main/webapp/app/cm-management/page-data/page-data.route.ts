import { Routes } from '@angular/router';

import { PageDataComponent } from './page-data.component';


export const pageDataRoute: Routes = [
    {
        path: 'page-data',
        component: PageDataComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'global.menu.cm.admin.page'
        }
    }
];

export const pageDataPopupRoute: Routes = [

];
