import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { ToggleService } from '../../service/toggle.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  public open: boolean = false;
  
  constructor(private toggleService : ToggleService) { }

  openGitHubAPI(){
    window.open("https://developer.porterbuddy.com/", "_blank");
  }
  openGitHub(){
    window.open("https://github.com/PorterBuddy/", "_blank");
  }
  openPorterBuddySite(){
    window.open("https://porterbuddy.com", "_blank");
  }
  switchToggle(){
    this.toggleService.sidebar();
  }

  openTopbar(){
    this.open = !this.open;
  }

  ngOnInit() {
  }

}
