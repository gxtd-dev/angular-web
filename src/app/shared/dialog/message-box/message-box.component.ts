import { isEmptyObj } from 'src/app/shared/utils/object.util';
import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { IMessageBoxButton, MessageBoxResult } from '../message-box.types';
import { IMessageBoxData } from '../message-box.model';
import { isString } from '../../utils/string.util';

@Component({
    selector: 'app-message-box',
    templateUrl: './message-box.component.html',
    styleUrls: ['./message-box.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class MessageBoxComponent implements OnInit {
    @Input() data: IMessageBoxData;

    title: string;
    icon: string;
    content: string;
    buttons: IMessageBoxButton[];
    dlgClass: string;

    constructor(public modal: NgbActiveModal) { }

    ngOnInit() {
        if (!isEmptyObj(this.data)) {
            const { title, icon, content, buttons, dlgClass } = this.data;
            this.title = title;
            this.icon = icon;
            this.content = content;
            this.buttons = buttons;
            this.dlgClass = dlgClass;
        }
    }

    confirm = (result: MessageBoxResult) => {
        this.modal.close(result);
    }

    dismiss = () => {
        this.modal.dismiss();
    }

    get isStringContent(): boolean {
        return this.content == null || isString(this.content);
    }
}
