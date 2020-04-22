import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { UserService } from './user.service';
import { User } from './user.model';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  @ViewChild('userName',{static: false}) userName: ElementRef;
  @ViewChild('company',{static: false})  company: ElementRef;

  UserList : Array<Object>;
  constructor(private userService : UserService) { }

  ngOnInit() {
    //this.UserList = this.userService.getUserList();
    this.userService.userListChanged.subscribe( data =>{
      console.log("data=="+data)
      this.UserList = data;
    })
  }

  onStoreUsers(){
    this.userService.onStoreUsers();
  }

  onGetUserData(){
    this.userService.getUserList();
  }

  onAddUser() {
    let username = this.userName.nativeElement.value;
    let company = this.company.nativeElement.value;
    this.userService.addUser(new User(username,company));
  }

  onDelete(index: number){
    this.userService.deleteUser(index);
  }

  onClearUsers(){
    this.userService.clearUserData()
  }
}
