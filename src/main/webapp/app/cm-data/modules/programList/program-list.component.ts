import { Component, Input, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';
import { NGXLogger } from 'ngx-logger';
import { DatePipe } from '@angular/common';
import { Observable } from 'rxjs/Observable';
import { ComponentInterface } from '../../../content/component-interface';
import { CmItemList, CmItemListService } from '../../../entities/cm-item-list';

@Component({
    templateUrl: './program-list.component.html',
    styleUrls: [
        'program-list.scss'
    ]
})
export class ProgramListComponent implements OnInit, OnDestroy, ComponentInterface {
    @Input() data: any;
    itemDate: any;
    itemTime: any;
    publishDate: any;
    cmItemList: CmItemList;
    isSaving: boolean;
    isEdit: boolean;
    publishDateDp: any;
    eventSubscriber: Subscription;

    constructor( private datePipe: DatePipe,
                 private cmItemListService: CmItemListService,
                 private eventManager: JhiEventManager,
                 private logger: NGXLogger ) {}

    ngOnInit() {
        this.sortList();
        this.isEdit = false;
    }

    editablyItem(index) {
        this.cmItemList = Object.assign({}, this.data.module.itemLists[index]);
        this.data.module.itemLists[index].active = true;
        this.formatDate();
        this.logger.debug(this.cmItemList);
    }

    addRow() {
        this.logger.debug('addRow');
        // const sort = this.data.module.texts[this.data.module.texts.length - 1].sorted;
        this.cmItemList = new CmItemList();
        this.cmItemList.active = true;
        this.formatDate();
        this.logger.debug(this.cmItemList);
    }

    ngOnDestroy() {

    }

    cancel() {
        this.logger.debug('cancel');
        this.data.module.itemLists.find((item) => item.id === this.cmItemList.id).active = false;
        this.cmItemList = null;
    }

    save() {
        this.logger.debug('save');
        // this.logger.debug(this.itemDate);
        // this.logger.debug(this.itemTime);
        this.isSaving = true;
        this.cmItemList.publishDate = this.publishDate; // .year + '-' + this.publishDate.month + '-' + this.publishDate.day;
        this.cmItemList.itemDate = this.itemDate.year + '-' + this.itemDate.month + '-' + this.itemDate.day + 'T' + this.itemTime.hour + ':' + this.itemTime.minute + ':00';

        // this.logger.debug(this.cmItemList);
        if (this.cmItemList.id !== undefined) {
            this.subscribeToSaveResponse(this.cmItemListService.update(this.cmItemList));
        } else {
            this.cmItemList.cmModuleId = this.data.module.id;
            this.subscribeToSaveResponse(this.cmItemListService.create(this.cmItemList));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<CmItemList>>) {
        result.subscribe((res: HttpResponse<CmItemList>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: CmItemList) {
        this.isSaving = false;
        this.cmItemList.active = false;
        const index = this.data.module.itemLists.findIndex((item) => item.id === this.cmItemList.id);
        if (index !== undefined && index > -1) {
            this.data.module.itemLists[index] = this.cmItemList;
            this.data.module.itemLists[index].active = false;
        } else {
            this.logger.debug('onSaveSuccess ' + index);
            this.data.module.itemLists.push(this.cmItemList);
        }
        this.cmItemList = null;
        this.sortList();
        this.isEdit = false;
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private sortList() {
        this.data.module.itemLists.sort((a: CmItemList, b: CmItemList) => {
            return this.getTime(a.itemDate) - this.getTime(b.itemDate);
        });
    }

    private formatDate() {
        this.logger.debug(this.cmItemList);
        this.publishDate = this.getDateStruct(this.cmItemList.publishDate);
        this.itemDate = this.getDateStruct(this.cmItemList.itemDate);
        this.setTime(this.cmItemList.itemDate);
        this.isEdit = true;
    }

    private setTime(time) {
        this.logger.debug(time);
        let date = new Date(time);
        if (!date) {
            date = new Date();
        }
        this.itemTime = {hour: date.getHours(), minute: date.getMinutes()};
    }

    private getDateStruct(date) {
        if (date) {
            return this.getConvertDateToStruct(date);
        }else {
            return this.getConvertCurrentDateToStruct();
        }
    }

    private getConvertDateToStruct(sDate) {
        if (sDate.year) {
            return sDate;
        }
        const date = new Date(sDate); // NaN
        if (date) {  // !== 'Invalid Date'
            return this.dateStruct(date);
        }
    }

    private getConvertCurrentDateToStruct() {
        const date = new Date();
        this.logger.debug(date);
        return this.dateStruct(date);
    }

    private dateStruct(date) {
        return {
            year: date.getFullYear(),
            month: date.getMonth() + 1,
            day: date.getDate()
        };
    }

    private getTime(date: any) {
        if (date) {
            return new Date(date).getTime();
        } else {
            return 0;
        }
    }
}
