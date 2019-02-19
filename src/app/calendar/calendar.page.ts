import { Component, OnInit } from '@angular/core';
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
  transactionsAll = this.storageSrv.transactions;
  monthSum = 0;
  constructor(public storageSrv: StorageService) {
    this.transactionsByMonth = this.transactionsAll.filter(x => (new Date(x.date)).getMonth() === this.calendar.currentDate.getMonth());
    console.log(this.transactionsByMonth);
    this.monthSum = this.transactionsByMonth.reduce( (sum, current) => 1 * sum + 1 * current.cost, 0);
    this.eventSource = this.transactionsAll.map( x => {
      return {startTime: new Date(x.date), endTime: new Date(x.date)};
      });

  }

  ngOnInit() {
  }
  onCurrentDateChanged(e: Date) {
    console.log('onCurrentDateChanged');
    console.log(e.getMonth());
    this.transactionsByMonth = this.transactionsAll.filter(x => (new Date(x.date)).getMonth() === e.getMonth());
    this.monthSum = this.transactionsByMonth.reduce( (sum, current) => 1 * sum + 1 * current.cost, 0);
    console.log(this.transactionsByMonth);
    console.log(this.monthSum);
  }
  reloadSource(startTime, endTime) {
    console.log('reloadSource')

  }
  onEventSelected(e) {
    console.log('onEventSelected')

  }
  onViewTitleChanged(e) {
    console.log('onViewTitleChanged')

  }
  onTimeSelected(e) {
    console.log('onTimeSelected')
  }

  convertToDay() {

  }
}
