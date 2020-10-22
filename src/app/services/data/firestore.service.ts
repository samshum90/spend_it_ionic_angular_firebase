import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

import { Observable } from 'rxjs';
import { Spend } from '../../shared/models/spend.interface';

@Injectable({
  providedIn: 'root'
})
export class FirestoreService {

  constructor(public firestore: AngularFirestore) { }

  createCategories(userId: string): Promise<void> {
    // const id = this.firestore.createId();
    const categories = ["Food", "Take Away", "Personal", "Entertainment", "Service", "Other"]
    return this.firestore.collection('user').doc(`${userId}`).set({
      // id,
      categories
    });
  }

  getCategoriesList() {
    const userId = JSON.parse(localStorage.getItem('user'))
    return this.firestore.collection(`user`).doc(`${userId.uid}`).valueChanges()
  }

  getSpendList(): Observable<Spend[]> {
    const userId = JSON.parse(localStorage.getItem('user'))
    return this.firestore
      .collection('user').doc(`${userId.uid}`)
      .collection<Spend>(`spend`).valueChanges();
  }

  createSpend(
    dateCreated: string,
    spendName: string,
    spendDescription: string,
    category: string,
    amount: string,
  ): Promise<void> {
    const id = this.firestore.createId();
    const userId = JSON.parse(localStorage.getItem('user'))
    return this.firestore
      .collection('user').doc(`${userId.uid}`)
      .collection(`spend`).doc(`${id}`).set({
        id,
        dateCreated,
        spendName,
        spendDescription,
        category,
        amount,
      });
  }

  getSpendDetail(spendId: string): Observable<Spend> {
    const userId = JSON.parse(localStorage.getItem('user'))
    return this.firestore
      .collection('user').doc(`${userId.uid}`)
      .collection(`spend`).doc<Spend>(spendId).valueChanges();
  }

  deleteSpend(spendId: string): Promise<void> {
    const userId = JSON.parse(localStorage.getItem('user'))
    return this.firestore
      .collection('user').doc(`${userId.uid}`)
      .collection(`spend`).doc<Spend>(spendId).delete();
  }

  updateSpend(
    id: string,
    dateCreated: string,
    spendName: string,
    spendDescription: string,
    category: string,
    amount: number,
  ) {
    const userId = JSON.parse(localStorage.getItem('user'))
    return this.firestore
      .collection('user').doc(`${userId.uid}`)
      .collection(`spend`).doc(id)
      .update({
        id: id,
        dateCreated: dateCreated,
        spendName: spendName,
        spendDescription: spendDescription,
        category: category,
        amount: amount,
      });
  }
}
