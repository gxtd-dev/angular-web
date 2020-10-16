import {
    ModuleWithProviders,
    NgModule
} from '@angular/core';

import { applicationSettingsProvider } from './application-settings.provider';
import { ApplicationUserService } from './application-user.service';

@NgModule()
export class ApplicationSettingsModule {
    public static forRoot(): ModuleWithProviders<any> {
        return {
            ngModule: ApplicationSettingsModule,
            providers: [
                applicationSettingsProvider,
                ApplicationUserService,
            ],
        };
    }
}
