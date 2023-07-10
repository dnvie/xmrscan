import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import {HttpClientModule} from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './component/header/header.component';
import { BlocksComponent } from './component/blocks/blocks.component';
import { BlockComponent } from './component/block/block.component';
import { TransactionComponent } from './component/transaction/transaction.component';
import { MempoolComponent } from './component/mempool/mempool.component';
import { FooterComponent } from './component/footer/footer.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    BlocksComponent,
    BlockComponent,
    TransactionComponent,
    MempoolComponent,
    FooterComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
