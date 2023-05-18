import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import { lastValueFrom } from 'rxjs';
import { IHeaderRate, TCurrency } from 'src/types';

@Component({
  selector: 'app-converter',
  templateUrl: './converter.component.html',
  styleUrls: ['./converter.component.css'],
})
export class ConverterComponent implements OnInit {
  response: number;
  amount: number = 100;
  headerMessage: string;
  convertMessage: string;
  convertLoading: boolean = false;
  headerLoading: boolean = true;
  headerRate: IHeaderRate[] = [
    { from: 'USD', to: 'UAH' },
    { from: 'EUR', to: 'UAH' },
  ];
  currency: TCurrency[] = ['UAH', 'USD', 'EUR'];
  from: TCurrency = 'UAH';
  to: TCurrency = 'USD';

  constructor(private httpService: HttpService) {}

  async reverseConvert() {
    this.convertLoading = true;
    this.convertMessage = '';
    try {
      const res = await lastValueFrom(
        this.httpService.getRate(this.to, this.from, this.response)
      );
      const to = this.to;
      const from = this.from;
      const response = this.response;
      this.from = to;
      this.to = from;
      this.amount = response;
      this.response = res;
    } catch (e: any) {
      if (typeof e === 'string') {
        this.convertMessage = e;
      }
    } finally {
      this.convertLoading = false;
    }
  }

  async converCurency() {
    this.convertLoading = true;
    this.convertMessage = '';
    try {
      const res = await lastValueFrom(
        this.httpService.getRate(this.from, this.to, this.amount)
      );
      this.response = res;
    } catch (e: any) {
      if (typeof e === 'string') {
        this.convertMessage = e;
      }
    } finally {
      this.convertLoading = false;
    }
  }

  async ngOnInit() {
    this.headerLoading = true;
    this.headerMessage = '';
    const resultsPromises = this.headerRate.map(async (item: IHeaderRate) => {
      const res = await lastValueFrom(
        this.httpService.getRate(item.from, item.to, 1)
      );
      return { ...item, res };
    });
    try {
      this.headerRate = await Promise.all(resultsPromises);
      await this.converCurency();
    } catch (e: any) {
      if (typeof e === 'string') {
        this.headerMessage = e;
      }
    } finally {
      this.headerLoading = false;
    }
  }
}
