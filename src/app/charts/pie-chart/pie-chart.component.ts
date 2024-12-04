import {AfterViewInit, Component, inject, Input, OnChanges, OnDestroy, OnInit, SimpleChanges} from '@angular/core';
import {PieChartModule} from "@swimlane/ngx-charts";
import {Color, LegendPosition, ScaleType} from "@swimlane/ngx-charts";
import {OlympicService} from "../../core/services/olympic.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-pie-chart',
  standalone: true,
  imports: [
    PieChartModule
  ],
  templateUrl: './pie-chart.component.html',
  styleUrl: './pie-chart.component.scss'
})
export class PieChartComponent implements OnInit {
  view: [number, number] = [700, 400];
  data : {name: string; value:number}[] = [];

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
    domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA', '#000000']
  }

  animation = false;
  labels = true;

  constructor(private olympicService: OlympicService, private router: Router) {}

  ngOnInit(): void {
    this.olympicService.getPieChartOlympics().subscribe(d => {
      this.data = [...d];
    })
  }

  percentageFormatter(data: any): string {
    return data.value + "%";
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
