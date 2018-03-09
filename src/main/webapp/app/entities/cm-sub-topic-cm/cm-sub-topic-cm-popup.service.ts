import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { HttpResponse } from '@angular/common/http';
import { CmSubTopicCm } from './cm-sub-topic-cm.model';
import { CmSubTopicCmService } from './cm-sub-topic-cm.service';

@Injectable()
export class CmSubTopicCmPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private modalService: NgbModal,
        private router: Router,
        private cmSubTopicService: CmSubTopicCmService

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
                    .subscribe((cmSubTopicResponse: HttpResponse<CmSubTopicCm>) => {
                        const cmSubTopic: CmSubTopicCm = cmSubTopicResponse.body;
                        this.ngbModalRef = this.cmSubTopicModalRef(component, cmSubTopic);
                        resolve(this.ngbModalRef);
                    });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.cmSubTopicModalRef(component, new CmSubTopicCm());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    cmSubTopicModalRef(component: Component, cmSubTopic: CmSubTopicCm): NgbModalRef {
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
