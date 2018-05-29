import { Component, OnInit, EventEmitter,Output } from '@angular/core';
import { ActivatedRoute, Params, Data, Router } from '@angular/router';

import { ReservationService } from '../../services/reservation.service';
import { Reservation } from '../../models/Reservation';

@Component({
  selector: 'app-reservation-list',
  templateUrl: './reservation-list.component.html',
  styleUrls: ['./reservation-list.component.css']
})
export class ReservationListComponent implements OnInit {

  reservations: Reservation[];
  @Output() reservationWasSelected = new EventEmitter<Reservation>();
  

  constructor(private reservationService: ReservationService ,private route: ActivatedRoute) { }

  ngOnInit() {
    // this.reservationService.getReservations().subscribe(reservation => {
    //   this.reservations = reservation;
    // });
    this.reservations = this.route.snapshot.data['reservations'];
  }

  onReservationSelected(reservation: Reservation){
    this.reservationWasSelected.emit(reservation);
  }
}
