import {AfterViewInit, Component, inject, Input, OnChanges, OnDestroy, OnInit, SimpleChanges} from '@angular/core';
import {PieChartModule} from "@swimlane/ngx-charts";
import {Color, LegendPosition, ScaleType} from "@swimlane/ngx-charts";
import {OlympicService} from "../../core/services/olympic.service";
import {Router} from "@angular/router";
import { Observable, of, Subject, takeUntil, tap} from "rxjs";
import {Country} from "../../models/Country";
import {StatistiqueComponent} from "../../statistique/statistique.component";

@Component({
  selector: 'app-pie-chart',
  standalone: true,
  imports: [
    PieChartModule,
    StatistiqueComponent
  ],
  templateUrl: './pie-chart.component.html',
  styleUrl: './pie-chart.component.scss'
})
export class PieChartComponent implements OnInit, OnDestroy {
  view: [number, number] = [700, 400];
  pieData: {name: string; value:number}[] = [];
  olympics$: Observable<Country[]> = of([]);
  subject: Subject<boolean> = new Subject<boolean>();
  titleJOs: string = "Number of JOs";
  nbJOs: number = 0;
  titleCountries: string = "Number of Countries";
  nbCountries: number = 0;

  // Options
  gradient: boolean = true;
  showLegend: boolean = false;
  showLabels: boolean = true;
  isDoughnut: boolean = false;
  legendPosition: LegendPosition = LegendPosition.Below;
  colorScheme: Color = {
    name: 'scheme',
    selectable: true,
    group: ScaleType.Ordinal,
    domain: ['#793d52', '#bfe0f2', '#89a2dc', '#956165', '#9780a2', '#b8cce7']
  }

  animation = true;

  constructor(
    private olympicService: OlympicService,
    private router: Router) {}

  ngOnInit(): void {
    this.olympics$ = this.olympicService.getOlympics();
    this.subject = new Subject();
     this.olympics$.pipe(
       takeUntil(this.subject),
       tap((value) => this.getPieChartOlympics(value)
       )
     ).subscribe();
  }

  ngOnDestroy(): void {
    this.subject.next(true);
  }

  getPieChartOlympics(countries : any): void {
    if ( countries.length ) {
     this.pieData = countries.map((country: Country) => {
        let d = {name: '', value: 0};
        d.name = country.country;
        console.log(country.participations);
        country.participations.map(participation => {
          d.value += participation.medalsCount;
          this.nbJOs++;
        })

        return d;
     })

     this.nbCountries = this.pieData.length;
     this.nbJOs = this.nbJOs /this.nbCountries
    } else {
      this.pieData = [];
    }

  }

  onSelect(data: {name: string; value: number; label: string}): void {
    console.log('Item clicked', JSON.parse(JSON.stringify(data)));
    this.router.navigateByUrl(`country/${this.olympicService.getCountryIdByName(data.name)}`);
  }

  onActivate(data: string): void {
    console.log('Activate', JSON.parse(JSON.stringify(data)));
  }

  onDeactivate(data: string): void {
    console.log('Deactivate', JSON.parse(JSON.stringify(data)));
  }
}
