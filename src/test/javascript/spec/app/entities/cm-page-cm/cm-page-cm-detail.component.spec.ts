/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { CmExodusTestModule } from '../../../test.module';
import { CmPageCmDetailComponent } from '../../../../../../main/webapp/app/entities/cm-page-cm/cm-page-cm-detail.component';
import { CmPageCmService } from '../../../../../../main/webapp/app/entities/cm-page-cm/cm-page-cm.service';
import { CmPageCm } from '../../../../../../main/webapp/app/entities/cm-page-cm/cm-page-cm.model';

describe('Component Tests', () => {

    describe('CmPageCm Management Detail Component', () => {
        let comp: CmPageCmDetailComponent;
        let fixture: ComponentFixture<CmPageCmDetailComponent>;
        let service: CmPageCmService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [CmExodusTestModule],
                declarations: [CmPageCmDetailComponent],
                providers: [
                    CmPageCmService
                ]
            })
            .overrideTemplate(CmPageCmDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(CmPageCmDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(CmPageCmService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new CmPageCm(123)
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.cmPage).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
