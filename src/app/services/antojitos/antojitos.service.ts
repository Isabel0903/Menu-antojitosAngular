import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AntojitosModel } from '../../models/antojitos';
import { environment } from '../../../environments/environment.prod';

@Injectable({
  providedIn: 'root'
})

export class AntojitosService{
    url=`${environment.urlLocal}platillo`;
     // servicio de Antojitos
  constructor(private http: HttpClient) { }

  obtenerPorCategoria(idCategorias: string){
    return this.http.get(`${this.url}/obtenerPorCategoria/${idCategorias}`).toPromise();
  }

  // funcion para obtener Antojitos por id
  obtenerAntojitosid(idAntojito: string) {
    return this.http.get(`${this.url}/obtener/${idAntojito}`).toPromise();
  }
  // funcion para registrar antojitos
  registrarAntojitos( idCategoria: string, antojitos: AntojitosModel) {
    return this.http.post(`${this.url}/registrar/${idCategoria}`, antojitos).toPromise();
  }
  // funcion para actualizar antojitos
  actualizarAntojitos( idCategorias: string,idAntojitos: string, antojitos: AntojitosModel) {
    return this.http.put(`${this.url}/actualizar/${idAntojitos}`, antojitos ).toPromise();
  }
  desactiva(idCategorias: string, idAntojito: string) {
    return this.http.delete(`${this.url}/eliminar/${idAntojito}`).toPromise();
  }

  activar(idCategorias: string, idAntojito: string) {
    return this.http.delete(`${this.url}/activar/${idAntojito}`).toPromise();
  }
    
}