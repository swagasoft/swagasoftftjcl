import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { UserServiceService } from './shared/user-service.service';

@Injectable({
  providedIn: 'root'
})
export class SpecialGuard implements CanActivate {
  userRole: any;

  constructor(private router: Router, private userService: UserServiceService){

  }

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean{
    this.userRole = this.userService.getUserRole();
    const special = 'SPECIAL' ;
    if( this.userRole !== special){
      this.router.navigateByUrl('/special');
      this.userService.deleteToken();
      return false;
   
    }
    
    return true;
   
  }
} 
