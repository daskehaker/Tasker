import { AuthGuard } from './auth/auth.guard';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { RouterModule } from '@angular/router'

import { AppComponent } from './app.component';
import { ExerciseDetailsComponent } from './exercise-details/exercise-details.component';
import { ExerciseDetailComponent } from './exercise-details/exercise-detail/exercise-detail.component';
import { ExerciseListComponent } from './exercise-details/exercise-list/exercise-list.component';
import { ExerciseDetailService } from './shared/services/exercise-detail.service';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { WorkoutDetailsComponent } from './workout-details/workout-details.component';
import { WorkoutDetailComponent } from './workout-details/workout-detail/workout-detail.component';
import { WorkoutListComponent } from './workout-details/workout-list/workout-list.component';
import { CommonModule } from '@angular/common';
import { WorkoutViewComponent } from './workout-details/workout-view/workout-view.component';
import { ExerciseViewComponent } from './exercise-details/exercise-view/exercise-view.component';
import { OrderByIndexPipe } from './shared/custome-pipes/order-by-index.pipe';
import { UserComponent } from './user/user.component';
import { HomeComponent } from './home/home.component';
import { AuthInterceptor } from './auth/auth.interceptor';
import { WorkoutEditComponent } from './workout-details/workout-edit/workout-edit.component';
import { AddExerciseListComponent } from './workout-details/add-exercise-list/add-exercise-list.component';
import { LoginFormComponent } from './user/login-form/login-form.component';
import { RegistrationFormComponent } from './user/registration-form/registration-form.component';
import { ProjectDetailsComponent } from './project-details/project-details.component';
import { ProjectListComponent } from './project-details/project-list/project-list.component';
import { ProjectComponent } from './project-details/project/project.component';
import { UserDetailsComponent } from './user-details/user-details.component';

@NgModule({
  declarations: [
    AppComponent,
    ExerciseDetailsComponent,
    ExerciseDetailComponent,
    ExerciseListComponent,
    NavbarComponent,
    WorkoutDetailsComponent,
    WorkoutDetailComponent,
    WorkoutListComponent,
    WorkoutViewComponent,
    ExerciseViewComponent,
    OrderByIndexPipe,
    UserComponent,
    HomeComponent,
    ProjectDetailsComponent,
    ProjectComponent,
    ProjectListComponent,
    WorkoutEditComponent,
    AddExerciseListComponent,
    LoginFormComponent,
    RegistrationFormComponent,
    ProjectListComponent,
    UserDetailsComponent
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
      {path: 'user-details', component: UserDetailsComponent },
      {path: 'user', component: UserComponent, children: [
        {path: 'registration', component: RegistrationFormComponent},
        {path: 'login', component: LoginFormComponent}
      ]},
      {path: 'workouts/edit/:id', component: WorkoutEditComponent},
      {path: 'workouts/:id', component: WorkoutViewComponent},
      {path: 'home', component: HomeComponent, canActivate:[AuthGuard]},
      {path: 'exercises', component: ExerciseDetailsComponent, canActivate:[AuthGuard]},
      {path: 'workouts', component: WorkoutDetailsComponent, canActivate:[AuthGuard]},
      {path: 'projects', component: ProjectDetailsComponent, canActivate:[AuthGuard]},
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
