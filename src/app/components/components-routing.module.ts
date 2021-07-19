import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ThankyouComponent } from './thankyou/thankyou.component';

import { PageComponent} from './page/page.component';

const routes: Routes = [
  {
    path:'',
    children:[
      {
        path:'',
        component:DashboardComponent
      },
      {
        path:'thankyou',
        component:ThankyouComponent
      },
  
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ComponentsRoutingModule { }
