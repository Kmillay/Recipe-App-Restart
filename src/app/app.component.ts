import { Component, OnInit } from '@angular/core';
import { FormsModule} from '@angular/forms'
import { AuthService } from './auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
constructor(private authService: AuthService) {}

  ngOnInit() {
    this.authService.autoLogin();
   }
  }
