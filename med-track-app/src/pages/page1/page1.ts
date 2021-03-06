import { Component } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { NavController, NavParams } from 'ionic-angular';
import { Http, RequestOptions, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import { Page2 } from '../page2/page2';
import { UserProfilePage } from '../user-profile/user-profile';
import { Platform } from 'ionic-angular';

@Component({
  selector: 'page-page1',
  templateUrl: 'page1.html'
})
export class Page1 {

  public form : FormGroup;
  public userName : any;
  public userPassword : any;
  private baseURI : String  = "http://51.141.24.34/";
  
  page2 = Page2;
  userProfile = UserProfilePage;
  
  public items: any = [];

  //get username and password from the form
  constructor(public platform: Platform, public navCtrl: NavController, public navParams: NavParams, public http: Http, public fb: FormBuilder) {
    this.form = fb.group({
      "username": [""],
      "password": [""]
    })
    
    //allow the back button on android device to close the app
    platform.registerBackButtonAction(() => {
        this.platform.exitApp();
    });
  }

   setLogIn(item){
    this.userName = item.username;
    this.userPassword = item.password;
  }

//post request for logging in
   logInUser(username, password)
  {
    let body: String = "key=create&username=" + username + "&password=" + password,
        type: String = "application/x-www-form-urlencoded; charset=UTF-8",
        headers: any = new Headers({ 'Content-Type': type}),
        options: any = new RequestOptions({ headers: headers }),
        url 	 : any = this.baseURI + "login.php";

    this.http.post(url, body, options).subscribe((data) => {});
    
  }

  saveLogin(){
    let username : string	= this.form.controls["username"].value,
        password : string	= this.form.controls["password"].value;

    this.logInUser(username, password);//pass data to post request
    this.navCtrl.push(UserProfilePage, {username});//push to the profile page, pass username with it
  }

}
