import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminProfileComponent } from './pages/admin-profile/admin-profile.component';
import { AuthGuard } from './guards/auth.guard';
import { AdminMainComponent } from './pages/admin-main/admin-main.component';
import { InvitationListComponent } from './pages/invitation-list/invitation-list.component';
import { MessagesComponent } from './pages/messages/messages.component';


const routes: Routes = [
  {
      path: '',

      component: AdminProfileComponent

  },



  {
      path: 'invites',
      canActivate: [AuthGuard],
      component: AdminMainComponent,
      children: [
          { path: '', redirectTo: 'invitations', pathMatch: 'full' },
          { path: 'invitations', component: InvitationListComponent, },
          {
              path: 'messages',
      
              component: MessagesComponent
      
          },]
  }
]
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [AuthGuard],
})
export class AdminRoutingModule { }
