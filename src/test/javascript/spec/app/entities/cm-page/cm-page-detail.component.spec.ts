/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { CmExodusTestModule } from '../../../test.module';
import { CmPageDetailComponent } from '../../../../../../main/webapp/app/entities/cm-page/cm-page-detail.component';
import { CmPageService } from '../../../../../../main/webapp/app/entities/cm-page/cm-page.service';
import { CmPage } from '../../../../../../main/webapp/app/entities/cm-page/cm-page.model';

describe('Component Tests', () => {

    describe('CmPage Management Detail Component', () => {
        let comp: CmPageDetailComponent;
        let fixture: ComponentFixture<CmPageDetailComponent>;
        let service: CmPageService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [CmExodusTestModule],
                declarations: [CmPageDetailComponent],
                providers: [
                    CmPageService
                ]
            })
            .overrideTemplate(CmPageDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(CmPageDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(CmPageService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new CmPage(123)
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
