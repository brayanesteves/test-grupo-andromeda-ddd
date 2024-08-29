import { Component } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
})
export class DashboardComponent {
  name: string = '';
surname: string = '';
phone: string = '';
submittedMessage: string = '';

onSubmit() {
  this.submittedMessage = '¡Gracias por participar!';
}
  data = {
    labels: ['January', 'February', 'March', 'April', 'May'],
    datasets: [
      {
        label: 'Statistics',
        data: [65, 59, 80, 81, 56],
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
    ],
  };

  logout() {
    // Logic for logout
  }
}