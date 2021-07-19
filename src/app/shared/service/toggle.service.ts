import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ToggleService {
  public show: boolean = false;
  public hide: boolean = true;

  sidebar() {
    this.show = true;
    this.hide = false;
  }

  constructor() { }
}
