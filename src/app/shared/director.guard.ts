import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { UserServiceService } from './user-service.service';

@Injectable({
  providedIn: 'root'
})
export class DirectorGuard implements CanActivate {
  userRole : any;
  constructor(private router: Router, private userService: UserServiceService){

  }

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean{
    this.userRole = this.userService.getUserRole();
    const director = 'DIRECTOR';
    if(this.userService.isLogedIn() && this.userService.getUserRole() === director ){

      return true;
    }else{
      
      this.router.navigateByUrl('tabs/distributions');
      this.userService.generalToast('Restricted page for this user!');
        return false;
    
    }

  }
  
}
