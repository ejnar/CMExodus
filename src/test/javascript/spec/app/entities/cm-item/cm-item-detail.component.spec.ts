/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { CmExodusTestModule } from '../../../test.module';
import { CmItemDetailComponent } from '../../../../../../main/webapp/app/entities/cm-item/cm-item-detail.component';
import { CmItemService } from '../../../../../../main/webapp/app/entities/cm-item/cm-item.service';
import { CmItem } from '../../../../../../main/webapp/app/entities/cm-item/cm-item.model';

describe('Component Tests', () => {

    describe('CmItem Management Detail Component', () => {
        let comp: CmItemDetailComponent;
        let fixture: ComponentFixture<CmItemDetailComponent>;
        let service: CmItemService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [CmExodusTestModule],
                declarations: [CmItemDetailComponent],
                providers: [
                    CmItemService
                ]
            })
            .overrideTemplate(CmItemDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(CmItemDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(CmItemService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new CmItem(123)
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
