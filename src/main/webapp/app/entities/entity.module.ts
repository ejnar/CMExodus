import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { CmExodusCmTopicCmModule } from './cm-topic-cm/cm-topic-cm.module';
import { CmExodusCmSubTopicCmModule } from './cm-sub-topic-cm/cm-sub-topic-cm.module';
import { CmExodusCmPortalCmModule } from './cm-portal-cm/cm-portal-cm.module';
import { CmExodusCmPageAuthorityCmModule } from './cm-page-authority-cm/cm-page-authority-cm.module';
import { CmExodusCmPageCmModule } from './cm-page-cm/cm-page-cm.module';
import { CmExodusCmModuleCmModule } from './cm-module-cm/cm-module-cm.module';
import { CmExodusCmItemCmModule } from './cm-item-cm/cm-item-cm.module';
import { CmExodusCmTextCmModule } from './cm-text-cm/cm-text-cm.module';
import { CmExodusCmImageCmModule } from './cm-image-cm/cm-image-cm.module';
import { CmExodusCmItemListCmModule } from './cm-item-list-cm/cm-item-list-cm.module';
/* jhipster-needle-add-entity-module-import - JHipster will add entity modules imports here */

@NgModule({
    imports: [
        CmExodusCmTopicCmModule,
        CmExodusCmSubTopicCmModule,
        CmExodusCmPortalCmModule,
        CmExodusCmPageAuthorityCmModule,
        CmExodusCmPageCmModule,
        CmExodusCmModuleCmModule,
        CmExodusCmItemCmModule,
        CmExodusCmTextCmModule,
        CmExodusCmImageCmModule,
        CmExodusCmItemListCmModule,
        /* jhipster-needle-add-entity-module - JHipster will add entity modules here */
    ],
    declarations: [],
    entryComponents: [],
    providers: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class CmExodusEntityModule {}
