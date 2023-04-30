import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { IProduct } from 'src/app/models/products';
import { FiltersService } from 'src/app/services/filters.service';
import { ProductService } from 'src/app/services/products.service';
import { ServerService } from 'src/app/services/server.service';

@Component({
    selector: 'app-filters',
    templateUrl: './filters.component.html',
    styleUrls: ['./filters.component.scss'],
})
export class FiltersComponent implements OnInit {
    itemsPerPage: number = 8;
    currPage: number = 1;
    pages: number;
    search: string = '';
    selectedOption: string = 'all';

    constructor(private server: ServerService, private filters: FiltersService) {}

    ngOnInit(): void {
        this.server.listenProductsPages().subscribe({
            next: (pages) => {
                alert(pages);
                this.pages = pages;
            },
        });
    }

    onSearch(searchString: string) {
        this.server.searchProducts(searchString);
    }

    onSelect(type: string) {
        this.server.filterProducts(type);
    }

    getProducts(page: number) {
        this.currPage = page;
        this.server.getProductsByPage(page, 8);
    }

    createRange(number: number) {
        return new Array(number).fill(0).map((n, index) => index + 1);
    }

    isActive(page: number) {
        return this.currPage === page;
    }
}
