import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import {Country} from "../../models/Country";

@Injectable({
  providedIn: 'root',
})
export class OlympicService {
  private olympicUrl = './assets/mock/olympic.json';
  private olympics$ = new BehaviorSubject<Country[]>([]);
  private countries: Country[] = [];
  public  pieData: {name: string; value:number}[] = [];
  public  lineData: {name: string; series: {value:number; name: string}[]}[] = [{name: '', series: []}];
  private pieChartData$ = new BehaviorSubject<{ name: string; value: number }[]>([]);
  private lineChartData$ = new BehaviorSubject<{name: string; series: {value:number; name: string}[]}[]>([]);
  private lineChartAthlete$ = new BehaviorSubject<number>(0);
  public dataId: number = 0;
  public nbAthlete: number = 0;

  constructor(private http: HttpClient) {}

  loadInitialData() {
    return this.http.get<any>(this.olympicUrl).pipe(
      tap((value) => this.olympics$.next(value)),
      catchError((error, caught) => {
        // TODO: improve error handling
        console.error(error);
        // can be useful to end loading state and let the user know something went wrong
        this.olympics$.next([]);
        return caught;
      })
    );
  }

  getOlympics() {
    return this.olympics$.asObservable();
  }


  getCountryIdByName(name: string) {
    this.getOlympics()
      .subscribe((countries: Country[])  => {
        this.countries = countries;
        this.countries.map(country => {
          if(country.country == name) {
            this.dataId = country.id;
          }
        })
      }
      );

    return this.dataId;
  }

  getLineChartOlympics(countryId: number): Observable<{name: string; series: {value:number; name: string}[]}[]> {
    this.getOlympics()
          .subscribe((countries: Country[])  => {
            this.countries = countries;
            this.countries.map(country => {
              if (country.id == countryId) {
                this.lineData[0].name = country.country;

                country.participations.map(participation => {
                  let p = {value:0, name:''};
                  p.name = participation.year.toString();
                  p.value = participation.medalsCount;

                  this.lineData[0].series.push(p);
                })
                this.lineChartData$.next(this.lineData);
              }
            })

          })
    return this.lineChartData$;
  }

  getTotalAthlete(countryId: number) {
    this.getOlympics()
      .subscribe((olympics: any[])  => {
        this.countries.map(olympic => {
          console.log(olympic);
          if (olympic.id == countryId) {

            olympic.participations.map(participation => {
              this.nbAthlete += participation.athleteCount;
              console.log(this.nbAthlete);
            })

            this.lineChartAthlete$.next(this.nbAthlete);
          }
        })

      })

    return this.lineChartAthlete$;
  }
}
