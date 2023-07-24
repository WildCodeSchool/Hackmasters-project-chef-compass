/* eslint-disable @angular-eslint/no-empty-lifecycle-method */
import { Component, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { AuthUserService } from 'src/app/services/auth-user/auth-user.service';

@Component({
  selector: 'app-create-modal',
  templateUrl: './create-modal.component.html',
  styleUrls: ['./create-modal.component.scss'],
})
export class CreateModalComponent implements OnInit {
  email = '';
  password = '';
  confirmPassword = '';
  errorMessage = '';

  constructor(public bsModalRef: BsModalRef, private authUserService: AuthUserService) {}

  ngOnInit(): void {}

  onSubmit(): void {
    if (this.password !== this.confirmPassword) {
      this.errorMessage = 'Password and Confirm Password must match.';
      return;
    }

    this.authUserService.createUser(this.email, this.password).subscribe(
      (response: any) => {
        console.log('Response object from backend:', response);
        // Handle successful creation, e.g., navigate to the user's profile page
        this.bsModalRef.hide();
      },
      (error) => {
        console.error('Profile creation failed:', error);
        this.errorMessage = 'An error occurred during profile creation. Please try again.';
      }
    );
  }

  onClose(): void {
    this.authUserService.isCreateModalVisible = false;
  }
}
