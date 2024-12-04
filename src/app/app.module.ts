import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {NgxChartsModule} from "@swimlane/ngx-charts";
import {PieChartComponent} from "./charts/pie-chart/pie-chart.component";
import {FormsModule} from "@angular/forms";

@NgModule({
  declarations: [AppComponent, NotFoundComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    NgxChartsModule,
    PieChartComponent
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
