/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { CmExodusTestModule } from '../../../test.module';
import { CmModuleComponent } from '../../../../../../main/webapp/app/entities/cm-module/cm-module.component';
import { CmModuleService } from '../../../../../../main/webapp/app/entities/cm-module/cm-module.service';
import { CmModule } from '../../../../../../main/webapp/app/entities/cm-module/cm-module.model';

describe('Component Tests', () => {

    describe('CmModule Management Component', () => {
        let comp: CmModuleComponent;
        let fixture: ComponentFixture<CmModuleComponent>;
        let service: CmModuleService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [CmExodusTestModule],
                declarations: [CmModuleComponent],
                providers: [
                    CmModuleService
                ]
            })
            .overrideTemplate(CmModuleComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(CmModuleComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(CmModuleService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new CmModule(123)],
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
