import { AuthService } from './auth.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFireMessaging } from '@angular/fire/messaging';
import { BehaviorSubject } from 'rxjs'


@Injectable()
export class MessagingService {

currentMessage = new BehaviorSubject(null);
msgTitle  = new BehaviorSubject(null) ;
msgbody  = new BehaviorSubject(null) ;
msgToken  = new BehaviorSubject(null) ;
constructor( private _http : HttpClient , private http:AuthService , private angularFireMessaging : AngularFireMessaging) {

  this.angularFireMessaging.messages.subscribe(
    (_messaging: AngularFireMessaging) => {
    _messaging.onMessage = _messaging.onMessage.bind(_messaging);
    _messaging.onTokenRefresh = _messaging.onTokenRefresh.bind(_messaging);
  })
}



userId ;



  requestPermission() {
    this.angularFireMessaging.requestToken.subscribe(
    (token) => {
      console.log(token);
      this.msgToken.next(token) ;
      debugger
      this.http.currentUser2.subscribe(()=>{
        debugger
        if( this.http.currentUser2.value != null ){
          debugger
          this.userId = JSON.parse(localStorage.getItem('employee')).id ;
          console.log(this.userId);
          this._http.post(`https://waz3ly.net/dashboard/api/dashboard/lupdatetoken/${this.userId}/${token}?_method=PUT` , null).subscribe(res =>  {
            console.log(res);
          }) ;
          }
      })
    });
  }

  receiveMessage() {
    this.angularFireMessaging.messages.subscribe(
    (msg : any) => {
    console.log("show message!", msg.notification);
    this.currentMessage.next(msg);
    this.msgTitle.next(msg?.notification?.title);
    this.msgbody.next(msg?.notification.body);
       })
    }
}
