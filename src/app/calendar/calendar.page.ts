import { Component, OnInit } from '@angular/core';

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

  constructor() { }

  ngOnInit() {
  }
  onCurrentDateChanged(e) {
    console.log('onCurrentDateChanged');
    console.log(e);
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
}
