import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BreadcrumbService {

  constructor() { }

  public sideBarAberta: boolean = false;
}
