import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProductComponent } from './components/product/product.component';
import { HeaderComponent } from './components/header/header.component';
import { HttpClientModule } from '@angular/common/http';
import { GlobalErrorComponent } from './components/global-error/global-error.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FilterProductsPipe } from './pipes/filter-products.pipe';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { SearchProductsPipe } from './pipes/search-products.pipe';
import { CartPageComponent } from './pages/cart-page/cart-page.component';
import { DeleteProductModalComponent } from './components/delete-product-modal/delete-product-modal.component';
import { EditProductModalComponent } from './components/edit-product-modal/edit-product-modal.component';
import { ProductPageComponent } from './pages/product-page/product-page.component';
import { FiltersComponent } from './components/filters/filters.component';
import { ButtonComponent } from './components/button/button.component';

@NgModule({
    declarations: [
        AppComponent,
        ProductComponent,
        HeaderComponent,
        GlobalErrorComponent,
        FilterProductsPipe,
        LoginPageComponent,
        HomePageComponent,
        SearchProductsPipe,
        LoginPageComponent,
        CartPageComponent,
        DeleteProductModalComponent,
        EditProductModalComponent,
        ProductPageComponent,
        FiltersComponent,
        ButtonComponent,
    ],
    imports: [BrowserModule, AppRoutingModule, HttpClientModule, FormsModule, ReactiveFormsModule],
    providers: [],
    bootstrap: [AppComponent],
})
export class AppModule {}
