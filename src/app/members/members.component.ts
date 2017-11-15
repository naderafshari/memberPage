import { Component, OnInit } from '@angular/core';
import { AngularFire, AuthProviders, AuthMethods } from 'angularfire2';
import { Router } from '@angular/router';
import { moveIn, fallIn, moveInLeft } from '../router.animations';
import * as firebase from 'firebase';

@Component({
  selector: 'app-members',
  templateUrl: './members.component.html',
  styleUrls: ['./members.component.css'],
  animations: [moveIn(), fallIn(), moveInLeft()],
  host: {'[@moveIn]': ''}
})
export class MembersComponent implements OnInit {
  name: any;
  firstName: string;
  lastName: string;
  email: string;
  photoURL: string;
  roles: string;

  constructor(public af: AngularFire,private router: Router) {
    
    var Db = firebase.database();

    this.af.auth.subscribe(auth => {
      if(auth) {
        this.name = auth;
      }
    });

    Db.ref('members/' + this.name.uid).once('value').then(function(snapshot) {
      const member = snapshot.val();
      this.firstName = member.firstname;
      this.lastName = member.lastname;
      this.email = member.email;
      this.photoURL = member.photourl;
      this.roles = member.roles;
    }.bind(this));
  }

  updateMember() {
    var Db = firebase.database();

    Db.ref('members/' + this.name.uid).set({
      firstname: this.firstName,
      lastname: this.lastName,
      email: this.email,
      photourl: this.photoURL,
      roles: this.roles,
    });
    this.af.auth.logout();
    this.router.navigateByUrl('/login');
 }

  logout() {
     this.af.auth.logout();
     this.router.navigateByUrl('/login');
  }

  ngOnInit() {
  }
}
