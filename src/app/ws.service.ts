import { Injectable } from '@angular/core';
import * as Webstomp from 'webstomp-client';
import * as global from './endpoints/races';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WsService {

  constructor() { }
  connect<T>(channel: any): Observable<T> {
    return new Observable(observer => {
      // create the WebSocket connection
      const connection: WebSocket = new WebSocket(`${global.wsBaseUrl}/ws`);
      // create the stomp client with Webstomp
      const stompClient: Webstomp.Client = Webstomp.over(connection);
      // connect the stomp client
      let subscription: Webstomp.Subscription;
      stompClient.connect({ login: null, passcode: null }, () => {
        subscription = stompClient.subscribe(channel, message => {
          // emit the message received, after extracting the JSON from the body
          const bodyAsJson = JSON.parse(message.body);
          observer.next(bodyAsJson);
        });
      }, error => {
        // propagate the error
        observer.error(error);
      });

      // handle the unsubscription
      return () => {
        if (subscription) {
          subscription.unsubscribe();
        }
        connection.close();
      };
    });
  }
}
