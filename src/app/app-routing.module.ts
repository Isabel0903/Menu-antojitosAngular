import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AntojitosComponent } from './components/antojitos/antojitos.component';
import { CategoriaComponent } from './components/categoria/categoria.component';


const routes: Routes = [
  {path: 'categoria', component: CategoriaComponent, data: { titulo : 'Categoria'}},
  {path: 'antojito/:id', component: AntojitosComponent, data: { titulo: 'Antojitos'}},
  { path: '', redirectTo: '/categoria', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
