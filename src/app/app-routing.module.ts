import { ViewMerchantComponent } from './components/view-merchant/view-merchant.component';
import { MerchantComponent } from './components/merchant/merchant.component';
import { FruitComponent } from './components/fruit/fruit.component';
import { PayoutComponent } from './components/payout/payout.component';
import { ExpenseComponent } from './components/expense/expense.component';
import { SettingComponent } from './components/setting/setting.component';
import { PenaltyComponent } from './components/penalty/penalty.component';
import { SalaryAdvComponent } from './components/salary-adv/salary-adv.component';
import { PayRollComponent } from './components/pay-roll/pay-roll.component';
import { SupplyComponent } from './supply/supply.component';
import { ProductionComponent } from './components/production/production.component';
import { DirectorGuard } from './shared/director.guard';
import { ManagerGuard } from './shared/manager.guard';
import { AuthGuard } from './auth.guard';
import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes, CanActivate } from '@angular/router';
import { ViewByOutletComponent } from './components/view-by-outlet/view-by-outlet.component';

const routes: Routes = [
  { path: '', redirectTo: 'distributions', pathMatch: 'full' },
  { path: 'home', loadChildren: () => import('./home/home.module').then( m => m.HomePageModule),
canActivate:[AuthGuard]},
  {
    path: 'expenses', 
    component : ExpenseComponent,canActivate:[AuthGuard]
  },
  {
    path: 'payout', 
    component : PayoutComponent,canActivate:[AuthGuard]
  },
  {
    path: 'manager',
    loadChildren: () => import('./manager/manager.module').then( m => m.ManagerPageModule),
     canActivate:[AuthGuard, DirectorGuard]
  },
  {
    path: 'distributions',
    loadChildren: () => import('./distributions/distributions.module').then( m => m.DistributionsPageModule),
    canActivate:[AuthGuard]
  },
  {
    path: 'production',
   component : ProductionComponent,canActivate:[AuthGuard]
  },
  {
    path: 'setting',
   component : SettingComponent,canActivate:[AuthGuard]
  },
   {
    path: 'supply',
   component : SupplyComponent,canActivate:[AuthGuard]
  },
  {
    path: 'admin', 
    loadChildren: () => import('./admin/admin.module').then( m => m.AdminPageModule),
    canActivate:[AuthGuard]
  },
   
  {
    path: 'staff-list',
    loadChildren: () => import('./staff-list/staff-list.module').then( m => m.StaffListPageModule),
    canActivate:[AuthGuard]
  },
  {
    path: 'outlets',
    loadChildren: () => import('./outlets/outlets.module').then( m => m.OutletsPageModule),
    canActivate:[AuthGuard]
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'penalty',
    component : PenaltyComponent, canActivate: [AuthGuard]
  },
  {
    path: 'credit',
    loadChildren: () => import('./credit/credit.module').then( m => m.CreditPageModule),
    canActivate:[AuthGuard]
  },
  {
    path: 'fruit',
    component : FruitComponent, canActivate: [AuthGuard]
  },
  {
    path: 'merchandisers',
    component : MerchantComponent, canActivate: [AuthGuard]
  }, 
  {
    path: 'view-merchant-sales',
    component : ViewMerchantComponent, canActivate: [AuthGuard]
  },  
  {
    path: 'view-outlet-sales',
    component : ViewByOutletComponent, canActivate: [AuthGuard]
  }, 
  {
    path: 'pay-roll',
    component : PayRollComponent, canActivate: [AuthGuard, DirectorGuard]
  }, 
  {
    path: 'salary_adv',
    component : SalaryAdvComponent, canActivate: [AuthGuard]
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
