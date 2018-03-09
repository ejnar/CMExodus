/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { CmExodusTestModule } from '../../../test.module';
import { CmPortalCmDetailComponent } from '../../../../../../main/webapp/app/entities/cm-portal-cm/cm-portal-cm-detail.component';
import { CmPortalCmService } from '../../../../../../main/webapp/app/entities/cm-portal-cm/cm-portal-cm.service';
import { CmPortalCm } from '../../../../../../main/webapp/app/entities/cm-portal-cm/cm-portal-cm.model';

describe('Component Tests', () => {

    describe('CmPortalCm Management Detail Component', () => {
        let comp: CmPortalCmDetailComponent;
        let fixture: ComponentFixture<CmPortalCmDetailComponent>;
        let service: CmPortalCmService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [CmExodusTestModule],
                declarations: [CmPortalCmDetailComponent],
                providers: [
                    CmPortalCmService
                ]
            })
            .overrideTemplate(CmPortalCmDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(CmPortalCmDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(CmPortalCmService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new CmPortalCm(123)
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
