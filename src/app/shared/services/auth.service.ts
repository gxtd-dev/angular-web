import { Injectable } from '@angular/core';
import { LocalStoreService } from './local-store.service';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { delay, tap } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { ApplicationUserService } from '../application-settings';
import { NavigationService } from './navigation.service';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    authenticated = true;

    constructor(
        private router: Router,
        private httpClient: HttpClient,
        private applicationUserService: ApplicationUserService
    ) {
        this.checkAuth();
    }

    checkAuth() {
        // this.authenticated = this.store.getItem('demo_login_status');
    }

    getuser() {
        return of({});
    }

    signin(credentials) {
        return this.httpClient.post<any>(`login`, credentials).pipe(tap(res => {
            this.applicationUserService.setToken(res.access_token);
            this.applicationUserService.setLogin(credentials.username);
            this.applicationUserService.loadUserSetting(credentials.username);
            this.authenticated = true;
        }));
    }

    signout() {
        this.authenticated = false;
        this.router.navigateByUrl('/sessions/signin');
    }
}
