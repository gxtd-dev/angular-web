import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { User } from '../../models/user.model';
import { FormControl } from '@angular/forms';
import { debounceTime } from 'rxjs/operators';
import { ModalDialogService } from 'src/app/shared/dialog/modal-dialog.service';
import { UserCreateComponent } from '../user-create/user-create.component';

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
    private _userService: UserService,
    private _modalService: ModalDialogService,
  ) { }

  ngOnInit() {
    this.refreshList();

    this.searchControl.valueChanges
      .pipe(debounceTime(200))
      .subscribe(value => {
        this.filterData(value);
      });
  }

  refreshList() {
    this._userService.getUsers()
      .subscribe((res: User[]) => {
        this.users = [...res];
        this.filteredUsers = res;
        console.log(this.filteredUsers);
      });
  }

  onCreate() {
    this._modalService.open(UserCreateComponent, {}, { size: 'lg' }).subscribe(_ => {
      this.refreshList();
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
