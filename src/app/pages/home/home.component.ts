import {Component, OnInit, output} from '@angular/core';
import {BehaviorSubject, Observable, of, take} from 'rxjs';
import {PieChartComponent} from "../../charts/pie-chart/pie-chart.component";
import {AsyncPipe} from "@angular/common";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    PieChartComponent,
    AsyncPipe
  ],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})

export class HomeComponent {
  public olympics$: Observable<any> = of(null);
}
