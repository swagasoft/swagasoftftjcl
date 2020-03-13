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
    if( this.userRole !== director){
      this.router.navigateByUrl('/login');
      this.userService.deleteToken();
      return false;
  
    }
    return true;
  }
  
}
