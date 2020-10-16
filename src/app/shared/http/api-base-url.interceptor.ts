import {
    HttpEvent,
    HttpHandler,
    HttpInterceptor,
    HttpRequest,
} from '@angular/common/http';
import { Inject, Injectable, Optional } from '@angular/core';
import { Observable } from 'rxjs';

import {
    APPLICATION_SETTINGS,
    IApplicationSettings
} from '../application-settings';

@Injectable()
export class ApiBaseUrlInterceptor implements HttpInterceptor {
    baseUrl: string;

    public constructor(
        @Optional()
        @Inject(APPLICATION_SETTINGS)
        readonly applicationSettings: IApplicationSettings,
    ) {
        if (applicationSettings.apiUrl) {
            if (!/\/$/.test(applicationSettings.apiUrl)) {
                this.baseUrl = applicationSettings.apiUrl + '/';
            }
            this.baseUrl += 'api/';
        }
    }

    public intercept(
        req: HttpRequest<any>,
        next: HttpHandler,
    ): Observable<HttpEvent<any>> {
        if (this.baseUrl && !/^https?:\/\//.test(req.url)) {
            const url = /^\//.test(req.url)
                ? req.url.substring(1)
                : req.url;

            req = req.clone({ url: this.baseUrl + url });
        }
        return next.handle(req);
    }
}
