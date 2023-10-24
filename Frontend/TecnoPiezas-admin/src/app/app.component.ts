import { Component } from '@angular/core';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  public appPages = [
    { title: 'Listar', url: '/productos', icon: 'cart' },
<<<<<<< Updated upstream
=======
    { title: 'Locales', url: '/locales-home', icon: 'basket' },
    { title: 'Bodegas', url: '/bodegas-home', icon: 'basket' },
>>>>>>> Stashed changes
  ];
  public labels = ['Family', 'Friends', 'Notes', 'Work', 'Travel', 'Reminders'];
  constructor() {}
}
