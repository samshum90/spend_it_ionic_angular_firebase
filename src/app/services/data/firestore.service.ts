import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import 'firebase/firestore';
import { Spend } from '../../shared/spend';

@Injectable({
  providedIn: 'root'
})
export class FirestoreService {

  constructor(public firestore: AngularFirestore) { }

  createSpend(
    dateCreated: string,
    spendName: string,
    spendDescription: string,
    category: string,
  ): Promise<void> {
    const id = this.firestore.createId();

    return this.firestore.doc(`songList/${id}`).set({
      id,
      dateCreated,
      spendName,
      spendDescription,
      category,
    });
  }
}
