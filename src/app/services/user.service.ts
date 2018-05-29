import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore'; 
import { Observable } from 'rxjs/Observable';
import { User } from '../core/user';
import { map } from 'rxjs/operators';

@Injectable()
export class UserService {

  usersCollection: AngularFirestoreCollection<User>;
  users: Observable<User[]>;  
  userDoc: AngularFirestoreDocument<User>;

  constructor(public afs:AngularFirestore) {
    this.usersCollection = this.afs.collection('users', ref => ref.orderBy('displayName', 'asc'));
    this.users = this.usersCollection.snapshotChanges().map(changes => {
      return changes.map(a => {
        const data = a.payload.doc.data() as User;
        data.uid = a.payload.doc.id;
        return data;
      });
    });
   }

   addUser(user: User){
    this.usersCollection.add(user); 
   }

   deleteUser(user: User){
    this.userDoc = this.afs.doc(`users/${user.uid}`);
    this.userDoc.delete();
   }

   updateUser(user: User){
    this.userDoc = this.afs.doc(`users/${user.uid}`);
    this.userDoc.update(user);
   }

   getUsers() {
     return this.afs.collection('users', ref => ref.orderBy('displayName', 'asc'))
     .snapshotChanges()
     .pipe(map((data: any) => {
       return data.map(a => {
        const d = a.payload.doc.data() as User;
        d.uid = a.payload.doc.id;
        return d;
       })
     }));
   }
}
