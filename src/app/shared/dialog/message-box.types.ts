export enum MessageBoxIcons {
    Info = 'i-Information',
    Question = 'i-Speach-Bubble-Asking',
    Warning = 'i-Warning-Window',
    Error = 'i-Close-Window',
}

export enum MessageBoxClasses {
    Info = 'message-box-info',
    Question = 'message-box-question',
    Warning = 'message-box-warning',
    Error = 'message-box-error',
}

export enum MessageBoxResult {
    Ok = 1,
    Yes = 2,
    No = 3,
    Cancel = 4,
}

export interface IMessageBoxButton {
    label: string;
    result: MessageBoxResult | number;
    twbsclass?: string;
}

export const MessageBoxButtons: {
    [key: string]: IMessageBoxButton,
} = {
    Ok: {
        label: 'Ok',
        result: MessageBoxResult.Ok,
        twbsclass: 'btn-primary',
    },
    Yes: {
        label: 'Đồng ý',
        result: MessageBoxResult.Yes,
        twbsclass: 'btn-primary',
    },
    No: {
        label: 'Không',
        result: MessageBoxResult.No,
        twbsclass: 'btn-default',
    },
    Cancel: {
        label: 'Hủy',
        result: MessageBoxResult.Cancel,
        twbsclass: 'btn-default',
    },
};
