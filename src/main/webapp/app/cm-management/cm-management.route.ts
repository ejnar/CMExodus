import { Route, Routes } from '@angular/router';

import { pageRoute } from './page/page.route';
import { menuRoute } from './menu/menu.route';
import { pageAuthorityPopupRoute } from './page-authority/page-authority.route';

export const CM_ADMIN_ROUTES = [
    ...pageRoute,
    ...menuRoute,
    ...pageAuthorityPopupRoute,
];
