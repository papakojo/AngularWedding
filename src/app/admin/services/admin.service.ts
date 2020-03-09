import { Injectable } from '@angular/core';
import { AngularFirestoreCollection, AngularFirestoreDocument, AngularFirestore } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';

import {firestore} from 'firebase/app'


@Injectable({
  providedIn: 'root'
})
export class AdminService {
  adminInvatationCollection: AngularFirestoreCollection<any>;
  messageCollection: AngularFirestoreCollection<any>;
  private itemDoc: AngularFirestoreDocument<any>;

  constructor(private afs: AngularFirestore, ) {
    // this.adminInvatationCollection = this.afs.collection('invitations');
    // this.messageCollection = this.afs.collection('messages')
  }



  getSnapshot() {
    this.adminInvatationCollection = this.afs.collection('invitations')
    return this.adminInvatationCollection.snapshotChanges().pipe(
      map((actions) => {
        return actions.map((a) => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;

          return { id, ...data };
        });
      }));
  }

  getMessageSnapShot() {
    this.messageCollection = this.afs.collection('messages')
    return this.messageCollection.snapshotChanges().pipe(
      map((actions) => {
        return actions.map((a) => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;

          return { id, ...data };
        });
      }));
  }


  addInvite(data) {
    this.adminInvatationCollection = this.afs.collection('invitations')

    data["timeStamp"] = this.timestamp
    this.adminInvatationCollection.add(data);

  }

  editInvite(data) {
  //  console.log(data)


    const path = `invitations/${data.id}`; // Endpoint on firebase

    this.itemDoc = this.afs.doc<any>(path);



    this.itemDoc.update(data) // .set() works correctly right here...
      .catch(error => console.log(error));

  }

  deleteInvite(data) {
    //console.log(data)
    const path = `invitations/${data.id}`; // Endpoint on firebase
   // console.log(path)
    this.itemDoc = this.afs.doc<any>(path);
    this.itemDoc.delete() // .set() works correctly right here...
      .catch(error => console.log(error));
  }

  getInvite() {

  }

  //count

  sendMessageResponse(data) {
    const path = `messages/${data.id}`; // Endpoint on firebase

    this.itemDoc = this.afs.doc<any>(path);


    this.itemDoc.update(data) // .set() works correctly right here...
      .catch(error => console.log(error));

  }

  get timestamp() {
    return firestore.FieldValue.serverTimestamp();
  }
}
