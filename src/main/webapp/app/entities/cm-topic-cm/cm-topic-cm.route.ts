import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { CmTopicCmComponent } from './cm-topic-cm.component';
import { CmTopicCmDetailComponent } from './cm-topic-cm-detail.component';
import { CmTopicCmPopupComponent } from './cm-topic-cm-dialog.component';
import { CmTopicCmDeletePopupComponent } from './cm-topic-cm-delete-dialog.component';

export const cmTopicRoute: Routes = [
    {
        path: 'cm-topic-cm',
        component: CmTopicCmComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'cmExodusApp.cmTopic.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'cm-topic-cm/:id',
        component: CmTopicCmDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'cmExodusApp.cmTopic.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const cmTopicPopupRoute: Routes = [
    {
        path: 'cm-topic-cm-new',
        component: CmTopicCmPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'cmExodusApp.cmTopic.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'cm-topic-cm/:id/edit',
        component: CmTopicCmPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'cmExodusApp.cmTopic.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'cm-topic-cm/:id/delete',
        component: CmTopicCmDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'cmExodusApp.cmTopic.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
