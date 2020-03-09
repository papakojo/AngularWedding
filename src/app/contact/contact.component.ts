import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import {  MatSnackBar } from '@angular/material/snack-bar';
import{MatDialogRef} from '@angular/material/dialog'

import {  AngularFireDatabase } from 'angularfire2/database';
import { AngularFirestore } from '@angular/fire/firestore';
import { SnakyComponent } from '../snaky/snaky.component';


@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {

  form: FormGroup;

  constructor(private fb: FormBuilder, private af: AngularFireDatabase, private afs:AngularFirestore,
    public dialogRef: MatDialogRef<ContactComponent>, public snackBar: MatSnackBar
    ) { dialogRef.disableClose = true, this.createForm();}

    createForm() {
      this.form = this.fb.group({
        name: ['', Validators.required],
        email: ['', Validators.required],
        message: ['', Validators.required],
      });
    }
    onSubmit() {
      const {name, email, message} = this.form.value;
      const date = Date();


      const html = `
        <div>From: ${name}</div>
        <div>Email: <a href="mailto:${email}">${email}</a></div>
        <div>Date: ${date}</div>
        <div>Message: ${message}</div>
      `;
      let formRequest = { name, email, message, date, html };
      this.af.list('/messages').push(formRequest);
      this.afs.collection('messages').add(formRequest);
      this.form.reset();
      this.dialogRef.close();

      //alert("message sent")
      this.openSnackBar()

    }
    onCloseClick(): void {
      this.dialogRef.close();
    }

    openSnackBar() {
      this.snackBar.openFromComponent(SnakyComponent, {
        duration: 500,
        
      });
    }
    
  cancel(): void {
    this.dialogRef.close();
    //alert("message cancelled")
  }
  onClosed(): void {
    this.dialogRef.afterClosed().subscribe(result => {
      this.openSnackBar()
    });
  }

  ngOnInit(){}

}