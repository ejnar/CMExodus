import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { HttpResponse } from '@angular/common/http';
import { CmSubTopic } from './cm-sub-topic.model';
import { CmSubTopicService } from './cm-sub-topic.service';

@Injectable()
export class CmSubTopicPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private modalService: NgbModal,
        private router: Router,
        private cmSubTopicService: CmSubTopicService

    ) {
        this.ngbModalRef = null;
    }

    open(component: Component, id?: number | any): Promise<NgbModalRef> {
        return new Promise<NgbModalRef>((resolve, reject) => {
            const isOpen = this.ngbModalRef !== null;
            if (isOpen) {
                resolve(this.ngbModalRef);
            }

            if (id) {
                this.cmSubTopicService.find(id)
                    .subscribe((cmSubTopicResponse: HttpResponse<CmSubTopic>) => {
                        const cmSubTopic: CmSubTopic = cmSubTopicResponse.body;
                        this.ngbModalRef = this.cmSubTopicModalRef(component, cmSubTopic);
                        resolve(this.ngbModalRef);
                    });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.cmSubTopicModalRef(component, new CmSubTopic());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    cmSubTopicModalRef(component: Component, cmSubTopic: CmSubTopic): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.cmSubTopic = cmSubTopic;
        modalRef.result.then((result) => {
            this.router.navigate([{ outlets: { popup: null }}], { replaceUrl: true, queryParamsHandling: 'merge' });
            this.ngbModalRef = null;
        }, (reason) => {
            this.router.navigate([{ outlets: { popup: null }}], { replaceUrl: true, queryParamsHandling: 'merge' });
            this.ngbModalRef = null;
        });
        return modalRef;
    }
}
