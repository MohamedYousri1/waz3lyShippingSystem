import { AuthService } from './../services/auth.service';
import { AfterViewInit, Component, DoCheck, OnInit } from '@angular/core';
import { Router } from '@angular/router';
declare var $:any ;
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent  implements OnInit {

  constructor(private http:AuthService , private  _router:Router) {
    this.getUserData()
      if(JSON.parse(localStorage.getItem('employee')).user_type == 'company')
      {
        debugger
        this.is_company = true ;
      }
      else if(JSON.parse(localStorage.getItem('employee')).user_type == 'admin' || JSON.parse(localStorage.getItem('employee')).user_type == 'employee')
      {
        this.is_company = false  ;
      }

   }
   isLogin:Boolean  = true   ;
   permissions ;
   is_company : boolean  = false    ;

   is_admin :boolean =  false  ;
   is_accountant :boolean =  false  ;
   is_supervisor :boolean =  false  ;
   is_storeKeeper :boolean =  false  ;
   is_customerService :boolean =  false  ;


   logOut()  {
    this.http.currentUser.next(null) ;
    this.http.currentUser2.next(null) ;
    this.isLogin = false  ;
    localStorage.removeItem('user') ;
    localStorage.removeItem('employee') ;
    this._router.navigate(['/login'])
  }
  userInfo  :any ;
  async  getUserData()
  {
    debugger
    await this.http.currentUser2.subscribe(()=> {
      if(localStorage.getItem('employee') &&  localStorage.getItem('employee') !== null )
      {
        debugger
        this.userInfo =JSON.parse(localStorage.getItem('employee') || '{}') ;
        console.log(this.userInfo);
        (this.userInfo?.roles[0]?.display_name == 'Super Admin') ? this.is_admin = true  : this.is_admin = false ;
        (this.userInfo?.roles[0]?.display_name == 'Accountant') ? this.is_accountant = true  : this.is_accountant = false ;
        (this.userInfo?.roles[0]?.display_name == 'Store Keeper') ? this.is_storeKeeper = true  : this.is_storeKeeper = false ;
        (this.userInfo?.roles[0]?.display_name == 'Customer Service') ? this.is_customerService = true  : this.is_customerService = false ;
        (this.userInfo?.roles[0]?.display_name == 'Staff Supervisor') ? this.is_supervisor = true  : this.is_supervisor = false ;
      }


    })

  }

  ngOnInit(): void {
    this.http.currentUser.subscribe(()=>{
      if( this.http.currentUser.value == null ){
        this.isLogin = false  ;
        }else {
          this.isLogin = true ;
        }
          // this._router.navigate(['/home']) ;
    })
    // setTimeout(() => {
    //   this._router.navigate(['/header']) ;
    // }, 1000);
    // var originalSetItem = localStorage.setItem;
// var that = this;
// localStorage.setItem = function(){
//     debugger;
//     that.callPermissions();
//     document.createEvent('Event').initEvent('itemInserted', true, true);
//     originalSetItem.apply(this, arguments);
// }

  }
  ngAfterViewInit(): void {
    $('.contact').on('click', () => {
      $('html , body ').animate({
          scrollTop: $('#contact').offset().top
      }, 1500)
  })
   setTimeout(() => {
     $(".sidebar-dropdown > a").click(function() {
       $(".sidebar-submenu").slideUp(200);
       if (
         $(this)
           .parent()
           .hasClass("active")
       ) {
         $(".sidebar-dropdown").removeClass("active");
         $(this)
           .parent()
           .removeClass("active");
       } else {
         $(".sidebar-dropdown").removeClass("active");
         $(this)
           .next(".sidebar-submenu")
           .slideDown(200);
         $(this)
           .parent()
           .addClass("active");
       }
     });
   }, 2000);
let sidebar = $('#sidebar');
//  $('html:not(.page-wrapper > *)').click(e => {
//     console.log('you clicked outside ');
//     console.log(e.target);
//    })
  $(document).on("click", function(event){
   var $trigger = $(".page-wrapper:not('#show-sidebar')");
   if($trigger !== event.target && !$trigger.has(event.target).length){
    //  $(".page-wrapper").removeClass("toggled");
   }else
   {
     debugger
     $(".page-wrapper").addClass("toggled");
     if(event.target.classList[1] == 'fa-times')
     {
      //  $(".page-wrapper").removeClass("toggled");

     }
   }
});
  }
}




