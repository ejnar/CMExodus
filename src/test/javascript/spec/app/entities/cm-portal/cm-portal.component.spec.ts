/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { CmExodusTestModule } from '../../../test.module';
import { CmPortalComponent } from '../../../../../../main/webapp/app/entities/cm-portal/cm-portal.component';
import { CmPortalService } from '../../../../../../main/webapp/app/entities/cm-portal/cm-portal.service';
import { CmPortal } from '../../../../../../main/webapp/app/entities/cm-portal/cm-portal.model';

describe('Component Tests', () => {

    describe('CmPortal Management Component', () => {
        let comp: CmPortalComponent;
        let fixture: ComponentFixture<CmPortalComponent>;
        let service: CmPortalService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [CmExodusTestModule],
                declarations: [CmPortalComponent],
                providers: [
                    CmPortalService
                ]
            })
            .overrideTemplate(CmPortalComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(CmPortalComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(CmPortalService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new CmPortal(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.cmPortals[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
