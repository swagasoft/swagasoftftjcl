import { ExpenseEditComponent } from './components/expense-edit/expense-edit.component';
import { MerchantComponent } from './components/merchant/merchant.component';
import { FruiteditComponent } from './components/fruitedit/fruitedit.component';
import { FruitComponent } from './components/fruit/fruit.component';
import { FruitmodalComponent } from './components/fruitmodal/fruitmodal.component';
import { RecordService } from './shared/record.service';
import { ExpenseComponent } from './components/expense/expense.component';
import { SettingComponent } from './components/setting/setting.component';
import { PenaltyComponent } from './components/penalty/penalty.component';
import { SalaryAdvComponent } from './components/salary-adv/salary-adv.component';
import { PayrollService } from './shared/payroll.service';
import { PayRollComponent } from './components/pay-roll/pay-roll.component';
import { SupplyComponent } from './supply/supply.component';
import { ProductionComponent } from './components/production/production.component';
import { DistributionService } from './shared/distribution.service';
import { StaffService } from './shared/staff.service';
import { OutletService } from './shared/outlet.service';
import { ManagerGuard } from './shared/manager.guard';
import { DirectorGuard } from './shared/director.guard';
import { AlertService } from './shared/alert.service';
import { UserServiceService } from './shared/user-service.service';
import { AuthGuard } from './auth.guard';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule, NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AuthInterceptor } from './auth/auth-interceptor';
import { PayModalComponent } from './components/pay-modal/pay-modal.component';
import { PayoutComponent } from './components/payout/payout.component';
import { MerchantModalComponent } from './components/merchant-modal/merchant-modal.component';
import { ViewByOutletComponent } from './components/view-by-outlet/view-by-outlet.component';
import { ViewMerchantComponent } from './components/view-merchant/view-merchant.component';

@NgModule({
  declarations: [AppComponent,ProductionComponent,
    SalaryAdvComponent,
    PayModalComponent,
    FruitmodalComponent,
    MerchantComponent,
    ExpenseComponent,
    ViewByOutletComponent,
    ViewMerchantComponent,
    ExpenseEditComponent,
    FruitComponent,
    FruiteditComponent,
    PayoutComponent,
    MerchantModalComponent,
    PenaltyComponent,
    SettingComponent,
    SupplyComponent, PayRollComponent],
  entryComponents: [ PayModalComponent,MerchantModalComponent,
    ExpenseEditComponent, FruitmodalComponent, FruiteditComponent],
  imports: [BrowserModule,
    NgbModule,
     IonicModule.forRoot(),
    FormsModule,
   
    ReactiveFormsModule,
    HttpClientModule,
     AppRoutingModule],
     schemas: [ NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA],
  
  providers: [{provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor, multi: true},
    StatusBar,
    SplashScreen,
    AuthGuard,
    DirectorGuard,
    ManagerGuard,
    AlertService,
    RecordService,
    PayrollService,
    OutletService,
    DistributionService,
    StaffService,
    UserServiceService,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
