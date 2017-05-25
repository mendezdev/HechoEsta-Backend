import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  username: string;
  password: string;

  constructor(
    private router: Router,
    private authService: AuthService
  ) { }

  ngOnInit() {
  }

  onLoginSubmit(){
    const user = {
      username: this.username,
      password: this.password
    };

    this.authService.authenticaUser(user).subscribe(data => {
      if(data.success){
        console.log(data);
        this.authService.storeUserData(data.token, data.user);
        
        this.router.navigate(['/market']);
      } else {
        console.log(data);
      }
    })
  }

  onCreateUser(){
    this.router.navigate(['/usuario']);
  }

}
