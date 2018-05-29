import { Component, OnInit } from '@angular/core';
import { Reservation } from '../../models/Reservation';

@Component({
  selector: 'app-reservations-display',
  templateUrl: './reservations-display.component.html',
  styleUrls: ['./reservations-display.component.css']
})
export class ReservationsDisplayComponent implements OnInit {

  selectedReservation: Reservation;

  constructor() { }

  ngOnInit() {
  }

}
