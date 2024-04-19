import { Component, Input } from '@angular/core';
import { BreadcrumbService } from '../shared/services/breadcrumb.service';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-breadcrumb',
  standalone: true,
  imports: [NgClass],
  templateUrl: './breadcrumb.component.html',
  styleUrl: './breadcrumb.component.css'
})
export class BreadcrumbComponent {

  constructor(public breadcrumbService: BreadcrumbService) { }

  @Input() aplicacao: string = "";

  @Input() subAplicacao: string = "";

  @Input() sideNavAberta: boolean = false;

  ngOnInit(): void{
  }


}
