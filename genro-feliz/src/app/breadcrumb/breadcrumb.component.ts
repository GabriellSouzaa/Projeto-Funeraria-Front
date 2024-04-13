import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-breadcrumb',
  standalone: true,
  imports: [],
  templateUrl: './breadcrumb.component.html',
  styleUrl: './breadcrumb.component.css'
})
export class BreadcrumbComponent {

  constructor() { }

  @Input() aplicacao: string = "";

  @Input() subAplicacao: string = "";

  ngOnInit(): void{

  }


}
