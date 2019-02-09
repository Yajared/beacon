import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MatTableModule } from '@angular/material';

import { AppComponent } from './app.component';
import { ChainTableComponent } from './chain-table/chain-table.component';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: 'optionChains/:security', component: ChainTableComponent }
]
@NgModule({
  declarations: [
    AppComponent,
    ChainTableComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    MatTableModule,
    RouterModule.forRoot(routes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
