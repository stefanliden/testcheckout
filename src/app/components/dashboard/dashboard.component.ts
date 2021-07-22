import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { FormBuilder, FormControl, FormArray, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import * as moment from 'moment';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  title = 'checkout';
  titlePB = "Create Checkout"
  debugTitle = "Show Debug";
  expandTitle = 'Expand All';
  
  parcelDataBool = false;
  itemsDataBool = false;
  pickupDataBool = false;
  credDataBool = false;
  verDataBool = false;

  apiDataBool = false;
  destinationDataBool = false;
  showErrorDataBool = false;
  expandAllBool = false;
  showIframe = false;
  showSpinner = true;
  debugBool = false;
  recipientDataBool = false;
  showTrackingLink = false;
  httpErrorBool = false;
  selectedBool = false;

  orderID: any;
  deliveryWindow: any;
  errorData: any;
  statusData: any;
  checkoutNumber: any;
  saveData: any;
  orderData: any;
  orderDataRequest:any;

  urlSafe: SafeResourceUrl;
  checkoutObj: {};
  originInfoForm: FormGroup;
  originAddress: FormGroup;
  apiKeyForm: FormGroup;
  destinationAddress: FormGroup;
  parcelForm: FormGroup;
  itemsForm: FormGroup;
  verificationsForm: FormGroup;
  pickupWindowsForm: FormGroup;
  parcels: FormGroup;
  recipient: FormGroup;
  pickupWindows: FormGroup;
  fromTimeAdd = 1;
  toTimeAdd = 1;
  toTime = moment().add(this.fromTimeAdd,'day').set('hours',23).set('minute',23).set('second',23).format();
  fromTime = moment().add(this.fromTimeAdd,'day').set('hours',0).set('minute',0).set('second',0).format();

  constructor(private sanitizer: DomSanitizer, private http: HttpClient, private formBuilder: FormBuilder, public router: Router,
  ) { }


  verificationBool = [
    { id: "true" },
    { id: "false" },

  ];
 

  avabilityReqest() {
    this.orderDataRequest = {};
    this.orderData = {};
    this.showIframe = false;
    this.showTrackingLink = false;
    this.titlePB = "Update Checkout"
    this.httpErrorBool = true;
    let originAddress = JSON.parse(JSON.stringify(this.originAddress.value));
    let recipientAdress = JSON.parse(JSON.stringify(this.recipient.value));
    let destinationAddress = JSON.parse(JSON.stringify(this.destinationAddress.value));
    let pickupWindows = JSON.parse(JSON.stringify(this.pickupWindowsForm.value.products));
    let parcels = JSON.parse(JSON.stringify(this.parcelForm.value.products));
    let publicToken = JSON.parse(JSON.stringify(this.apiKeyForm.value.publicToken));
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
      "x-public-token": publicToken,
    }

    this.http.post("https://corsporter.herokuapp.com/https://api.porterbuddy-test.com/availability", dataCheckoutToJson, { headers: headers }
    ).subscribe(
        data => {
          this.saveData = data;
          this.checkoutObj = dataCheckout;

          (window as any).porterbuddy = {
            token: publicToken,
            view: "checkout",
            availabilityResponse: data,
            initialSelectedWindow: (data as any).deliveryWindows[0],

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

          this.httpErrorBool = true;
          this.showErrorDataBool = false;
          if (this.forceRefresTrue > 1) {
            this.forceRefreshReference();
          }
          this.forceRefresTrue = 2;

        },
        error => {
          this.httpErrorBool = false;
          this.showErrorDataBool = true;
          this.showIframe = false;
          this.errorData = error.error;
        }
      );
  }

  createOrder() {
    this.showErrorDataBool = false;
    let originAddress = JSON.parse(JSON.stringify(this.originAddress.value));
    let recipientAdress = JSON.parse(JSON.stringify(this.recipient.value));
    let destinationAddress = JSON.parse(JSON.stringify(this.destinationAddress.value));
    let parcels = JSON.parse(JSON.stringify(this.parcelForm.value.products));
    let apiKey = JSON.parse(JSON.stringify(this.apiKeyForm.value.apiKey));
    let items = JSON.parse(JSON.stringify(this.itemsForm.value.products));
    let orginInfo= JSON.parse(JSON.stringify(this.originInfoForm.value ));
    let verification= JSON.parse(JSON.stringify(this.verificationsForm.value ));

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
    var orderInfo ={};

    if(this.deliveryWindow.consolidated == false){

     orderInfo = {
      "origin": {
        "name": orginInfo.name,
        "address": originAddress,
        "email": orginInfo.email,
        "phoneNumber": orginInfo.phoneNumber,
        "phoneCountryCode": orginInfo.phoneCountryCode,
      },
      "destination": {
        "name": recipientAdress.name,
        "address": destinationAddress,
        "email": recipientAdress.email,
        "phoneCountryCode": recipientAdress.phoneCountryCode,
        "phoneNumber": recipientAdress.phoneNumber,

        "deliveryWindow": this.deliveryWindow,
        "verifications": verification
      },
      "parcels": parcels,
      "items": items,
      "product": "delivery",
      "courierInstructions": "Test",
    }
   
    }else{
      orderInfo = {
        "origin": {
          "name": orginInfo.name,
          "address": originAddress,
          "email": orginInfo.email,
          "phoneNumber": orginInfo.phoneNumber,
          "phoneCountryCode": orginInfo.phoneCountryCode,
        },
        "destination": {
          "name": recipientAdress.name,
          "address": destinationAddress,
          "email": recipientAdress.email,
          "phoneCountryCode": recipientAdress.phoneCountryCode,
          "phoneNumber": recipientAdress.phoneNumber,
  
          "consolidatedWindow": {
            "token" :this.deliveryWindow.token
          },
          "verifications": verification
        },
        "parcels": parcels,
        "items": items,
        "product": "delivery",
        "courierInstructions": "Test",
      }

    }
    this.orderDataRequest = orderInfo;
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
          this.orderData = data;
          this.showTrackingLink = true;
          this.selectedBool = false;
          this.orderID = (data as any).orderId
          this.showIframe = false;
          this.urlSafe = this.sanitizer.bypassSecurityTrustResourceUrl((data as any)._links.userInformation.href);
          this.getOrderStatus();
        },
        error => {
          this.showErrorDataBool = true;
          this.errorData = error.error;
        }
      );
  }

  getOrderStatus() {
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
      this.parcelDataBool = true;
      this.itemsDataBool = true;
      this.pickupDataBool = true;
      this.credDataBool = true;
      this.verDataBool = true;
      this.apiDataBool = true;
      this.destinationDataBool = true;
      this.recipientDataBool = true;
      this.expandTitle = 'Collapse All';
    }
    else {
      this.expandAllBool = false;
      this.verDataBool = false;
      this.parcelDataBool = false;
      this.parcelDataBool = false;
      this.pickupDataBool = false;
      this.credDataBool = false;
      this.apiDataBool = false;
      this.destinationDataBool = false;
      this.recipientDataBool = false;
      this.expandTitle = 'Expand All';
    }
  }

 
  public parcelDataShow(event) {
    if (this.parcelDataBool == false) { this.parcelDataBool = true; } else { this.parcelDataBool = false; }
  }
  public itemsDataShow(event) {
    if (this.itemsDataBool == false) { this.itemsDataBool = true; } else { this.itemsDataBool = false; }
  }

  public pickupWindowsDataShow(event) {
    if (this.pickupDataBool == false) { this.pickupDataBool = true; } else { this.pickupDataBool = false; }
  }

  public apiDataShow(event) {
    if (this.apiDataBool == false) { this.apiDataBool = true; } else { this.apiDataBool = false; }
  }
  public recipientDataShow(event) {
    if (this.recipientDataBool == false) { this.recipientDataBool = true; } else { this.recipientDataBool = false; }
  }

  public orginDataShow(event) {
    if (this.credDataBool == false) { this.credDataBool = true; } else { this.credDataBool = false; }
  }

  public verificationDataShow(event) {
    if (this.verDataBool == false) { this.verDataBool = true; } else { this.verDataBool = false; }
  }

  public destinationDataShow(event) {
    if (this.destinationDataBool == false) { this.destinationDataBool = true; } else { this.destinationDataBool = false; }
  }

  numberOnly(event): boolean {
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;
  }

  forceRefresTrue = 1;

  forceRefreshReference() {
    (window as any).forceRefreshReference();
  }

  ngOnInit() {

    var randomINT = Math.random();

    this.pickupWindows = this.formBuilder.group({
      start: ["2021-11-13T10:00+01:00", Validators.required],
      end: ["2021-11-13T20:00+01:00", Validators.required],
    });

    this.parcels = this.formBuilder.group({
      widthCm: ['30', Validators.required],
      heightCm: ['25', Validators.required],
      depthCm: ['45', Validators.required],
      weightGrams: ['2000 ', Validators.required],
      parcelShipmentIdentifier: [randomINT.toString(), Validators.required],

    });

    this.recipient = this.formBuilder.group({
      name: ['Roger Olsen (Recipient)', Validators.required],
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

    this.originInfoForm = this.formBuilder.group({
      name: ['Nils Johansen (Sender)', Validators.required],
      email: ['testemail+recipient@porterbuddy.com', Validators.required],
      phoneCountryCode: ['+47', Validators.required],
      phoneNumber: ['65127865', Validators.required],
    

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

    this.verificationsForm = this.formBuilder.group({
      minimumAgeCheck: ['16', Validators.required],
      leaveAtDoorstep: ['true', Validators.required],
      idCheck: ['false', Validators.required],
      requireSignature: ['false', Validators.required],
      onlyToRecipient: ['false', Validators.required]
    });

    this.parcelForm = this.formBuilder.group({
      products: this.formBuilder.array([
        this.initParcel()
      ])
    });

    this.itemsForm = this.formBuilder.group({
      products: this.formBuilder.array([
        this.initItems()
      ])
    });

    this.pickupWindowsForm = this.formBuilder.group({
      products: this.formBuilder.array([
        this.initDate()
      ])
    });

    this.avabilityReqest();
  }

  public changedExtraHandler(events) {}

  initParcel() {
    var randomINT = Math.random();

    return this.formBuilder.group({
      heightCm: this.formBuilder.control('25', Validators.required),
      widthCm: this.formBuilder.control('30', Validators.required),
      weightGrams: this.formBuilder.control('2000', Validators.required),
      depthCm: this.formBuilder.control('45', Validators.required),
      parcelShipmentIdentifier: [randomINT.toString(), Validators.required],
      description:  ["Shoes", Validators.required],
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

  initDate() {
    this.x = this.x + 1;
    return this.formBuilder.group({
      start: this.formBuilder.control(this.fromTime, Validators.required),
      end: this.formBuilder.control(this.toTime, Validators.required),

    });
    
  }

  addParcel() {
    const control = <FormArray>this.parcelForm.controls['products'];
    control.push(this.initParcel());
  }

  removeParcel(i: number) {
    const control = <FormArray>this.parcelForm.controls['products'];
    control.removeAt(i);
  }

  addItems() {
    const control = <FormArray>this.itemsForm.controls['products'];
    control.push(this.initItems());
  }

  removeItems(i: number) {
    const control = <FormArray>this.itemsForm.controls['products'];
    control.removeAt(i);
  }

  addPickupWindows() {
    this.fromTimeAdd++;
    this.toTimeAdd++;
    this.toTime = moment().add(this.toTimeAdd,'day').set('hours',23).set('minute',23).set('second',23).format();
    this.fromTime = moment().add(this.fromTimeAdd,'day').set('hours',0).set('minute',0).set('second',0).format();
    const control = <FormArray>this.pickupWindowsForm.controls['products'];
    control.push(this.initDate());
  }

  RemovePickupWindows(i: number) {
    this.fromTimeAdd--;
    this.toTimeAdd--;

    // remove address from the list
    const control = <FormArray>this.pickupWindowsForm.controls['products'];
    control.removeAt(i);

  }
  
  trackByFn(index: number, item: any) {
    return item.trackingId;
  }

}
