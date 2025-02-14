import { Component, Input, OnInit } from '@angular/core';
import { Gif } from '../../interfaces/gif.interfaces';
import { throwError } from 'rxjs';

@Component({
  selector: 'gifs-card',
  standalone: false,
  templateUrl: './gifs-card.component.html',
  styleUrl: './gifs-card.component.css'
})
export class GifsCardComponent implements OnInit {

  @Input()
  public gif!: Gif;

  ngOnInit(): void {
    if ( !this.gif ) throw new Error('Git property is required');
  }

}
