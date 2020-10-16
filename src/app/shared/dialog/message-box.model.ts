import { IMessageBoxButton } from './message-box.types';

export interface IMessageBoxData {
    title: string;
    icon: string;
    content: string;
    buttons: IMessageBoxButton[];
    dlgClass: string;
}
