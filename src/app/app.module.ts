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
// import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AuthInterceptor } from './auth/auth-interceptor';

@NgModule({
  declarations: [AppComponent,ProductionComponent, SupplyComponent],
  entryComponents: [],
  imports: [BrowserModule,
     IonicModule.forRoot(),
    FormsModule,
    // NgbModule,
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
    OutletService,
    DistributionService,
    StaffService,
    UserServiceService,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
