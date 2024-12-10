import {Component, OnDestroy, OnInit} from '@angular/core';
import {Color, LineChartModule, ScaleType} from "@swimlane/ngx-charts";
import {OlympicService} from "../../core/services/olympic.service";
import {ActivatedRoute, RouterLink} from "@angular/router";
import {StatistiqueComponent} from "../../components/statistique/statistique.component";
import {Observable, Subject, takeUntil, BehaviorSubject, tap} from "rxjs";
import {LineChartDTO} from "../../core/dto/LineChartDTO";
import {BasicDTO} from "../../core/dto/BasicDTO";
import {Olympic} from "../../core/models/Olympic";
import {Participation} from "../../core/models/Participation";

@Component({
  selector: 'app-olympic',
  standalone: true,
  imports: [
    LineChartModule,
    RouterLink,
    StatistiqueComponent
  ],
  templateUrl: './olympic.component.html',
  styleUrl: './olympic.component.scss'
})

export class OlympicComponent implements OnInit, OnDestroy {
  // Incoming Data with routing
  olympicId!: number;

  // Statistique Data and Main Title
  countryName: string = "";
  dataEntries: BasicDTO = {name: "Number of entries", value: 0};
  dataMedals: BasicDTO = {name: "Total number medals", value: 0};
  dataAthletes: BasicDTO = {name: "Total number of athlete", value: 0};
  olympics$: Observable<Olympic[]> = new BehaviorSubject<Olympic[]>([]);
  subject: Subject<boolean> = new Subject<boolean>();

  // Data send in LineChart with results property
  lineChartDatas: LineChartDTO[] = [];
  lineChartData: LineChartDTO = {'name': '', series: []};

  // LineChart property
  view: [number, number] = [700, 300];
  scheme: Color = {
    name: 'scheme',
    selectable: true,
    group: ScaleType.Ordinal,
    domain: ['#5AA454', '#E44D25', '#CFC0BB', '#7aa3e5', '#a8385d', '#aae3f5']
  };
  legend: boolean = false;
  showXAxisLabel: boolean = true;
  showYAxisLabel: boolean = true;
  xAxis: boolean = true;
  yAxis: boolean = true;
  xAxisLabel: string = 'Year';
  yAxisLabel: string = '';
  timeline: boolean = false;
  animations: boolean = true;
  showLabels: boolean = true;

  constructor(
    private route : ActivatedRoute,
    private olympicService: OlympicService,
  ) {}

  // First method in life cycle component. Use for extract data to send in the view.
  ngOnInit() {
    this.olympicId = this.route.snapshot.params['olympicId'];
    this.olympics$ = this.olympicService.getOlympics();

    this.subject = new Subject();
    this.olympics$
      .pipe(
        takeUntil(this.subject),
        tap((olympics: Olympic[]) => {
          this.getLineChartOlympics(this.olympicId, olympics);

          //Data to send in lineChart
          this.lineChartDatas = [this.lineChartData];

          //Data to send in statistique
          this.countryName = this.lineChartData.name;
          this.dataEntries.value = this.lineChartData.series.length;
          this.lineChartData.series.map( (set: BasicDTO ) => {
            this.dataMedals.value += set.value;
          });
        })
      ).subscribe();
  }

  // Last method in life cycle component and unsubscribe Observable Olympics$
  ngOnDestroy(): void {
    this.subject.next(true);
  }

  // Method use in tap for extract useful data.
  getLineChartOlympics(olympicId: number, olympics: Olympic[]) {
    olympics.map((olympic: Olympic) => {
      if (olympic.id == olympicId) {
        this.lineChartData.name = olympic.country;
        olympic.participations.map((participation: Participation) => {
          let set: BasicDTO = {name:'', value:0};
          set.name = participation.year.toString();
          set.value = participation.medalsCount;
          this.dataAthletes.value += participation.athleteCount;

          this.lineChartData.series.push(set);
        })
      }
    })
  }
}
