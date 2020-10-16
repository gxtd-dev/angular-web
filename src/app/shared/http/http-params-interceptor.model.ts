import { HttpParams } from '@angular/common/http';

export class InterceptorHttpParams extends HttpParams {
    constructor(
        public interceptorConfig: { statusCodesToIgnore: number[] },
        params?: { [param: string]: string | string[] },
    ) {
        super({ fromObject: params });
    }
}

export function CreateIgnoreErrorInterceptParams(ignoreCodes: number[], params: any = {}): InterceptorHttpParams {
    return new InterceptorHttpParams({ statusCodesToIgnore: ignoreCodes }, params);
}

export enum HttpStatus {
    UN_AUTHORIZED = 401,
    FORBIDDEN = 403,
    UNAVAILABLE = 503,
    SERVER_ERROR = 500,
    NOT_FOUND = 404,
    BAD_REQUEST = 400,
    METHOD_NOT_ALLOWED = 405,
    REQUEST_ENTITY_TOO_LARGE = 413,

}
