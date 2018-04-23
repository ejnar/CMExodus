/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { CmExodusTestModule } from '../../../test.module';
import { CmPageAuthorityDialogComponent } from '../../../../../../main/webapp/app/entities/cm-page-authority/cm-page-authority-dialog.component';
import { CmPageAuthorityService } from '../../../../../../main/webapp/app/entities/cm-page-authority/cm-page-authority.service';
import { CmPageAuthority } from '../../../../../../main/webapp/app/entities/cm-page-authority/cm-page-authority.model';
import { CmPageService } from '../../../../../../main/webapp/app/entities/cm-page';

describe('Component Tests', () => {

    describe('CmPageAuthority Management Dialog Component', () => {
        let comp: CmPageAuthorityDialogComponent;
        let fixture: ComponentFixture<CmPageAuthorityDialogComponent>;
        let service: CmPageAuthorityService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [CmExodusTestModule],
                declarations: [CmPageAuthorityDialogComponent],
                providers: [
                    CmPageService,
                    CmPageAuthorityService
                ]
            })
            .overrideTemplate(CmPageAuthorityDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(CmPageAuthorityDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(CmPageAuthorityService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new CmPageAuthority(123);
                        spyOn(service, 'update').and.returnValue(Observable.of(new HttpResponse({body: entity})));
                        comp.cmPageAuthority = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.update).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'cmPageAuthorityListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );

            it('Should call create service on save for new entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new CmPageAuthority();
                        spyOn(service, 'create').and.returnValue(Observable.of(new HttpResponse({body: entity})));
                        comp.cmPageAuthority = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.create).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'cmPageAuthorityListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});
