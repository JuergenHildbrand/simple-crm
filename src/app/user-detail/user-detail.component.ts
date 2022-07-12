import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { User } from 'src/models/user.class';
import { DialogEditAddressComponent } from '../dialog-edit-address/dialog-edit-address.component';
import { DialogEditUserComponent } from '../dialog-edit-user/dialog-edit-user.component';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.scss']
})
export class UserDetailComponent implements OnInit {

  userId = '';
  user: User = new User(); // (object vom Typ User)
  // user: any = {}; (Json)

  constructor(private route: ActivatedRoute, 
    private firestore: AngularFirestore, 
    public dialog: MatDialog) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(paramMap => {
      this.userId = paramMap.get('id');
      // console.log(this.userId);
      this.getUser();
    });
  }

  getUser() {
    this.firestore
      .collection('users')
      .doc(this.userId)
      .valueChanges()
      .subscribe((user: any) => {
        this.user = new User(user)
        // this.user = user;
        console.log(this.user);
        
      });
  }

  editUser() {
    let dialog = this.dialog.open(DialogEditUserComponent);
    // dialog.componentInstance.user = this.user;
  }

  editMenu() {
    const dialog = this.dialog.open(DialogEditAddressComponent);
    dialog.componentInstanceuser.user = this.user;
  }

}
