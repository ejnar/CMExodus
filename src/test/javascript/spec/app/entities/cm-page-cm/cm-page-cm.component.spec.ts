/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { CmExodusTestModule } from '../../../test.module';
import { CmPageCmComponent } from '../../../../../../main/webapp/app/entities/cm-page-cm/cm-page-cm.component';
import { CmPageCmService } from '../../../../../../main/webapp/app/entities/cm-page-cm/cm-page-cm.service';
import { CmPageCm } from '../../../../../../main/webapp/app/entities/cm-page-cm/cm-page-cm.model';

describe('Component Tests', () => {

    describe('CmPageCm Management Component', () => {
        let comp: CmPageCmComponent;
        let fixture: ComponentFixture<CmPageCmComponent>;
        let service: CmPageCmService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [CmExodusTestModule],
                declarations: [CmPageCmComponent],
                providers: [
                    CmPageCmService
                ]
            })
            .overrideTemplate(CmPageCmComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(CmPageCmComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(CmPageCmService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new CmPageCm(123)],
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
