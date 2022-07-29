import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from './services/auth.service';
import { MessagingService } from './services/messaging.service';
import { Component } from '@angular/core';
import {Howl, Howler} from 'howler';
declare var $:any ;
import {MessageService} from 'primeng/api';
@Component({
  providers : [MessageService] ,
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
  })
  export class AppComponent {
    show;
    msgTitle ;
    msgBody ;
    showMsgs : boolean =  false ;
      title = 'elfagrCRM';
      isLogin : boolean  = false
      allNotifications  ;
      sound = new Howl({
        src: ['../assets/images/mixkit-software-interface-start-2574.wav', 'sound.mp3']
     });
  constructor(private messagingService: MessagingService ,private router: Router
    , private activeRoute: ActivatedRoute  , private x : MessageService ,private modal:NgbModal, private http:AuthService , private _http : HttpClient) {

      this.http.currentUser2.subscribe(()=> {

      if(JSON.parse(localStorage.getItem('employee')).user_type == 'company')
      {
        debugger
        this.is_company = true ;
      }
      else if(JSON.parse(localStorage.getItem('employee'))?.user_type == 'admin' || JSON.parse(localStorage.getItem('employee'))?.user_type == 'employee')
      {
        this.is_company = false  ;
      }
      });


  }
  is_company : boolean  = false ;
    ngOnInit() {
      // this.getUserNotification() ;
    this.http.currentUser2.subscribe(()=>{
      if( this.http.currentUser2.value ){
        this.isLogin = true  ;

        if(JSON.parse(localStorage.getItem('employee')).user_type == 'company')
        {
          debugger
          this.is_company = true ;
        }
        else if(JSON.parse(localStorage.getItem('employee'))?.user_type == 'admin' || JSON.parse(localStorage.getItem('employee'))?.user_type == 'employee')
        {
          this.is_company = false  ;
        }


        }else {
          this.isLogin = false ;
        }
    })
    if(localStorage.getItem('employee'))
    {
      debugger
      this._http.get(`https://waz3ly.net/dashboard/api/dashboard/all-notification_company`).subscribe((res  : any ) =>  {
        this.allNotifications = res.notification_company ;
        console.log(res.notification_company);

      })
    }
    this.messagingService.requestPermission()
      this.messagingService.receiveMessage()
      this.show = this.messagingService.currentMessage;
      this.msgTitle = this.messagingService.msgTitle ;
      this.msgBody = this.messagingService.msgbody  ;
      console.log(this.show);
    this.messagingService.currentMessage.subscribe(res => {
      // debugger
      this.getUserNotification() ;
      // debugger
      // this.x.add({key: 'myKey1', severity:'info', summary: `${this.messagingService.currentMessage.getValue()?.notification?.title}`, detail: `${this.messagingService.currentMessage.getValue()?.notification?.body}`});

      if(this.messagingService.currentMessage.getValue())
      {
        console.log(this.messagingService.currentMessage.getValue()?.notification?.title);
        if(this.messagingService.currentMessage.getValue()?.notification?.body == 'المندوب فالطريق اليك')
        {
          if(JSON.parse(localStorage.getItem('employee'))?.user_type == 'company')
          {
            this.x.add({key: 'myKey1', severity:'info', summary: `${this.messagingService.currentMessage.getValue()?.notification?.title}`, detail: `المندوب في الطريق الي العميل `});
            this.sound.play();
          }

        }else{
          if(JSON.parse(localStorage.getItem('employee'))?.user_type == 'company')
          {
            this.x.add({key: 'myKey1', severity:'info', summary: `${this.messagingService.currentMessage.getValue()?.notification?.title}`, detail: `${this.messagingService.currentMessage.getValue()?.notification?.body}`});
            this.sound.play();
          }

        }
      }
    })
      if(this.messagingService.currentMessage.getValue())
      {
        this.showMsgs ==  true  ;
      }else
      {
        this.showMsgs = false
      }
      if(this.isLogin == true )
      {
        $('.bell').on('click' , ()=> {

          $('.msg-content').toggle() ;
        })
      }
      $('.msg-content').css('minHeight' , $(window).height() / 1.5) ;
      $(window).on('resize' , ()=>  {
        $('.msg-content').css('minHeight' , $(window).height() / 1.5) ;
      })

    }

      // get user Notifications
      counter : any[] = [] ;
   getUserNotification()
   {

    // debugger
    if(localStorage.getItem('employee'))
    {

      debugger
      this._http.get(`https://waz3ly.net/dashboard/api/dashboard/all-notification_company`,{headers : {skip:"true"}}).subscribe((res : any) =>  {
        this.counter  = [] ;
        // debugger
        this.allNotifications = res.notification_company ;
        for(let i = 0 ; i < res.notification_company?.length  ; i++ )
        {
          if(res.notification_company[i]?.is_watch == 0)
          {
            this.counter.push(0);  ;
          }else{
            continue
          }
        }
      })
    }
   }


   allData ;
   fillData : boolean =  false ;
    watchUsersNotify(modal  , notifyId)
    {
      this.modal.open(modal , {backdrop : 'static' , size :  'lg',keyboard : false})
      // debugger
      this._http.get(`https://waz3ly.net/dashboard/api/watchUsersNotification/${notifyId.id}` , {headers : {skip:"true"}}).subscribe(res =>  {
        // console.log(res);

        if(res !== null )
        {
         this.allData=res ;
         this.fillData = true ;
         console.log(this.allData);
         this.getUserNotification() ;
        }else
        {
          this.fillData = false  ;
        }

      this.getUserNotification() ;
      },err =>  {
        this.x.add({key: 'myKey1', severity:'error', summary: 'Notificatiom', detail: 'عفوا , هناك خطا'});
       this.allData = '' ;
       this.fillData = false ;
      }
      ) ;
    }




  }
