import {Component, ElementRef, OnInit} from '@angular/core';
import * as _moment from 'moment';
import {unitOfTime} from 'moment';
import {DateButton, DlDateTimePickerChange} from 'angular-bootstrap-datetimepicker';
import {ActivatedRoute, Router} from '@angular/router';
import {Patient} from '../../entity/patient';
import {OrderService} from '../../service/order/order.service';
import {Order} from '../../entity/order';
import {LoginService} from '../../service/login/login.service';

let moment = _moment;

declare var $: any;

@Component({
  selector: 'app-new-ord',
  templateUrl: './new-ord.component.html',
  styleUrls: ['./new-ord.component.css']
})
export class NewOrdComponent implements OnInit {
  selectedDate: any;
  disablePastDates = true;
  // @ts-ignore
  endDate: Date | undefined;
  // minDuration = 0;
  // @ts-ignore
  startDate: Date | undefined;
  priority = 0;
  desc = '';
  patId = '';
  name: string | null | undefined;
  title = '';
  docId: string | null = '';
  // duration: string | null = '';


  private isStartPickerOpen = false;
  private isEndPickerOpen = false;

  constructor(private elementRef: ElementRef,
              private activatedRoute: ActivatedRoute,
              private router: Router,
              private orderService: OrderService,
              private loginService: LoginService) {


    if ('default' in _moment) {
      moment = _moment['default'];
    }
  }

  ngOnInit(): void {
  }

  setName() {
    this.activatedRoute.queryParams.subscribe(params => {
      this.patId = params.id;
      this.name = params.name;
    });
    // console.log(this.name);
    return this.name;
  }

  createNewOrder(){
    if (this.title === null || this.title === ''){
      alert('Please fill title');
      return;
    } else if (this.priority === 0){
      alert('Please choose priority');
      return;
    } else if (this.startDate === null || this.startDate === undefined || this.endDate === null || this.endDate === undefined){
      alert('Please enter time');
      return;
    } else if (this.desc === null || this.desc === ''){
      alert('Please enter description');
      return;
    }

    this.docId = this.orderService.getDocId();
    console.log(this.endDate.getMinutes());
    console.log(this.startDate.getTime());
    console.log(this.endDate.getTime() - this.startDate.getTime());
    const doctor = {
      docId: this.docId
    };
    const patient = {
      patId: this.patId
    };
    const order = {
      ordTitle: this.title,
      sTime: this.startDate,
      eTime: this.endDate,
      des: this.desc,
      pro: this.priority,
      duration: this.endDate.getTime() - this.startDate.getTime(),
      doctor,
      patient,
    };
    this.orderService.add(order)
      .subscribe(result => {
        if (result){
          alert('Reminder has been created successfully!');
          this.router.navigate(['clinicsystem/patient']);
        } else {
          alert('Wrong add!');
        }
      });
  }

  ngAfterViewInit() {
    const startDatePickerParent = $('button.start-date[data-toggle="dropdown"]', this.elementRef.nativeElement).parent();
    startDatePickerParent.on('show.bs.dropdown', () => {
      this.isStartPickerOpen = true;
    });
    startDatePickerParent.on('hide.bs.dropdown', () => {
      this.isStartPickerOpen = false;
    });

    const endDatePickerParent = $('button.end-date[data-toggle="dropdown"]', this.elementRef.nativeElement).parent();
    endDatePickerParent.on('show.bs.dropdown', () => {
      this.isEndPickerOpen = true;
    });
    startDatePickerParent.on('hide.bs.dropdown', () => {
      this.isEndPickerOpen = false;
    });
  }


  /**
   * This filter `invalidate`s end dates that are entered via keyboard.
   *
   * It returns `false` if the date is invalid for selection; Otherwise, `true`.
   *
   * Filters use ES6 syntax so the `this` context is fixed to this component.
   *
   * @param value
   *  the numeric value of the date.
   */

  endDateInputFilter = (value: (number | null | undefined)) => {
    return this.endDatePickerFilter({value} as DateButton, 'minute');
  }


  /**
   * This filter `disables` end dates that are invalid for selection.
   *
   * It returns `false` if the date is invalid for selection; Otherwise, `true`.
   *
   * Filters use ES6 syntax so the `this` context is fixed to this component.
   *
   * @param dateButton
   *  the target datebutton.
   *
   * @param viewName
   *  the current view.
   */

  endDatePickerFilter = (dateButton: DateButton, viewName: string) => {
    // Truncate `now` to the start of the current view. i.e. 'day', etc.
    const now = moment().startOf(viewName as unitOfTime.StartOf).valueOf();

    // Start time might not be set at this time.
    // If not, use MIN_SAFE_INTEGER as the `default` start time. .add(this.minDuration, 'minute')
    const startTime = (this.startDate
      ? moment(this.startDate).startOf(viewName as unitOfTime.StartOf).valueOf()
      : Number.MIN_SAFE_INTEGER);

    const endTime = (this.startDate
      ? moment(this.startDate).startOf(viewName as unitOfTime.StartOf).add(48, 'hour').valueOf()
      : Number.MIN_SAFE_INTEGER);

    return this.disablePastDates
      ? dateButton.value >= now && dateButton.value >= startTime && dateButton.value <= endTime
      : dateButton.value >= startTime;
  }


  /**
   * This filter `invalidate`s start dates that are entered via keyboard.
   *
   * It returns `false` if the date is invalid for selection; Otherwise, `true`.
   *
   * Filters use ES6 syntax so the `this` context is fixed to this component.
   *
   * @param value
   *  the numeric value of the date.
   */

  startDateInputFilter = (value: (number | null | undefined)) => {
    return this.startDatePickerFilter({value} as DateButton, 'minute');
  }


  /**
   * This filter `disables` start dates that are invalid for selection.
   *
   * It returns `false` if the date is invalid for selection; Otherwise, `true`.
   *
   * Filters use ES6 syntax so the `this` context is fixed to this component.
   *
   * @param dateButton
   *  the target datebutton.
   *
   * @param viewName
   *  the current view.
   */

  startDatePickerFilter = (dateButton: DateButton, viewName: string) => {
    return this.disablePastDates
      ? dateButton.value >= moment().startOf(viewName as unitOfTime.StartOf).valueOf()
      : true;
  }



  /**
   * Close the End Date drop-down when endDate is selected.
   *
   * Do not `toggle` the drop-down unless a value is selected.
   *
   * ngModel handles actually setting the end date value.
   *
   * @param event
   *  the `DlDateTimePickerChange` event.
   */

  endDateSelected(event: DlDateTimePickerChange<Date>): void {
    if (this.isEndPickerOpen && event.value) {
      $('.end-date').dropdown('toggle');
    }
  }

  /**
   * Used to keep the Bootstrap drop-down open while clicking on the date/time picker.
   *
   * Without this, the dropdown will close whenever the user clicks,
   * @param event
   *  the DOM click event.
   */

  keepDropDownOpen(event: Event): void {
    event.stopPropagation();
  }

  /**
   * Close the Start Date drop-down when startDate is selected.
   *
   * Do not `toggle` the drop-down unless a value is selected.
   *
   * ngModel handles actually setting the start date value.
   *
   * @param event
   *  the `DlDateTimePickerChange` event.  .add(this.minDuration, 'minute')
   */

  startDateSelected(event: any): void {
    if (event.value) {
      if (this.isStartPickerOpen) {
        $('.start-date').dropdown('toggle');
      }
      if (this.endDate && this.endDate.getTime() < moment(event.value).add(48, 'hours').valueOf()) {
        this.endDate = undefined;
      }
    }
  }

  setDuration(): string {
    if (this.startDate === undefined || this.endDate === undefined) { return ''; }
    else {
      // console.log(this.endDate.getMinutes());
      // console.log(this.endDate.getHours() - this.startDate.getHours());
      // console.log(this.endDate.getDay());
      const duration = (this.endDate.getTime() - this.startDate.getTime()) / 60000;
      if (duration <= 60){
        return duration + ' minutes';
      } else if (duration % 60 === 0){
        return duration / 60 + ' hours';
      } else {
        return Math.round(duration / 60) + ' hours  ' + duration % 60 + ' minutes';
      }
    }
  }

  logOut(): void{
    this.loginService.logOut();
  }
}
