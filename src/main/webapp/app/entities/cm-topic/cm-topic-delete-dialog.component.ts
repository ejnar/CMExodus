import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { CmTopic } from './cm-topic.model';
import { CmTopicPopupService } from './cm-topic-popup.service';
import { CmTopicService } from './cm-topic.service';

@Component({
    selector: 'jhi-cm-topic-delete-dialog',
    templateUrl: './cm-topic-delete-dialog.component.html'
})
export class CmTopicDeleteDialogComponent {

    cmTopic: CmTopic;

    constructor(
        private cmTopicService: CmTopicService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.cmTopicService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'cmTopicListModification',
                content: 'Deleted an cmTopic'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-cm-topic-delete-popup',
    template: ''
})
export class CmTopicDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private cmTopicPopupService: CmTopicPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.cmTopicPopupService
                .open(CmTopicDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
