import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
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
  itemsDataBool = false;

  articleDataBool = false;
  credTestDataBool = false;
  credDataBool = false;
  apiDataBool = false;

  paymentDataBool = false;
  showErrorDataBool = false;

  showCredentials = false;
  showCustomer = false;
  showCustomerShipping = false;
  expandAllBool = false;
  showIframe = false;
  showSpinner = true;
  debugBool = false;
  orderID: any;
  articleDataBool1 = false;
  showIframe1 = false;
  deliveryWindow: any;
  url: string = "";
  urlSafe: SafeResourceUrl;
  requestData: string[];
  bco: any;
  errorData: any;
  statusData: any;

  checkoutNumber: any;
  myObj: {};
  checkoutObj: {};
  avError = false;
  cartDataForm: FormGroup;
  credentialDataForm: FormGroup;
  paymentDataForm: FormGroup;
  checkoutDataForm: FormGroup;
  originAddress: FormGroup;
  apiKeyForm: FormGroup;
  destinationAddress: FormGroup;
  customerFormBilling: FormGroup;
  customerFormShipping: FormGroup;
  customerFormAdressNr: FormGroup;
  articleForm: FormGroup;
  itemsForm: FormGroup;

  articleForm1: FormGroup;
  contactForm: FormGroup;
  orderForm: FormGroup;
  selectedBool = false;
  parcels: FormGroup;
  recipient: FormGroup;
  pickupWindows: FormGroup;
  saveData: any;
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
      this.itemsDataBool = true;
      this.articleDataBool = true;
      this.credTestDataBool = true;
      this.credDataBool = true;
      this.apiDataBool = true;
      this.paymentDataBool = true;
      this.articleDataBool1 = true;
      this.checkoutDataBool = true;
      this.expandTitle = 'Collapse All';
    }
    else {
      this.expandAllBool = false;
      this.cartDataBool = false;
      this.customerDataBool = false;
      this.customerDataBool = false;
      this.articleDataBool = false;
      this.credTestDataBool = false;
      this.credDataBool = false;
      this.apiDataBool = false;

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
  public itemsDataShow(event) {
    if (this.itemsDataBool == false) { this.itemsDataBool = true; } else { this.itemsDataBool = false; }
  }


  public articleDataShow(event) {
    if (this.articleDataBool == false) { this.articleDataBool = true; } else { this.articleDataBool = false; }
  }

  public ApiDataShow(event) {
    if (this.apiDataBool == false) { this.apiDataBool = true; } else { this.apiDataBool = false; }
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

  createOrder() {
    this.showErrorDataBool = false;
    let originAddress = JSON.parse(JSON.stringify(this.originAddress.value));
    let recipientAdress = JSON.parse(JSON.stringify(this.recipient.value));
    let destinationAddress = JSON.parse(JSON.stringify(this.destinationAddress.value));
    let pickupWindows = JSON.parse(JSON.stringify(this.articleForm1.value.products));
    let parcels = JSON.parse(JSON.stringify(this.articleForm.value.products));
    let apiKey = JSON.parse(JSON.stringify(this.apiKeyForm.value.apiKey));
    let items = JSON.parse(JSON.stringify(this.itemsForm.value.products));
    items.forEach(element => {
      element.price = {
        price: element.price,
        currency: element.currency
      }

      element.barCode = {
        value: element.barCodetype,
        type: element.barCodevalue
      }
      delete element.currency;
      delete element.barCodevalue;
      delete element.barCodetype;

    });



    var orderInfo = {
      "origin": {
        "name": "Nils Johansen (Sender)",
        "address": originAddress,
        "email": "testemail+sender@porterbuddy.com",
        "phoneCountryCode": "+47",
        "phoneNumber": "65127865"
      },

      "destination": {
        "name": "Roger Olsen (Recipient)",
        "address": destinationAddress,
        "email": recipientAdress.email,
        "phoneCountryCode": recipientAdress.phoneCountryCode,
        "phoneNumber": recipientAdress.phoneNumber,

        "deliveryWindow": this.deliveryWindow,
        "verifications": {
          "minimumAgeCheck": 16,
          "leaveAtDoorstep": false,
          "idCheck": true,
          "requireSignature": false,
          "onlyToRecipient": true
        }
      },
      "parcels": parcels,
      "items": items,

      "product": "delivery",
      "courierInstructions": "Test",
      "shipmentIdentifier": "12345"

    }

    var randomINT = Math.random();
    let header = new HttpHeaders();
    header = header.append('content-type', 'application/json');
    header = header.append('Access-Control-Allow-Origin', '*');
    header = header.append('Access-Control-Allow-Methods', 'POST');
    header = header.append('x-api-key', apiKey);
    header = header.append('Idempotency-Key', randomINT.toString());
    var orderToString = JSON.stringify(orderInfo);

    this.http.post("https://corsporter.herokuapp.com/https://api.porterbuddy-test.com/order", orderToString, { headers: header }
    )
      .subscribe(
        data => {
          this.showIframe1 = true;
          this.selectedBool = false;
          this.orderID = (data as any).orderId
          this.showIframe = false;
          this.urlSafe = this.sanitizer.bypassSecurityTrustResourceUrl((data as any)._links.userInformation.href);
          this.getStatus();
        },
        error => {
          this.showErrorDataBool = true;
          this.errorData = error.error;
        }
      );
  }

  getStatus() {
    let apiKey = JSON.parse(JSON.stringify(this.apiKeyForm.value.apiKey));
    let header = new HttpHeaders();
    header = header.append('content-type', 'application/json');
    header = header.append('Access-Control-Allow-Origin', '*');
    header = header.append('x-api-key', apiKey);

    this.http.get("https://corsporter.herokuapp.com/https://api.porterbuddy-test.com/order/" + this.orderID + "/self", { headers: header }
    )
      .subscribe(
        data => {
          this.statusData = data;
        },
        error => {
          this.statusData = error.error;

        }
      );
  }
  avabilityReqest() {
    this.showIframe = false;
    this.showIframe1 = false;
    this.titlePB = "Update Checkout"
    this.avError = true;
    let originAddress = JSON.parse(JSON.stringify(this.originAddress.value));
    let recipientAdress = JSON.parse(JSON.stringify(this.recipient.value));
    let destinationAddress = JSON.parse(JSON.stringify(this.destinationAddress.value));
    let pickupWindows = JSON.parse(JSON.stringify(this.articleForm1.value.products));
    let parcels = JSON.parse(JSON.stringify(this.articleForm.value.products));
    let publicToken = JSON.parse(JSON.stringify(this.apiKeyForm.value.publicToken));
    let items = JSON.parse(JSON.stringify(this.itemsForm.value.products));


    var x = [];

    items.forEach(element => {

      element.price = {
        price: element.price,
        currency: element.currency
      }

      element.barCode = {
        value: element.barCodetype,
        type: element.barCodevalue
      }
      delete element.currency;
      delete element.barCodevalue;
      delete element.barCodetype;

    });


    var dataCheckout = {

      "pickupWindows": pickupWindows,
      "originAddress": originAddress,
      "destinationAddress": destinationAddress,
      "recipient": recipientAdress,
      "products": ["delivery"],
      "parcels": parcels,
      "items": items,

    }


    var dataCheckoutToJson = JSON.stringify(dataCheckout);

    const headers = {
      "content-type": "application/json",
      "accept": "application/json",
      "x-public-token": publicToken, // your public token

      // Public token must be sed on frontend side, for backend integration use your api key and header
      // "x-api-key" as specified in the API documentation
    }


    this.http.post("https://corsporter.herokuapp.com/https://api.porterbuddy-test.com/availability", dataCheckoutToJson, { headers: headers }
    )
      .subscribe(
        data => {

          this.saveData = data;
          this.checkoutObj = dataCheckout;
          this.myObj = {};

          (window as any).porterbuddy = {
            token: publicToken, // your public token
            view: "checkout",
            availabilityResponse: data,
            initialSelectedWindow: (data as any).deliveryWindows[0],


            //  initialSelectedWindow	 : availabilityResponse.deliveryWindows[3],

            onSetCallbacks: function (callbacks) {
              (window as any).forceRefreshReference = callbacks.forceRefresh;
              (window as any).unselectDeliveryWindow = callbacks.unselectDeliveryWindow;
              (window as any).setSelectedDeliveryWindow = callbacks.setSelectedDeliveryWindow;
            },


            onUpdateDeliveryWindows: (callback, additionalInfo) => {
              (window as any).forceRefreshReference();

              callback(this.saveData.deliveryWindows)
            },


            onSelectDeliveryWindow: (deliveryWindow) => {
              this.selectedBool = true;
              this.deliveryWindow = deliveryWindow;
            }
          }
          this.avError = true;
          this.showErrorDataBool = false;
          if (this.hej > 1) {
            this.hej1();
          }
          this.hej = 2;


        },
        error => {
          this.avError = false;
          this.showErrorDataBool = true;

          this.showIframe = false;
          this.errorData = error.error;
        }

      );

  }

  hej = 1;

  hej1() {

    (window as any).forceRefreshReference();

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
      depthCm: ['45', Validators.required],
      weightGrams: ['2000 ', Validators.required],


    });

    this.recipient = this.formBuilder.group({
      email: ['testemail+recipient@porterbuddy.com', Validators.required],
      phoneCountryCode: ['+47', Validators.required],
      phoneNumber: ['65127865', Validators.required],

    });


    this.originAddress = this.formBuilder.group({
      streetName: ['Keysers Gate', Validators.required],
      streetNumber: ['3', Validators.required],
      postalCode: ['0165', Validators.required],
      city: ['Oslo', Validators.required],
      country: ['Norway', Validators.required]
    });

    this.apiKeyForm = this.formBuilder.group({
      apiKey: ['yOxaPhpechYuey1mi16JZNI4p4laved0LKuOw8KS', Validators.required],
      publicToken: ['PeVR7JvLZSKcbQWolrQvKj3vdxEE1B6kRTixeTjM', Validators.required],

    });



    this.destinationAddress = this.formBuilder.group({
      streetName: ['Høyenhallveien Gate', Validators.required],
      streetNumber: ['24', Validators.required],
      postalCode: ['0678', Validators.required],
      city: ['Oslo', Validators.required],
      country: ['Norway', Validators.required]
    });


    this.articleForm = this.formBuilder.group({
      products: this.formBuilder.array([
        this.initArticle()
      ])
    });

    this.itemsForm = this.formBuilder.group({
      products: this.formBuilder.array([
        this.initItems()
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
    this.avabilityReqest();

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


  initItems() {
    return this.formBuilder.group({
      name: this.formBuilder.control('Fancy Sneakers', Validators.required),
      sku: this.formBuilder.control('FANCYSNEAKER43', Validators.required),
      weightGrams: this.formBuilder.control('2000', Validators.required),

      widthCm: this.formBuilder.control('20', Validators.required),
      heightCm: this.formBuilder.control('10', Validators.required),
      depthCm: this.formBuilder.control('35', Validators.required),

      description: this.formBuilder.control('Fancy sneakers (red/blue) in size 43', Validators.required),
      category: this.formBuilder.control('45', Validators.required),

      brand: this.formBuilder.control('Shoes', Validators.required),
      imageUrl: this.formBuilder.control('https://awesomewebshop.com/images/5fd71d6f-b0be-4480-900f-f3d008a0bc62.png', Validators.required),
      price: this.formBuilder.control('79900', Validators.required),
      currency: this.formBuilder.control('NOK', Validators.required),
      barCodevalue: this.formBuilder.control('123-456-789', Validators.required),
      barCodetype: this.formBuilder.control('CODE128', Validators.required),

    });
  }

  x = 14;

  initArticle1() {
    this.x = this.x + 1;
    return this.formBuilder.group({
      start: this.formBuilder.control('2021-09-' + this.x.toString() + 'T10:00+01:00', Validators.required),
      end: this.formBuilder.control('2021-09-' + this.x.toString() + 'T18:00+01:00', Validators.required),

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

  addGroupItems() {
    // add address to the list
    const control = <FormArray>this.itemsForm.controls['products'];
    control.push(this.initItems());

  }

  removeGroupItems(i: number) {
    // remove address from the list
    const control = <FormArray>this.itemsForm.controls['products'];
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
