/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { CmExodusTestModule } from '../../../test.module';
import { CmPageComponent } from '../../../../../../main/webapp/app/entities/cm-page/cm-page.component';
import { CmPageService } from '../../../../../../main/webapp/app/entities/cm-page/cm-page.service';
import { CmPage } from '../../../../../../main/webapp/app/entities/cm-page/cm-page.model';

describe('Component Tests', () => {

    describe('CmPage Management Component', () => {
        let comp: CmPageComponent;
        let fixture: ComponentFixture<CmPageComponent>;
        let service: CmPageService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [CmExodusTestModule],
                declarations: [CmPageComponent],
                providers: [
                    CmPageService
                ]
            })
            .overrideTemplate(CmPageComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(CmPageComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(CmPageService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new CmPage(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.cmPages[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
