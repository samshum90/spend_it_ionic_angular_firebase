import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import 'firebase/firestore';

import { Observable } from 'rxjs';
import { Spend } from '../../shared/models/spend.interface';

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
    amount: string,
  ): Promise<void> {
    const id = this.firestore.createId();

    return this.firestore.doc(`spendList/${id}`).set({
      id,
      dateCreated,
      spendName,
      spendDescription,
      category,
      amount,
    });
  }

  getSpendList(): Observable<Spend[]> {
    return this.firestore.collection<Spend>(`spendList`).valueChanges();
  }

  getSpendDetail(spendId: string): Observable<Spend> {
    return this.firestore.collection('spendList').doc<Spend>(spendId).valueChanges();
  }

  deleteSpend(spendId: string): Promise<void> {
    return this.firestore.doc(`spendList/${spendId}`).delete();
  }

  updateSpend(
    id: string,
    dateCreated: string,
    spendName: string,
    spendDescription: string,
    category: string,
    amount: number,
  ) {
    return this.firestore.doc(`spendList/${id}`).update({
      id: id,
      dateCreated: dateCreated,
      spendName: spendName,
      spendDescription: spendDescription,
      category: category,
      amount: amount,
    });
  }
}
