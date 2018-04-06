import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { HttpResponse } from '@angular/common/http';
import { DatePipe } from '@angular/common';
import { CmTextCm } from './cm-text-cm.model';
import { CmTextCmService } from './cm-text-cm.service';

@Injectable()
export class CmTextCmPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private datePipe: DatePipe,
        private modalService: NgbModal,
        private router: Router,
        private cmTextService: CmTextCmService

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
                this.cmTextService.find(id)
                    .subscribe((cmTextResponse: HttpResponse<CmTextCm>) => {
                        const cmText: CmTextCm = cmTextResponse.body;
                        cmText.textDate = this.datePipe
                            .transform(cmText.textDate, 'yyyy-MM-ddTHH:mm:ss');
                        if (cmText.publishDate) {
                            cmText.publishDate = {
                                year: cmText.publishDate.getFullYear(),
                                month: cmText.publishDate.getMonth() + 1,
                                day: cmText.publishDate.getDate()
                            };
                        }
                        this.ngbModalRef = this.cmTextModalRef(component, cmText);
                        resolve(this.ngbModalRef);
                    });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.cmTextModalRef(component, new CmTextCm());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    cmTextModalRef(component: Component, cmText: CmTextCm): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.cmText = cmText;
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
