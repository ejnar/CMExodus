/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { CmExodusTestModule } from '../../../test.module';
import { CmItemCmComponent } from '../../../../../../main/webapp/app/entities/cm-item-cm/cm-item-cm.component';
import { CmItemCmService } from '../../../../../../main/webapp/app/entities/cm-item-cm/cm-item-cm.service';
import { CmItemCm } from '../../../../../../main/webapp/app/entities/cm-item-cm/cm-item-cm.model';

describe('Component Tests', () => {

    describe('CmItemCm Management Component', () => {
        let comp: CmItemCmComponent;
        let fixture: ComponentFixture<CmItemCmComponent>;
        let service: CmItemCmService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [CmExodusTestModule],
                declarations: [CmItemCmComponent],
                providers: [
                    CmItemCmService
                ]
            })
            .overrideTemplate(CmItemCmComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(CmItemCmComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(CmItemCmService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new CmItemCm(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.cmItems[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
