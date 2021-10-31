import { Component } from '@angular/core';
import { initializeApp } from "firebase/app";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'bibliotheque';

  constructor() {
    const firebaseConfig = {

      apiKey: "AIzaSyCVhGUcNjv3lvpwAPVK_NfsXh3DFU1z-64",
    
      authDomain: "bibliotheque-b9af9.firebaseapp.com",
    
      projectId: "bibliotheque-b9af9",
    
      storageBucket: "bibliotheque-b9af9.appspot.com",
    
      messagingSenderId: "375753627825",
    
      appId: "1:375753627825:web:b2aae443ac8bde65772a90",
    
      measurementId: "G-8L5LY91GKY"
    
    };
    
    
    // Initialize Firebase
    
    const app = initializeApp(firebaseConfig);
    


    
  }
}
