import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { CmSubTopicComponent } from './cm-sub-topic.component';
import { CmSubTopicDetailComponent } from './cm-sub-topic-detail.component';
import { CmSubTopicPopupComponent } from './cm-sub-topic-dialog.component';
import { CmSubTopicDeletePopupComponent } from './cm-sub-topic-delete-dialog.component';

export const cmSubTopicRoute: Routes = [
    {
        path: 'cm-sub-topic',
        component: CmSubTopicComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'cmExodusApp.cmSubTopic.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'cm-sub-topic/:id',
        component: CmSubTopicDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'cmExodusApp.cmSubTopic.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const cmSubTopicPopupRoute: Routes = [
    {
        path: 'cm-sub-topic-new',
        component: CmSubTopicPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'cmExodusApp.cmSubTopic.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'cm-sub-topic/:id/edit',
        component: CmSubTopicPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'cmExodusApp.cmSubTopic.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'cm-sub-topic/:id/delete',
        component: CmSubTopicDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'cmExodusApp.cmSubTopic.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
