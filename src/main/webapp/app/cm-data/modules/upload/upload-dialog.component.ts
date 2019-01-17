import { Component, OnInit, OnDestroy, ViewChild} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { FormControl, FormGroup } from '@angular/forms';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';
import { NGXLogger } from 'ngx-logger';

import { CmImage } from '../../../entities/cm-image/cm-image.model';
import { CmImagePopupService } from '../../../entities/cm-image/cm-image-popup.service';
import { CmImageService } from '../../../entities/cm-image/cm-image.service';

import { CmUploadService } from '../../../entities/cm-upload/cm-upload.service';

import { SERVER_API_URL } from '../../../app.constants';

@Component({
    selector: 'jhi-upload-dialog',
    templateUrl: './upload-dialog.component.html'
})
export class UploadDialogComponent implements OnInit {

    private imagePath = 'data:image/jpeg;base64,';

    cmImage: CmImage;
    isSaving: boolean;
    public fileUploadLabel: any = 'Choose file...';

    profileImage: any;
    selectedFiles: FileList;
    currentFileUpload: File;

    constructor(
        public activeModal: NgbActiveModal,
        private logger: NGXLogger,
        private uploadService: CmUploadService,
        private httpClient: HttpClient,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    selectFile(event) {
        this.selectedFiles = event.target.files;
        this.fileUploadLabel = this.selectedFiles.item(0).name;
    }

    upload() {
        this.logger.debug('UploadDialogComponent.upload');
        this.currentFileUpload = this.selectedFiles.item(0);
        this.subscribeToUploadResponse(
                    this.uploadService.upload(this.currentFileUpload));
        this.selectedFiles = undefined;
        this.clear();
    }

    private subscribeToUploadResponse(result: Observable<HttpResponse<any>>) {
        result.subscribe((res: HttpResponse<CmImage>) =>
            this.onUploadSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError(res));   //
    }

    private onUploadSuccess(file: any) {
        this.logger.debug('UploadDialogComponent.onUploadSuccess');
        this.profileImage = this.imagePath + file.data;
        this.eventManager.broadcast({
                name: 'imageListModification',
                content: 'Updated an cmImage'
            });
    }

    private onSaveError(res: HttpErrorResponse) {
        this.logger.debug(res);
        this.isSaving = false;
    }

}

@Component({
    selector: 'jhi-cm-image-popup',
    template: ''
})
export class UploadPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private cmImagePopupService: CmImagePopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.cmImagePopupService
                    .open(UploadDialogComponent as Component);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
