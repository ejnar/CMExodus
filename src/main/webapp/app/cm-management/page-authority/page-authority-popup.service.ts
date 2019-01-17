import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { HttpResponse } from '@angular/common/http';

import { CmPageAuthority } from '../../entities/cm-page-authority/cm-page-authority.model';
import { CmPageAuthorityService } from '../../entities/cm-page-authority/cm-page-authority.service';

@Injectable()
export class PageAuthorityPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private modalService: NgbModal,
        private router: Router,
        private cmPageAuthorityService: CmPageAuthorityService

    ) {
        this.ngbModalRef = null;
    }

    open(component: Component, id?: number | any, pageId?: number | any): Promise<NgbModalRef> {
        return new Promise<NgbModalRef>((resolve, reject) => {
            const isOpen = this.ngbModalRef !== null;
            if (isOpen) {
                resolve(this.ngbModalRef);
            }
            if (id) {
                this.cmPageAuthorityService.find(id)
                    .subscribe((cmPageAuthorityResponse: HttpResponse<CmPageAuthority>) => {
                        const cmPageAuthority: CmPageAuthority = cmPageAuthorityResponse.body;
                        this.ngbModalRef = this.cmPageAuthorityModalRef(component, cmPageAuthority);
                        resolve(this.ngbModalRef);
                    });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    const pageAuthority = new CmPageAuthority();
                    pageAuthority.cmPageId = pageId;
                    this.ngbModalRef = this.cmPageAuthorityModalRef(component, pageAuthority);
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    cmPageAuthorityModalRef(component: Component, cmPageAuthority: CmPageAuthority): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.cmPageAuthority = cmPageAuthority;
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
