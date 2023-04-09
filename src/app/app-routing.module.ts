import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { CartPageComponent } from './pages/cart-page/cart-page.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { DeleteProductModalComponent } from './components/delete-product-modal/delete-product-modal.component';
import { EditProductModalComponent } from './components/edit-product-modal/edit-product-modal.component';
import { ProductPageComponent } from './pages/product-page/product-page.component';
const routes: Routes = [
    { path: '', redirectTo: 'login', pathMatch: 'full' },
    { path: 'login', component: LoginPageComponent },
    {
        path: 'home',
        component: HomePageComponent,
        children: [
            { path: 'cart', component: CartPageComponent },
            { path: 'delete/:id', component: DeleteProductModalComponent },
            { path: 'edit/:id', component: EditProductModalComponent },
        ],
    },
    { path: 'product/:id', component: ProductPageComponent },
    { path: '**', redirectTo: 'home' },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule {}
