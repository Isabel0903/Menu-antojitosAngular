import { Component, OnInit, Input } from '@angular/core';
import { AntojitosModel } from 'src/app/models/antojitos';
import { AntojitosService } from 'src/app/services/antojitos/antojitos.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ExportDataService } from 'src/app/services/export-data/export-data.service';
import { PdfServiceService } from '../../services/PDF/pdf-service.service';
import Swal from 'sweetalert2';

const Toast = Swal.mixin({
  toast: true,
  position: 'top-end',
  showConfirmButton: false,
  timer: 3000
});
@Component({
  selector: 'app-antojitos',
  templateUrl: './antojitos.component.html',
  styleUrls: ['./antojitos.component.css']
})
export class AntojitosComponent implements OnInit {
  actualizarAntojito: boolean = false;
  registrarAntojito: boolean = true;
  antojitos: any;
  idAntojitos: string;
  idCategorias: string;
  searchText: string;
  pageActual: number = 1;
  arraAntojitos = [];
  arraNewAntojitos = [];
  title: string;
  cargando: boolean;
  constructor(private antojitosService: AntojitosService, private router: Router,
    private activatedRouter: ActivatedRoute, private _PdfService: PdfServiceService, private excelService: ExportDataService) { 

      this.idCategorias = activatedRouter.snapshot.params.idCategorias;
      this.idAntojitos = activatedRouter.snapshot.params.idAntojitos;
      this.title = " Reporte de Platillos ";
      this.cargando = false;
    }

  ngOnInit(): void {

    this.obtenerAntojitos();
    this.arraAntojitos = [];
  }

//funcion de obtener platillos
obtenerAntojitos() {
  this.cargando = true;
  this.antojitosService.obtenerAntojitosid(this.idCategorias)
    .then((antojitos: any) => {
      this.antojitos = antojitos.cont.antojitos;
    
      this.cargando = false;

      for (const antojito of this.antojitos) {
        let element = [

          antojito.strEspecialidad.replace(/\:null/gi, ':""'),
          antojito.strDescripcion,
          antojito.strIngredientes,
          antojito.numbPieza,
          antojito.numbPrecio,
          antojito.blnActivo ? 'Sí' : 'No',

        ];
        this.arraAntojitos.push(element);
        this.arraNewAntojitos = this.arraAntojitos;
      }

    }).catch((err: any) => {
      console.log(err);
      this.cargando = false;
      Toast.fire(err.error.msg, '', 'warning');
      this.antojitos = [];
    });
}









mostrarActualizar(idAntojitos: string) {

  
  this.idAntojitos = idAntojitos;
  this.actualizarAntojito = true,
    this.registrarAntojito = false

}

terminarActualizacion(event) {
  this.ngOnInit();
  this.actualizarAntojito = false;
  this.registrarAntojito = true;
}
// exportar en pdf
exportPDF() {
  let header = [
    {
      text: "Nombre",
      alignment: "center",
      style: "tableHeader",
      bold: true,
      fillColor: "#2a3e52",
      color: "#ffffff",
      size: 13,

    },
    {
      text: "Descripción",
      alignment: "center",
      style: "tableHeader",
      bold: true,
      fillColor: "#2a3e52",
      color: "#ffffff",
      size: 13,

    },
    {
      text: "Ingredientes",
      alignment: "center",
      style: "tableHeader",
      bold: true,
      fillColor: "#2a3e52",
      color: "#ffffff",
      size: 13,

    },
    {
      text: "Piezas",
      alignment: "center",
      style: "tableHeader",
      bold: true,
      fillColor: "#2a3e52",
      color: "#ffffff",
      size: 13,

    },
    {
      text: "Precios",
      alignment: "center",
      style: "tableHeader",
      bold: true,
      fillColor: "#2a3e52",
      color: "#ffffff",
      size: 13,

    },
    {
      text: "  Activo  ",
      alignment: "center",
      style: "tableHeader",
      bold: true,
      fillColor: "#2a3e52",
      color: "#ffffff",
      size: 13,
    }

  ];
  this._PdfService.generatePdf(
    "Reporte de Platillos",
    header,
    this.arraNewAntojitos,
    "center"
    


  );
}
// exportar en Excel
exportAsXLSX() {
  let jsnInfo = {};
  const jsnObject = [];

  if (this.antojitos.length !== 0 ) {

   for (let datos of this.antojitos) {
       jsnInfo = {};
       jsnInfo = {
         'Platillo': datos.strNombre,
         'Descripción': datos.strDescripcion,
         'Ingredientes': datos.strIngredientes,
         'Piezas': datos.numbPieza,
         'Precio': datos.numbPrecio,
         'Activo': datos.blnActivo ? 'Si' : 'No'
       };
       if (jsnInfo !== '') {
           jsnObject.push(jsnInfo);
       }
   }
   this.excelService.exportAsExcelFile(jsnObject, `${this.title}`);
   }
 }




}
