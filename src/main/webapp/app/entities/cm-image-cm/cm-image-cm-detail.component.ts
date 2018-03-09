import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { CmImageCm } from './cm-image-cm.model';
import { CmImageCmService } from './cm-image-cm.service';

@Component({
    selector: 'jhi-cm-image-cm-detail',
    templateUrl: './cm-image-cm-detail.component.html'
})
export class CmImageCmDetailComponent implements OnInit, OnDestroy {

    cmImage: CmImageCm;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private cmImageService: CmImageCmService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInCmImages();
    }

    load(id) {
        this.cmImageService.find(id)
            .subscribe((cmImageResponse: HttpResponse<CmImageCm>) => {
                this.cmImage = cmImageResponse.body;
            });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInCmImages() {
        this.eventSubscriber = this.eventManager.subscribe(
            'cmImageListModification',
            (response) => this.load(this.cmImage.id)
        );
    }
}
