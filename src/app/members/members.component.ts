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

  constructor(public af: AngularFire,private router: Router) {
    
    var Db = firebase.database();

    this.af.auth.subscribe(auth => {
      if(auth) {
        this.name = auth;
        //console.log(this.name.auth.email);
      }
    });
    //var userId = firebase.auth().currentUser.uid;

    Db.ref('members/' + this.name.uid).once('value').then(function(snapshot) {
      //const firstName = (snapshot.val() && snapshot.val().firstname) || 'Anonymous';
      const member = snapshot.val();
      //console.log(user);
      this.firstName = member.firstname;
      this.lastName = member.lastname;
      this.email = member.email;
    }.bind(this));

  }

  addMember() {
    var Db = firebase.database();

    Db.ref('members/' + this.name.uid).set({
      firstname: this.firstName,
      lastname: this.lastName,
      email: this.email,
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
