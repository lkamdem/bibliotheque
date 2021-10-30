import { Injectable } from '@angular/core';
//import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import * as firebase from 'firebase/auth'

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  auth = firebase.getAuth();

  constructor() { }
  

  createNewUser(email:string, password:string) {
    return new Promise<void>(
      (resolve,reject) => {
        firebase.createUserWithEmailAndPassword(this.auth, email, password).then(
          () => {
            resolve();
          },
          (error) => {
            reject(error);
          }
        );
      }
    );
  }

  signInUser(email:string, password:string) {
    return new Promise<void>(
      (resolve, reject) => {
        firebase.signInWithEmailAndPassword(this.auth, email, password).then(
         () => {
           resolve();
         },
         (error) => {
           reject(error);
         }
        );
        }
    );
  }

  signOutUser() {
//    firebase.signOut(this.auth)
    firebase.getAuth().signOut();
  }

}
