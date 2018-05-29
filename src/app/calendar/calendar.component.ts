import { Component, ChangeDetectionStrategy, ViewChild, TemplateRef, OnInit } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { ActivatedRoute, Params, Data, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {
  CalendarEvent,
  CalendarEventAction,
  CalendarEventTimesChangedEvent
} from 'angular-calendar';
import {
  startOfDay,
  endOfDay,
  subDays,
  addDays,
  endOfMonth,
  isSameDay,
  isSameMonth,
  addHours
} from 'date-fns';
import { CalendarService } from '../services/calendar.service';
import { CalEvent } from '../../app/models/CalEvent';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { ViewContainerRef } from '@angular/core';
import { AuthService } from '../core/auth.service';

const colors: any = {
  red: {
    primary: '#ad2121',
    secondary: '#FAE3E3'
  },
  blue: {
    primary: '#1e90ff',
    secondary: '#D1E8FF'
  },
  yellow: {
    primary: '#e3bc08',
    secondary: '#FDF1BA'
  }
};


@Component({
  selector: 'mwl-demo-component',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent implements OnInit {
  @ViewChild('modalContent') modalContent: TemplateRef<any>;
  
  view: string = 'month';
  eventToEdit: CalEvent;
  editState:boolean = false;

  viewDate: Date = new Date();

  modalData: {
    action: string;
    event: CalendarEvent;
  };
  
  actions: CalendarEventAction[] = [
    {
      label: '<i class="fa fa-fw fa-pencil"></i>',
      onClick: ({ event }: { event: CalendarEvent }): void => {
        this.handleEvent('Edited', event);
      }
    },
    {
      label: '<i class="fa fa-fw fa-times"></i>',
      onClick: ({ event }: { event: CalendarEvent }): void => {
        this.events = this.events.filter(iEvent => iEvent !== event);
        this.handleEvent('Deleted', event);
      }
    }
  ];
  
  refresh: Subject<any> = new Subject();

  events: CalendarEvent[] = [];

  activeDayIsOpen: boolean = true;

  constructor(private modal: NgbModal, 
              private calendarService: CalendarService,
              public toastr: ToastsManager, 
              vcr: ViewContainerRef,
              private route: ActivatedRoute,
              public auth: AuthService) {
    this.toastr.setRootViewContainerRef(vcr);
  }

  ngOnInit() {
    this.calendarService.getEvents().subscribe((events) => {
      this.events = events.map(event => {
        return {
          id: event.id,
          title: event.title,
          start: addDays(event.start, 0),
          end: addDays(event.end, 0),
          color: colors.red,
          action: this.actions
        };
      });
      this.refresh.next();
    })

    // this.events = this.route.snapshot.data['calendar'];
  }
  
  dayClicked({ date, events }: { date: Date; events: CalendarEvent[] }): void {
    if (isSameMonth(date, this.viewDate)) {
      if (
        (isSameDay(this.viewDate, date) && this.activeDayIsOpen === true) ||
        events.length === 0
      ) {
        this.activeDayIsOpen = false;
      } else {
        this.activeDayIsOpen = true;
        this.viewDate = date;
      }
    }
  }
  
  eventTimesChanged({
    event,
    newStart,
    newEnd
  }: CalendarEventTimesChangedEvent): void {
    event.start = newStart;
    event.end = newEnd;
    this.handleEvent('Dropped or resized', event);
    this.refresh.next();
  }

  handleEvent(action: string, event: CalendarEvent): void {
    this.modalData = { event, action };
    this.modal.open(this.modalContent, { size: 'lg' });
  }
  
  addEvent(): void {
    this.events.push({
      title: 'New event',
      start: startOfDay(new Date()),
      end: endOfDay(new Date()),
      color: colors.red,
      draggable: true,
      resizable: {
        beforeStart: true,
        afterEnd: true
      }
    });
    this.refresh.next();
  }
    
  editEvent(event, calEvent:CalEvent){
    this.auth.user.subscribe(user => {
      if(user.roles.admin == 'כן'){
        this.editState = true;
        this.eventToEdit = calEvent;
      }
      else {
        window.alert('Admins Only!!');
      }
    })
  }

  deleteEvent(event, calEvent: CalEvent){
    this.clearState();
    this.calendarService.deleteEvent(calEvent);
    this.showError();
  }

  updateEvent(calEvent: CalEvent){
    this.calendarService.updateEvent(calEvent);
    this.clearState();
    this.showWarning();
  }

  clearState(){
    this.editState = false;
    this.eventToEdit = null;
  }

  showError() {
    this.toastr.error('נמחק', '');
  }

  showWarning() {
    this.toastr.warning('עודכן', '');
  }
}
