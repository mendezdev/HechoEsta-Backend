import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Router } from '@angular/router';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.css']
})
export class UsuarioComponent implements OnInit {

  name: string;
  username: string;
  password: string;
  email: string;
  status: boolean;

  constructor(
    private authService: AuthService,
    private flashMessage: FlashMessagesService,
    private router: Router
  ) { }

  ngOnInit() {
  }

  onCreateUserSubmit(){
    const user = {
      name: this.name,
      username: this.username,
      password: this.password,
      email: this.email,
      status: true
    }

    this.authService.registerUser(user).subscribe(data => {
      if(data.success){
        this.flashMessage.show(data.msg, {
          cssClass: 'alert-success',
          timeout: 3000
        });

        this.router.navigate(['/login']);
      } else {
        this.flashMessage.show('Ocurrio un error al intentar crear el usuario', {
          cssClass: 'alert-danger',
          timeout: 3000
        });
      }
    });
  }

}
