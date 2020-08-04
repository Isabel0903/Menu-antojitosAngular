import { Component, OnInit, Input } from '@angular/core';
import { AntojitosService } from 'src/app/services/antojitos/antojitos.service';
import { Router, ActivatedRoute,  } from '@angular/router';
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
  actualizarAntojito: boolean = true;
  registrarAntojito: boolean = false;
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
    private activatedRoute: ActivatedRoute, private _PdfService: PdfServiceService, private excelService: ExportDataService) { 

      this.idCategorias = this.activatedRoute.snapshot.params.id;
      
      this.title = " Reporte de Platillos ";
      this.cargando = false;
    }

  ngOnInit(): void {
    

          this.obtenerAntojitos();
      
    this.arraAntojitos = [];
    console.log(this.idAntojitos);
  }

//funcion de obtener platillos
obtenerAntojitos() {
  this.cargando = true;
  this.antojitosService.obtenerPorCategoria(this.idCategorias)
    .then((antojitos: any) => {

      console.log(antojitos);
      this.antojitos = antojitos.cont.resp;
    
      this.cargando = false;

      for (const antojito of this.antojitos) {
        let element = [

          antojito.strNombre.replace(/\:null/gi, ':""'),
          antojito.strDescripcion,
          antojito.strIngredientes,
          antojito.numbPieza,
          antojito.numbPrecio,
          antojito.blnActivo ? 'Sí' : 'No',

        ];
        this.arraAntojitos.push(element);
        this.arraNewAntojitos=this.arraAntojitos;
      
      }

    }).catch((err: any) => {
      console.log(err);
      this.cargando = false;
      Toast.fire({
        icon: 'error',
        title: err.err.msg
      });
      this.antojitos = [];
    });
}


desactivar(idAntojito: string) {
  this.antojitosService.desactiva(this.idCategorias, idAntojito).then((data: any) => {
    
    const dataa = data.cont.resp.strNombre;
  console.log(dataa);
    Toast.fire({
      icon: 'success',
      title: `¡ se desactivo correctamente!`
    });
    this.obtenerAntojitos();
  }).catch((err) => {
    Toast.fire({
      icon: 'error',
      title: err.error.msg
    });
  });

}

activar(idAntojito: string) {
  this.antojitosService.activar(this.idCategorias, idAntojito).then((data: any) => {
    console.log(data);
    const dataa = data.cont.resp.strNombre;
  
    Toast.fire({
      icon: 'success',
      title: `¡se activo correctamente!`
    });
    this.obtenerAntojitos();
  }).catch((err) => {
    Toast.fire({
      icon: 'error',
      title: err.error.msg
    });
  });

}

mostrarActualizar(idAntojitos: string) {
  this.idAntojitos = idAntojitos;
  this.actualizarAntojito = false,
    this.registrarAntojito = true

}

terminarActualizacion(event) {
  this.ngOnInit();
  this.actualizarAntojito = true;
  this.registrarAntojito = false;
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
    this.arraAntojitos,
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
