import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AntojitosModel } from '../../models/antojitos';
import { environment } from '../../../environments/environment.prod';
@Injectable({
  providedIn: 'root'
})
export class AntojitosService{
    url=`${environment.urlLocal}platillo`;
     //servicio de Antojitos
  constructor(private http: HttpClient) { }
  
  //funcion para obtener Antojitos por id
  obtenerAntojitosid(idCategorias: String) {
    return this.http.get(`${this.url}/obtener/${idCategorias}`).toPromise();
  }
  //funcion para registrar antojitos
  registrarAntojitos( idCategorias: String,antojitos: AntojitosModel) {
    return this.http.post(`${this.url}/registrar/${idCategorias}`, antojitos).toPromise();
  }
  //funcion para actualizar antojitos
  actualizarAntojitos( idCategorias: String,idAntojitos: String, antojitos: AntojitosModel) {
    return this.http.put(`${this.url}/actualizar/${idCategorias}/${idAntojitos}`, antojitos ).toPromise();
  }

    
}