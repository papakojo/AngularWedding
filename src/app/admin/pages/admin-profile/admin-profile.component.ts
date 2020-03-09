import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-profile',
  templateUrl: './admin-profile.component.html',
  styleUrls: ['./admin-profile.component.scss']
})
export class AdminProfileComponent implements OnInit {

  constructor(public auth: AuthService,public router: Router) {
    auth.user$.subscribe(user=>{
      if(user){
        router.navigate(['admin/invites']);
      }
    })}

  ngOnInit(): void {
  }

}
