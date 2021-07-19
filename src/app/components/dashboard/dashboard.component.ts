import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import * as CryptoJS from 'crypto-js';
import { FormBuilder, FormControl, FormArray, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CheckoutService } from '../../checkout.service';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  title = 'checkout';
  titlePB = "Create Checkout"
  submitted = false;
  cartDataBool = false;
  checkoutDataBool = false;
  customerDataBool = false;
  articleDataBool = false;
  credTestDataBool = false;
  credDataBool = false;
  paymentDataBool = false;
  showErrorDataBool = false;
  
  showCredentials = false;
  showCustomer = false;
  showCustomerShipping = false;
  expandAllBool = false ;
  showIframe = false;
  showSpinner = true;
  debugBool = false;
  orderID  : any;
  articleDataBool1 = false;
  showIframe1 = false;
  deliveryWindow : any;
  url: string = "";
  urlSafe: SafeResourceUrl;
  requestData: string[];
  bco: any;
  errorData: any;
  checkoutNumber: any;
  myObj: {};
  checkoutObj: {};
  avError = false;
  cartDataForm: FormGroup;
  credentialDataForm: FormGroup;
  paymentDataForm: FormGroup;
  checkoutDataForm: FormGroup;
  originAddress: FormGroup;
  destinationAddress: FormGroup;

  customerFormBilling: FormGroup;
  customerFormShipping: FormGroup;
  customerFormAdressNr: FormGroup;
  articleForm: FormGroup;
  articleForm1: FormGroup;

  contactForm: FormGroup;
  orderForm: FormGroup;

  selectedBool = false;
  parcels: FormGroup;
  recipient: FormGroup;
  pickupWindows: FormGroup;

saveData : any;
  debugTitle = "Show Debug";
  expandTitle = 'Expand All';
  updateTitle = "InitCheckout"


  constructor(private sanitizer: DomSanitizer, private http: HttpClient, private formBuilder: FormBuilder, public router: Router, private CheckoutService: CheckoutService,
  ) { }


  public showDebug() {
    if (this.debugBool == false) {
      this.debugTitle = "Hide Debug"; this.debugBool = true; this.expandAllBool = true;
      this.expandAll();
    }
    else {
      this.debugTitle = "Show Debug";
      this.debugBool = false;
      this.expandAllBool = true;
      this.expandAll();
    }
  }

  

  public expandAll() {
    if (this.expandAllBool == false) {
      this.expandAllBool = true;
      this.cartDataBool = true;
      this.customerDataBool = true;
      this.articleDataBool = true;
      this.credTestDataBool = true;
      this.credDataBool = true;
      this.paymentDataBool = true;
      this.articleDataBool1 = true;
      this.checkoutDataBool = true;
      this.expandTitle = 'Collapse All';
    }
    else {
      this.expandAllBool = false;
      this.cartDataBool = false;
      this.customerDataBool = false;
      this.articleDataBool = false;
      this.credTestDataBool = false;
      this.credDataBool = false;
      this.paymentDataBool = false;
      this.articleDataBool1 = false;

      this.checkoutDataBool = false;
      this.expandTitle = 'Expand All';
    }
  }

  public cartDataShow(event) {
    if (this.cartDataBool == false) { this.cartDataBool = true; } else { this.cartDataBool = false; }
  }

  public customerDataShow(event) {
    if (this.customerDataBool == false) { this.customerDataBool = true; } else { this.customerDataBool = false; }
  }

  public articleDataShow(event) {
    if (this.articleDataBool == false) { this.articleDataBool = true; } else { this.articleDataBool = false; }
  }
  public articleDataShow1(event) {
    if (this.articleDataBool1 == false) { this.articleDataBool1 = true; } else { this.articleDataBool1 = false; }
  }

  public credTestDataShow(event) {
    if (this.credTestDataBool == false) { this.credTestDataBool = true; } else { this.credTestDataBool = false; }
  }

  public credDataShow(event) {
    if (this.credDataBool == false) { this.credDataBool = true; } else { this.credDataBool = false; }
  }

  public paymentDataShow(event) {
    if (this.paymentDataBool == false) { this.paymentDataBool = true; } else { this.paymentDataBool = false; }
  }


  public checkoutDataShow(event) {
    if (this.checkoutDataBool == false) { this.checkoutDataBool = true; } else { this.checkoutDataBool = false; }
  }

  numberOnly(event): boolean {
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;

  }

  

  createOrder(){
    console.log(this.deliveryWindow);
    let originAddress = JSON.parse(JSON.stringify(this.originAddress.value));
    let recipientAdress = JSON.parse(JSON.stringify(this.recipient.value));
    let destinationAddress = JSON.parse(JSON.stringify(this.destinationAddress.value));
    let pickupWindows = JSON.parse(JSON.stringify(this.articleForm1.value.products));
    let parcels = JSON.parse(JSON.stringify(this.articleForm.value.products));

    

    var orderInfo = {
    
      "origin": {
        "name": "Nils Johansen (Sender)",
        "address" : originAddress,
        "email": "testemail+sender@porterbuddy.com",
        "phoneCountryCode": "+47",
        "phoneNumber": "65127865"
      },

      "destination":  {
        "name": "Roger Olsen (Recipient)",
        "address": destinationAddress,
       "email" : recipientAdress.email,
       "phoneCountryCode" : recipientAdress.phoneCountryCode,
       "phoneNumber" : recipientAdress.phoneNumber,

        "deliveryWindow": this.deliveryWindow,
        "verifications": {
          "minimumAgeCheck": 16,
          "leaveAtDoorstep": false,
          "idCheck": true,
          "requireSignature": false,
          "onlyToRecipient": true
      }
    },
      "parcels":    parcels,

      "product": "delivery",
      "courierInstructions": "Test",
      "shipmentIdentifier": "12345"

      }
    
      var x = Math.random();

      console.log(orderInfo);
      let header = new HttpHeaders();
      header = header.append('content-type', 'application/json');
      header = header.append('Access-Control-Allow-Origin', '*');
      header = header.append('Access-Control-Allow-Methods', 'POST');
      header = header.append('x-api-key', 'yOxaPhpechYuey1mi16JZNI4p4laved0LKuOw8KS');
      header = header.append('Idempotency-Key', x.toString());



      const headers1 = {
        "x-api-key": "yOxaPhpechYuey1mi16JZNI4p4laved0LKuOw8KS", // your public token

        "Content-Type": "application/json",
     
        'Idempotency-Key': x.toString(),


    
        // Public token must be sed on frontend side, for backend integration use your api key and header
        // "x-api-key" as specified in the API documentation
      }
    
      var orderInfosec = JSON.stringify(orderInfo);

      
      const response =  fetch('https://api.porterbuddy-test.com/order', {
        method: "POST",
        headers: headers1,
        body: orderInfosec,
        credentials: 'include',
      })
      .then(response => response.json())
      .then(data => {
   
    
       
      })
      .catch((error) => {
        this.avError = false;
        this.showErrorDataBool = true;
        
        this.showIframe = false;
        this.errorData = {"Messege": "Something whent wrong please check error"};
      });
    
      
      
      
      console.log(orderInfosec);
     
      this.http.post("https://api.porterbuddy-test.com/orde1r", orderInfosec, { headers: header }
      )
        .subscribe(
          data => {
            this.showIframe1 = true;
            this.selectedBool = false;
            this.orderID = (data as any).orderId
           console.log((data as any)._links.userInformation.href);
           this.showIframe = false;
           this.urlSafe = this.sanitizer.bypassSecurityTrustResourceUrl((data as any)._links.userInformation.href);

          },
          error => {
            this.showIframe1 = false;

            this.myObj = error.error[0];
            
          }
      
        );

  

  


  }
  avabilityReqest(){
    this.showIframe = false;
    this.showIframe1 = false;
    this.titlePB = "Update Checkout"
    this.avError =true;
    console.log("asds");

    let originAddress = JSON.parse(JSON.stringify(this.originAddress.value));
    let recipientAdress = JSON.parse(JSON.stringify(this.recipient.value));
    let destinationAddress = JSON.parse(JSON.stringify(this.destinationAddress.value));
    let pickupWindows = JSON.parse(JSON.stringify(this.articleForm1.value.products));
    let parcels = JSON.parse(JSON.stringify(this.articleForm.value.products));




    var dataCheckout1 = {
    
        "pickupWindows": pickupWindows,
        "originAddress": originAddress,
        "destinationAddress": destinationAddress,
        "recipient": recipientAdress,
        "products": [ "delivery" ],
        "parcels":    parcels,

    

    }

let header = new HttpHeaders();
header = header.append('x-api-key', 'yOxaPhpechYuey1mi16JZNI4p4laved0LKuOw8KS');
header = header.append('content-type', 'application/json');
header = header.append('Access-Control-Allow-Methods', 'POST');
header = header.append('Access-Control-Allow-Origin', 'https://api.porterbuddy-test.com/availability');
header = header.append('Access-Control-Allow-Credentials', 'true');

const httpOptions = {
  headers: new HttpHeaders({
    "content-type": "application/json",
    "accept":"application/json",
    "x-public-token": "yOxaPhpechYuey1mi16JZNI4p4laved0LKuOw8KS",
    'Access-Control-Allow-Origin': 'api.porterbuddy-test.com'

  }),
  withCredentials: true,
  secure: false
};

var dataCheckoutToJson1 = JSON.stringify(dataCheckout1);
console.log(dataCheckoutToJson1);



  const headers = {
    "content-type": "application/json",
    "accept":"application/json",
    "x-public-token": "PeVR7JvLZSKcbQWolrQvKj3vdxEE1B6kRTixeTjM", // your public token

    // Public token must be sed on frontend side, for backend integration use your api key and header
    // "x-api-key" as specified in the API documentation
  }

 

  // use test or production URL depending on environment
  const response =  fetch('https://api.porterbuddy-test.com/availability', {
    method: "POST",
    headers: headers,
    body: dataCheckoutToJson1
  })
  .then(response => response.json())
  .then(data => {


    this.saveData = data;
    this.checkoutObj = dataCheckout1;
    this.myObj = {};

   (window as any).porterbuddy = {  
    token: "PeVR7JvLZSKcbQWolrQvKj3vdxEE1B6kRTixeTjM", // your public token
    view: "checkout",
    availabilityResponse: data,
    initialSelectedWindow	 : (data as any).deliveryWindows[0],


  //  initialSelectedWindow	 : availabilityResponse.deliveryWindows[3],

    onSetCallbacks: function (callbacks) {
      (window as any).forceRefreshReference = callbacks.forceRefresh;
      (window as any).unselectDeliveryWindow = callbacks.unselectDeliveryWindow;
      (window as any).setSelectedDeliveryWindow = callbacks.setSelectedDeliveryWindow;
  },


  onUpdateDeliveryWindows: (callback, additionalInfo) => {
    console.log("heej");
    console.log(this.saveData);
    (window as any).forceRefreshReference();

      callback(this.saveData.deliveryWindows)
      console.log((window as any).porterbuddy);
  },


    onSelectDeliveryWindow: (deliveryWindow) => {
      console.log(deliveryWindow);
      this.selectedBool = true;
      console.log("now");
     this.deliveryWindow = deliveryWindow;
    }
    

    
  }
  this.avError = true;
  this.showErrorDataBool = false;
  console.log("bamse")
  if(this.hej > 1){
  this.hej1();
  }
  this.hej = 2;
    
    console.log('Success:', data);
  })
  .catch((error) => {
    this.avError = false;
    this.showErrorDataBool = true;
    
    this.showIframe = false;
    this.errorData = {"Messege": "Something whent wrong please check error"};
  });

  

}

hej = 1;
  
hej1(){

  console.log("asd");
  (window as any).forceRefreshReference();

}
  public initCheckout() {
    this.updateTitle = "initCheckout"
    this.errorData = [];
    this.showErrorDataBool = false;
    this.debugBool = false;
    this.showSpinner = true;
    var withTaxArticle = 0;
    var depthCmTotal = 0;
    let cartForm = JSON.parse(JSON.stringify(this.cartDataForm.value));
    let credentialData = JSON.parse(JSON.stringify(this.credentialDataForm.value));
    let paymentData = JSON.parse(JSON.stringify(this.paymentDataForm.value));
    let checkoutData = JSON.parse(JSON.stringify(this.checkoutDataForm.value));
    let articlesForm = JSON.parse(JSON.stringify(this.articleForm.value.products))
    let customer = JSON.parse(JSON.stringify(this.customerFormAdressNr.value));
    let customerBilling = JSON.parse(JSON.stringify(this.customerFormBilling.value));
    let customerFormShipping = JSON.parse(JSON.stringify(this.customerFormShipping.value));
    var handlingtax = cartForm.handlingtax;
    var handling = cartForm.handling * 100;
    var shippingtax = cartForm.shippingtax;
    var shipping = cartForm.shipping * 100;
    var articlesObj = [];

    depthCmTotal = handling + shipping;

    articlesForm.forEach(element => {
      element.depthCm = element.depthCm * 100;
      element.widthCm = element.widthCm * 100;
      articlesObj.push(element);
    });


    articlesObj.forEach(element => {
      withTaxArticle += element.taxrate * element.depthCm;
      depthCmTotal += element.depthCm;
    });

    var withtaxTotal = withTaxArticle + (handlingtax * handling) + (shippingtax * shipping);
    var tax = 0;
    tax = withtaxTotal - depthCmTotal;
    var requestData =

    {
      "CheckoutData": {
        "terms": checkoutData.terms,
        "privacyPolicy": checkoutData.privacyPolicy,
        "redirectOnSuccess": checkoutData.redirectOnSuccess,
        "companyView": checkoutData.companyView,
        "showPhoneOnDelivery": "false",
        "billingPhoneMandatory": "true",
        "hideShippingAddress": checkoutData.hideShippingAddress

      },
      "PaymentData": {
        "currency": "SEK",
        "language": "sv",
        "country": "SE",
        "orderid": paymentData.orderid,
        "cancelurl": paymentData.cancelurl,
        "accepturl": paymentData.accepturl,
        "callbackurl": paymentData.callbackurl,
        "returnmethod": paymentData.returnmethod
      },
      "Articles":
        articlesObj
      ,
      "Cart": {
        "Handling": {
          "depthCm": handling,
          "taxrate": handlingtax
        },
        "Shipping": {
          "depthCm": shipping,
          "taxrate": shippingtax
        },
        "Total": {
          "depthCm": depthCmTotal,
          "tax": tax,
          "withtax": withtaxTotal,
          "rounding": 0
        },
      }

    }


    if (this.showCustomer == true) {
      customer.Billing = customerBilling;
      if (this.showCustomerShipping == true) {
        customer.Shipping = customerFormShipping;
        customer.dataIsEditable = "true";
      }
      requestData['Customer'] = customer;
    }

    var tmp = CryptoJS.HmacSHA512(JSON.stringify(requestData), credentialData.secret);
    var hashishash = CryptoJS.enc.Hex.stringify(tmp);

    var dataCheckout = {
      "credentials": {
        "id": credentialData.id,
        "hash": hashishash,
        "version": credentialData.version,
        "client": credentialData.client,
        "language": "sv",
        "serverdata": '{}',
        "time": new Date().getTime(),
        "test": "true"
      },
      "data": requestData,

      "function": "initCheckout"

    }

    var dataCheckoutToJson = JSON.stringify(dataCheckout);
    let header = new HttpHeaders();
    header = header.append('content-type', 'application/json');
    this.http.post("https://checkout./demo.php", dataCheckoutToJson, { headers: header }
    )
      .subscribe(
        data => {
          this.bco = data;
          this.myObj = dataCheckout;
          if (this.bco.data == undefined) {
            this.showErrorDataBool = true;
            this.showSpinner = false;
            this.errorData = data;
          }
          else {
            this.checkoutNumber = this.bco.data.number;
            this.urlSafe = this.sanitizer.bypassSecurityTrustResourceUrl(this.bco.data.url);
            this.showIframe = true;
            this.showSpinner = false;
            this.CheckoutService.addCheckout(this.bco.data.url);
          }

        },
        error => {
          this.showIframe = false;
          this.myObj = error;
        }

      );
  }


  bajs(){
    var data = JSON.stringify({
      "origin": {
        "name": "Nils Johansen (Sender)",
        "address": {
          "streetName": "Keysers Gate",
          "streetNumber": "3",
          "postalCode": "0165",
          "city": "Oslo",
          "country": "Norway"
        },
        "email": "stefan@porterbuddy.com",
        "phoneCountryCode": "+47",
        "phoneNumber": "65127865",
        "pickupWindows": [
          {
            "start": "2021-05-28T17:30:00+02:00",
            "end": "2021-05-28T19:30:00+02:00"
          }
        ]
      },
      "destination": {
        "name": "Mats Olsen (Recipient)",
        "address": {
          "streetName": "Høyenhallveien",
          "streetNumber": "25",
          "postalCode": "0678",
          "city": "Oslo",
          "country": "Norway"
        },
        "email": "stefan@porterbuddy.com",
        "phoneCountryCode": "+47",
        "phoneNumber": "700911516",
        "deliveryWindow": {
          "start": "2021-12-02T19:30:00+01:00",
          "end": "2021-12-02T21:30:00+01:00",
          "token": "E0LyQuF/rQSHCuyXIh6mfQ==:eIbBL7D4aIECETdfNQwJ2g==:iEa4BrDuKeoQCnbt4J/gCgyf+NHpl3XAKr2Wyv9/r0c0FUk0veWkp/cjrOwIJg+qquTgA/+2je3qqdzLkeJgGMT1N5rZlxzKsQsq/jMKcZbAU2lmiAFaKa5B8qm21aFFYXgWAymPS60pPAD+Dyg/eg=="
        },
        "verifications": {
          "minimumAgeCheck": 16,
          "leaveAtDoorstep": false,
          "idCheck": true,
          "requireSignature": false,
          "onlyToRecipient": true
        }
      },
      "parcels": [
        {
          "description": "Shoes",
          "widthCm": 1,
          "heightCm": 40,
          "depthCm": 1,
          "weightGrams": 2000,
          "parcelShipmentIdentifier": "12345"
        },
        {
          "description": "Shoes",
          "widthCm": 1,
          "heightCm": 40,
          "depthCm": 1,
          "weightGrams": 2000,
          "parcelShipmentIdentifier": "12346"
        }
      ],
      "product": "delivery",
      "courierInstructions": "Test",
      "shipmentIdentifier": "1192345"
    });
    
    var xhr = new XMLHttpRequest();
    xhr.withCredentials = true;
    
    xhr.addEventListener("readystatechange", function() {
      if(this.readyState === 4) {
        console.log(this.responseText);
      }
    });
    
    xhr.open("POST", "https://api.porterbuddy-test.com/order");
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.setRequestHeader("x-api-key", "yOxaPhpechYuey1mi16JZNI4p4laved0LKuOw8KS");
    xhr.setRequestHeader("Idempotency-Key", "yOxaPhpechYuesy1mi16JZNI4p4laved0LKuOw8KSdde23xxxxxxxxxxxxxxxxxx");
    
    xhr.send(data);
  }


  ngOnInit() {
    this.cartDataForm = this.formBuilder.group({
      shipping: [15, Validators.required],
      shippingtax: [1.25, Validators.required],
      handling: [23, [Validators.required, Validators.email]],
      handlingtax: [1.25, [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required],
      acceptTerms: [false, Validators.requiredTrue],
    },

    );
    this.credentialDataForm = this.formBuilder.group({
      id: ['17882', Validators.required],
      secret: ['165964686216', Validators.required],
      version: ['2.1.7', Validators.required],
      client: ['Pluginname:PorterBuddy:CheckoutDemo', Validators.required],

    });

    this.paymentDataForm = this.formBuilder.group({
      orderid: ['123456', Validators.required],
      cancelurl: ['https://yourclient.com/PorterBuddycheckout/cancel.php', Validators.required],
      accepturl: ['https://k8879.hemsida.eu/PorterBuddy/checkout/success/success.php', Validators.required],
      callbackurl: ['https://yourclient.com/PorterBuddycheckout/callback.php', Validators.required],
      returnmethod: ['POST', Validators.required],
    });

    this.checkoutDataForm = this.formBuilder.group({
      companyView: ['false', Validators.required],
      redirectOnSuccess: ['true', Validators.required],
      hideShippingAddress: ['false', Validators.required],
      terms: ['https://yourclient.com/terms', Validators.required],
      privacyPolicy: ['https://yourclient.com/terms', Validators.required]
    });

  

    this.pickupWindows = this.formBuilder.group({
      start: ["2021-11-13T10:00+01:00", Validators.required],
      end: ["2021-11-13T20:00+01:00", Validators.required],
 
    });

    this.parcels = this.formBuilder.group({
      widthCm: ['30', Validators.required],
      heightCm: ['25', Validators.required],
      depthCm  : ['45', Validators.required],
      weightGrams  : ['2000 ', Validators.required],

    
    });

    this.recipient = this.formBuilder.group({
      email: ['testemail+recipient@porterbuddy.com', Validators.required],
      phoneCountryCode: ['+47', Validators.required],
      phoneNumber  : ['65127865', Validators.required],
    
    });


    this.originAddress = this.formBuilder.group({
      streetName: ['Keysers Gate', Validators.required],
      streetNumber: ['3', Validators.required],
      postalCode  : ['0165', Validators.required],
      city: ['Oslo', Validators.required],
      country: ['Norway', Validators.required]
    });


    this.destinationAddress = this.formBuilder.group({
      streetName: ['Høyenhallveien Gate', Validators.required],
      streetNumber: ['24', Validators.required],
      postalCode  : ['0678', Validators.required],
      city: ['Oslo', Validators.required],
      country: ['Norway', Validators.required]
    });


    this.articleForm = this.formBuilder.group({
      products: this.formBuilder.array([
        this.initArticle()
      ])
    });

    
    this.articleForm1 = this.formBuilder.group({
      products: this.formBuilder.array([
        this.initArticle1()
      ])
    });

    this.customerFormBilling = this.formBuilder.group({
      firstname: ['Testperson', Validators.required],
      lastname: ['Approved', Validators.required],
      company: ['Approved', Validators.required],
      street: ['Teststreet', Validators.required],
      street2: ['Street2', Validators.required],
      zip: ['12345', Validators.required],
      city: ['Testcity', Validators.required],
      country: ['Sverige', Validators.required],
      phone: ['0712345678', Validators.required],
      email: ['test@developer.PorterBuddy.se', Validators.required],
    }
    );

    this.customerFormShipping = this.formBuilder.group({
      firstname: ['Testperson', Validators.required],
      lastname: ['Approved', Validators.required],
      company: ['Approved', Validators.required],
      street: ['Teststreet', Validators.required],
      street2: ['Street2', Validators.required],
      zip: ['54321', Validators.required],
      city: ['Testcity', Validators.required],
      country: ['Sverige', Validators.required],
    }
    );

    this.customerFormAdressNr = this.formBuilder.group({
      custonernr: ['12', Validators.required],
      pno: ['195501011018', Validators.required],
    }
    );

  }

  public changedExtraHandler(events) {

  }
  public customerExtraHandler(events) {
    if (this.showCustomer == false) {
      this.showCustomer = true;
    }
    else {
      this.showCustomer = false;
      this.showCustomerShipping = false;

    }
  }

  public customerShippingAdress(events) {
    if (this.showCustomer == true && this.showCustomerShipping == false) {
      this.showCustomerShipping = true;
    }
    else if (this.showCustomer == true && this.showCustomerShipping == true) {
      this.showCustomerShipping = false;
    }
  }

  trackByFn(index: number, item: any) {
    return item.trackingId;
  }

  initArticle() {
    return this.formBuilder.group({
      heightCm: this.formBuilder.control('25', Validators.required),
      widthCm: this.formBuilder.control('30', Validators.required),
      weightGrams: this.formBuilder.control('2000', Validators.required),
      depthCm: this.formBuilder.control('45', Validators.required),
    });
  }

   x = 14;
   
  initArticle1() {
    this.x = this.x + 1;
    console.log(this.x);
    return this.formBuilder.group({
      start: this.formBuilder.control('2021-09-'+this.x.toString()+'T10:00+01:00', Validators.required),
      end: this.formBuilder.control('2021-09-'+this.x.toString()+'T18:00+01:00', Validators.required),
  
    });
  }

  addGroup() {
    // add address to the list
    const control = <FormArray>this.articleForm.controls['products'];
    control.push(this.initArticle());

  }

  removeGroup(i: number) {
    // remove address from the list
    const control = <FormArray>this.articleForm.controls['products'];
    control.removeAt(i);

  }


  addGroup1() {
    // add address to the list
    const control = <FormArray>this.articleForm1.controls['products'];
    control.push(this.initArticle1());

  }

  removeGroup1(i: number) {
    // remove address from the list
    const control = <FormArray>this.articleForm1.controls['products'];
    control.removeAt(i);

  }

}
