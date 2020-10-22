import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { ModuleWithProviders, NgModule } from '@angular/core';

import { ApiBaseUrlInterceptor } from './api-base-url.interceptor';
import { AuthorizationInterceptor } from './authorization.interceptor';
import { ErrorHandlerInterceptor } from './error-handler.interceptor';

@NgModule({
    imports: [
        HttpClientModule,
    ]
})
export class AppHttpModule {
    public static forRoot(): ModuleWithProviders<any> {
        return {
            ngModule: AppHttpModule,
            providers: [
                {
                    multi: true,
                    provide: HTTP_INTERCEPTORS,
                    useClass: ApiBaseUrlInterceptor,
                },
                {
                    multi: true,
                    provide: HTTP_INTERCEPTORS,
                    useClass: AuthorizationInterceptor,
                },
                // {
                //     multi: true,
                //     provide: HTTP_INTERCEPTORS,
                //     useClass: ErrorHandlerInterceptor,
                // },
            ],
        };
    }
}
