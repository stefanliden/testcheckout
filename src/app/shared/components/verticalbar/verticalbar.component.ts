import { Component, OnInit } from '@angular/core';
import { NavService, Menu } from '../../service/nav.service';
import { ToggleService } from '../../service/toggle.service';

@Component({
  selector: 'app-verticalbar',
  templateUrl: './verticalbar.component.html',
  styleUrls: ['./verticalbar.component.scss']
})
export class VerticalbarComponent implements OnInit {
  public close: boolean = false;
  public menuItems: Menu[];

  constructor(public navServices: NavService, public toggleService: ToggleService) { }
  changeover(event) {
    if (event.target.nextElementSibling != null)
      event.target.nextElementSibling.classList.remove('menu-open');
  }

  // Click Toggle menu
  toggletNavActive(item, event) {
    if (!item.active) {
      this.menuItems.forEach(a => {
        if (this.menuItems.includes(item))
          a.active = false
        if (!a.children) {
          return false
        }
        a.children.forEach(b => {
          if (event.target.nextElementSibling != null)
            event.target.nextElementSibling.classList.add('menu-open');
          if (a.children.includes(item)) {
            b.active = false
          }
        })
      });
    }
    item.active = !item.active
  }

  closeSidebar() {
    this.toggleService.hide = true;
    this.toggleService.show = false;
  }

  ngOnInit() {
    this.navServices.items.subscribe(menuItems => {
      this.menuItems = menuItems
    });
  }

}