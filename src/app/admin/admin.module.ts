import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminLoginComponent } from './pages/admin-login/admin-login.component';
import { AdminMainComponent } from './pages/admin-main/admin-main.component';
import { AdminProfileComponent } from './pages/admin-profile/admin-profile.component';
import { InvitationListComponent, ModalDialog } from './pages/invitation-list/invitation-list.component';
import { MessagesComponent, ModalResponseDialog } from './pages/messages/messages.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../shared/material/material.module';
//import { firebaseConfig } from 'src/environments/environment';

import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireModule } from '@angular/fire';
import { AngularFireStorageModule } from '@angular/fire/storage';
import {  environment  } from 'src/environments/environment.prod';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import {FlexLayoutModule} from '@angular/flex-layout';
import { AdminService } from './services/admin.service';
import { AuthGuard } from './guards/auth.guard';
import { AuthService } from './services/auth.service';
import { MatSidenavModule } from '@angular/material/sidenav';
import {MatButtonToggleModule} from '@angular/material/button-toggle'
import { SharedModule } from '../shared/shared.module';
import { Ng2SmartTableModule } from 'ng2-smart-table';

@NgModule({
  declarations: [AdminLoginComponent, AdminMainComponent, AdminProfileComponent, 
    InvitationListComponent, MessagesComponent,
    ModalDialog,ModalResponseDialog, MessagesComponent],
  imports: [
    CommonModule,
    AdminRoutingModule,
    CommonModule,
    AdminRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    

    SharedModule,
    AngularFireAuthModule,
    AngularFireStorageModule,
    FontAwesomeModule,
  

    AngularFirestoreModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
  
    Ng2SmartTableModule,
  ],
  entryComponents:[ModalDialog,ModalResponseDialog],
  providers:[AdminService,AuthGuard, AngularFireAuthModule,AuthService,]

})
export class AdminModule { }
