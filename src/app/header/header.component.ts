import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase/auth'
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  isAuth! : boolean;
  auth = firebase.getAuth();

  constructor( private authService:AuthService) { }

  ngOnInit(): void {
    firebase.onAuthStateChanged(this.auth,
      (user) => {
        if (user) {
          this.isAuth = true;
        } else {
          this.isAuth = false;
        }
      }
    );
  }

  onSignOut() {
    this.authService.signOutUser();
  }

}
