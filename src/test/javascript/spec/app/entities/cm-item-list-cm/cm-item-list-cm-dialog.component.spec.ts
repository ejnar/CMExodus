/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { CmExodusTestModule } from '../../../test.module';
import { CmItemListCmDialogComponent } from '../../../../../../main/webapp/app/entities/cm-item-list-cm/cm-item-list-cm-dialog.component';
import { CmItemListCmService } from '../../../../../../main/webapp/app/entities/cm-item-list-cm/cm-item-list-cm.service';
import { CmItemListCm } from '../../../../../../main/webapp/app/entities/cm-item-list-cm/cm-item-list-cm.model';
import { CmModuleCmService } from '../../../../../../main/webapp/app/entities/cm-module-cm';
import { CmImageCmService } from '../../../../../../main/webapp/app/entities/cm-image-cm';

describe('Component Tests', () => {

    describe('CmItemListCm Management Dialog Component', () => {
        let comp: CmItemListCmDialogComponent;
        let fixture: ComponentFixture<CmItemListCmDialogComponent>;
        let service: CmItemListCmService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [CmExodusTestModule],
                declarations: [CmItemListCmDialogComponent],
                providers: [
                    CmModuleCmService,
                    CmImageCmService,
                    CmItemListCmService
                ]
            })
            .overrideTemplate(CmItemListCmDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(CmItemListCmDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(CmItemListCmService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new CmItemListCm(123);
                        spyOn(service, 'update').and.returnValue(Observable.of(new HttpResponse({body: entity})));
                        comp.cmItemList = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.update).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'cmItemListListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );

            it('Should call create service on save for new entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new CmItemListCm();
                        spyOn(service, 'create').and.returnValue(Observable.of(new HttpResponse({body: entity})));
                        comp.cmItemList = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.create).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'cmItemListListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});
