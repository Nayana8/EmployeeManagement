import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  imports: [FormsModule],
  selector: 'app-login',
  styleUrl: './login.css',
  templateUrl: './login.html',
})
export class Login {
  logibObj:any={
    userName:'',
    password:''
  };

  router = inject(Router);


  constructor(private http: HttpClient) {

  }

  onLogin(){
    if (!this.logibObj.userName?.trim() || !this.logibObj.password) {
      alert('Please enter username and password');
      return;
    }
    
    this.http.post(environment.API_URL + "login", this.logibObj).subscribe( {
      next: (response:any) => { 
       
        if(response.result){
          alert('User Found');
         this.router.navigateByUrl("/admin/dashboard");
          
        }
        else{
          alert(response.message );
        } 
      },
      error: (err:any) => {
      
        alert("An error occurred");
      }
      
    });
  
  }
  
}
