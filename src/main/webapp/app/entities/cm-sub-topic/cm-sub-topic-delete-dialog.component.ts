import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { CmSubTopic } from './cm-sub-topic.model';
import { CmSubTopicPopupService } from './cm-sub-topic-popup.service';
import { CmSubTopicService } from './cm-sub-topic.service';

@Component({
    selector: 'jhi-cm-sub-topic-delete-dialog',
    templateUrl: './cm-sub-topic-delete-dialog.component.html'
})
export class CmSubTopicDeleteDialogComponent {

    cmSubTopic: CmSubTopic;

    constructor(
        private cmSubTopicService: CmSubTopicService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.cmSubTopicService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'cmSubTopicListModification',
                content: 'Deleted an cmSubTopic'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-cm-sub-topic-delete-popup',
    template: ''
})
export class CmSubTopicDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private cmSubTopicPopupService: CmSubTopicPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.cmSubTopicPopupService
                .open(CmSubTopicDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
