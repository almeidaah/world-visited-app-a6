import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { HttpModule } from '@angular/http';

import { routes } from './app.routing';
import { AppComponent } from './app.component';
import { MapsComponent } from './maps/maps.component';
import { AlertComponent } from './_directives';
import { LoginComponent } from './login';
import { RouterModule } from '@angular/router';
import { RegisterComponent } from './register/register.component';

//helper components
import { AlertService, AuthenticationService, UserService , MarkerService } from './_services';

@NgModule({
  declarations: [
    AppComponent,
    AlertComponent,
    MapsComponent,
    LoginComponent,
    RegisterComponent
  ],
  imports: [
    BrowserModule,
    FormsModule, ReactiveFormsModule,
    RouterModule.forRoot(routes),
    HttpClientModule, HttpModule
  ],
  providers: [ 
    AlertService,
    AuthenticationService,
    UserService,
    MarkerService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

