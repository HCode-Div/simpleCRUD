import { Component, inject, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FlowbiteService } from './core/services/flowbite.service';
import { initFlowbite } from 'flowbite';
import { Login } from './features/auth/login/login';

@Component({
  selector: 'app-root',
  imports: [Login, RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  protected readonly title = signal('simpleMarket');

  private readonly _flowbiteService = inject(FlowbiteService);

  ngOnInit(): void {
    this._flowbiteService.loadFlowbite((flowbite) => {
      initFlowbite();
    });
  }
}
