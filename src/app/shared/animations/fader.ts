import { animate, style, transition, trigger } from '@angular/animations';

export const routeFadeStateTrigger = trigger('routeFadeState', [
  transition(':enter', [
    style({
      opacity: 0
    }),
    animate(300)
  ]),
  // transition(':leave',
  //   animate(300, style({
  //   opacity: 0
  // })))
]);
