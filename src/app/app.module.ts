import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { routes } from './app.routing';
import { AppComponent } from './app.component';
import { MapsComponent } from './maps/maps.component';
import { LoginComponent } from './login';
import { RouterModule } from '@angular/router';
import { RegisterComponent } from './register/register.component';

@NgModule({
  declarations: [
    AppComponent,
    MapsComponent,
    LoginComponent,
    RegisterComponent
  ],
  imports: [
    BrowserModule,
    FormsModule, ReactiveFormsModule,
    RouterModule.forRoot(routes),
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

