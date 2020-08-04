import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { AntojitosModel } from 'src/app/models/antojitos';
import { AntojitosService } from 'src/app/services/antojitos/antojitos.service';
import Swal from 'sweetalert2';


const Toast = Swal.mixin({
  toast: true,
  position: 'top-end',
  showConfirmButton: false,
  timer: 3000
});



@Component({
  selector: 'app-editar',
  templateUrl: './editar.component.html',
  styleUrls: ['./editar.component.css']
})
export class EditarComponent implements OnInit {

 
  idAntojitos: string;
  @Input() set idAntojito(value) {
    
    this.idAntojitos = value;
    this.ngOnInit();
  };

  @Input() idCategorias;
  @Output() terminarActualizacion = new EventEmitter();

  antojito: AntojitosModel = new AntojitosModel();
  constructor(private antojitosService : AntojitosService) { }

  ngOnInit(): void {
      this.antojitosService.obtenerAntojitosid(this.idAntojitos).then((resp: any) => {

        this.antojito = resp.cont.resp;

      }).catch((err) => {
        
        console.log(err);
        Toast.fire({
          icon: 'error',
          title: err.error.msg
        });
      });
    
  }

//funcion para actualizar especialidades
actualizarAntojitos() {
  this.antojitosService.actualizarAntojitos(this.idCategorias, this.idAntojitos, this.antojito).then((resp: any) => {
    Toast.fire({
      icon: 'success',
      title: `¡El antojito "${this.antojito.strNombre}" fue actualizado correctamente!`
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