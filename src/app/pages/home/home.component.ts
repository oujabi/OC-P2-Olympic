import { Component, OnInit } from '@angular/core';
import {BehaviorSubject, Observable, of} from 'rxjs';
import { OlympicService } from 'src/app/core/services/olympic.service';
import {PieChartComponent} from "../../charts/pie-chart/pie-chart.component";
import {AsyncPipe} from "@angular/common";
import {LineChartComponent} from "../../charts/line-chart/line-chart.component";
import {HttpClient} from "@angular/common/http";
import {Country} from "../../models/Country";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    PieChartComponent,
    AsyncPipe,
    LineChartComponent
  ],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})

export class HomeComponent implements OnInit {
  public olympics$: Observable<any> = of(null);

  constructor(private olympicService: OlympicService) {}

  ngOnInit(): void {
    this.olympics$ = this.olympicService.getOlympics();


    this.olympics$.subscribe( {
      next: (countries: Country[]) => {
        console.log(countries[0].id);
        console.log(countries[0].participations);
      },
      error: (err) => console.error('Erreur :', err),
      complete: () => console.log('Observable terminé.'),

    });
  }
}
