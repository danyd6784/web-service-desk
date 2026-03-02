import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { TicketListComponent } from './pages/ticket-list/ticket-list.component';
import { TicketDetailComponent } from './pages/ticket-detail/ticket-detail.component';
import { CreateTicketComponent } from './pages/create-ticket/create-ticket.component';

@NgModule({
  declarations: [
    AppComponent,
    TicketListComponent,
    TicketDetailComponent,
    CreateTicketComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
