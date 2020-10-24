import { TabsComponent } from './components/tabs/tabs.component';
import { DistributionsPage } from './distributions/distributions.page';
import { EditReturnComponent } from './components/edit-return/edit-return.component';
import { ProdEditModalComponent } from './components/prod-edit-modal/prod-edit-modal.component';
import { EditSupplyComponent } from './components/edit-supply/edit-supply.component';
import { EditBadStockComponent } from './components/edit-bad-stock/edit-bad-stock.component';
import { EditProductionComponent } from './components/edit-production/edit-production.component';
import { EditExpenseTwoComponent } from './components/edit-expense-two/edit-expense-two.component';
import { ExpenseTwoComponent } from './components/expense-two/expense-two.component';
import { SupplyRecordComponent } from './components/supply-record/supply-record.component';
import { ExpReturnModalComponent } from './components/exp-return-modal/exp-return-modal.component';
import { ExchangeModalComponent } from './components/exchange-modal/exchange-modal.component';
import { ReturnModalComponent } from './components/return-modal/return-modal.component';
import { PayRecordComponent } from './components/pay-record/pay-record.component';
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
import {NgxElectronModule} from 'ngx-electron';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AuthInterceptor } from './auth/auth-interceptor';
import { PayModalComponent } from './components/pay-modal/pay-modal.component';
import { PayoutComponent } from './components/payout/payout.component';
import { MerchantModalComponent } from './components/merchant-modal/merchant-modal.component';
import { ViewByOutletComponent } from './components/view-by-outlet/view-by-outlet.component';
import { ViewMerchantComponent } from './components/view-merchant/view-merchant.component';
import { SpecialComponent } from './components/special/special.component';
import { ProdRecordComponent } from './components/prod-record/prod-record.component';
import { EditStaffComponent } from './components/edit-staff/edit-staff.component';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';

@NgModule({
  declarations: [AppComponent,ProductionComponent,
    SalaryAdvComponent,
    PayModalComponent,
    FruitmodalComponent,
    SupplyRecordComponent,
    ProdRecordComponent,
    ExpenseTwoComponent,
    MerchantComponent,
    ExpenseComponent,
    ReturnModalComponent,
    EditExpenseTwoComponent,
    ExchangeModalComponent,
    ViewByOutletComponent,
    ViewMerchantComponent,
    ExpenseEditComponent,
    SpecialComponent,
    FruitComponent,
    FruiteditComponent,
    PayoutComponent,
    EditProductionComponent,
    EditBadStockComponent,
    PayRecordComponent,
    ExpReturnModalComponent,
    MerchantModalComponent,
    EditSupplyComponent,
    ProdEditModalComponent,
    PenaltyComponent,
    SettingComponent,
    EditReturnComponent,
    DistributionsPage,
    TabsComponent,
    SupplyComponent, PayRollComponent, EditStaffComponent],
  entryComponents: [ PayModalComponent,MerchantModalComponent, ReturnModalComponent,
    ExpReturnModalComponent, EditExpenseTwoComponent,EditProductionComponent,
    EditBadStockComponent,EditSupplyComponent,ProdEditModalComponent,EditStaffComponent,
    ExpenseEditComponent, FruitmodalComponent, FruiteditComponent,ExchangeModalComponent ,EditReturnComponent],
  imports: [BrowserModule,
    NgbModule,
     IonicModule.forRoot(),
    FormsModule,NgxElectronModule,
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
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true},
    {provide: LocationStrategy, useClass: HashLocationStrategy}
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
