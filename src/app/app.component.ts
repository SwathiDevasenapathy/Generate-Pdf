import { Component, ElementRef, ViewChild } from '@angular/core';
// import * as pdfmake from 'pdfmake';
import * as pdfMake from "pdfmake/build/pdfmake";
import * as pdfFonts from 'pdfmake/build/vfs_fonts';

(<any>pdfMake).vfs = pdfFonts.pdfMake.vfs;
import html2canvas from 'html2canvas';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'generatePdf';
  @ViewChild('htmlContent')
  htmlContent!: ElementRef;

  // normal pdf not html file
  // generatePdf(){
  //   const documentDefinition = { content: 'This is an sample PDF printed with pdfMake' };
  //   // pdfMake.createPdf(documentDefinition).open();
  //   pdfMake.createPdf(documentDefinition).download("Home Page")
  //  }

  // download pdf as html file
  generatePdf() {
    const content = this.htmlContent.nativeElement;

    html2canvas(content).then(canvas => {
      const imageData = canvas.toDataURL('image/png');

      const documentDefinition = {
        content: [
          {
            image: imageData,
            width: 500, 
            outerHeight:1000
          },
        ],
      };

      pdfMake.createPdf(documentDefinition).download('Home_Page.pdf');
    });
  }

  
}
