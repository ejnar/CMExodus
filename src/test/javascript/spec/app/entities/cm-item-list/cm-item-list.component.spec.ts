/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { CmExodusTestModule } from '../../../test.module';
import { CmItemListComponent } from '../../../../../../main/webapp/app/entities/cm-item-list/cm-item-list.component';
import { CmItemListService } from '../../../../../../main/webapp/app/entities/cm-item-list/cm-item-list.service';
import { CmItemList } from '../../../../../../main/webapp/app/entities/cm-item-list/cm-item-list.model';

describe('Component Tests', () => {

    describe('CmItemList Management Component', () => {
        let comp: CmItemListComponent;
        let fixture: ComponentFixture<CmItemListComponent>;
        let service: CmItemListService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [CmExodusTestModule],
                declarations: [CmItemListComponent],
                providers: [
                    CmItemListService
                ]
            })
            .overrideTemplate(CmItemListComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(CmItemListComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(CmItemListService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new CmItemList(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.cmItemLists[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
