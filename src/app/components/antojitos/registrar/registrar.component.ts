import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { AntojitosModel } from 'src/app/models/antojitos';
import { AntojitosService } from 'src/app/services/antojitos/antojitos.service';
import Swal from 'sweetalert2';
import { NgForm } from '@angular/forms';



const Toast = Swal.mixin({
  toast: true,
  position: 'top-end',
  showConfirmButton: false,
  timer: 3000
});


@Component({
  selector: 'app-registrar',
  templateUrl: './registrar.component.html',
  styleUrls: ['./registrar.component.css']
})
export class RegistrarComponent implements OnInit {

  @Input() componentes;
  @Input() idAntojitos;
  @Input() idCategoria: string;
  @Output() salida = new EventEmitter();
  @Output() terminarActualizacion = new EventEmitter();


  antojito: AntojitosModel = new AntojitosModel();

  constructor(private antojitoService : AntojitosService) { }

  ngOnInit(): void {
  }
 //funcion para registrar Antojitos
 registrarAntojito(forma: NgForm) {
   console.log(this.idCategoria);
  console.log(forma.value)
  this.antojitoService.registrarAntojitos(this.idCategoria, this.antojito).then((resp: any) => {
    
    
    this.terminarActualizacion.emit();
    Toast.fire({
      icon: 'success',
      title: `¡El platillo "${this.antojito.strNombre}" fue agrega correctamente!`
    });
   forma.controls['strNombre'].reset();
  }).catch((err) => {
    Toast.fire({
      icon: 'error',
      title: err.error.msg
    });
    
  });
}
}
