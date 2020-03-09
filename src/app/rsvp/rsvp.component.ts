import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, NgForm } from '@angular/forms';
import { FirebaseService } from '../services/firebase.service';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ContactComponent } from '../contact/contact.component';
import { Subject } from 'rxjs';
import { ThanksRSVPComponent } from '../thanks-rsvp/thanks-rsvp.component';

@Component({
  selector: 'app-rsvp',
  templateUrl: './rsvp.component.html',
  styleUrls: ['./rsvp.component.scss'],


})
export class RsvpComponent implements OnInit {


  checked = false;
  indeterminate = false;
  labelPosition = true;
  disabled = false;
  attend = false;
  openform: boolean = false;
  chosenItem
  public usForm: FormGroup;
  public searchF: FormGroup;
  public selectedOption: string;

  formMain$

  constructor(private fb: FormBuilder, private fireb: FirebaseService, public dialog: MatDialog, private _snackBar: MatSnackBar) { }

  inviteForm = new FormGroup({
    attendStatus: new FormControl(''),
    numberInParty: new FormControl(''),
    foodComment: new FormControl(''),
    songComment: new FormControl(''),
  })

  searchRes
  searchFound: boolean;
  nothingFound: boolean;
  inviteId: string;

  setValue() {
   // console.log(this.labelPosition)
    this.attend = this.labelPosition

    //console.log(this.attend)
  }

  searchresult;
  // partialSearch(searchItem) {
  //   var searchString = searchItem.toLowerCase();
  //   console.log(searchString)

  //   this.fireb.getInvite(searchString).subscribe(x => {
  //     console.log(x)
  //     this.searchresult = x
  //     return this.searchresult
  //   })
  //   //console.log(this.searchresult + "rested")

  //   return this.searchresult;
  // }
  aItems: any
  singleEvent$ = new Subject();
  searchItems() {

    var val = this.searchF.value.invitationCode.toString().trim()
    var val = val.toLowerCase();
  //  console.log(val)


    this.formMain$ = this.fireb.getInvite(val).subscribe(res => {
      //console.log(res)

      this.singleEvent$.next(res)
      this.aItems = res[0];
    //  console.log(this.aItems)
      if (this.aItems) {
        this.inviteId = this.aItems['Id']
        this.searchFound = true;
        this.searchRes = "✾─ Hello " + this.aItems['invitationName'] + " ─✾";
        this.nothingFound = false;
        // console.log(this.searchRes)
        this.inviteForm.get('foodComment').setValue(this.aItems['foodComment'] ? this.aItems['foodComment'] : ['']);
        this.inviteForm.get('songComment').setValue(this.aItems['songComment'] ? this.aItems['songComment'] : ['']);
        this.inviteForm.get('numberInParty').setValue(this.aItems['numberInParty'] ? this.aItems['numberInParty'] : [1]);
        this.inviteForm.get('attendStatus').setValue(this.aItems['attendStatus'] ? this.aItems['attendStatus'] : ['yes']);
        this.openform = true;
      }


      else {
        this.searchFound = false;
        this.nothingFound = true;
        this.searchRes = "Nothing found "
        this.openform = false;
      }
    })


  }
  //openform;
  showForm() {
    this.openform = true;

  }


  resetForm() {

    this.openform = false;
    this.searchF.reset({})
    this.inviteForm.reset({})

  }

  searchForm() {
    this.searchF = this.fb.group({
      invitationCode: []
    })
  }
  durationInSeconds = 5;

  openSnackBar() {
    this._snackBar.openFromComponent(ThanksRSVPComponent, {
      duration: this.durationInSeconds * 1000,
      horizontalPosition: 'center',
      panelClass: ['rsvp-snackbar'],
    });
  }

  @ViewChild('myForm') myForm: NgForm;

  submitRSVP() {


    var formValue = this.inviteForm.value;

    formValue['timeStamp'] = this.fireb.timestamp
    formValue['Id'] = this.inviteId
    if ((formValue != null) || (formValue["invitationName"] != null)) {
      this.fireb.updateInvite(formValue).then(r => {
        formValue = null
      }
      )

    }
    else {
      this.searchRes = "Please the word in the search box"
    }





    this.resetForm()
    this.myForm.resetForm();

    this.aItems = {}
    this.searchRes = null
    //  form.form.markAsPristine();
    //form.resetForm();
    this.formMain$.unsubscribe()

    this.resetForm()
    this.openSnackBar();
  //  console.log(this.inviteForm.value)

  }

  openDialog(): void {

    let dialogRef = this.dialog.open(ContactComponent, {
      width: '500px',
      height: '450px',
      disableClose: false,
    }
    );
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });

  }



  ngOnInit(): void {

    this.searchForm()
    this.searchFound = false;
    this.nothingFound = false;
  }

}
