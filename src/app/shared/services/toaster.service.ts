import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
const timeOut = 3000;
@Injectable({
    providedIn: 'root'
})
export class ToasterService {

    constructor(private toastr: ToastrService) { }

    success(message: string, title: string = 'Success') {
        this.toastr.success(message, title, { timeOut });
    }
    warning(message: string, title: string = 'Warning') {
        this.toastr.warning(message, title, { timeOut });
    }
    info(message: string, title: string = 'Info') {
        this.toastr.info(message, title, { timeOut });
    }
    error(message: string, title: string = 'Error') {
        this.toastr.error(message, title, { timeOut });
    }

    successBar(message: string, title: string = 'Success') {
        this.toastr.success(message, title, { timeOut, closeButton: true, progressBar: true });
    }
    warningBar(message: string, title: string = 'Warning') {
        this.toastr.warning(message, title, { timeOut, closeButton: true, progressBar: true });
    }
    infoBar(message: string, title: string = 'Info') {
        this.toastr.info(message, title, { timeOut, closeButton: true, progressBar: true });
    }
    errorBar(message: string, title: string = 'Error') {
        this.toastr.error(message, title, { timeOut, closeButton: true, progressBar: true });
    }

}
