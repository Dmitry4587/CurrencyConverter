import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import { isConvertRes } from 'src/types';

@Injectable({
  providedIn: 'root',
})
export class HttpService {
  private baseUrl =
    'https://currency-conversion-and-exchange-rates.p.rapidapi.com';
  private apiKey = 'f1a1e94073msh06795e8affa0246p1b855bjsn5eadcf7e9758';
  private apiHost = 'currency-conversion-and-exchange-rates.p.rapidapi.com';

  constructor(private http: HttpClient) {}

  getResource(from: string, to: string, amount: number) {
    return this.http.get(`${this.baseUrl}/convert`, {
      params: {
        from,
        to,
        amount,
      },
      headers: {
        'X-RapidAPI-Key': this.apiKey,
        'X-RapidAPI-Host': this.apiHost,
      },
    });
  }

  getRate(from: string, to: string, amount: number) {
    return this.getResource(from, to, amount).pipe(
      map((data: any) => {
        if (isConvertRes(data)) {
          return +data.result.toFixed(2);
        }
        throw new Error();
      }),
      catchError((err: any) => {
        throw err?.error?.message || 'Something went wrong';
      })
    );
  }
}
