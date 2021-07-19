import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from "@angular/router";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { HeaderComponent } from './components/header/header.component';
import { LayoutsComponent } from './layouts/layouts.component';
import { ToggleFullscreenDirective } from "./directives/fullscreen.directive";
import { VerticalbarComponent } from './components/verticalbar/verticalbar.component';
import { FooterComponent } from './components/footer/footer.component';
import {LoaderComponent} from './components/loader/loader.component';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatFormFieldModule} from '@angular/material/form-field';

@NgModule({
  declarations: [
    ToggleFullscreenDirective,
    HeaderComponent,
    LayoutsComponent,   
    VerticalbarComponent,
    LoaderComponent,
    FooterComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    MatDatepickerModule,
    MatFormFieldModule,
  ],
  exports: [LoaderComponent,ToggleFullscreenDirective,MatDatepickerModule,MatFormFieldModule]
})
export class SharedModule { }
