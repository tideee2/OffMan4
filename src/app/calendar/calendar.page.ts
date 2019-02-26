import {Component, OnInit} from '@angular/core';
import {StorageService} from '../providers/storage/storage.service';

@Component({
    selector: 'app-calendar',
    templateUrl: './calendar.page.html',
    styleUrls: ['./calendar.page.scss'],
})
export class CalendarPage implements OnInit {

    eventSource = [];
    viewTitle: string;
    selectedDay = new Date();
    calendar = {
        mode: 'month',
        currentDate: this.selectedDay
    };
    transactionsByMonth = [];
    transactionsAll = this.storageSrv.transactions || [];
    monthSum = 0;
    monthName = '';
    monthArray = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    currentMonth = 0;

    constructor(public storageSrv: StorageService) {
        this.transactionsByMonth = this.transactionsAll.filter(x => (new Date(x.date)).getMonth() === this.calendar.currentDate.getMonth());
        console.log(this.transactionsByMonth);
        this.monthSum = this.transactionsByMonth.reduce((sum, current) => 1 * sum + 1 * current.cost, 0);
        this.eventSource = this.transactionsAll.map(x => {
            return {startTime: new Date(x.date), endTime: new Date(x.date)};
        });

    }

    ngOnInit() {
    }

    onCurrentDateChanged(e: Date) {
        console.log('onCurrentDateChanged');
        console.log(e.getMonth());
        this.transactionsByMonth = this.transactionsAll.filter(x => (new Date(x.date)).getMonth() === e.getMonth());
        this.monthSum = this.transactionsByMonth.reduce((sum, current) => 1 * sum + 1 * current.cost, 0);
        console.log(this.transactionsByMonth);
        console.log(this.monthSum);
        this.currentMonth = e.getMonth();
        this.monthName = this.monthArray[e.getMonth()];
    }

    reloadSource(startTime, endTime) {
        console.log('reloadSource');

    }

    onEventSelected(e) {
        console.log('onEventSelected');

    }

    onViewTitleChanged(e) {
        console.log('onViewTitleChanged');

    }

    onTimeSelected(e) {
        console.log('onTimeSelected');
    }

    prevMonth() {
        const mySwiper = document.querySelector('.swiper-container')['swiper'];
        mySwiper.slidePrev();
    }

    nextMonth() {
        const mySwiper = document.querySelector('.swiper-container')['swiper'];
        mySwiper.slideNext();
    }

    convertToDay() {

    }
}
