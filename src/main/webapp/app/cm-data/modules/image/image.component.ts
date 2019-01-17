import { Component, Directive, Input, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager, JhiParseLinks, JhiAlertService } from 'ng-jhipster';

import { ComponentInterface } from '../../../content/component-interface';
import { CmImage, CmImageService} from '../../../entities/cm-image';

@Component({
    templateUrl: './image.component.html',
    styleUrls: [
        '../content/styles.scss'
    ]
})
export class ImageComponent implements ComponentInterface, OnInit, OnDestroy  {
    @Input() data: any;
    eventSubscriber: Subscription;
    private imagePath = 'data:image/jpeg;base64,';

    profileImage: string;
    image: CmImage = new CmImage();
    images: CmImage[];

     constructor(
        private jhiAlertService: JhiAlertService,
        private cmImageService: CmImageService,
        private eventManager: JhiEventManager
    ) { }

    ngOnInit() {
        // console.info('ImageComponent.ngOnInit');
        this.data.module.images.forEach((item) => {
            // console.info(item);
            this.image = item;
        });
        this.loadAll();
        this.registerChangeInCmImages();
    }

    loadAll() {
        this.cmImageService.query()
            .subscribe((res: HttpResponse<CmImage[]>) => { this.subscribeResponse(res.body); }, (res: HttpErrorResponse) => this.onError(res.message));
    }

    subscribeResponse(res: CmImage[]) {
        this.images = res;
        this.selectImage();
    }

    selectImage() {
        const img = this.images.find((i) => i.id === this.image.id);
        if  (img) {
            this.profileImage = this.imagePath + img.data;
            this.data.module.images = [];
            this.data.module.images.push(img);
        }
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }

    registerChangeInCmImages() {
        this.eventSubscriber = this.eventManager.subscribe('imageListModification', (response) => this.loadAll());
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

}
