import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';

const routes: Routes = [
  {path:'home',component:HomeComponent},//Ruta principal
  {path:'',redirectTo:'/home',pathMatch:'full'}, //Redirección ruta vacia a la ruta Home
  {path:'**',redirectTo:'/home',pathMatch:'full'} // Redirección de cualquier ruta a la ruta HOME
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
