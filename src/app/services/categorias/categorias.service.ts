import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CategoriasModel } from '../../models/categorias';
import { environment } from '../../../environments/environment.prod';
@Injectable({
  providedIn: 'root'
})
export class CategoriasService {
  url = `${environment.urlLocal}categoria`;

  //servicio de categorias
  constructor(private http: HttpClient) { }
  //funcion para obtener categorias
  obtenerCategorias() {
    return this.http.get(`${this.url}/obtener`).toPromise();
  }
  //funcion para obtener categorias por id
  obtenerCategoriasid(idCategorias: String) {
    return this.http.get(`${this.url}/obtener/${idCategorias}`).toPromise();
  }
  //funcion para registrar categorias
  registrarCategorias(categorias: CategoriasModel) {
    return this.http.post(`${this.url}/registrar`, categorias).toPromise();
  }
  //funcion para actualizar categorias
  actualizarCategorias(idCategorias: String, categorias: CategoriasModel) {
    return this.http.put(`${this.url}/actualizar/${idCategorias}`, categorias ).toPromise();
  }
  
  desactivar(idCategorias: string) {
    return this.http.delete(`${this.url}/eliminar/${idCategorias}`, {}).toPromise();
  }
  Activar(idCategorias: String) {
    return this.http.delete(`${this.url}/activar/${idCategorias}`).toPromise();

}

}
