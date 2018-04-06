/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { CmExodusTestModule } from '../../../test.module';
import { CmItemListCmDeleteDialogComponent } from '../../../../../../main/webapp/app/entities/cm-item-list-cm/cm-item-list-cm-delete-dialog.component';
import { CmItemListCmService } from '../../../../../../main/webapp/app/entities/cm-item-list-cm/cm-item-list-cm.service';

describe('Component Tests', () => {

    describe('CmItemListCm Management Delete Component', () => {
        let comp: CmItemListCmDeleteDialogComponent;
        let fixture: ComponentFixture<CmItemListCmDeleteDialogComponent>;
        let service: CmItemListCmService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [CmExodusTestModule],
                declarations: [CmItemListCmDeleteDialogComponent],
                providers: [
                    CmItemListCmService
                ]
            })
            .overrideTemplate(CmItemListCmDeleteDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(CmItemListCmDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(CmItemListCmService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('confirmDelete', () => {
            it('Should call delete service on confirmDelete',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        spyOn(service, 'delete').and.returnValue(Observable.of({}));

                        // WHEN
                        comp.confirmDelete(123);
                        tick();

                        // THEN
                        expect(service.delete).toHaveBeenCalledWith(123);
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});
