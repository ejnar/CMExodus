/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { CmExodusTestModule } from '../../../test.module';
import { CmPageAuthorityCmComponent } from '../../../../../../main/webapp/app/entities/cm-page-authority-cm/cm-page-authority-cm.component';
import { CmPageAuthorityCmService } from '../../../../../../main/webapp/app/entities/cm-page-authority-cm/cm-page-authority-cm.service';
import { CmPageAuthorityCm } from '../../../../../../main/webapp/app/entities/cm-page-authority-cm/cm-page-authority-cm.model';

describe('Component Tests', () => {

    describe('CmPageAuthorityCm Management Component', () => {
        let comp: CmPageAuthorityCmComponent;
        let fixture: ComponentFixture<CmPageAuthorityCmComponent>;
        let service: CmPageAuthorityCmService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [CmExodusTestModule],
                declarations: [CmPageAuthorityCmComponent],
                providers: [
                    CmPageAuthorityCmService
                ]
            })
            .overrideTemplate(CmPageAuthorityCmComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(CmPageAuthorityCmComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(CmPageAuthorityCmService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new CmPageAuthorityCm(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.cmPageAuthorities[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
