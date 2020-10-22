import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserContainerComponent } from './components/user-container/user-container.component';
import { UsersRoutingModule } from './users-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';

@NgModule({
    imports: [
        CommonModule,
        UsersRoutingModule,
        FormsModule,
        ReactiveFormsModule,
        NgxPaginationModule,
        NgxDatatableModule,
    ],
    declarations: [UserContainerComponent]
})
export class UsersModule { }
