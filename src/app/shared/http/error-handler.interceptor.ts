import { MessageBoxService } from './../dialog/message-box.service';
import {
    HttpErrorResponse,
    HttpEvent,
    HttpHandler,
    HttpInterceptor,
    HttpRequest,
} from '@angular/common/http';
import { Injectable, Optional } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';
import { InterceptorHttpParams, HttpStatus } from './http-params-interceptor.model';
import { ToasterService } from '../services/toaster.service';


const UnAuthorizeCodes = [
    HttpStatus.FORBIDDEN,
    HttpStatus.UN_AUTHORIZED
];
@Injectable()
export class ErrorHandlerInterceptor implements HttpInterceptor {

    constructor(
        private _toaster: ToasterService,
        private _messageBoxService: MessageBoxService,
        private _auth: AuthService
    ) {
    }

    private _isShowUnAuthorizeError = false;

    public intercept(
        req: HttpRequest<any>,
        next: HttpHandler,
    ): Observable<HttpEvent<any>> {
        return next.handle(req).pipe(
            tap(
                () => { },
                (error: any) => {
                    if (error instanceof HttpErrorResponse) {
                        const regEx = /^[4-5][0-9][0-9]$/; // 4XX and 5XX status codes

                        // log errors
                        // this._loggingService.error(error);

                        if (regEx.test(error.status.toString())) {
                            if (this._shouldIgnoreError(req, error)) {
                                return;
                            }

                            if (this._checkUnauthorizeError(error)) {
                                if (!this._isShowUnAuthorizeError) {
                                    this._isShowUnAuthorizeError = true;
                                    this._messageBoxService.error('Phiên làm việc hết hạn. Vui lòng đăng nhập lại.').subscribe(_ => {
                                        this._isShowUnAuthorizeError = false;
                                        this._auth.signout();
                                    });
                                }
                                return;
                            }

                            this._displayErrorMessage(error);
                        }
                    }
                }),
        );
    }

    private _shouldIgnoreError(request: HttpRequest<any>, errorResponse: HttpErrorResponse) {
        if (request.params instanceof InterceptorHttpParams
            && Array.isArray(request.params.interceptorConfig.statusCodesToIgnore)
            && request.params.interceptorConfig.statusCodesToIgnore.find(s => s === errorResponse.status)) {
            return true;
        }
        return false;
    }

    private _checkUnauthorizeError(errorResponse: HttpErrorResponse) {
        if (UnAuthorizeCodes.find(s => s === errorResponse.status)) {
            return true;
        }
        return false;
    }

    private _displayErrorMessage(errorResponse: HttpErrorResponse) {
        this._toaster.errorBar(errorResponse.message, 'Error');
    }
}
