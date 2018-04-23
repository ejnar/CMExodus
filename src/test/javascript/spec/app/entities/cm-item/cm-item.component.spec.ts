/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { CmExodusTestModule } from '../../../test.module';
import { CmItemComponent } from '../../../../../../main/webapp/app/entities/cm-item/cm-item.component';
import { CmItemService } from '../../../../../../main/webapp/app/entities/cm-item/cm-item.service';
import { CmItem } from '../../../../../../main/webapp/app/entities/cm-item/cm-item.model';

describe('Component Tests', () => {

    describe('CmItem Management Component', () => {
        let comp: CmItemComponent;
        let fixture: ComponentFixture<CmItemComponent>;
        let service: CmItemService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [CmExodusTestModule],
                declarations: [CmItemComponent],
                providers: [
                    CmItemService
                ]
            })
            .overrideTemplate(CmItemComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(CmItemComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(CmItemService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new CmItem(123)],
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
