import { NgClass, NgIf } from '@angular/common';
import { Component, Input } from '@angular/core';
import {MatSidenavModule} from '@angular/material/sidenav';
import { RouterModule } from '@angular/router';


@Component({
  selector: 'app-side-nav',
  standalone: true,
  imports: [MatSidenavModule, NgIf, NgClass, RouterModule],
  templateUrl: './side-nav.component.html',
  styleUrl: './side-nav.component.css'
})
export class SideNavComponent {
  
  constructor() { }

  @Input() public estaAberta: boolean = false;

  ngOnInit() {
  }





}
