import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import * as firebase from 'firebase/app';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFirestore, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import { switchMap } from 'rxjs/operators';
import { User } from './user';


@Injectable()
export class AuthService {

  user: Observable<User>
  constructor(private afAuth: AngularFireAuth, private afs: AngularFirestore, private router: Router) {

  this.user = this.afAuth.authState
  .switchMap(user => {
    if (user) {
      return this.afs.doc<User>(`users/${user.uid}`).valueChanges()
    } else{
      return Observable.of(null)
    }
  })
  }
   
  googleLogin(){
    const provider = new firebase.auth.GoogleAuthProvider()
    return this.oAuthLogin(provider);
  }

  emailSignUp(email: string, password: string) {
    firebase.auth().createUserWithEmailAndPassword(email, password)
    .then(user => {
      return this.setUserDoc(user)
    })
    .catch(function(error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      // ...
    }).then(user => {
      return this.signOut();
    });
  }

  emailSignIn(email: string, password: string) {
    if(email == 'sup@walla.com') {
      firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // ...
      })
      .then(user => {
        return this.setUserDoc(user)
      })
      .then(success => this.router.navigate(['/reservations/display']));
    }
    else {
      firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // ...
      })
      .then(user => {
        return this.setUserDoc(user)
      })
      .then(success => this.router.navigate(['/home']));
    }
  }

  updateUser(user: User, data: any) { 
  return this.afs.doc(`users/${user.uid}`).update(data)
  }

  private handleError(error) {
    console.error(error)
  }

  private setUserDoc(user) {
    const userRef: AngularFirestoreDocument<User> = this.afs.doc(`users/${user.uid}`);
    if(user.email == 'sup@walla.com'){
      const data: User = {
        uid: user.uid,
        email: user.email,
        displayName: user.email, 
        roles: {
          subscriber: 'כן',
          supplier: 'כן'
        }
      }
      return userRef.set(data)
    }
    else if(user.email == 'admin@walla.com'){
      const data: User = {
        uid: user.uid,
        email: user.email,
        displayName: user.email, 
        roles: {
          subscriber: 'כן',
          editor: 'כן',
          admin: 'כן'
        }
      }
      return userRef.set(data)
    }
    else if(user.email == 'worker@walla.com'){
      const data: User = {
        uid: user.uid,
        email: user.email,
        displayName: user.email, 
        roles: {
          subscriber: 'כן',
          editor: 'כן'
        }
      }
      return userRef.set(data)
    }
    else {
      const data: User = {
        uid: user.uid,
        email: user.email,
        displayName: user.email, 
        roles: {
          subscriber: 'כן'
        }
      }
      return userRef.set(data)
    }
  }

  private oAuthLogin(provider) {
    return this.afAuth.auth.signInWithPopup(provider)
    .then((credential) => {
      this.updateUserData(credential.user)
    })
    .then(success => this.router.navigate(['/home']))
  }

  public signOut() {
    firebase.auth().signOut()
    .then(success => this.router.navigate(['']));
  }
   
  private updateUserData(user){
    const userRef: AngularFirestoreDocument<User> = this.afs.doc(`users/${user.uid}`);
    const data:User = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName, 
      roles: {
        subscriber: 'כן'
      }
    }
    return userRef.set(data, { merge: true })
  }

  canRead(user: User): boolean {
    const allowed = ['admin' , 'editor' , 'subscriber']
    return this.checkAuthorization(user,allowed)
  }

  canEdit(user: User): boolean {
  const allowed = ['admin' , 'editor']
  return this.checkAuthorization(user,allowed)
  }

  canDelete(user: User): boolean {
  const allowed = ['admin']
  return this.checkAuthorization(user,allowed)
  }

  private checkAuthorization(user: User, allowedRoles: string[]): boolean {
    if (!user) return false
    for (const role of allowedRoles){
      if( user.roles[role] ) {
        return true
      }
    }
    return false
  }
}
