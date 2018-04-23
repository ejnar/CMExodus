/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { CmExodusTestModule } from '../../../test.module';
import { CmItemListDetailComponent } from '../../../../../../main/webapp/app/entities/cm-item-list/cm-item-list-detail.component';
import { CmItemListService } from '../../../../../../main/webapp/app/entities/cm-item-list/cm-item-list.service';
import { CmItemList } from '../../../../../../main/webapp/app/entities/cm-item-list/cm-item-list.model';

describe('Component Tests', () => {

    describe('CmItemList Management Detail Component', () => {
        let comp: CmItemListDetailComponent;
        let fixture: ComponentFixture<CmItemListDetailComponent>;
        let service: CmItemListService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [CmExodusTestModule],
                declarations: [CmItemListDetailComponent],
                providers: [
                    CmItemListService
                ]
            })
            .overrideTemplate(CmItemListDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(CmItemListDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(CmItemListService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new CmItemList(123)
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
