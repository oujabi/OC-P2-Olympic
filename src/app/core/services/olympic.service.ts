import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import {Olympic} from "../models/Olympic";

@Injectable({
  providedIn: 'root',
})
export class OlympicService {
  //Olympic
  private olympicUrl: string = './assets/mock/olympic.json';
  private olympics$: BehaviorSubject<Olympic[]> = new BehaviorSubject<Olympic[]>([]);
  public olympicId: number = 0;


  constructor(private http: HttpClient) {}

  loadInitialData() {
    return this.http.get<Olympic[]>(this.olympicUrl).pipe(
      tap(
        (value) => this.olympics$.next(value)
      ),
      catchError((error, caught) => {
        console.error(error);
        this.olympics$.next([]);
        return caught;
      })
    );
  }

  getOlympics(): Observable<Olympic[]> {
    return this.olympics$.asObservable();
  }

  getOlympicIdByName(name: string): number {
    this.olympics$.pipe()
      .subscribe((olympics: Olympic[])  => {
        olympics.map((olympic: Olympic) => {
          if (olympic.country === name) {
            this.olympicId = olympic.id;
          }
        })
      }
    );

    return this.olympicId;
  }
}
