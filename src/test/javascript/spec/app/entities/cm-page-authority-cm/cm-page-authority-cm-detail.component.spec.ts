/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { CmExodusTestModule } from '../../../test.module';
import { CmPageAuthorityCmDetailComponent } from '../../../../../../main/webapp/app/entities/cm-page-authority-cm/cm-page-authority-cm-detail.component';
import { CmPageAuthorityCmService } from '../../../../../../main/webapp/app/entities/cm-page-authority-cm/cm-page-authority-cm.service';
import { CmPageAuthorityCm } from '../../../../../../main/webapp/app/entities/cm-page-authority-cm/cm-page-authority-cm.model';

describe('Component Tests', () => {

    describe('CmPageAuthorityCm Management Detail Component', () => {
        let comp: CmPageAuthorityCmDetailComponent;
        let fixture: ComponentFixture<CmPageAuthorityCmDetailComponent>;
        let service: CmPageAuthorityCmService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [CmExodusTestModule],
                declarations: [CmPageAuthorityCmDetailComponent],
                providers: [
                    CmPageAuthorityCmService
                ]
            })
            .overrideTemplate(CmPageAuthorityCmDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(CmPageAuthorityCmDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(CmPageAuthorityCmService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new CmPageAuthorityCm(123)
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.cmPageAuthority).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
