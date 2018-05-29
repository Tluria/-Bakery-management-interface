import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Data, Router } from '@angular/router';
import { ReservationService } from '../../services/reservation.service';
import { Reservation } from '../../models/Reservation';
import { DataSource } from '@angular/cdk/collections';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { ViewContainerRef } from '@angular/core';
import { AuthService } from '../../core/auth.service';

@Component({
  selector: 'app-my-reservations',
  templateUrl: './my-reservations.component.html',
  styleUrls: ['./my-reservations.component.css']
})
export class MyReservationsComponent implements OnInit {

  reservations: Reservation[];
  editState: boolean= false;
  reservationToEdit: Reservation;
  showPencil: boolean = true;

  constructor(private reservationService: ReservationService, 
    public toastr: ToastsManager, 
    vcr: ViewContainerRef,
    private route: ActivatedRoute,
    public auth: AuthService) { 
    this.toastr.setRootViewContainerRef(vcr);
  }

  ngOnInit() {
    this.reservations = this.route.snapshot.data['reservations'];
  }

  updateReservation(reservation: Reservation){
    this.reservationService.updateReservation(reservation);
    this.clearState();
    this.showWarning();
  }

  deleteReservation(event, reservation: Reservation ){
    this.clearState();
    this.reservationService.deleteReservation(reservation);
    this.showError();
  }

  editReservation(event, reservation: Reservation){
    this.showPencil = false;
    this.auth.user.subscribe(user => {
      if(user.roles.admin == 'כן'){
        this.editState= true;
        this.reservationToEdit= reservation;
      }
      else {
        window.alert('Admins Only!!');
      }
    })
  }

  clearState(){
    this.showPencil = true;
    this.editState = false;
    this.reservationToEdit = null;
  }

  showError() {
    this.toastr.error('נמחק', '');
  }

  showWarning() {
    this.toastr.warning('עודכן', '');
  }
}
