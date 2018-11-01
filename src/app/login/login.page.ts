import { Component, OnInit } from '@angular/core';
import { Login } from '../Models/Login';
import { LoginService } from '../Services/login.service';
import { LoadingController, Platform } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  
		login = new Login();
		private loading: any;

		constructor(private loginService: LoginService, 
			public loadingCtrl: LoadingController, 
			private storage: Storage, 
			private platform: Platform,
			private router: Router) { }

	ngOnInit() {
		this.isAuthenticated();
	}

  	onLogin(){
		this.presentLoading();
		this.loginService.loginApi(this.login).subscribe(
			res=> {
				console.log(res);
				let token = res.token_type + " " + res.access_token;
				if(this.platform.is('cordova')){
					this.storage.set('token', token);
				}else{
					localStorage.setItem('token', token);
				}
				this.dismissLoading();
				this.router.navigate(['home']);
			}, err=> {
				console.log(err);
				this.dismissLoading();
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

		private async presentLoading() {
			this.loading = await this.loadingCtrl.create({
				message: 'Loading'
			});
			this.loading.present();
		}

		private dismissLoading() {
			this.loading.dismiss();
		}
}
