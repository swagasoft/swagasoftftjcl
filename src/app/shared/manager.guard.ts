import { UserServiceService } from './user-service.service';
import { Injectable } from '@angular/core';

import { ActivatedRouteSnapshot, RouterStateSnapshot, CanActivate,Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ManagerGuard implements CanActivate  {
  userRole: any;
 
  constructor(private router: Router, private userService: UserServiceService){

  }

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean{
    this.userRole = this.userService.getUserRole();
    const manager = 'DIRECTOR';
    if( this.userRole !== manager){
      this.router.navigateByUrl('/login');
      this.userService.deleteToken();
      return false;
  
    }
    return true;
  }
}
