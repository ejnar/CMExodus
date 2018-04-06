/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { CmExodusTestModule } from '../../../test.module';
import { CmItemListCmDetailComponent } from '../../../../../../main/webapp/app/entities/cm-item-list-cm/cm-item-list-cm-detail.component';
import { CmItemListCmService } from '../../../../../../main/webapp/app/entities/cm-item-list-cm/cm-item-list-cm.service';
import { CmItemListCm } from '../../../../../../main/webapp/app/entities/cm-item-list-cm/cm-item-list-cm.model';

describe('Component Tests', () => {

    describe('CmItemListCm Management Detail Component', () => {
        let comp: CmItemListCmDetailComponent;
        let fixture: ComponentFixture<CmItemListCmDetailComponent>;
        let service: CmItemListCmService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [CmExodusTestModule],
                declarations: [CmItemListCmDetailComponent],
                providers: [
                    CmItemListCmService
                ]
            })
            .overrideTemplate(CmItemListCmDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(CmItemListCmDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(CmItemListCmService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new CmItemListCm(123)
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.cmItemList).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
