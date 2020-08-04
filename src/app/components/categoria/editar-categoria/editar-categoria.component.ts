import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import Swal from 'sweetalert2';
import { CategoriasModel } from '../../../models/categorias';
import { CategoriasService } from '../../../services/categorias/categorias.service';

const Toast = Swal.mixin({
  toast: true,
  position: 'top-end',
  showConfirmButton: false,
  timer: 3000
});


@Component({
  selector: 'app-editar-categoria',
  templateUrl: './editar-categoria.component.html',
  styleUrls: ['./editar-categoria.component.css']
})
export class EditarCategoriaComponent implements OnInit {
  actualizarCategorias = true;
  registrarCategorias = false;
  idCategorias: string;
  @Input() set idCategoria( value ){
    this.idCategorias = value;
    console.log(value);
    this.ngOnInit();
  }
  @Output() terminarActualizacion = new EventEmitter();
categoria: CategoriasModel= new CategoriasModel();
  
  constructor(private categoriasService: CategoriasService) { }

  ngOnInit(): void {
    if(this.idCategorias){
       this.obtenerCategoria();
    }
  }
obtenerCategoria(){
  this.categoriasService.obtenerCategoriasid(this.idCategorias).then((resp: any) => {
    this.categoria = resp.cont.resp;
  }).catch((err) => {
    Toast.fire({
      icon: 'error',
      title: err.error.msg
    });
  });
}
actualizar() {
  this.categoriasService.actualizarCategorias(this.idCategorias, this.categoria).then((resp: any) => {
   
    console.log(resp);
    Toast.fire({
      icon: 'success',
      title: `¡La categoria "${this.categoria.strNombre}" fue actualizado correctamente!`
    });
    this.terminarActualizacion.emit();

  }).catch((err: any) => {
    console.log(err);
    Toast.fire({
      icon: 'error',
      title: err.error.msg
    });
    this.terminarActualizacion.emit();
  });

}

  cancelar() {
    this.terminarActualizacion.emit();
  }

}
