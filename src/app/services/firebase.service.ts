import { Injectable } from '@angular/core';

import { AngularFirestoreCollection, AngularFirestoreDocument, AngularFirestore } from '@angular/fire/firestore';


import { firestore } from 'firebase/app';


@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  invatationCollection: AngularFirestoreCollection<any>;
  mainWordsCollection: AngularFirestoreCollection<any>;
  subWordsCollection: AngularFirestoreCollection<any>;
  private itemDoc: AngularFirestoreDocument<any>;

  constructor(private afs: AngularFirestore) {
   
  }

  getInvite(inviteCode){
    return  this.afs.collection('invitations', ref => ref.where('invitationCode','==', inviteCode)).valueChanges({ idField: 'Id' })
   }

   updateInvite(data) {
  //  console.log(data)
    const path = `invitations/${data.Id}`; // Endpoint on firebase
    this.itemDoc = this.afs.doc<any>(path);
   return this.itemDoc.update(data) // .set() works correctly right here...
    //  .catch(error => console.log(error));
  }


  get timestamp() {
    return firestore.FieldValue.serverTimestamp();
  }
}
