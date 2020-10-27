import { Component, OnInit, ViewChild } from '@angular/core';
import { UserService } from '../../services/user.service';
import { User } from '../../models/user.model';
import { FormControl } from '@angular/forms';
import { debounceTime } from 'rxjs/operators';
import { ModalDialogService } from 'src/app/shared/dialog/modal-dialog.service';
import { UserCreateComponent } from '../user-create/user-create.component';
import { DatatableComponent, SelectionType } from '@swimlane/ngx-datatable';

@Component({
  selector: 'app-user-container',
  templateUrl: './user-container.component.html',
  styleUrls: ['./user-container.component.scss']
})
export class UserContainerComponent implements OnInit {
  @ViewChild(DatatableComponent, { static: false }) table: DatatableComponent;
  searchControl: FormControl = new FormControl();
  users: User[];
  filteredUsers: User[];
  SelectionType = SelectionType;
  selected = [];

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

  onSelect({ selected }) {
    console.log(selected);
    const user = selected[0];
    this._modalService.open(UserCreateComponent, { user }, { size: 'lg' }).subscribe(res => {
      if (res) {
        this.refreshList();
      }
      this.selected = [];
    });
  }


  onCreate() {
    this._modalService.open(UserCreateComponent, {}, { size: 'lg' }).subscribe(res => {
      if (res) {
        this.refreshList();
      }
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
