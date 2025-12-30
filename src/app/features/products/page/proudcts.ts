import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ProductsService } from './../services/proudcts.service';
import { ChangeDetectorRef, Component, inject } from '@angular/core';
import { AuthServices } from '../../auth/services/auth.service';

@Component({
  selector: 'app-proudcts',
  imports: [ReactiveFormsModule],
  templateUrl: './proudcts.html',
  styleUrl: './proudcts.css',
})
export class Products {
  private readonly _authServices = inject(AuthServices);
  private readonly _productsService = inject(ProductsService);
  private readonly _cd = inject(ChangeDetectorRef);
  // Properties
  items!: Item[];
  alert: boolean = false;
  deletedName: string = '';
  index!: number;

  deleteAlert: boolean = false;
  addForm: FormGroup = new FormGroup({
    itemName: new FormControl('', [Validators.required]),
    itemPrice: new FormControl(0, [Validators.required]),
    itemQuantity: new FormControl(0, [Validators.required]),
  });

  // Methods
  showItem() {
    this._productsService.getProudcts().subscribe({
      next: (res) => {
        this.items = res;
      },
    });
  }
  addNewItem() {
    if (
      this.addForm.get('itemName')?.value != '' &&
      this.addForm.get('itemPrice')?.value != 0 &&
      this.addForm.get('itemQuantity')?.value != 0
    ) {
      const { itemName, itemPrice, itemQuantity } = this.addForm.value;

      this._productsService.addProudcts(itemName, itemPrice, itemQuantity);
      this.showItem();
      this.addForm.get('itemName')?.setValue('');
      this.addForm.get('itemPrice')?.setValue(0);
      this.addForm.get('itemQuantity')?.setValue(0);
      this.alert = false;
      this._cd.detectChanges();
    } else {
      this.alert = true;
      this._cd.detectChanges();
    }
  }

  showDeleteAlert(s: string, i: number) {
    this.deleteAlert = true;
    this.index = i;
    this.deletedName = s;

    this._cd.detectChanges();
  }

  closeDeleteAlert() {
    this.deleteAlert = false;
    this._cd.detectChanges();
  }
  deleteItem() {
    this._productsService.deleteProudct(this.index);
    this.closeDeleteAlert();
    this.showItem();
  }

  logoutFn() {
    this._authServices.logout();
  }
  // Life Hook
  ngOnInit(): void {
    this.showItem();
  }
}
