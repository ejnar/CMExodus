import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { CmImage } from './cm-image.model';
import { CmImageService } from './cm-image.service';

@Component({
    selector: 'jhi-cm-image-detail',
    templateUrl: './cm-image-detail.component.html'
})
export class CmImageDetailComponent implements OnInit, OnDestroy {

    cmImage: CmImage;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private cmImageService: CmImageService,
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
            .subscribe((cmImageResponse: HttpResponse<CmImage>) => {
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
