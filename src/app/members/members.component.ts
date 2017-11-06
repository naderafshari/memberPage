import { Component, OnInit } from '@angular/core';
import { AngularFire, AuthProviders, AuthMethods } from 'angularfire2';
import { Router } from '@angular/router';
import { moveIn, fallIn, moveInLeft } from '../router.animations';
//import { AngularFireDatabase } from 'angularfire2/database';
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
    this.af.auth.subscribe(auth => {
      if(auth) {
        this.name = auth;
      }
    });
  }

  addMember() {
    var Db = firebase.database();

    Db.ref('members/' + this.lastName).set({   //make the id unique somehow
      firstname: this.firstName,
      lastname: this.lastName,
      email: this.email,
    });
  }

  logout() {
     this.af.auth.logout();
     this.router.navigateByUrl('/login');
  }

  ngOnInit() {
  }
}
