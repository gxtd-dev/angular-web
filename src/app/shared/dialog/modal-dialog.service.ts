import { Injectable } from '@angular/core';
import { NgbModal, NgbModalConfig, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { Observable, Observer } from 'rxjs';

@Injectable()
export class ModalDialogService {

    constructor(private _modalService: NgbModal) { }

    open(content: any, initialState: any = {}, config: any = {}): Observable<any> {
        return new Observable(observer => {
            const modalRef = this._modalService.open(content, {
                backdrop: false,
                ...config
            });
            modalRef.componentInstance.data = initialState;

            modalRef.result.then(result => {
                observer.next(result);
                observer.complete();
            }, dismissResult => {
                observer.next(false);
                observer.complete();
            });
        });
    }

    openTemplate(content: any, config: any = {}): Observable<any> {
        return new Observable((observer: Observer<any>) => {
            const modalRef = this._modalService.open(content, {
                backdrop: false,
                ...config
            });
            modalRef.result.then(result => {
                observer.next(result);
                observer.complete();
            }, dismissResult => {
                observer.error(dismissResult);
                observer.complete();
            });
        });
    }
}
