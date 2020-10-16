import { HttpParams } from '@angular/common/http';
import { CreateIgnoreErrorInterceptParams, InterceptorHttpParams } from '../http/http-params-interceptor.model';

export function getParams(query: any): HttpParams {
    let params = new HttpParams();
    for (const key of Object.keys(query)) {
        if (query[key]) {
            if (query[key] instanceof Array) {
                query[key].forEach((item) => {
                    params = params.append(`${key.toString()}`, item);
                });
            } else if (query[key] instanceof Date) {
                params = params.append(key.toString(), query[key].toISOString());
            } else {
                params = params.append(key.toString(), query[key]);
            }
        }
    }
    return params;
}

export function toQueryString(params: HttpParams): string {
    const keys = params.keys();
    const allParams = [];
    keys.forEach(key => {
        const allValues = params.getAll(key);
        allValues.forEach(value => {
            allParams.push(`${key}=${value}`);
        });
    });
    return allParams.join('&');
}

