import { Component, OnInit } from '@angular/core';
import { AuthService } from '../core/auth.service';
import { UserService } from '../services/user.service';
import { User } from '../core/user';
import { Router } from '@angular/router';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { ViewContainerRef } from '@angular/core';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {

  isUserExist: boolean;
  user: User = {
    email: '',
    password: ''
  }

  databaseUsers: User[] = [];

  constructor(public auth: AuthService, 
              private userService: UserService,
              public toastr: ToastsManager, 
              vcr: ViewContainerRef,
              private router: Router) {
       this.toastr.setRootViewContainerRef(vcr);
  }

  emailLogin() {
    this.auth.emailSignIn(this.user.email, this.user.password);
  }

  ngOnInit() {
    // this.userService.getUsers().subscribe(res => {
    //   this.databaseUsers = res;
    // })
  }

  // emailLogin() {
  //   this.isUserExist = true;
  //   if(this.user.email != '' && this.user.password != ''){
  //     if(this.isExit()) {
  //       this.router.navigate(['/home']);
  //     }
  //     else {
  //       this.showError();
  //     }
  //   }
  // }

  // isExit(): boolean {
  //   for(let m of this.databaseUsers){
  //     if(m.email == this.user.email && m.password == this.user.password){
  //       this.isUserExist = true;
  //     }
  //   }
  //   if(this.isUserExist){
  //     return true;
  //   }
  //   else {
  //     return false;
  //   }
  // }

  // showError() {
  //   this.toastr.error('משתמש לא קיים', '');
  // }
}
