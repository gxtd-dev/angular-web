import { Component, OnInit, Input } from '@angular/core';
import { User } from '../../models/user.model';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { isEmptyObj } from 'src/app/shared/utils/object.util';

@Component({
  selector: 'app-user-create',
  templateUrl: './user-create.component.html',
  styleUrls: ['./user-create.component.scss']
})
export class UserCreateComponent implements OnInit {

  // Inject by modal
  @Input() data: { user: User };

  form: FormGroup;
  loading: boolean;
  submitted = false;
  isNew = false;
  user: User;

  constructor(
    private _fb: FormBuilder,
    private _userService: UserService,
    private _activeModal: NgbActiveModal,
  ) {
  }

  get f() { return this.form.controls; }

  ngOnInit() {
    const { user } = this.data;
    this.isNew = isEmptyObj(user);
    if (!this.isNew) {
      this.user = user;
    }
    this._buildForm();
  }

  private _buildForm(user: any = {}) {
    this.form = this._fb.group({
      username: [user.username, Validators.required],
      user_ho_ten: [user.user_ho_ten, Validators.required],
      user_ten_thanh: [user.user_ten_thanh],
      user_cmnd_id: [user.user_cmnd_id],
      user_cmnd_ngay_cap: [user.user_cmnd_ngay_cap],
      user_cmnd_noi_cap: [user.user_cmnd_noi_cap],
      user_dia_chi_cu_ngu_1: [user.user_dia_chi_cu_ngu_1],
      user_dia_chi_cu_ngu_2: [user.user_dia_chi_cu_ngu_2],
      user_email: [user.user_email],
      user_giao_ho: [user.user_giao_ho],
      user_giao_phan: [user.user_giao_phan],
      user_giao_xu: [user.user_giao_xu],
      user_ngay_sinh: [user.user_ngay_sinh],
      user_noi_sinh: [user.user_noi_sinh],
      user_so_dien_thoai_1: [user.user_so_dien_thoai_1],
      user_so_dien_thoai_2: [user.user_so_dien_thoai_2],
    });

  }

  close() {
    this._activeModal.dismiss();
  }

  submit() {
    this.submitted = true;

    if (this.form.invalid) {
      return;
    }

    this.loading = true;
    const user = {
      id: this.isNew ? null : this.user.id,
      ...this.form.value
    };

    const call$ = this.isNew ? this._userService.createUser(user) : this._userService.updateUser(user);
    call$.subscribe(res => {
      this._activeModal.close();
    }, ({ error }) => {
      this.loading = false;
    });
  }
}
