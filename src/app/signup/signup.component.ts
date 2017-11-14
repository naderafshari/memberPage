import { Component, OnInit } from '@angular/core';
import { AngularFire, AuthProviders, AuthMethods } from 'angularfire2';
import { Router } from '@angular/router';
import * as firebase from 'firebase';
import { moveIn, fallIn } from '../router.animations';
import { Roles } from '../user';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
  animations: [moveIn(), fallIn()],
  host: {'[@moveIn]': ''}
})
export class SignupComponent implements OnInit {

  state: string = '';
  error: any;
  
  constructor(public af: AngularFire,private router: Router) {

  }

  onSubmit(formData) {
    var Db = firebase.database();

    if(formData.valid) {
      console.log(formData.value);
        this.af.auth.createUser({
        email: formData.value.email,
        password: formData.value.password
      }).then(
        (success) => {
          var user = firebase.auth().currentUser;
          Db.ref('members/' + user.uid).set({
            email: user.email,
            photourl: '',
            roles: {author: true}
          });
          this.router.navigate(['/members'])
      }).catch(
        (err) => {
        this.error = err;
      })
    }
  }

  ngOnInit() {
  }

}
