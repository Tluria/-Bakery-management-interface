import { Component, OnInit } from '@angular/core';
import { AuthService } from '../core/auth.service';

@Component({
  selector: 'app-aside-nav',
  templateUrl: './aside-nav.component.html',
  styleUrls: ['./aside-nav.component.css']
})
export class AsideNavComponent implements OnInit {

  isAdmin: boolean;
  isSupplier: boolean;
  isWorker: boolean;

  constructor(public auth: AuthService) { }

  ngOnInit() {
    this.auth.user.subscribe(user => {
      if(user.roles.admin == 'כן'){
        this.isAdmin = true;
      }
      if(user.roles.supplier == 'כן'){
        this.isSupplier = true;
      }
      if(user.roles.editor == 'כן'){
        this.isWorker = true;
      }
    })
  }
}
