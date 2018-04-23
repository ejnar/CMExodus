import { Routes } from '@angular/router';
import { Route } from '@angular/router';

import { cmImageRoute, cmImagePopupRoute } from './cm-image/cm-image.route';
import { cmItemRoute, cmItemPopupRoute } from './cm-item/cm-item.route';
import { cmModuleRoute, cmModulePopupRoute } from './cm-module/cm-module.route';
import { cmPageAuthorityRoute, cmPageAuthorityPopupRoute } from './cm-page-authority/cm-page-authority.route';
import { cmPageRoute, cmPagePopupRoute } from './cm-page/cm-page.route';
import { cmPortalRoute, cmPortalPopupRoute } from './cm-portal/cm-portal.route';
import { cmSubTopicRoute, cmSubTopicPopupRoute } from './cm-sub-topic/cm-sub-topic.route';
import { cmTextRoute, cmTextPopupRoute } from './cm-text/cm-text.route';
import { cmTopicRoute, cmTopicPopupRoute } from './cm-topic/cm-topic.route';

export const ENTITIES_ROUTES = [
    ...cmImageRoute, ...cmImagePopupRoute,
    ...cmItemRoute, ...cmItemPopupRoute,
    ...cmModuleRoute, ...cmModulePopupRoute,
    ...cmPageAuthorityRoute, ...cmPageAuthorityPopupRoute,
    ...cmPageRoute, ...cmPageRoute,
    ...cmPortalRoute, ...cmPortalRoute,
    ...cmSubTopicRoute, ...cmSubTopicPopupRoute,
    ...cmTextRoute, ...cmTextPopupRoute,
    ...cmTopicRoute, ...cmTopicRoute
];
