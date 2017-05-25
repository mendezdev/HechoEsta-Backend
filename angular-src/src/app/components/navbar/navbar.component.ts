import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {    

  username: any;

  constructor(
    private router: Router,
    private authService: AuthService
  ) { 
    
  }

  ngOnInit() {
    this.authService.getProfile().subscribe(data => {
      this.username = data.user.username;
    });
  }

  getUsername(){
    
  }

  onLogoutClick(){
    this.authService.logout();

    this.router.navigate(['/login']);

    return false;
  }

}
