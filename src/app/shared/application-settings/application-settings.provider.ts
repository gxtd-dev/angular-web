import { InjectionToken, FactoryProvider } from '@angular/core';

import {
    getApplicationSettings,
    IApplicationSettings,
} from './application-settings.model';

export let APPLICATION_SETTINGS = new InjectionToken<IApplicationSettings>('ApplicationSettings');

export const applicationSettingsProvider: FactoryProvider = {
    provide: APPLICATION_SETTINGS,
    useFactory: getApplicationSettings,
};
