import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { PdfServiceService } from '../../services/PDF/pdf-service.service';
import { ExportDataService } from 'src/app/services/export-data/export-data.service';
import { CategoriasService } from '../../services/categorias/categorias.service';


const Toast = Swal.mixin({
  toast: true,
  position: 'top-end',
  showConfirmButton: false,
  timer: 3000
});

@Component({
  selector: 'app-categoria',
  templateUrl: './categoria.component.html',
  styleUrls: ['./categoria.component.css']
})
export class CategoriaComponent implements OnInit {

  actualizarCategorias: boolean = false;
  categorias: any;
  idCategorias: string;
  searchText: string;
  pageActual: number = 1;
  arraCategorias = [];
  arraNewCategorias = [];
  title: string;
  cargando: boolean;

  
  constructor(private categoriasService: CategoriasService, private _PdfService: PdfServiceService, private excelService: ExportDataService) {

    this.title = "Reporte de Categorias";
    this.cargando = true;
   }

  ngOnInit(): void {
    this.obtenerCategorias();
    this.arraCategorias = [];
  }
  obtenerCategorias() {
    this.cargando = false;
    this.categoriasService.obtenerCategorias().then((catego: any) => {
     
      this.cargando = true;
      this.categorias = catego.cont.resp;
     

      for (const catego of this.categorias) {
        let element = [

          catego.strNombre.replace(/\:null/gi, ':""'),
          catego.strDescripcion,
          catego.blnActivo ? 'Si' : 'No',
        ]
        this.arraCategorias.push(element);
        this.arraNewCategorias=this.arraCategorias;
        
      }
    }).catch((err: any) => {
      this.cargando = true;
      Toast.fire({
        icon: 'error',
        title: err.error.msg
      });
      this.categorias = [];
    });
  }


  desactivar(id: string) {
    this.categoriasService.desactivar(id).then((data: any) => {
      const dataa = data.cont.resp.strNombre;
      Toast.fire({
        icon: 'success',
        title: `¡Se desactivo correctamente!`
      });
      this.obtenerCategorias();
    }).catch((err) => {
      Toast.fire({
        icon: 'error',
        title: err.error.msg
      });
    });

  }

  activar(id: string) {
    this.categoriasService.Activar(id).then((data: any) => {
       const dataa = data.cont.resp.strNombre;
           Toast.fire({
        icon: 'success',
        title: `¡Se activo correctamente!`
      });
      this.obtenerCategorias();
    }).catch((err) => {
      Toast.fire({
        icon: 'error',
        title: err.error.msg
      });
    });
  }



  //funcion para actualizar categorias
  mostrarActualizar(idCategoria: string) {
    this.idCategorias = idCategoria;
    this.actualizarCategorias = true;
  }
  
  terminarActualizacion(event) {
    this.ngOnInit();
    console.log(event);
    this.actualizarCategorias = false;
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
        text: " Descripción ",
        alignment: "center",
        style: "tableHeader",
        bold: true,
        fillColor: "#2a3e52",
        color: "#ffffff",
        size: 13,
      },
      {
        text: "  Activado  ",
        alignment: "center",
        style: "tableHeader",
        bold: true,
        fillColor: "#2a3e52",
        color: "#ffffff",
        size: 13,
      }
  
    ];
    this._PdfService.generatePdf(
      "Reporte de categorias",
      header,
      this.arraNewCategorias,
      "center"
  
  
    );
  }
  
   //exportar en excel
   exportAsXLSX() {
    let jsnInfo = {};
    const jsnObject = [];
  
    if (this.categorias.length !== 0 ) {
  
     for (let datos of this.categorias) {
         jsnInfo = {};
         jsnInfo = {
           'Nombre': datos.strNombre,
           'Descripcion': datos.strDescripcion,
           'Activado': datos.blnActivo ? 'Si' : 'No'
         };
         if (jsnInfo !== '') {
             jsnObject.push(jsnInfo);
         }
     }
     this.excelService.exportAsExcelFile(jsnObject, `${this.title}`);
     }
  }  
}
