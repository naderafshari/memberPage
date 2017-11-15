import { Component, OnInit, HostBinding } from '@angular/core';
import { AngularFire, AuthProviders, AuthMethods } from 'angularfire2';
import { Router } from '@angular/router';
import { moveIn } from '../router.animations';
import * as firebase from 'firebase';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  animations: [moveIn()],
  host: {'[@moveIn]': ''}
})
export class LoginComponent implements OnInit {

  error: any;
  name: any;
  roles: string;

    constructor(public af: AngularFire,private router: Router) {
    this.af.auth.subscribe(auth => { 
      if(auth) {
        this.name = auth;
        //this.redirect();
      }
    });

  }

  loginFb() {
    this.af.auth.login({
      provider: AuthProviders.Facebook,
      method: AuthMethods.Popup,
    }).then(
        (success) => {
          this.redirect();
        //this.router.navigate(['/members']);
      }).catch(
        (err) => {
        this.error = err;
      })
  }

  loginGoogle() {
    this.af.auth.login({
      provider: AuthProviders.Google,
      method: AuthMethods.Popup,
    }).then(
        (success) => {
          this.redirect();
        //this.router.navigate(['/members']);
      }).catch(
        (err) => {
        this.error = err;
      })
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
      this.router.navigateByUrl('/signup');
    }
  }

  ngOnInit() {
  }

}
