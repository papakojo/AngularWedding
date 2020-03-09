import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { WhenWhereComponent } from './when-where/when-where.component';
import { RsvpComponent } from './rsvp/rsvp.component';
import { OurStoryComponent } from './our-story/our-story.component';
import { LayoutComponent } from './layout/layout.component';


export const CONTENT_ROUTES: Routes = [
  {
    path: 'ourstory',
    component: OurStoryComponent,
  },
  {
    path: 'rsvp',
    component: RsvpComponent,
  },
  {
    path: 'whenwhere',
    component: WhenWhereComponent,
  },



]
const routes: Routes = [

  {
    path:'',
    component:LayoutComponent ,
    children: CONTENT_ROUTES
  },
  {
    path: 'admin',
    loadChildren: () => import('src/app/admin/admin.module').then(m => m.AdminModule)
  }
 

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
