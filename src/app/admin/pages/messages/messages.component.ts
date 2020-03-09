import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs';
import { trigger, state, style, transition, animate } from '@angular/animations';
//import { MatPaginator, MatSort, MatTableDataSource, MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material';
import { AdminService } from '../../services/admin.service';
import { DialogItems } from '../invitation-list/invitation-list.component';
import { Form, FormBuilder, Validators, FormGroup } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';

export interface Message {
  name: string;
  email: string;
  message: number;
  date: string;
}
@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0', display: 'none' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class MessagesComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  displayedColumns: string[] = ['name', 'email', 'message', 'date', 'actions'];
  dataSource

  //= ELEMENT_DATA;
  expandedElement: Message;
  messages: Observable<any[]>;
  constructor(private db: AngularFireDatabase, private adminService: AdminService, public dialog: MatDialog) {
    // this.messages = db.list('messages').valueChanges();


  }

  submit(data) {
    this.adminService.sendMessageResponse(data)

  }

openResponse(data){
//   console.log(row)
// }

//   openDialog(data): void {
   // console.log(event)

    const dialogRef = this.dialog.open(ModalResponseDialog, {
      width: '450px',
      data: {
        data: data
      }
    });

    dialogRef.afterClosed().subscribe(result => {
    //  console.log('The dialog was closed');
     //console.log(result)
    });
  }

  allData
  ngOnInit() {
    this.adminService.getMessageSnapShot().subscribe(data => {
      this.allData = data
      this.dataSource = new MatTableDataSource(this.allData)
      this.dataSource.sort = this.sort
      this.dataSource.paginator = this.paginator
    })
 
      ;
  }

}



@Component({
  selector: 'app-responsemodal',
  templateUrl: 'response.component.html',
})
export class ModalResponseDialog {
responseForm: FormGroup;
  constructor(
    public dialogRef: MatDialogRef<ModalResponseDialog>,
    @Inject(MAT_DIALOG_DATA) public data: DialogItems, private adminService: AdminService, public fb:FormBuilder) {

  dialogRef.disableClose = true, this.createForm();}

    createForm() {
      this.responseForm = this.fb.group({
        response: ['' ]
     
      });
    }

  saveItems(data) {
   // console.log(data)

  }

  sendResponse() {
    this.data['data']['response'] = this.responseForm.value['response']
  //  console.log(this.data['data'])
    this.adminService.sendMessageResponse(this.data['data'])

  }
  onCloseClick(): void {
    this.dialogRef.close();
  }


}