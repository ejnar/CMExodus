import { Routes } from '@angular/router';
import { Route } from '@angular/router';

import { cmImageRoute, cmImagePopupRoute } from './cm-image-cm/cm-image-cm.route';
import { cmItemRoute, cmItemPopupRoute } from './cm-item-cm/cm-item-cm.route';
import { cmModuleRoute, cmModulePopupRoute } from './cm-module-cm/cm-module-cm.route';
import { cmPageAuthorityRoute, cmPageAuthorityPopupRoute } from './cm-page-authority-cm/cm-page-authority-cm.route';
import { cmPageRoute, cmPagePopupRoute } from './cm-page-cm/cm-page-cm.route';
import { cmPortalRoute, cmPortalPopupRoute } from './cm-portal-cm/cm-portal-cm.route';
import { cmSubTopicRoute, cmSubTopicPopupRoute } from './cm-sub-topic-cm/cm-sub-topic-cm.route';
import { cmTextRoute, cmTextPopupRoute } from './cm-text-cm/cm-text-cm.route';
import { cmTopicRoute, cmTopicPopupRoute } from './cm-topic-cm/cm-topic-cm.route';

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
