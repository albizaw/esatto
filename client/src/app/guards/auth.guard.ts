import { Injectable } from '@angular/core';
import {
  CanActivate,
  Router,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuardService implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | boolean
    | UrlTree
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree> {
    const isAuthenticated = this.authService.isAuthenticated();
    const isLoginOrRegisterRoute =
      state.url.includes('login') || state.url.includes('register');

    if (isAuthenticated && isLoginOrRegisterRoute) {
      return this.router.createUrlTree(['/']);
    } else if (!isAuthenticated && !isLoginOrRegisterRoute) {
      return this.router.createUrlTree(['/login']);
    }

    return true;
  }
}
