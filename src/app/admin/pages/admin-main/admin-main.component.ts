import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-admin-main',
  templateUrl: './admin-main.component.html',
  styleUrls: ['./admin-main.component.scss']
})
export class AdminMainComponent implements OnInit {
  options: FormGroup;
  constructor(public auth: AuthService, private router: Router, private route: ActivatedRoute,fb: FormBuilder) { 

    this.options = fb.group({
      bottom: 0,
      fixed: false,
      top: 0
    });
  }

  events: string[] = [];
  opened: boolean;
  shouldRun = true;
  showFiller = false;

  navItems = [{link:"/admin/invites/messages",icon:"message",title:"Messages"},
  {link:"/admin/invites/invitations",icon:"invitations",title:"Invitations"}]

  
  logout() {
    this.auth.signOut();
  }

  goToLogin() {
    this.router.navigate(['/admin/adminlogin']);
  }

  goToMessages(){
    this.router.navigate(['/admin/invites/messages']);
  }

  ngOnInit(): void {
  }

}
