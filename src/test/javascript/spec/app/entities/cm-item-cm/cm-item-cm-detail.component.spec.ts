/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { CmExodusTestModule } from '../../../test.module';
import { CmItemCmDetailComponent } from '../../../../../../main/webapp/app/entities/cm-item-cm/cm-item-cm-detail.component';
import { CmItemCmService } from '../../../../../../main/webapp/app/entities/cm-item-cm/cm-item-cm.service';
import { CmItemCm } from '../../../../../../main/webapp/app/entities/cm-item-cm/cm-item-cm.model';

describe('Component Tests', () => {

    describe('CmItemCm Management Detail Component', () => {
        let comp: CmItemCmDetailComponent;
        let fixture: ComponentFixture<CmItemCmDetailComponent>;
        let service: CmItemCmService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [CmExodusTestModule],
                declarations: [CmItemCmDetailComponent],
                providers: [
                    CmItemCmService
                ]
            })
            .overrideTemplate(CmItemCmDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(CmItemCmDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(CmItemCmService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new CmItemCm(123)
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.cmItem).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
