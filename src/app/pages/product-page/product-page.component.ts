import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IProduct } from 'src/app/models/products';
import { IUser } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service';
import { ServerService } from 'src/app/services/server.service';

@Component({
    selector: 'app-product-page',
    templateUrl: './product-page.component.html',
    styleUrls: ['./product-page.component.scss'],
})
export class ProductPageComponent {
    id: string | null;
    product: IProduct;
    isFetching: boolean;
    user: IUser;
    constructor(
        private route: ActivatedRoute,
        private server: ServerService,
        private authService: AuthService,
        private router: Router,
    ) {}
    ngOnInit(): void {
        this.authService.isLoggedIn().subscribe({
            next: () => {
                this.id = this.route.snapshot.paramMap.get('id');
                this.user = this.authService.getUser();

                this.server.getProductsById(this.id).subscribe({
                    next: (products: any) => {
                        this.product = products[0];
                    },
                });
            },
            error: () => {
                this.router.navigate(['login']);
            },
        });
    }
}
