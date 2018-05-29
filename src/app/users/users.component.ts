import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Data, Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { User } from '../core/user';
import { DataSource } from '@angular/cdk/collections';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { ViewContainerRef } from '@angular/core';
import { Observable } from 'rxjs/Observable';


@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  users: User[];
  editState: boolean = false;
  userToEdit: User;
  showPencil: boolean = true;

  constructor(
    private userService: UserService, 
    public toastr: ToastsManager, 
    vcr: ViewContainerRef, 
    private route: ActivatedRoute,
  ) {
    this.toastr.setRootViewContainerRef(vcr);
  }

  ngOnInit() {
    this.users = this.route.snapshot.data['users'];
  }

  updateUser(user: User){
      this.userService.updateUser(user);
      this.clearState();
      this.showWarning();
    }

  deleteUser(event, user: User ){
    this.clearState();
    this.userService.deleteUser(user);
    this.showError();
  }

  editUser(event, user: User){
    this.showPencil = false;
    this.editState = true;
    this.userToEdit = user;
  }

  clearState(){
    this.showPencil = true;
    this.editState = false;
    this.userToEdit = null;
  }

  showError() {
    this.toastr.error('נמחק', '');
  }

  showWarning() {
    this.toastr.warning('עודכן', '');
  }
}
