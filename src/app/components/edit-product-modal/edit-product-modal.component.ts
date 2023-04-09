import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'app-edit-product-modal',
    templateUrl: './edit-product-modal.component.html',
    styleUrls: ['./edit-product-modal.component.scss'],
})
export class EditProductModalComponent {
    id: string | null;
    constructor(private route: ActivatedRoute) {}

    changeProductForm!: FormGroup;
    errorMessage = '';

    ngOnInit(): void {
        this.id = this.route.snapshot.paramMap.get('id');

        this.changeProductForm = new FormGroup({
            name: new FormControl('', [Validators.required]),
            description: new FormControl('', [
                Validators.required,
                // Validators.pattern(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{4,}$/),
            ]),
        });

        this.getProduct();
    }

    private getProduct() {
        // запрос к серверу
        this.changeProductForm.setValue({
            name: 'sample text',
            description: 'sample text',
        });
    }

    submitChange() {
        alert(`edit product with id ${this.id}`);
    }
}
