import {Component, OnDestroy, OnInit} from '@angular/core';
import {PieChartModule} from "@swimlane/ngx-charts";
import {Color, LegendPosition, ScaleType} from "@swimlane/ngx-charts";
import {OlympicService} from "../../core/services/olympic.service";
import {Router} from "@angular/router";
import {Observable, of, Subject, takeUntil, tap} from "rxjs";
import {StatistiqueComponent} from "../../components/statistique/statistique.component";
import {Olympic} from "../../core/models/Olympic";
import {Participation} from "../../core/models/Participation";
import {ChartDTO} from "../../core/dto/ChartDTO";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    PieChartModule,
    StatistiqueComponent
  ],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})

export class HomeComponent implements OnInit, OnDestroy {
  // Global Data use in the component.
  olympics$: Observable<Olympic[]> = of([]);
  subject: Subject<boolean> = new Subject<boolean>();

  // Statistique Data and main title
  dataJO: ChartDTO = {name: "Number of JOs", value: 0};
  dataCountries: ChartDTO = {name: "Number of Countries", value: 0};

  // Data send in PieChart with results property
  pieData: ChartDTO[] = [];

  // PieChart options.
  view: [number, number] = [700, 400];
  colorScheme: Color = {
    name: 'scheme',
    selectable: true,
    group: ScaleType.Ordinal,
    domain: ['#793d52', '#bfe0f2', '#89a2dc', '#956165', '#9780a2', '#b8cce7']
  }
  gradient: boolean = true;
  showLegend: boolean = false;
  legendPosition: LegendPosition = LegendPosition.Below;
  animation: boolean = true;
  showLabels: boolean = true;
  isDoughnut: boolean = false;

  constructor(
    private olympicService: OlympicService,
    private router: Router) {}

  // First method in life cycle component. Use for extract data to send in the view.
  ngOnInit(): void {
    this.olympics$ = this.olympicService.getOlympics();
    this.subject = new Subject();
    this.olympics$.pipe(
      takeUntil(this.subject),
      tap((olympics: Olympic[]) => this.getPieChartOlympics(olympics)
      )
    ).subscribe();
  }

  // Last method in life cycle component and unsubscribe Observable Olympics$
  ngOnDestroy(): void {
    this.subject.next(true);
  }

  // Method use in tap for extract useful data.
  getPieChartOlympics(Olympics: Olympic[]): void {
    if ( Olympics.length ) {
      this.pieData = Olympics.map((olympic: Olympic): ChartDTO => {
        let dataChart: ChartDTO = {name: '', value: 0};
        dataChart.name = olympic.country;

        olympic.participations.map((participation: Participation) => {
          dataChart.value += participation.medalsCount;
          this.dataJO.value++;
        })

        return dataChart;
      })

      this.dataCountries.value = this.pieData.length;
      this.dataJO.value = this.dataJO.value /this.dataCountries.value
    } else {
      this.pieData = [];
    }
  }

  // Method use by pieChart when the user click on segment.
  // Redirect to Olympic single page of one country
  onSelect(data: {name: string; value: number; label: string}): void {
    this.router.navigateByUrl(`olympic/${this.olympicService.getOlympicIdByName(data.name)}`);
  }
}
