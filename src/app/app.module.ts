import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CategoriaComponent } from './components/categoria/categoria.component';
import { AntojitosComponent } from './components/antojitos/antojitos.component';
import { RegistrarComponent } from './components/antojitos/registrar/registrar.component';
import { EditarComponent } from './components/antojitos/editar/editar.component';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RegistrarCategoriaComponent } from './components/categoria/registrar-categoria/registrar-categoria.component';
import { EditarCategoriaComponent } from './components/categoria/editar-categoria/editar-categoria.component';
import { HttpClientModule } from '@angular/common/http';
import { Ng2SearchPipeModule } from "ng2-search-filter";




@NgModule({
  declarations: [
    AppComponent,
    CategoriaComponent,
    AntojitosComponent,
    RegistrarComponent,
    EditarComponent,
    RegistrarCategoriaComponent,
    EditarCategoriaComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    CommonModule,
    HttpClientModule,
    Ng2SearchPipeModule,
    
  ],
  providers: [HttpClientModule],

  bootstrap: [AppComponent]
})
export class AppModule { }
