import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CategoryComponent } from './category/category.component';
import { DasdboardComponent } from './dasdboard/dasdboard.component';
import { AllPostComponent } from './posts/all-post/all-post.component';
import { NewPostComponent } from './posts/new-post/new-post.component';
import { LoginComponent } from './auth/login/login.component';
import { AuthGuard } from './services/auth.guard';
import { SubsribersComponent } from './subsribers/subsribers.component';
import { LocationComponent } from './location/location.component';

const routes: Routes = [
  { path: '', component: DasdboardComponent, canActivate: [AuthGuard] },

  { path: 'login', component: LoginComponent },
  {
    path: 'categories',
    component: CategoryComponent,
    canActivate: [AuthGuard],
  },
  { path: 'location', component: LocationComponent, canActivate: [AuthGuard] },

  { path: 'posts', component: AllPostComponent, canActivate: [AuthGuard] },
  { path: 'posts/new', component: NewPostComponent, canActivate: [AuthGuard] },
  {
    path: 'subscribers',
    component: SubsribersComponent,
    canActivate: [AuthGuard],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
