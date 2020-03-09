import { Component, OnInit, Inject } from '@angular/core';

import { LocalDataSource } from 'ng2-smart-table';


import { AdminService } from '../../services/admin.service';
import { Router } from '@angular/router';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { pipe } from 'rxjs';
import { map, filter } from 'rxjs/operators';

@Component({
  selector: 'app-invitation-list',
  templateUrl: './invitation-list.component.html',
  styleUrls: ['./invitation-list.component.scss']
})
export class InvitationListComponent implements OnInit {
  source: LocalDataSource;


  constructor(private adminService: AdminService, public router: Router, public dialog: MatDialog) {

  }


  settings = {
    actions: {
      columnTitle: 'Actions',

      custom: [
        { name: 'viewrecord', title: '<i class="fa fa-eye"></i>' },
        { name: 'editrecord', title: '&nbsp;&nbsp;<i class="fa  fa-pencil"></i>' }
      ],
      position: 'left'
    },

    delete: {
      confirmDelete: true,
      deleteButtonContent: '<i class="fa fa-trash" style="font-size:24px;color:red"></i>'
    },
    add: {
      confirmCreate: true,
      addButtonContent: '<i class="fa fa-plus-circle"></i>',
      cancelButtonContent: '<i class="fa fa-close"></i>'
    },
    edit: {
      confirmSave: true,
      editButtonContent: '<i class="fa fa-edit"></i>',
      cancelButtonContent: '<i class="fa fa-close"></i>',
      saveButtonContent: '<i class="fa fa-save"></i>'
    },
    pager: {
      display: true,
      perPage: 25
    },
    columns: {
      invitationName: {
        title: 'Invite Name'
      },
      invitationCode: {
        title: 'Invite Code'
      },
      attendStatus: {
        title: 'Attending',
        addable: true,
        editor: {
          type: 'list',

          config: {
            list: [{ title: 'No', value: 'no' }, { title: 'Yes', value: 'yes' },
            ]
          }
        },
        filter: {
          type: 'list',
          config: {
            selectText: 'Select',
            list: [
              { value: "yes", title: 'Yes' },
              { value: "no", title: 'No' },

            ]
          }
        }
      },
      numberInParty: {
        title: 'Number in Party',
        addable: true,

      },


      // timeStamp: {
      //   title: 'Time',
      //   editable: true,
      //   addable: true,
      //   // valuePrepareFunction: (value)=>{
      //   //   var time = value.toDate();
      //   //   return time;
      //   // }
      // }
      // ,
      foodComment: {
        title: 'food comments'
      },
      songComment: {
        title: 'Song comments'
      }
    }
  };

  options = {
    fieldSeparator: ',',
    quoteStrings: '"',
    decimalseparator: '.',
    showLabels: true,
    showTitle: true,
    title: 'Your title',
    useBom: true,
    noDownload: true,
    headers: ["First Name", "Last Name", "ID"],
    nullToEmptyString: true,
  };

  export() {

    this.source.getAll().then(data => {
      this.downloadFile(data)
    })

  }

  downloadFile(data: any) {
    const replacer = (key, value) => value === null ? '' : value; // specify how you want to handle null values here
    const header = Object.keys(data[0]);
    let csv = data.map(row => header.map(fieldName => JSON.stringify(row[fieldName], replacer)).join(','));
    csv.unshift(header.join(','));
    let csvArray = csv.join('\r\n');

    var a = document.createElement('a');
    var blob = new Blob([csvArray], { type: 'text/csv' }),
      url = window.URL.createObjectURL(blob);

    a.href = url;
    a.download = "myFile.csv";
    a.click();
    window.URL.revokeObjectURL(url);
    a.remove();
  }

  numberOfYes;
  numberOfNo;
  noResponse;
  numberAttending;

  y
  n
  a
  nt
  ngOnInit() {
    this.source = new LocalDataSource()
    this.adminService.getSnapshot().subscribe(x => {
    
      this.source.load(x)
      this.y = x;
      this.n = x;
      this.a = x;
      this.nt =x;

     

      this.numberOfYes = 0;
      for (var a of this.y) {
        if (a['attendStatus'] == 'yes') {
   
          this.numberOfYes++;
        }

      }



      this.numberOfNo = 0;
      for (var b of this.n) {
        if (b['attendStatus'] == 'no') {
          this.numberOfNo++;
        }
      }


      this.noResponse = 0;
      for (var c of this.a) {
        if (c['attendStatus'] == '') {
          this.noResponse++;
        }
      }


      this.numberAttending =0;
      for (var d of this.nt) {
        if (d['numberInParty'] ) {
          this.numberAttending += +d['numberInParty']
          this.numberAttending++;
        }
      }


  

    })

  }


  onSaveConfirm(event) {


    if (event) {
      //var copy = Object.assign({}, event.newData)
      this.adminService.editInvite(event.newData)


    }
    event.confirm.resolve(event.newData)
  }

  async onCreateConfirm(event) {
    //  if (event) {

    var copy = Object.assign({}, event.newData)

    this.adminService.addInvite(copy)

  }

  onDeleteConfirm(event) {

    // console.log(event.data)
    this.adminService.deleteInvite(event.data)
    event.confirm.resolve();

  }
  goHome() {
    this.router.navigate(["/"])
  }
  addItems(data) {


  }

  savePeriod(data) {

  }
  onRowSelect($event) {

  }

  onCustomAction(event) {
    switch (event.action) {

    }
  }


  id: string;
  attendStatus: string;
  foodComment: string;
  invitationCode: string;
  invitationName: string;
  numberInParty: string;
  songComment: string;

  openDialog(event): void {
    //console.log(event)

    const dialogRef = this.dialog.open(ModalDialog, {
      width: '450px',
      data: {
        invitationName: event.data.invitationName, attendStatus: event.data.attendStatus,
        invitationCode: event.data.invitationCode, numberInParty: event.data.numberInParty,
        foodComment: event.data.foodComment, songComment: event.data.songComment
      }
    });

    dialogRef.afterClosed().subscribe(result => {
     // console.log('The dialog was closed');
      this.invitationName = result;
    });
  }


}
export interface DialogItems {
  id?: string;
  attendStatus: string;
  foodComment: string;
  invitationCode: string;
  invitationName: string;
  numberInParty: number;
  songComment: string;
}



@Component({
  selector: 'app-modal',
  templateUrl: 'invitation-modal.component.html',
})
export class ModalDialog {

  constructor(
    public dialogRef: MatDialogRef<ModalDialog>,
    @Inject(MAT_DIALOG_DATA) public data: DialogItems, private adminService: AdminService, ) { }

  saveItems(data) {
    //console.log(data)
    this.adminService.editInvite(data);

  }
  onNoClick(): void {
    this.dialogRef.close();
  }
}

