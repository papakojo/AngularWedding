import { Component, OnInit } from '@angular/core';

import { MatDialog } from '@angular/material/dialog';
import { ContactComponent } from '../contact/contact.component';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  constructor(public dialog: MatDialog) { }

  openContact(): void {

    let dialogRef = this.dialog.open(ContactComponent, {
      width: '500px',
      height: '450px',
      disableClose: false,
    }
    );
    dialogRef.afterClosed().subscribe(result => {
    //  console.log('The dialog was closed');
    });

  }

  ngOnInit(): void {
  }

}
