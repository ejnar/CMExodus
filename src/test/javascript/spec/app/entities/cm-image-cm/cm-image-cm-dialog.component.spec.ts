/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { CmExodusTestModule } from '../../../test.module';
import { CmImageCmDialogComponent } from '../../../../../../main/webapp/app/entities/cm-image-cm/cm-image-cm-dialog.component';
import { CmImageCmService } from '../../../../../../main/webapp/app/entities/cm-image-cm/cm-image-cm.service';
import { CmImageCm } from '../../../../../../main/webapp/app/entities/cm-image-cm/cm-image-cm.model';
import { CmModuleCmService } from '../../../../../../main/webapp/app/entities/cm-module-cm';
import { CmItemCmService } from '../../../../../../main/webapp/app/entities/cm-item-cm';

describe('Component Tests', () => {

    describe('CmImageCm Management Dialog Component', () => {
        let comp: CmImageCmDialogComponent;
        let fixture: ComponentFixture<CmImageCmDialogComponent>;
        let service: CmImageCmService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [CmExodusTestModule],
                declarations: [CmImageCmDialogComponent],
                providers: [
                    CmModuleCmService,
                    CmItemCmService,
                    CmImageCmService
                ]
            })
            .overrideTemplate(CmImageCmDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(CmImageCmDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(CmImageCmService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new CmImageCm(123);
                        spyOn(service, 'update').and.returnValue(Observable.of(new HttpResponse({body: entity})));
                        comp.cmImage = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.update).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'cmImageListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );

            it('Should call create service on save for new entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new CmImageCm();
                        spyOn(service, 'create').and.returnValue(Observable.of(new HttpResponse({body: entity})));
                        comp.cmImage = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.create).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'cmImageListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});
