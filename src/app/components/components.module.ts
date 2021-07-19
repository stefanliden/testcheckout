import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { ChartsModule } from 'ng2-charts';
import { Ng2GoogleChartsModule } from 'ng2-google-charts';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { ComponentsRoutingModule } from './components-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ThankyouComponent } from './thankyou/thankyou.component';

import { PageComponent } from './page/page.component';
import { ChartistModule } from 'ng-chartist';
import { CountToModule } from 'angular-count-to';
import {MatFormFieldModule} from '@angular/material/form-field';

@NgModule({
  declarations: [DashboardComponent, PageComponent,ThankyouComponent],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    MatDatepickerModule,
    MatNativeDateModule,
    ComponentsRoutingModule,
    ChartistModule,
    ChartsModule,
    NgxChartsModule,
    Ng2GoogleChartsModule,
    CountToModule,
    NgbModule,
    MatFormFieldModule,
    CarouselModule
  ]
})
export class ComponentsModule { }
