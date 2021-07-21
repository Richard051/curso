import { Component, OnInit } from '@angular/core';
import { Menu } from './models/menu';

import { NotificationService } from './services/notification.service';

import { Observable } from 'rxjs';
import { Message, TypeMessage } from './models/message';

import { NotifierService } from 'angular-notifier';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  isOpen: boolean = true;

  notication$: Observable<Message>;
  private readonly notifier: NotifierService;

  constructor(private notificationService: NotificationService, notifierService: NotifierService) {
    this.notifier = notifierService;

  }



  public menus: Menu[] = [
    {
      title: 'Modulos',
      key: 'modulos',
      children: [
        {
          title: 'Componente de Modulos Externos',
          path: 'external_component'
        }, {
          title: 'Componentes Externos Web',
          path: 'web_component'
        }, {
          title: 'Modulo Carga Lenta',
          path: 'editor'
        }, {
          title: 'Componentes Internos',
          path: 'internal_component'
        }
      ]

    },

    {
      title: 'Routing',
      key: 'routing',
      children: [{
        title: 'Parametros',
        path: 'routing_params'
      }, {
        title: 'Productos',
        path: 'productos'
      }]

    },

    {
      title: 'Observable',
      key: 'observable',
      children: [{
        title: 'Weather',
        path: 'observable/weather'
      }, {
        title: 'Carrito',
        path: 'observable/carrito'
      }, {
        title: 'Movie DB',
        path: 'observable/moviedb'
      },{
        title: 'Factura',
        path: 'observable/factura'
      }]

    },
    {
      title: 'Eventos',
      path: 'events'
    },

    {
      title: 'Usuario',
      path: 'usuarios'
    }]


  public ngOnInit() {

    this.notication$ = this.notificationService.getNotifObservable();

    this.notication$.subscribe(message => {

      if(message.type === TypeMessage.SUCCESS){
        this.notifier.notify('success', message.message);
      }else if(message.type === TypeMessage.ERROR){
        this.notifier.notify('error', message.message);
      }

    });




  }

}
