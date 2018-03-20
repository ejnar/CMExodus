import { Route } from '@angular/router';

import { AdminNavbarComponent } from './adminNavbar.component';

export const adminNavbarRoute: Route = {
    path: '',
    component: AdminNavbarComponent,
    outlet: 'navbar'
};
