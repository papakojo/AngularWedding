import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ContactComponent } from './contact/contact.component';
import { CountDownComponent } from './count-down/count-down.component';
import { LayoutComponent } from './layout/layout.component';
import { LocationMapComponent } from './location-map/location-map.component';
import { FooterComponent } from './footer/footer.component';
import { OurStoryComponent } from './our-story/our-story.component';
import { InitialPageComponent } from './initial-page/initial-page.component';
import { RsvpComponent } from './rsvp/rsvp.component';
import { WhenWhereComponent } from './when-where/when-where.component';


import { NgxPageScrollModule } from 'ngx-page-scroll';
import { CollapseModule, BsDropdownModule } from 'ngx-bootstrap';
import { RegistryComponent } from './registry/registry.component';
import {  environment } from 'src/environments/environment.prod';

import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFirestoreModule,  } from '@angular/fire/firestore';
import { AngularFireModule } from '@angular/fire';
import { SnakyComponent } from './snaky/snaky.component';
import { ThanksRSVPComponent } from './thanks-rsvp/thanks-rsvp.component';
import { FirebaseService } from './services/firebase.service';
import { GoogleMapsModule } from '@angular/google-maps';
import { SharedModule } from './shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    AppComponent,
    ContactComponent,
    CountDownComponent,
    LayoutComponent,
    LocationMapComponent,
    FooterComponent,
    OurStoryComponent,
    InitialPageComponent,
    RsvpComponent,
    WhenWhereComponent,
    RegistryComponent,
    SnakyComponent,
    ThanksRSVPComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule, ReactiveFormsModule,
    AppRoutingModule,

    SharedModule,

    GoogleMapsModule,

    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule,
    AngularFireDatabaseModule,

    NgxPageScrollModule,
    CollapseModule.forRoot(), BsDropdownModule.forRoot(),
  ],
  entryComponents: [
    SnakyComponent,
    ThanksRSVPComponent,ContactComponent],
  providers: [FirebaseService],
  bootstrap: [AppComponent]
})
export class AppModule { }
