/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { CmExodusTestModule } from '../../../test.module';
import { CmItemListDialogComponent } from '../../../../../../main/webapp/app/entities/cm-item-list/cm-item-list-dialog.component';
import { CmItemListService } from '../../../../../../main/webapp/app/entities/cm-item-list/cm-item-list.service';
import { CmItemList } from '../../../../../../main/webapp/app/entities/cm-item-list/cm-item-list.model';
import { CmModuleService } from '../../../../../../main/webapp/app/entities/cm-module';
import { CmImageService } from '../../../../../../main/webapp/app/entities/cm-image';

describe('Component Tests', () => {

    describe('CmItemList Management Dialog Component', () => {
        let comp: CmItemListDialogComponent;
        let fixture: ComponentFixture<CmItemListDialogComponent>;
        let service: CmItemListService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [CmExodusTestModule],
                declarations: [CmItemListDialogComponent],
                providers: [
                    CmModuleService,
                    CmImageService,
                    CmItemListService
                ]
            })
            .overrideTemplate(CmItemListDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(CmItemListDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(CmItemListService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new CmItemList(123);
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
                        const entity = new CmItemList();
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
