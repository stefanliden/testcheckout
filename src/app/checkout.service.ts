import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CheckoutService {

  getCheckout(data){
    data = JSON.parse(localStorage.getItem("checkout"));
    return data;
  }
  
  addCheckout(data){
    localStorage.setItem("checkout", JSON.stringify(data));

  }

  constructor() { }
}
