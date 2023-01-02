import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from '../shared/user';
import { AuthService } from '../shared/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  //declare variables
  loginForm!: FormGroup;
  isSubmitted = false;
  error = '';
  loginUser: any = new User();

  constructor(private formBuilder: FormBuilder,
    private router: Router,
    private authService: AuthService) { }

  ngOnInit(): void {

    // Create a Reactive Form model
    this.loginForm = this.formBuilder.group(
      {
        //FormControlName Fields
        uName: ['', [Validators.required]],
        uPassword: ['', [Validators.required]]
      }
    );
  }

  //get controls for validation
  get formControls() {
    return this.loginForm.controls;
  }

  // login Verify for credentials
  loginCredentials() {

    this.isSubmitted = true;


    if (this.loginForm.invalid) {
      console.log("Submitted with INVALID")
      this.error = "";
      return;
    }

    if (this.loginForm.valid) {
      console.log("Submitted with VALID")
      this.error = "";
      // calling method from AuthService -- Authentication and Authorize
      this.authService.loginVerify(this.loginForm.value)
        .subscribe(
          data => {
            console.log(data);
            this.loginUser = data;

            //UserName, RoleId  and Token
            sessionStorage.setItem('JwtTOKEN', this.loginUser.token)

            // check the role  based on rId, it redirects to the respective componet
            if (this.loginUser.rId===1) {
              console.log("ADMIN");
              localStorage.setItem("USERNAME",this.loginUser.uName);
              localStorage.setItem("ACCESSROLE",this.loginUser.rId.toString())
              sessionStorage.setItem("USERNAME",this.loginUser.uName);

              this.router.navigateByUrl('/admin');
            }
            else if(this.loginUser.rId===2){
              console.log("MANAGER");
              localStorage.setItem("USERNAME",this.loginUser.uName);
              localStorage.setItem("ACCESSROLE",this.loginUser.rId.toString())
              sessionStorage.setItem("USERNAME",this.loginUser.uName);
              this.router.navigateByUrl('/manager');
            }
            else if(this.loginUser.rId===3){
              console.log("COORDINATOR");
              localStorage.setItem("USERNAME",this.loginUser.uName);
              localStorage.setItem("ACCESSROLE",this.loginUser.rId.toString())
              sessionStorage.setItem("USERNAME",this.loginUser.uName);
              this.router.navigateByUrl('/coordinator');
            }
            else{
              this.error = "Sorry! NOT authenticate/authorize to access this module"
            }

          },
          error => {
            this.error = "Invalid username or password! try again"
          }
        );
    }
  }

}
