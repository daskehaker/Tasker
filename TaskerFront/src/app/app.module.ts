import { AdminauthGuard } from './auth/adminauth.guard';
import { AuthentificationComponent } from './authentification/authentification.component';
import { AuthGuard } from './auth/auth.guard';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { RouterModule } from '@angular/router'

import { AppComponent } from './app.component';
import { ExerciseComponent } from './exercise/exercise.component';
import { ExerciseFormComponent } from './exercise/exercise-form/exercise-form.component';
import { ExerciseListComponent } from './exercise/exercise-list/exercise-list.component';
import { ExerciseDetailService } from './shared/services/exercise-detail.service';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { WorkoutComponent } from './workout/workout.component';
import { WorkoutFormComponent } from './workout/workout-form/workout-form.component';
import { WorkoutListComponent } from './workout/workout-list/workout-list.component';
import { CommonModule } from '@angular/common';
import { WorkoutViewComponent } from './workout/workout-view/workout-view.component';
import { ExerciseViewComponent } from './exercise/exercise-view/exercise-view.component';
import { OrderByIndexPipe } from './shared/custome-pipes/order-by-index.pipe';
import { HomeComponent } from './home/home.component';
import { AuthInterceptor } from './auth/auth.interceptor';
import { WorkoutEditComponent } from './workout/workout-edit/workout-edit.component';
import { AddExerciseListComponent } from './workout/add-exercise-list/add-exercise-list.component';
import { LoginFormComponent } from './authentification/login-form/login-form.component';
import { RegistrationFormComponent } from './authentification/registration-form/registration-form.component';

import { UserComponent } from './user/user.component';
import { UserProfileComponent } from './user/user-profile/user-profile.component';

@NgModule({
  declarations: [
    AppComponent,
    ExerciseComponent,
    ExerciseFormComponent,
    ExerciseListComponent,
    NavbarComponent,
    WorkoutComponent,
    WorkoutFormComponent,
    WorkoutListComponent,
    WorkoutViewComponent,
    ExerciseViewComponent,
    OrderByIndexPipe,
    AuthentificationComponent,
    HomeComponent,
    WorkoutEditComponent,
    AddExerciseListComponent,
    LoginFormComponent,
    RegistrationFormComponent,
    UserComponent,
    UserProfileComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    CommonModule,
    ReactiveFormsModule,
    ToastrModule.forRoot(),
    RouterModule.forRoot([
      {path: 'users/:id', component: UserProfileComponent, canActivate:[AuthGuard, AdminauthGuard] },
      {path: 'users', component: UserComponent, canActivate:[AuthGuard, AdminauthGuard]  },
      {path: 'user', component: AuthentificationComponent, children: [
        {path: 'registration', component: RegistrationFormComponent},
        {path: 'login', component: LoginFormComponent}
      ]},
      {path: 'workouts/edit/:id', component: WorkoutEditComponent},
      {path: 'workouts/edit/:id', component: WorkoutComponent},
      {path: 'workouts/:id', component: WorkoutViewComponent},
      {path: 'home', component: HomeComponent, canActivate:[AuthGuard]},
      {path: 'exercises', component: ExerciseComponent, canActivate:[AuthGuard]},
      {path: 'workouts', component: WorkoutComponent, canActivate:[AuthGuard]},
      {path: '', redirectTo: 'user/login', pathMatch: 'full'},
      {path: '**', redirectTo: 'exercises', pathMatch: 'full'},
    ])
  ],
  providers: [
    ExerciseDetailService,
  {
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
