import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

import { Observable } from 'rxjs';
import { Spend } from '../../shared/models/spend.interface';
import { Income } from '../../shared/models/income.interface';

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

  updateCategories(categories: any[]) {
    const userId = JSON.parse(localStorage.getItem('user'))
    return this.firestore.collection(`user`).doc(`${userId.uid}`).update({ categories })
  }

  getSpendList(): Observable<Spend[]> {
    const userId = JSON.parse(localStorage.getItem('user'))
    return this.firestore
      .collection('user').doc(`${userId.uid}`)
      .collection<Spend>(`spend`).valueChanges();
  }

  createSpend(
    dateCreated: string,
    name: string,
    description: string,
    category: string,
    amount: string,
    type: string
  ): Promise<void> {
    const id = this.firestore.createId();
    const userId = JSON.parse(localStorage.getItem('user'))
    return this.firestore
      .collection('user').doc(`${userId.uid}`)
      .collection(`spend`).doc(`${id}`).set({
        id,
        dateCreated,
        name,
        description,
        category,
        amount,
        type,
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
    name: string,
    description: string,
    category: string,
    amount: number,
    type: string,
  ) {
    const userId = JSON.parse(localStorage.getItem('user'))
    return this.firestore
      .collection('user').doc(`${userId.uid}`)
      .collection(`spend`).doc(id)
      .update({
        id: id,
        dateCreated: dateCreated,
        name: name,
        description: description,
        category: category,
        amount: amount,
        type: type,
      });
  }

  getIncomeList(): Observable<Income[]> {
    const userId = JSON.parse(localStorage.getItem('user'))
    return this.firestore
      .collection('user').doc(`${userId.uid}`)
      .collection<Income>(`income`).valueChanges();
  }

  createIncome(
    dateCreated: string,
    name: string,
    description: string,
    amount: string,
    type: string
  ): Promise<void> {
    const id = this.firestore.createId();
    const userId = JSON.parse(localStorage.getItem('user'))
    return this.firestore
      .collection('user').doc(`${userId.uid}`)
      .collection(`income`).doc(`${id}`).set({
        id,
        dateCreated,
        name,
        description,
        amount,
        type,
      });
  }

  getIncomeDetail(incomeId: string): Observable<Income> {
    const userId = JSON.parse(localStorage.getItem('user'))
    return this.firestore
      .collection('user').doc(`${userId.uid}`)
      .collection(`income`).doc<Income>(incomeId).valueChanges();
  }

  deleteIncome(incomeId: string): Promise<void> {
    const userId = JSON.parse(localStorage.getItem('user'))
    return this.firestore
      .collection('user').doc(`${userId.uid}`)
      .collection(`income`).doc<Income>(incomeId).delete();
  }

  updateIncome(
    id: string,
    dateCreated: string,
    name: string,
    description: string,
    amount: number,
    type: string,
  ) {
    const userId = JSON.parse(localStorage.getItem('user'))
    return this.firestore
      .collection('user').doc(`${userId.uid}`)
      .collection(`income`).doc(id)
      .update({
        id: id,
        dateCreated: dateCreated,
        name: name,
        description: description,
        amount: amount,
        type: type,
      });
  }

  createBudget(
    budget: {},
    dateCreated: string,
  ): Promise<void> {
    const id = this.firestore.createId();
    const userId = JSON.parse(localStorage.getItem('user'))
    return this.firestore
      .collection('user').doc(`${userId.uid}`)
      .collection(`budget`).doc(`${dateCreated}`).set({
        id,
        budget,
        dateCreated
      });
  }

  getBudgetList() {
    const userId = JSON.parse(localStorage.getItem('user'))
    return this.firestore
      .collection('user').doc(`${userId.uid}`)
      .collection(`budget`).valueChanges();
  }
}
