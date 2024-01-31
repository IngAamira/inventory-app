import { Component, inject, OnInit } from '@angular/core';
import { Chart } from 'chart.js';
import { ProductElement } from '../../../product/product/product.component';
import { ProductService } from '../../../shared/services/product.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{

  chartBar:any;
  chartdoughnut: any;
  private productService = inject(ProductService);

  ngOnInit(): void {
    this.getProducts();
  }

  getProducts(){
    this.productService.getProducts()
        .subscribe( (data:any) => {
          console.log("respuesta de productos: ", data);
          this.processProductResponse(data);
        }, (error: any) => {
          console.log("error en productos: ", error);
        })
  }

  processProductResponse(resp: any){

    const nameProduct: String [] = [];
    const account: number [] = [];


     if( resp.metadata[0].code == "00"){
       let listCProduct = resp.product.products;

       listCProduct.forEach((element: ProductElement) => {

           nameProduct.push(element.name);
           account.push(element.account);
       });

       //nuestro gráfico de barras
       this.chartBar = new Chart('canvas-bar', {
         type: 'bar',
         data: {
           labels: nameProduct,
           datasets: [
             { label: 'Productos', data: account}
           ]
         }
       });

       //nuestro gráfico de doughnut
       this.chartdoughnut = new Chart('canvas-doughnut', {
        type: 'doughnut',
        data: {
          labels: nameProduct,
          datasets: [
            { label: 'Productos', data: account}
          ]
        }
      });


     }
  }

}
