import { SupplyComponent } from './supply/supply.component';
import { ProductionComponent } from './components/production/production.component';
import { DirectorGuard } from './shared/director.guard';
import { ManagerGuard } from './shared/manager.guard';
import { AuthGuard } from './auth.guard';
import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes, CanActivate } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'home', loadChildren: () => import('./home/home.module').then( m => m.HomePageModule),
canActivate:[AuthGuard]},
  {
    path: 'expenses', 
    loadChildren: () => import('./expenses/expenses.module').then( m => m.ExpensesPageModule),
  canActivate:[AuthGuard]},
  {
    path: 'manager',
    loadChildren: () => import('./manager/manager.module').then( m => m.ManagerPageModule),
     canActivate:[AuthGuard, ManagerGuard]
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
    path: 'supply',
   component : SupplyComponent,canActivate:[AuthGuard]
  },
  {
    path: 'admin', 
    loadChildren: () => import('./admin/admin.module').then( m => m.AdminPageModule),
    canActivate:[AuthGuard]
  },
  {
    path: 'md-section',
    loadChildren: () => import('./md-section/md-section.module').then( m => m.MdSectionPageModule),
    canActivate:[AuthGuard, DirectorGuard]
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
    path: 'booking',
    loadChildren: () => import('./booking/booking.module').then( m => m.BookingPageModule),
    canActivate:[AuthGuard]
  },
  {
    path: 'penalty',
    loadChildren: () => import('./penalty/penalty.module').then( m => m.PenaltyPageModule),
    canActivate:[AuthGuard]
  },
  {
    path: 'credit',
    loadChildren: () => import('./credit/credit.module').then( m => m.CreditPageModule),
    canActivate:[AuthGuard]
  },
  {
    path: 'fruit',
    loadChildren: () => import('./fruit/fruit.module').then( m => m.FruitPageModule)
  , canActivate:[AuthGuard]},
  {
    path: 'merchandisers',
    loadChildren: () => import('./merchandisers/merchandisers.module').then( m => m.MerchandisersPageModule)
  , canActivate:[AuthGuard]},
  {
    path: 'pay-roll',
    loadChildren: () => import('./pay-roll/pay-roll.module').then( m => m.PayRollPageModule)
  , canActivate:[AuthGuard]},
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
