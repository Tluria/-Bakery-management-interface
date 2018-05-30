import { Component, OnInit } from '@angular/core';
import { CalendarService } from '../services/calendar.service';
import { CalEvent } from '../models/CalEvent';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { ViewContainerRef } from '@angular/core';

@Component({
  selector: 'app-add-event',
  templateUrl: './add-event.component.html',
  styleUrls: ['./add-event.component.css']
})
export class AddEventComponent implements OnInit {

  isEventExist: boolean;
  calEvent: CalEvent = {
    start: null,
    end: null,
    title: ''
  }
  databaseEvents: CalEvent[] = [];

  constructor(private calendarService:CalendarService, public toastr: ToastsManager, vcr: ViewContainerRef) {
    this.toastr.setRootViewContainerRef(vcr);
   }

  ngOnInit() {
    this.calendarService.getEvents().subscribe(res => {
      this.databaseEvents = res;
    })
  }

  onSubmit(){
    this.isEventExist = false;
    if(this.calEvent.title != '' && this.calEvent.start != null && this.calEvent.end != null) {
      if(this.isExit()) {
        this.calEvent.title='';
        this.showError();
      }
      else {
      this.calendarService.addEvent(this.calEvent);
      this.calEvent.title = '';
      this.calEvent.start = null;
      this.calEvent.end = null;
      this.showSuccess();
      }
    }
    else {
      this.showWarning();
    }
  }

  showSuccess() {
    this.toastr.success('נוסף בהצלחה', 'Success!');
  }

  showError() {
    this.toastr.error('אירוע קיים במערכת', '');
  }

  showWarning() {
    this.toastr.warning('חייב למלא את כל השדות', '');
  }

  isExit(): boolean {
    for(let m of this.databaseEvents){
      if(m.title == this.calEvent.title){
        this.isEventExist = true;
      }
    }
    if(this.isEventExist){
      return true;
    }
    else {
      return false;
    }
  }
}
