import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import firebase from 'firebase/compat/app';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'taasuraat';
  user!: firebase.User | null;
  constructor(private auth: AngularFireAuth) {
    this.auth.onAuthStateChanged((user) => {
      this.user = user;
    });
  }

  logIn() {
    this.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
  }

  logOut() {
    this.auth.signOut();
  }
}
