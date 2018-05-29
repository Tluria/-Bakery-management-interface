import { Component, OnInit } from '@angular/core';
import { ReservationService } from '../services/reservation.service'
import { Reservation } from '../models/Reservation';
import { DataSource } from '@angular/cdk/collections';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { ViewContainerRef } from '@angular/core';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-reservation',
  templateUrl: './reservation.component.html',
  styleUrls: ['./reservation.component.css']
})
export class ReservationComponent implements OnInit {

  reservation:Reservation= {
    date:null,
    description:'',
    status:'ממתין לטיפול'}
  editState:boolean = false;
  reservationToEdit: Reservation;
  masg: string = '';
  dataSource;

  constructor(private reservationService: ReservationService, public toastr: ToastsManager, vcr: ViewContainerRef) { 
    this.toastr.setRootViewContainerRef(vcr);
  }

  ngOnInit() {
  
  }

  onSubmit(){
    if(this.reservation.date !=null && this.reservation.description !=''){
      this.reservationService.addReservation(this.reservation);
      this.reservation.date=null;
      this.reservation.description='';
      this.showSuccess();
    }
  }
  
  clearState(){
    this.editState = false;
    this.reservationToEdit = null;
  }

  showSuccess() {
    this.toastr.success('נוסף בהצלחה', 'נוסף!');
  }

  showError() {
    this.toastr.error('נמחק', '');
  }

  showWarning() {
    this.toastr.warning('עודכן', '');
  }
}
