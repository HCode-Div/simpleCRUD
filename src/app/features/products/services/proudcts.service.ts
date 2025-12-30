import { Injectable } from '@angular/core';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  products: Item[] = [
    {
      itemName: 'Samsung Mobile',
      itemPrice: 7000,
      itemQuantity: 7,
      itemStatus: false,
    },
    {
      itemName: 'Apple Laptop',
      itemPrice: 25000,
      itemQuantity: 3,
      itemStatus: false,
    },
    {
      itemName: 'iPhone 13',
      itemPrice: 13000,
      itemQuantity: 0,
      itemStatus: false,
    },
  ];

  getProudcts() {
    for (let proudct = 0; proudct < this.products.length; proudct++) {
      this.products[proudct].itemStatus = this.products[proudct].itemQuantity == 0 ? true : false;
    }
    return of(this.products);
  }

  addProudcts(iName: string, iPrice: number, iQuantity: number) {
    let proudct: Item = {
      itemName: iName,
      itemPrice: iPrice,
      itemQuantity: iQuantity,
      itemStatus: false,
    };
    this.products.push(proudct);
  }

  deleteProudct(i: number) {
    this.products.splice(i, 1);
  }
}
