/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { CmExodusTestModule } from '../../../test.module';
import { CmPortalDetailComponent } from '../../../../../../main/webapp/app/entities/cm-portal/cm-portal-detail.component';
import { CmPortalService } from '../../../../../../main/webapp/app/entities/cm-portal/cm-portal.service';
import { CmPortal } from '../../../../../../main/webapp/app/entities/cm-portal/cm-portal.model';

describe('Component Tests', () => {

    describe('CmPortal Management Detail Component', () => {
        let comp: CmPortalDetailComponent;
        let fixture: ComponentFixture<CmPortalDetailComponent>;
        let service: CmPortalService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [CmExodusTestModule],
                declarations: [CmPortalDetailComponent],
                providers: [
                    CmPortalService
                ]
            })
            .overrideTemplate(CmPortalDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(CmPortalDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(CmPortalService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new CmPortal(123)
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.cmPortal).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
