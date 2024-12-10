import {Component, Input} from '@angular/core';
import {Observable} from "rxjs";

@Component({
  selector: 'app-statistique',
  standalone: true,
  imports: [],
  templateUrl: './statistique.component.html',
  styleUrl: './statistique.component.scss'
})

export class StatistiqueComponent {
  @Input() title: string = "Numbers of entries";
  @Input() data: number = 0;
}
