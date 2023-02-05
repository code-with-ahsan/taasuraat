import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import firebase from 'firebase/compat/app';
import { Taasur } from './taasur.interface';
import { Observable } from 'rxjs/internal/Observable';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, FormsModule, AngularFireModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  formValue = {
    taasur: '',
  };
  user!: firebase.User | null;
  taasuraatList$!: Observable<Taasur[]>;
  constructor(private auth: AngularFireAuth, private afs: AngularFirestore) {
    this.auth.onAuthStateChanged((user) => {
      this.user = user;
    });
    const ref = this.afs.collection<Taasur>('messages', (ref) => {
      return ref.orderBy('timestamp', 'desc');
    });
    this.taasuraatList$ = ref.valueChanges();
  }
  formSubmit(ev: Event) {
    if (ev) {
      ev.preventDefault();
    }
    console.log(this.formValue);
    const newTaasur: Taasur = {
      message: this.formValue.taasur,
      photoURL: this.user!.photoURL || '',
      displayName: this.user!.displayName || '',
      timestamp: Date.now(),
    };
    this.afs
      .collection('messages')
      .add(newTaasur)
      .then(() => {
        this.formValue.taasur = '';
      })
      .catch(console.log);
  }
}
