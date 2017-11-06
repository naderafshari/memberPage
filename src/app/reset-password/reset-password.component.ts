import { Component, OnInit } from '@angular/core';
import { AngularFire, AuthProviders, AuthMethods } from 'angularfire2';
import { Router } from '@angular/router';
import { moveIn, fallIn } from '../router.animations';
import * as firebase from 'firebase';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css'],
  animations: [moveIn(), fallIn()],
  host: {'[@moveIn]': ''}
})
export class ResetPasswordComponent implements OnInit {
    state: string = '';
    error: any;
    
    constructor(public af: AngularFire, private router: Router) {
      this.af.auth.subscribe(auth => { 
        if(auth) {
          this.router.navigateByUrl('/members');
        }
      });
  }

  onSubmit(formData) {
    var auth = firebase.auth();
    
    if(formData.valid) {
      console.log(formData.value.email);

      auth.sendPasswordResetEmail(formData.value.email).then(function() {
        // Email sent.
      }).catch(function(error) {
        // An error happened.
      });
      this.router.navigateByUrl('/login-email');
    }    
  }

  ngOnInit() {
  }

}
