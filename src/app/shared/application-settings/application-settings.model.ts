export interface IApplicationSettings {
    apiUrl: string;
}

export function getApplicationSettings(): IApplicationSettings {
    return window['applicationSettings'] || {};
}
