import { Component, OnInit } from '@angular/core';
import { HamburgerAnimation } from '../animations/hamburger.animation';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
  animations:[HamburgerAnimation]
})
export class LayoutComponent implements OnInit {
  isHamburguer:boolean= true;
  navbarOpen = false;
  animationState = 'in';
  isCollapsed = true;

  constructor() { }

  toggleNavbar() {
    this.navbarOpen = !this.navbarOpen;
    this.isCollapsed = !this.isCollapsed
    this.isHamburguer = !this.isHamburguer;
    this.animationState = this.animationState === 'out' ? 'in' : 'out';
  }


  doSmth(reachedTarget: boolean): void {
    if (reachedTarget) {
      //  console.log('Yeah, we reached our destination');
    } else {
      //  console.log('Ohoh, something interrupted us');
    }
  }

  ngOnInit(): void {
  }

}
