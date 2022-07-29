import { BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { AuthService } from './../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { Chart, registerables} from 'chart.js';
 declare var google;
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent   {

  isLogin:Boolean  = false  ;
  is_company : boolean  = false    ;
  allData : any ;
  constructor(
    private http:AuthService  ,
    private _http  : HttpClient
    ) {

    this.http.currentUser.subscribe(()=>{
      if(this.http.currentUser.getValue() == null )  {
        this.isLogin = false  ;
        }else {
          this.isLogin = true ;
        }
    })

    this.getMothShipments() ;
    this._http.get(`https://waz3ly.net/dashboard/api/shipmentsCounter`).subscribe(res => {
      this.allData  = res;
    })
    if(localStorage.getItem('employee'))
    {
      // this.emp_id =  JSON.parse(localStorage.getItem('employee')).employee.id
      // this.branch_id =  JSON.parse(localStorage.getItem('employee')).employee.branch_id
      console.log(JSON.parse(localStorage.getItem('employee')));
      // if(JSON.parse(localStorage.getItem('employee')).employee.is_supervisor == 1)
      // {
      //   this.is_supervisor = true ;
      // }
      // if(JSON.parse(localStorage.getItem('employee')).employee.is_sales == 1 )
      // {
      //   this.is_sales = true ;
      // }
      // if(JSON.parse(localStorage.getItem('employee')).employee.is_branch_owner !== null )
      // {
      //   this.is_branch = true ;
      // }
      // if(JSON.parse(localStorage.getItem('employee')).employee.is_storage_owner != false )
      // {
      //   this.is_storage = true ;
      // }

      if(JSON.parse(localStorage.getItem('employee')).user_type == 'company')
      {
        debugger
        this.is_company = true ;
      }
      else if(JSON.parse(localStorage.getItem('employee')).user_type == 'admin')
      {
        this.is_company = false  ;
      }

    }
   }
   emp_id ;
   branch_id
   is_supervisor  : boolean  = false;
   is_sales :  boolean  = false  ;
   is_storage : boolean = false ;
   is_branch : boolean = false ;
   total_shipment_day : number  = 0 ;
   count_shipment_tslem_to_day : number  = 0 ;
   total_cod : number  = 0 ;
   total_day_commission : number  = 0 ;
   conut_client : number  = 0 ;
   conut_client_new : number  = 0 ;
   count_Shipment_return : number  = 0 ;
   count_Shipment_average : number  = 0 ;
   total_shipment_average_deliverables : number  = 0 ;
   total_shipment_average_deliverables_no : number  = 0 ;
   max_shipping_area : any ;
   min_shipping_area : any ;
     //  permissions
   logOut()  {
     this.http.currentUser.next(null) ;
    this.isLogin = false  ;
    localStorage.removeItem('user') ;
    localStorage.removeItem('employee')
  }

  isSuccess  : boolean = false ;

  monthShipments  = new BehaviorSubject(null) ;
  allCountShipments  = new BehaviorSubject(null) ;

  percentShipments  = new BehaviorSubject(null) ;

  getMothShipments()
  {
    debugger
    this.http.getMothShipmentCount().subscribe((res : any ) => {
      // this.monthShipments  = res.array ;
      this.monthShipments.next(res.array) ;

    } )
  }

  getCountShipments()
  {
    debugger
    this.http.getCountShipmentCount().subscribe((res : any ) => {
      // this.monthShipments  = res.array ;
      this.allCountShipments.next(res.data) ;
      console.log(res);

    } )
  }

  getPercentageShipments()
  {
    debugger
    this.http.getPercentageShipmentCount().subscribe((res : any ) => {
      this.percentShipments.next(res.array) ;

    } )
  }

  // getting
  getTotal_accounts()
  {
    debugger
    this.http.getAccounts().subscribe((res : any ) => {
      console.log(res);
      this.total_shipment_day = res.data?.total_shipment_day  ;
      this.count_shipment_tslem_to_day = res.data?.count_shipment_tslem_to_day  ;
      this.total_cod = res.data?.total_cod  ;
      this.total_day_commission = res.data?.total_day_commission  ;
      this.conut_client = res.data?.conut_client  ;
      this.conut_client_new = res.data?.conut_client_new  ;
      this.count_Shipment_return = res.data?.count_Shipment_return  ;
      this.count_Shipment_average = res.data?.count_Shipment_average  ;
      this.total_shipment_average_deliverables = res.data?.total_shipment_average_deliverables  ;
      this.total_shipment_average_deliverables_no = res.data?.total_shipment_average_deliverables_no  ;
      this.max_shipping_area = res.data?.max_shipping_area ;
      this.min_shipping_area = res.data?.min_shipping_area ;

      this.isSuccess = true ;
    },err=> {
      console.log(err);
      this.isSuccess = false ;
    },()=> {
      this.counter("count1", 0, this.total_shipment_day, 3000);
      this.counter("count2", 0, this.count_shipment_tslem_to_day, 2500);
      this.counter("count3", 0, this.total_cod, 3000);
      this.counter("count4", 0, this.total_day_commission, 3000);
      this.counter("count5", 0, this.conut_client, 3000);
      this.counter("count6", 0, this.conut_client_new, 3000);
      this.counter("count7", 0, this.count_Shipment_return, 3000);
      this.counter("count8", 0, this.count_Shipment_average, 3000);
      this.counter("count11", 0, this.total_shipment_average_deliverables, 3000);
      this.counter("count12", 0, this.total_shipment_average_deliverables_no, 3000);
    })
  }


   counter(id, start, end, duration) {
    let obj = document.getElementById(id),
     current = start,
     range = end - start,
     increment = end > start ? 1 : 0,
     step = Math.abs(Math.floor(duration / range)),
     timer = setInterval(() => {
      current += increment;
      if(obj)
      {
       obj.textContent = current;
      }
      if (current == end) {
       clearInterval(timer);
      }
     }, step);
   }
  ngOnInit() {
    debugger
     this.getMothShipments() ;
    this.getTotal_accounts() ;
    this.getCountShipments()
    Chart.register(...registerables);
    const data1 = {
      labels: [
        'عدد الشحنات المستلمه',
        'عدد الشحنات المرتجعه',
        'عدد الشحنات المؤجله',
      ],
      datasets: [{
        label: 'عدد الشحنات المحققه',
        data: this.allCountShipments.value,
        backgroundColor: [
          'rgb(255, 99, 132)',
          'rgb(54, 162, 235)',
          'rgb(255, 205, 86)'
        ],
        hoverOffset: 4
      }]
    };



    var myChart1 = new Chart('myChart1', {
      type: 'doughnut',
      data:data1 ,
      options: {
          scales: {
              y: {
                  beginAtZero: true
              }
          }
      }
    });

    this.allCountShipments.subscribe(()=>   {
      myChart1.destroy()
      if(this.allCountShipments.getValue() != null )
      {
        myChart1 = new Chart('myChart1', {
          type: 'doughnut',
          data:{
            labels: [
              'عدد الشحنات المستلمه',
              'عدد الشحنات المرتجعه',
              'عدد الشحنات المؤجله',
            ],
            datasets: [{
              label: 'عدد الشحنات المحققه',
              data: this.allCountShipments.value,
              backgroundColor: [
                'rgb(255, 99, 132)',
                'rgb(54, 162, 235)',
                'rgb(255, 205, 86)'
              ],
              hoverOffset: 4
            }]
          } ,
          options: {
              scales: {
                  y: {
                      beginAtZero: true
                  }
              }
          }
        });
      }
    });

    // line chart

    let myChart2 =   new Chart('myChart2', {
      type: 'line',
      data: {
          datasets: [{
              label: 'عدد الشحنات في خلال الشهر',
              data: [0,0,0,0,0,0,0,0,0,0,0,0]
          }],
          labels: ['يناير', 'فبراير', 'مارس', 'أبريل' , 'مايو', 'يونيو', 'يوليو', 'أغسطس' , 'سبتمبر' , 'أكتوبر'  , 'نوفمبر' ,  'ديسمبر']
      },
      options: {
          scales: {
              y: {
                  suggestedMin: 50,
                  suggestedMax: 100
              }
          }
      }
  });


    this.monthShipments.subscribe(()=>   {
      if(this.monthShipments.getValue() != null )
      {
        myChart2.destroy()
         myChart2 =   new Chart('myChart2', {
          type: 'line',
          data: {
              datasets: [{
                  label: 'عدد الشحنات في خلال الشهر',
                  data: this.monthShipments.value
              }],
              labels: ['يناير', 'فبراير', 'مارس', 'أبريل' , 'مايو', 'يونيو', 'يوليو', 'أغسطس' , 'سبتمبر' , 'أكتوبر'  , 'نوفمبر' ,  'ديسمبر']
          },
          options: {
              scales: {
                  y: {
                      suggestedMin: 50,
                      suggestedMax: 100
                  }
              }
          }
      });
      }
    })

// bar chart



var data2 = {
  labels: [
    '-	نسبة استلام ال pick up ',
    'نسبة الشحنات المؤجلة',
    'نسبة الشحنات  فشل التسليم ',
    'نسبة الشحنات المرتجعه ',
    'نسبة الشحنات  تسليم ناجح ',
  ],
  datasets: [{
    label: 'نسبه المحققه للشحنات',
    data: this.percentShipments.value ,
    backgroundColor: [
      'rgba(255, 99, 132, 0.2)',
      'rgba(255, 159, 64, 0.2)',
      'rgba(255, 205, 86, 0.2)',
      'rgba(75, 192, 192, 0.2)',
      'rgba(75, 192, 192, 0.2)',

    ],
    borderColor: [
      'rgb(255, 99, 132)',
      'rgb(255, 159, 64)',
      'rgb(255, 205, 86)',
      'rgb(75, 192, 192)',
      'rgb(255, 192, 192)',

    ],
    borderWidth: 1
  }]
};

  let myChart3 = new Chart('myChart3', {
    type: 'bar',
    data: data2 ,
    options: {
      scales: {
        y: {
          beginAtZero: true
        }
      }
    },
});

this.percentShipments.subscribe(()=>   {

   data2 = {
    labels: [
      'نسبة الشحنات  تسليم ناجح ',
      'نسبة الشحنات المرتجعه ',
      'نسبة الشحنات  فشل التسليم ',
      'نسبة الشحنات المؤجلة',
      '-	نسبة استلام ال pick up '
    ],
    datasets: [{
      label: 'نسبه المحققه للشحنات',
      data:this.percentShipments.value ,
      backgroundColor: [
        'rgba(255, 99, 132, 0.2)',
        'rgba(255, 159, 64, 0.2)',
        'rgba(255, 205, 86, 0.2)',
        'rgba(75, 192, 192, 0.2)',
        'rgba(75, 192, 192, 0.2)',

      ],
      borderColor: [
        'rgb(255, 99, 132)',
        'rgb(255, 159, 64)',
        'rgb(255, 205, 86)',
        'rgb(75, 192, 192)',
        'rgb(255, 192, 192)',

      ],
      borderWidth: 1
    }]
  };


  if(this.percentShipments.getValue() != null )
  {
    myChart3.destroy()
    myChart3 = new Chart('myChart3', {
      type: 'bar',
      data: data2 ,
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        }
      },
  });
  }
});



const data3 = {
  labels: ['يناير', 'فبراير', 'مارس', 'أبريل' , 'مايو', 'يونيو', 'يوليو', 'أغسطس' , 'سبتمبر' , 'أكتوبر'  , 'نوفمبر' ,  'ديسمبر'],
  datasets: [{
    label: 'تقارير المبيعات السنويه',
    data: [0, 20, 40, 50  , 80, 20, 10, 70 , 5, 60, 90, 500],
    backgroundColor: [
      'rgba(255, 99, 132, 0.2)',
      'rgba(255, 159, 64, 0.2)',
      'rgba(255, 205, 86, 0.2)',
      'rgba(75, 192, 192, 0.2)',
      'rgba(255, 99, 132, 0.2)',
      'rgba(255, 159, 64, 0.2)',
      'rgba(255, 205, 86, 0.2)',
      'rgba(75, 192, 192, 0.2)',
      'rgba(255, 99, 132, 0.2)',
      'rgba(255, 159, 64, 0.2)',
      'rgba(255, 205, 86, 0.2)',
      'rgba(75, 192, 192, 0.2)',

    ],
    borderColor: [
      'rgb(255, 99, 132)',
      'rgb(255, 159, 64)',
      'rgb(255, 205, 86)',
      'rgb(75, 192, 192)',
      'rgb(255, 99, 132)',
      'rgb(255, 159, 64)',
      'rgb(255, 205, 86)',
      'rgb(75, 192, 192)',
      'rgb(255, 99, 132)',
      'rgb(255, 159, 64)',
      'rgb(255, 205, 86)',
      'rgb(75, 192, 192)',

    ],
    borderWidth: 1
  }]
};

  let myChart4 = new Chart('myChart4', {
    type: 'bar',
    data: data3 ,
    options: {
      scales: {
        y: {
          beginAtZero: true
        }
      }
    },
});



  }


}
