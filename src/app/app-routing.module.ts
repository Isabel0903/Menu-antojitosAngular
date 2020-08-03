import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AntojitosComponent } from './components/antojitos/antojitos.component';
import { CategoriaComponent } from './components/categoria/categoria.component';


const routes: Routes = [
  {path: 'categoria', component: CategoriaComponent, data: { titulo : 'Categoria'}},
  {path: 'antojitos', component: AntojitosComponent, data: { titulo: 'Antojitos'}},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
