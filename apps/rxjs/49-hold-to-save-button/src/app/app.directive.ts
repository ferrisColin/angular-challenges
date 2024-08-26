import { Directive, ElementRef, inject, input, output } from '@angular/core';
import {
  filter,
  fromEvent,
  interval,
  map,
  merge,
  switchMap,
  takeUntil,
  tap,
} from 'rxjs';

@Directive({
  standalone: true,
  selector: '[appHoldable]',
})
export class AppHoldable {
  public appHoldable = input(1000);
  public elemRef = inject(ElementRef).nativeElement;
  public calculatedResult = output<number>();
  public completed = output<void>();

  constructor() {
    const reset = merge(
      fromEvent(this.elemRef, 'mouseup'),
      fromEvent(this.elemRef, 'mouseleave'),
    ).pipe(tap(() => this.calculatedResult.emit(0)));

    fromEvent(this.elemRef, 'mousedown')
      .pipe(
        switchMap(() =>
          interval(10).pipe(
            map((time) => time * 10),
            tap((time) => this.calculatedResult.emit(time)),
            takeUntil(reset),
            filter((time) => this.appHoldable() <= time),
            // take(1),
            tap(() => {
              this.completed.emit();
              this.calculatedResult.emit(0);
            }),
          ),
        ),
      )
      .subscribe();
  }
}
