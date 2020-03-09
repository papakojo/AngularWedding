import { Component, OnInit, OnDestroy, ElementRef } from '@angular/core';
import { Observable, Subscription, interval } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-count-down',
  templateUrl: './count-down.component.html',
  styleUrls: ['./count-down.component.scss']
})
export class CountDownComponent implements OnInit, OnDestroy {

  private future: Date;
  private futureString: string;
  private counter$: Observable<number>;
  private subscription: Subscription;
  public message: string;
  public countDown
  public days;
  public hours;
  public minutes;
  public seconds;

  constructor(elm: ElementRef) {
    this.futureString = elm.nativeElement.getAttribute('inputDate');
  }

  dhms(t) {
    var days, hours, minutes, seconds;
    days = Math.floor(t / 86400);
    t -= days * 86400;
    hours = Math.floor(t / 3600) % 24;
    t -= hours * 3600;
    minutes = Math.floor(t / 60) % 60;
    t -= minutes * 60;
    seconds = t % 60;

    this.countDown ={"days":days,"hours":hours,"minutes":minutes,"seconds":seconds}


    return this.countDown;
  }


  ngOnInit() {
    this.future = new Date(this.futureString);
    this.counter$ = interval(1000).pipe(map((x) => {
      return Math.floor((this.future.getTime() - new Date().getTime()) / 1000);
    }));

    this.subscription = this.counter$.subscribe((x) => {
      if (x > 0) {
        this.message = this.dhms(x)
        this.days= this.message["days"]
        this.hours =this.message["hours"]
        this.minutes = this.message["minutes"]
        this.seconds =this.message["seconds"]
      }
      else {
        this.message = "Expired"
      }

    }
    )
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
