import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { User } from '../../models/user.model';
import { FormControl } from '@angular/forms';
import { debounceTime } from 'rxjs/operators';

@Component({
    selector: 'app-user-container',
    templateUrl: './user-container.component.html',
    styleUrls: ['./user-container.component.scss']
})
export class UserContainerComponent implements OnInit {

    searchControl: FormControl = new FormControl();
    users: User[];
    filteredUsers: User[];

    constructor(
        private userService: UserService
    ) { }

    ngOnInit() {
        this.userService.getUsers()
            .subscribe((res: User[]) => {
                this.users = [...res];
                this.filteredUsers = res;
                console.log(this.filteredUsers);
            });

        this.searchControl.valueChanges
            .pipe(debounceTime(200))
            .subscribe(value => {
                this.filterData(value);
            });
    }

    filterData(val) {
        if (val) {
            val = val.toLowerCase();
        } else {
            return this.filteredUsers = [...this.users];
        }

        const columns = Object.keys(this.users[0]);
        if (!columns.length) {
            return;
        }

        const rows = this.users.filter(function (d) {
            for (let i = 0; i <= columns.length; i++) {
                const column = columns[i];
                // console.log(d[column]);
                if (d[column] && d[column].toString().toLowerCase().indexOf(val) > -1) {
                    return true;
                }
            }
        });
        this.filteredUsers = rows;
    }

}
