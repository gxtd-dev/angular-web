import { Injectable, TemplateRef } from '@angular/core';
import { ModalDialogService } from './modal-dialog.service';
import { IMessageBoxButton, MessageBoxButtons, MessageBoxResult, MessageBoxIcons } from './message-box.types';
import { Observable } from 'rxjs';
import { MessageBoxComponent } from './message-box/message-box.component';

@Injectable()
export class MessageBoxService {

    constructor(private _modalDlgService: ModalDialogService) { }

    messageBox(content: string | TemplateRef<any>,
        title: string = '',
        icon: string = MessageBoxIcons.Info,
        dlgClass = 'message-box-info',
        buttons: IMessageBoxButton[] = [MessageBoxButtons.Ok]): Observable<MessageBoxResult> {
        return this._modalDlgService.open(MessageBoxComponent, {
            content,
            title,
            icon,
            dlgClass,
            buttons,
        });
    }

    info(text: string, title: string = 'Thông báo', icon: string = MessageBoxIcons.Info): Observable<MessageBoxResult> {
        return this.messageBox(text, title, icon, 'message-box-info', [MessageBoxButtons.Ok]);
    }

    question(text: string, title: string = 'Bạn có chắc', icon: string = MessageBoxIcons.Question): Observable<MessageBoxResult> {
        return this.messageBox(text, title, icon, 'message-box-question', [
            MessageBoxButtons.Yes,
            MessageBoxButtons.No]);
    }

    warning(text: string, title: string = 'Lưu ý', icon: string = MessageBoxIcons.Warning,
        buttons: IMessageBoxButton[] = [MessageBoxButtons.Yes, MessageBoxButtons.No]): Observable<MessageBoxResult> {
        return this.messageBox(text, title, icon, 'message-box-warning', buttons);
    }

    error(text: string, title: string = 'Lỗi', icon: string = MessageBoxIcons.Error): Observable<MessageBoxResult> {
        return this.messageBox(text, title, icon, 'message-box-error', [MessageBoxButtons.Ok]);
    }

}
