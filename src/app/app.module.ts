import { BrowserModule } from '@angular/platform-browser';
import { LOCALE_ID, NgModule } from '@angular/core';

import { HttpClientModule } from '@angular/common/http';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryBackendService } from './in-memory-backend-service'

import { AppComponent } from './app.component';
import { HomePageComponent } from './views/home/home.component';
import { ProductsDataService } from './services/products-data.service';
import { ProductsService } from './services/products.service';
import { CartDataService } from './services/cart-data.service';
import { CartService } from './services/cart.service';
import { CoreModule } from './core/core.module';
import { ComponentsModule } from './components/components.module';
import { CommonModule, registerLocaleData } from '@angular/common';
import localeFr from '@angular/common/locales/fr';
registerLocaleData(localeFr);

@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    HttpClientInMemoryWebApiModule.forRoot(InMemoryBackendService),
    CommonModule,
    ComponentsModule,
    CoreModule
  ],
  providers: [
    ProductsDataService,
    ProductsService,
    CartDataService,
    CartService,
    { provide: LOCALE_ID, useValue: 'fr-FR'}
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
