import { Component, OnInit } from '@angular/core';
import { AngularFire, AuthProviders, AuthMethods } from 'angularfire2';
import { Router } from '@angular/router';
import { moveIn, fallIn } from '../router.animations';
import * as firebase from 'firebase';

@Component({
  selector: 'app-email',
  templateUrl: './email.component.html',
  styleUrls: ['./email.component.css'],
  animations: [moveIn(), fallIn()],
  host: {'[@moveIn]': ''}
})
export class EmailComponent implements OnInit {

    state: string = '';
    error: any;
    name: any;
    roles: string;

    constructor(public af: AngularFire,private router: Router) {
      this.af.auth.subscribe(auth => { 
        if(auth) {
          this.name = auth;
          this.redirect();
          //this.router.navigateByUrl('/members');
        }
      });
  }


  onSubmit(formData) {
    if(formData.valid) {
      console.log(formData.value);
      this.af.auth.login({
        email: formData.value.email,
        password: formData.value.password
      },
      {
        provider: AuthProviders.Password,
        method: AuthMethods.Password,
      }).then(
        (success) => {
        console.log(success);
        this.redirect();
        //this.router.navigate(['/members']);
      }).catch(
        (err) => {
        console.log(err);
        this.error = err;
      })
    }
  }

  redirect()
  {
    var Db = firebase.database();
    
    Db.ref('members/' + this.name.uid).once('value').then(function(snapshot) {
      const member = snapshot.val();
      this.roles = member.roles;
    }.bind(this));

    if (this.roles == 'author'){
      this.router.navigateByUrl('/members');
    }
    else {
      this.router.navigateByUrl('/login-email');
    }
  }

  ngOnInit() {
  }

}
