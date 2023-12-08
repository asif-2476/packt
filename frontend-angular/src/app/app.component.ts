import { Component ,OnInit} from '@angular/core';
import { AuthService } from "./auth/auth.service";
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'packt-ng';
  isAuth:any = false;
  constructor(public authService: AuthService,private router: Router) {

  }

  ngOnInit() {
    // this.isAuth = this.authService.getAuth().subscribe((updatedData: any) => {
    //   console.log('sdubduy',updatedData);
    //   this.isAuth = updatedData;
    // });
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        // Call your service method here
        
        if(event.url == '/admin/books'){
          this.isAuth = this.authService.getIsAuth();
          console.log(event.url,this.isAuth)
        }
        
      });
    
  }

  logout(){
    this.authService.logout();
    this.isAuth = false;
  }
}


