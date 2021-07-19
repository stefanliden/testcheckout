import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subscriber } from 'rxjs';

// Menu
export interface Menu {
  path?: string;
  title?: string;
  icon?: string;
  type?: string;
  headTitle?: string;
  badgeType?: string;
  badgeValue?: string;
  active?: boolean;
  children?: Menu[];
}

// @Injectable()
@Injectable({
  providedIn: 'root'
})

export class NavService {

  constructor() { }

  MENUITEMS: Menu[] = [
    {
    },
   
  ]
  items = new BehaviorSubject<Menu[]>(this.MENUITEMS);

}
