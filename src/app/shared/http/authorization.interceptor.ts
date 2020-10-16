import {
    HttpEvent,
    HttpHandler,
    HttpInterceptor,
    HttpRequest,
} from '@angular/common/http';
import { Inject, Injectable, Optional } from '@angular/core';
import { Observable } from 'rxjs';
import { ApplicationUserService } from '../application-settings/application-user.service';

@Injectable()
export class AuthorizationInterceptor implements HttpInterceptor {
    public constructor(
        private applicationUserService: ApplicationUserService,
    ) {
    }

    public intercept(
        req: HttpRequest<any>,
        next: HttpHandler,
    ): Observable<HttpEvent<any>> {
        const token = this.applicationUserService.getToken();

        if (token) {
            if (!req.headers.has('Authorization')) {
                req = req.clone({
                    headers: req.headers.set('Authorization', 'Bearer ' + token),
                });
            }
        }

        return next.handle(req);
    }
}
