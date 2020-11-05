import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

import { Observable } from 'rxjs';
import { Spend } from '../../shared/models/spend.interface';
import { Income } from '../../shared/models/income.interface';

@Injectable({
  providedIn: 'root'
})
export class FirestoreService {
  public userId = JSON.parse(localStorage.getItem('user'))

  constructor(public firestore: AngularFirestore) { }


  createCategories(userId: string): Promise<void> {
    // const id = this.firestore.createId();
    const categories = ["Food", "Eating Out", "Personal", "Entertainment", "Service", "Bills", "Other"]
    return this.firestore.collection('users').doc(`${userId}`).set({
      // id,
      categories
    });
  }

  getCategoriesList() {

    return this.firestore.collection(`users`).doc(`${this.userId.uid}`).valueChanges()
  }

  updateCategories(categories: any[]) {

    return this.firestore.collection(`users`).doc(`${this.userId.uid}`).update({ categories })
  }

  getSpendList(): Observable<Spend[]> {

    const spendCollection = this.firestore
      .collection('users').doc(`${this.userId.uid}`)
      .collection<Spend>(`spend`, ref => ref.orderBy("dateCreated"));

    const spend = spendCollection.valueChanges()
    return spend;
  }

  // getSpendList() {

  //   return this.firestore
  //     .collection('users').doc(`${this.userId.uid}`)
  //     .collection<Spend>(`spend`, ref => ref.orderBy("dateCreated"));

  // }

  createSpend(
    dateCreated: string,
    name: string,
    description: string,
    category: string,
    amount: string,
    type: string
  ): Promise<void> {
    const id = this.firestore.createId();

    return this.firestore
      .collection('users').doc(`${this.userId.uid}`)
      .collection(`spend`).doc(`${id}`)
      .set({
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
    return this.firestore
      .collection('users').doc(`${this.userId.uid}`)
      .collection(`spend`).doc<Spend>(spendId).valueChanges();
  }

  deleteSpend(spendId: string): Promise<void> {
    return this.firestore
      .collection('users').doc(`${this.userId.uid}`)
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
    return this.firestore
      .collection('users').doc(`${this.userId.uid}`)
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
    const incomeCollection = this.firestore
      .collection('users').doc(`${this.userId.uid}`)
      .collection<Income>(`income`, ref => ref.orderBy("dateCreated"));

    const income = incomeCollection.valueChanges();
    return income;
  }

  createIncome(
    dateCreated: string,
    name: string,
    description: string,
    amount: string,
    type: string
  ): Promise<void> {
    const id = this.firestore.createId();
    return this.firestore
      .collection('users').doc(`${this.userId.uid}`)
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
    return this.firestore
      .collection('users').doc(`${this.userId.uid}`)
      .collection(`income`).doc<Income>(incomeId).valueChanges();
  }

  deleteIncome(incomeId: string): Promise<void> {
    return this.firestore
      .collection('users').doc(`${this.userId.uid}`)
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
    return this.firestore
      .collection('users').doc(`${this.userId.uid}`)
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
    return this.firestore
      .collection('users').doc(`${this.userId.uid}`)
      .collection(`budget`).doc(`${dateCreated}`).set({
        id,
        budget,
        dateCreated
      });
  }

  getBudgetList() {
    return this.firestore
      .collection('users').doc(`${this.userId.uid}`)
      .collection(`budget`).valueChanges();
  }
}
