/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { CmExodusTestModule } from '../../../test.module';
import { CmPageAuthorityCmDeleteDialogComponent } from '../../../../../../main/webapp/app/entities/cm-page-authority-cm/cm-page-authority-cm-delete-dialog.component';
import { CmPageAuthorityCmService } from '../../../../../../main/webapp/app/entities/cm-page-authority-cm/cm-page-authority-cm.service';

describe('Component Tests', () => {

    describe('CmPageAuthorityCm Management Delete Component', () => {
        let comp: CmPageAuthorityCmDeleteDialogComponent;
        let fixture: ComponentFixture<CmPageAuthorityCmDeleteDialogComponent>;
        let service: CmPageAuthorityCmService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [CmExodusTestModule],
                declarations: [CmPageAuthorityCmDeleteDialogComponent],
                providers: [
                    CmPageAuthorityCmService
                ]
            })
            .overrideTemplate(CmPageAuthorityCmDeleteDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(CmPageAuthorityCmDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(CmPageAuthorityCmService);
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
