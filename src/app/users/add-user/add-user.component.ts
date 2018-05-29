import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { User } from '../../core/user';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { ViewContainerRef } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../core/auth.service';
import { ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {

  isUserExist: boolean;
  email: string;
  password: string;

  databaseUsers: User[] = [];

  constructor(private userService:UserService, 
              public toastr: ToastsManager, 
              vcr: ViewContainerRef,
              private auth: AuthService) { 
    this.toastr.setRootViewContainerRef(vcr);
  }

  ngOnInit() {
    this.userService.getUsers().subscribe(res => {
      this.databaseUsers = res;
    })
  }

  onSubmit() {
    this.isUserExist = false;
    if(this.isExit()) {
      this.email = '';
      this.showError();
    }
    else {
      this.auth.emailSignUp(this.email, this.password)
      this.showSuccess();
    }
  }

  showSuccess() {
    this.toastr.success('נוסף בהצלחה', 'Success!');
  }

  showError() {
    this.toastr.error('משתמש קיים במערכת', '');
  }

  isExit(): boolean {
    for(let m of this.databaseUsers){
      if(m.email == this.email){
        this.isUserExist = true;
      }
    }
    if(this.isUserExist){
      return true;
    }
    else {
      return false;
    }
  }
}
