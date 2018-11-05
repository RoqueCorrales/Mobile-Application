import { Component, OnInit } from '@angular/core';
import { Platform } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { Router } from '@angular/router';

import { Login } from '../Models/Login';
import { LoginService } from '../Services/login.service';
import { LoaderService } from '../Services/loader.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  
		login = new Login();

		constructor(private loginService: LoginService, 
			private storage: Storage, 
			private platform: Platform,
			private router: Router,
			private loaderService: LoaderService) { }

	ngOnInit() {
		this.isAuthenticated();
	}

  	onLogin(){
		this.loaderService.presentLoading();
		this.loginService.loginApi(this.login).subscribe(
			res=> {
				console.log(res);
				let token = res.token_type + " " + res.access_token;
				if(this.platform.is('cordova')){
					this.storage.set('token', token);
				}else{
					localStorage.setItem('token', token);
				}
				this.loaderService.dismissLoading();
				this.router.navigate(['home']);
			}, err=> {
				console.log(err);
				this.loaderService.dismissLoading();
			});
		}
		
		private isAuthenticated(){
			if(this.platform.is('cordova')){
					this.storage.get('token').then((val) => {
						if(val !== null){
							this.router.navigate(['home']);
						}
					});
			}else{
				if(localStorage.getItem('token') !== null){
					this.router.navigate(['home']);
				}
			}
		}
}
