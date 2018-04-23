import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { CmTopicComponent } from './cm-topic.component';
import { CmTopicDetailComponent } from './cm-topic-detail.component';
import { CmTopicPopupComponent } from './cm-topic-dialog.component';
import { CmTopicDeletePopupComponent } from './cm-topic-delete-dialog.component';

export const cmTopicRoute: Routes = [
    {
        path: 'cm-topic',
        component: CmTopicComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'cmExodusApp.cmTopic.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'cm-topic/:id',
        component: CmTopicDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'cmExodusApp.cmTopic.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const cmTopicPopupRoute: Routes = [
    {
        path: 'cm-topic-new',
        component: CmTopicPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'cmExodusApp.cmTopic.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'cm-topic/:id/edit',
        component: CmTopicPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'cmExodusApp.cmTopic.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'cm-topic/:id/delete',
        component: CmTopicDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'cmExodusApp.cmTopic.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
