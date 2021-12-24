import { Injectable, enableProdMode } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { AuthService } from './auth.service';
import { UtilityService } from './utility.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router, private auth: AuthService, private util: UtilityService) { }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> {
    return new Observable<boolean>(obs => {
      this.auth.verifyToken().subscribe((res: any) => {
        if (res.email) {
          this.util.payload.next(res.email)
          this.util.isAdmin.next(true)
          obs.next(true)
        }
        else {
          this.router.navigate(['/admin/login'])
          obs.next(false)

        }
      })
    }
    )
  }
}
