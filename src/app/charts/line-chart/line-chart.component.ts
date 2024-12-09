import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {Color, LineChartModule, ScaleType} from "@swimlane/ngx-charts";
import {OlympicService} from "../../core/services/olympic.service";
import {Router, RouterLink} from "@angular/router";
import {Location} from "@angular/common";
import {StatistiqueComponent} from "../../statistique/statistique.component";
import {filter, Observable, of, Subject, takeUntil, tap, map, BehaviorSubject} from "rxjs";
import {Country} from "../../models/Country";

@Component({
  selector: 'app-line-chart',
  standalone: true,
  imports: [
    LineChartModule,
    RouterLink,
    StatistiqueComponent
  ],
  templateUrl: './line-chart.component.html',
  styleUrl: './line-chart.component.scss'
})
export class LineChartComponent implements OnInit, OnDestroy {
  @Input() countryId: number = 0;
  data: {name: string; series: {value:number; name: string}[]}[] = [];
  view: [number, number] = [700, 300];
  countryName: string = "";
  titleNbEntries : string = "Number of entries";
  nbEntries : number = 0;
  titleNbTotalMedals : string = "Total number medals";
  nbTotalMedals : number = 0;
  titleNbTotalAthlete : string = "Total number of athlete";
  nbTotalAthlete$ = new BehaviorSubject<number>(0);
  olympics$: Observable<any> = new BehaviorSubject<any>(null);
  subject: Subject<boolean> = new Subject<boolean>();
  nbAthlete = 0;

  // options
  legend: boolean = false;
  showLabels: boolean = true;
  animations: boolean = true;
  xAxis: boolean = true;
  yAxis: boolean = true;
  showYAxisLabel: boolean = true;
  showXAxisLabel: boolean = true;
  xAxisLabel: string = 'Year';
  yAxisLabel: string = 'Population';
  timeline: boolean = false;
  scheme: Color = {
    name: 'scheme',
    selectable: true,
    group: ScaleType.Ordinal,
    domain: ['#5AA454', '#E44D25', '#CFC0BB', '#7aa3e5', '#a8385d', '#aae3f5']
  };

  constructor(
    private olympicService: OlympicService,
    private router: Router,
    private location: Location) {}

  ngOnInit(): void {
    this.olympics$ = this.olympicService.getLineChartOlympics(this.countryId);

    this.subject = new Subject();
    this.olympics$.pipe(takeUntil(this.subject)).subscribe(d => {
      this.data = d;
      this.nbEntries = this.data[0].series.length;
      this.data[0].series.map( (serie: any ) => {
          this.nbTotalMedals += serie.value;
      });
      this.countryName = this.data[0].name;
    });


    this.nbTotalAthlete$ = this.olympicService.getTotalAthlete(this.countryId);

    this.nbTotalAthlete$.pipe(
      takeUntil(this.subject))
    .subscribe(
      d => {
      this.nbAthlete = d}
    )
  }

  ngOnDestroy(): void {
    this.subject.next(true);
  }



  onSelect(data: string): void {
    console.log('Item clicked', JSON.parse(JSON.stringify(data)));
  }

  onActivate(data: string): void {
    console.log('Activate', JSON.parse(JSON.stringify(data)));
  }

  onDeactivate(data: string): void {
    console.log('Deactivate', JSON.parse(JSON.stringify(data)));
  }
}
