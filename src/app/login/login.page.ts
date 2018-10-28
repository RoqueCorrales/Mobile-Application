import { Component, OnInit } from '@angular/core';
import { Login } from '../Models/Login';
import { LoginService } from '../Services/login.service';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  
  	login = new Login();

  	constructor(private loginService: LoginService, public loadingCtrl: LoadingController) { }

	ngOnInit() {
	}

  	onLogin(){
		this.presentLoading();
		this.loginService.loginApi(this.login).subscribe(
		res=> {
			console.log(res);
			
		}, err=> {
			console.log(err);
		});
	  }
	  

	async presentLoading() {
		const loading = await this.loadingCtrl.create({
		  message: 'Loading'
		});
		return await loading.present();
	}
}
