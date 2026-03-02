import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TicketService {
  private baseUrl= 'http://localhost:3000/api.tickets'

  constructor(private http: HttpClient) { }

  getTickets(page: number, limit: number) {
    return this.http.get(`${this.baseUrl}?_page=${page}&_limit=${limit}`);
  }
}
