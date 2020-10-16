import { Component, OnInit } from '@angular/core';
import { SharedAnimations } from 'src/app/shared/animations/shared-animations';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../../shared/services/auth.service';
import { Router, RouteConfigLoadStart, ResolveStart, RouteConfigLoadEnd, ResolveEnd } from '@angular/router';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss'],
  animations: [SharedAnimations]
})
export class SigninComponent implements OnInit {
  loading: boolean;
  loadingText: string;
  signinForm: FormGroup;
  error: string;
  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private router: Router,
  ) { }

  ngOnInit() {
    this.router.events.subscribe(event => {
      if (event instanceof RouteConfigLoadStart || event instanceof ResolveStart) {
        this.loadingText = 'Loading';

        this.loading = true;
      }
      if (event instanceof RouteConfigLoadEnd || event instanceof ResolveEnd) {
        this.loading = false;
      }
    });

    this.signinForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  signin() {
    if (this.signinForm.valid) {
      this.loading = true;
      this.error = null;
      this.loadingText = 'Sigining in...';
      this.auth.signin(this.signinForm.value)
        .subscribe(res => {
          this.router.navigateByUrl('/dashboard');
          this.loading = false;
        }, (error) => {
          this.loading = false;
          this.error = 'Username hoặc Password không đúng.';
        });
    }
  }
}
