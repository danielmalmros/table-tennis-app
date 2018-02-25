import { Component, OnInit } from '@angular/core';
import { ValidateService } from '../../services/validate.service';
import { AuthService } from '../../services/auth.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  user: Object;
  firstName: String;
  lastName: String;
  team: String;
  email: String;

  constructor(
    private validateService: ValidateService,
    private flashMessage: FlashMessagesService,
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit() {
    this.authService.getProfile().subscribe(profile => {
      this.user = profile.user;
    }, err => {
      console.log(err);
      return false
    })
  }

  onEditSubmit() {
    const user = {
      firstName: this.firstName,
      email: this.email,
      lastName: this.lastName,
      team: this.team
    }

    if (!this.validateService.validateEmail(user.email)) {
      this.flashMessage.show('Please use a valid email!', { cssClass: 'alert-danger', timeout: 3000 })
      return false;
    }

    // Edit user
    this.authService.editUserProfile(user).subscribe(data => {
      if (data.success) {
        this.flashMessage.show('Profile is updatet!', { cssClass: 'alert-success', timeout: 3000 })
        this.router.navigate(['/profile']);
      } else {
        this.flashMessage.show('Something went wrong!', { cssClass: 'alert-danger', timeout: 3000 })
        this.router.navigate(['/profile']);
      }
    });
  }

}
