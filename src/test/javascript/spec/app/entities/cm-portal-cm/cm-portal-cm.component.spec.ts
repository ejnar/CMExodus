/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { CmExodusTestModule } from '../../../test.module';
import { CmPortalCmComponent } from '../../../../../../main/webapp/app/entities/cm-portal-cm/cm-portal-cm.component';
import { CmPortalCmService } from '../../../../../../main/webapp/app/entities/cm-portal-cm/cm-portal-cm.service';
import { CmPortalCm } from '../../../../../../main/webapp/app/entities/cm-portal-cm/cm-portal-cm.model';

describe('Component Tests', () => {

    describe('CmPortalCm Management Component', () => {
        let comp: CmPortalCmComponent;
        let fixture: ComponentFixture<CmPortalCmComponent>;
        let service: CmPortalCmService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [CmExodusTestModule],
                declarations: [CmPortalCmComponent],
                providers: [
                    CmPortalCmService
                ]
            })
            .overrideTemplate(CmPortalCmComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(CmPortalCmComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(CmPortalCmService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new CmPortalCm(123)],
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
