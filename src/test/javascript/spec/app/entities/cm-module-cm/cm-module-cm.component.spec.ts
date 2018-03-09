/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { CmExodusTestModule } from '../../../test.module';
import { CmModuleCmComponent } from '../../../../../../main/webapp/app/entities/cm-module-cm/cm-module-cm.component';
import { CmModuleCmService } from '../../../../../../main/webapp/app/entities/cm-module-cm/cm-module-cm.service';
import { CmModuleCm } from '../../../../../../main/webapp/app/entities/cm-module-cm/cm-module-cm.model';

describe('Component Tests', () => {

    describe('CmModuleCm Management Component', () => {
        let comp: CmModuleCmComponent;
        let fixture: ComponentFixture<CmModuleCmComponent>;
        let service: CmModuleCmService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [CmExodusTestModule],
                declarations: [CmModuleCmComponent],
                providers: [
                    CmModuleCmService
                ]
            })
            .overrideTemplate(CmModuleCmComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(CmModuleCmComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(CmModuleCmService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new CmModuleCm(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.cmModules[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
