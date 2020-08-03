import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import Swal from 'sweetalert2';
import { NgForm } from '@angular/forms';
import { CategoriasService } from '../../../services/categorias/categorias.service';
import { CategoriasModel } from '../../../models/categorias';



const Toast = Swal.mixin({
  toast: true,
  position: 'top-end',
  showConfirmButton: false,
  timer: 3000
});
@Component({
  selector: 'app-registrar-categoria',
  templateUrl: './registrar-categoria.component.html',
  styleUrls: ['./registrar-categoria.component.css']
})
export class RegistrarCategoriaComponent implements OnInit {
  @Input() componentes;
  @Input() idCategorias;
  @Output() salida = new EventEmitter();
  @Output() terminarActualizacion = new EventEmitter();
  categorias: CategoriasModel = new CategoriasModel()
  
  constructor( private categoriasService: CategoriasService) { }


  ngOnInit(): void {
  }
  registrarCategoria(forma: NgForm) {
    this.categoriasService.registrarCategorias(this.categorias).then((resp: any) => {
  
      this.terminarActualizacion.emit();
      Toast.fire({
        icon: 'success',
        title: `¡La categoria "${this.categorias.strNombre}" fue agrega correctamente!`
      });
      forma.controls['strNombre'].reset();
  
    }).catch((err) => {
      console.log(err);
      Toast.fire({
        icon: 'error',
        title: err.error.msg
      });
    });
  }
}
