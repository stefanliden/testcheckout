import { Component, OnInit } from '@angular/core';
import { ToggleService } from '../service/toggle.service';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-layouts',
  templateUrl: './layouts.component.html',
  styleUrls: ['./layouts.component.scss']
})
export class LayoutsComponent implements OnInit {

  public toggle;

  constructor(public toggleService: ToggleService, private router: Router) { }
  openToggle: boolean;

  receiveToggle($event) {
    this.openToggle = $event
    this.toggle = this.openToggle;
  }

    ngOnInit() {
    if (window.innerWidth < 1199) {
      this.router.events.subscribe(event => {
        if (event instanceof NavigationEnd) {
          this.toggleService.hide = true;
          this.toggleService.show = false;
        }
      })
    }
   }
}
