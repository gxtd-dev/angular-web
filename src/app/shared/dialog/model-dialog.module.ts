import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ModalDialogService } from './modal-dialog.service';
import { MessageBoxComponent } from './message-box/message-box.component';
import { MessageBoxService } from './message-box.service';

@NgModule({
    imports: [
        CommonModule,
        NgbModule,
    ],
    declarations: [MessageBoxComponent],
    entryComponents: [MessageBoxComponent]
})
export class ModalDialogModule {
    public static forRoot(): ModuleWithProviders<any> {
        return {
            ngModule: ModalDialogModule,
            providers: [
                ModalDialogService,
                MessageBoxService
            ],
        };
    }
}
