import { Component, OnInit,} from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { CheckoutService } from '../../checkout.service';
import { Location } from '@angular/common';


@Component({
  selector: 'app-thankyou',
  templateUrl: './thankyou.component.html',
  styleUrls: ['./thankyou.component.scss']
})
export class ThankyouComponent implements OnInit {
  urlSafe: SafeResourceUrl;

  constructor(private CheckoutService: CheckoutService,private dom:DomSanitizer, private location: Location) { }

  ngOnInit(): void {
    var storedCheckoutUrl = this.CheckoutService.getCheckout(storedCheckoutUrl);
    this.urlSafe= this.dom.bypassSecurityTrustResourceUrl(storedCheckoutUrl);

  }

  initCheckout(){
    this.location.back();
  }

}
