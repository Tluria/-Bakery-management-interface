import { Component, OnInit, Input } from '@angular/core';
import { Reservation } from '../../models/Reservation';
import { ReservationService } from '../../services/reservation.service';
import { UpdateReservationsService } from '../../services/update-reservations.service';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { ViewContainerRef } from '@angular/core';

@Component({
  selector: 'app-reservation-detail',
  templateUrl: './reservation-detail.component.html',
  styleUrls: ['./reservation-detail.component.css']
})
export class ReservationDetailComponent implements OnInit {

  @Input() reservation: Reservation;
  reservations: Reservation[];

  constructor(public reservationService: ReservationService,
              public updateReservationsService: UpdateReservationsService,
              public toastr: ToastsManager, 
              vcr: ViewContainerRef) { }

  ngOnInit() {
    this.reservationService.getReservations().subscribe(res => {
      this.reservations = res;
    })
  }

  changeStatus1() {
    this.reservationService.updateResStatus1(this.reservations[this.updateReservationsService.index]);
    this.showInfo();
  }

  changeStatus2() {
    this.reservationService.updateResStatus2(this.reservations[this.updateReservationsService.index]);
    this.showSuccess();
  }

  changeStatus3() {
    this.reservationService.updateResStatus3(this.reservations[this.updateReservationsService.index]);
    this.showError();
  }

  showError() {
    this.toastr.error('סטאטוס הזמנה שונה ל : הזמנה חסרה במלאי', '');
  }

  showSuccess() {
    this.toastr.success('סטאטוס הזמנה שונה ל : הזמנה נשלחה', '');
  }

  showInfo() {
    this.toastr.info('סטאטוס הזמנה שונה ל : בטיפול', '');
  }
}
