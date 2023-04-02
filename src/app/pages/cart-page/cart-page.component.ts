import { Component, Input } from '@angular/core';

@Component({
    selector: 'app-cart-page',
    templateUrl: './cart-page.component.html',
    styleUrls: ['./cart-page.component.scss'],
})
export class CartPageComponent {
    @Input() isOpen: boolean;
    closePopup() {
        this.isOpen = false;
    }
}
