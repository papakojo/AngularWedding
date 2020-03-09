import { trigger, state, style, transition, animate, group } from "@angular/animations";

export const HamburgerAnimation = [
    trigger('hamburguerX', [
        state('hamburguer', style({})),
        state('topX', style({
          transform: 'rotate(45deg)', 
          transformOrigin: 'left',
          margin: '6px'
        })),
        state('hide', style({
          opacity: 0
        })),
        state('bottomX', style({
          transform: 'rotate(-45deg)',
          transformOrigin: 'left',
          margin: '6px'
        })),
        transition('* => *', [
          animate('0.3s')
        ]),
      ]),
      trigger('childAnimation', [
        // ...
        state('open', style({
          width: '200px',
          opacity: 1,
          backgroundColor: 'yellow'
        })),
        state('closed', style({
          width: '100px',
          opacity: 0.5,
          backgroundColor: 'green'
        })),
        transition('* => *', [
          animate('1s')
        ]),
      ]),
  
      trigger('fade', [ 
        transition('void => *', [
          style({ opacity: 0 }), 
          animate(2000, style({opacity: 1}))
        ]) 
      ]),
  
  
  
      trigger('slideInOut', [
        state('in', style({
            'max-height': '500px', 'opacity': '1', 'visibility': 'visible'
        })),
        state('out', style({
            'max-height': '0px', 'opacity': '0', 'visibility': 'hidden'
        })),
        transition('in => out', [group([
            animate('400ms ease-in-out', style({
                'opacity': '0'
            })),
            animate('600ms ease-in-out', style({
                'max-height': '0px'
            })),
            animate('700ms ease-in-out', style({
                'visibility': 'hidden'
            }))
        ]
        )]),
        transition('out => in', [group([
            animate('1ms ease-in-out', style({
                'visibility': 'visible'
            })),
            animate('600ms ease-in-out', style({
                'max-height': '500px'
            })),
            animate('800ms ease-in-out', style({
                'opacity': '1'
            }))
        ]
        )])
    ]),

]