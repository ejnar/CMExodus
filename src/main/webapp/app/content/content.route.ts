import { Route } from '@angular/router';

import { ContentEngineComponent } from './';

export const contentRoute: Route = {
    path: 'content',
    component: ContentEngineComponent,
    data: {
        authorities: [],
        pageTitle: 'content.title'
    }
};
