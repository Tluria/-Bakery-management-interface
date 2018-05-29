import { Component, OnInit } from '@angular/core';
import { AuthService } from '../core/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  isAdmin: boolean;

  constructor(public auth: AuthService) { }

  ngOnInit() {
    this.auth.user.subscribe(user => {
      if(user.roles.admin == 'כן'){
        this.isAdmin = true;
      }
    })
  }

}
