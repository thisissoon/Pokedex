import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-pokemon-number',
  templateUrl: './pokemon-number.component.html',
  styleUrls: ['./pokemon-number.component.scss']
})
export class PokemonNumberComponent implements OnInit {

  @Input()
  public number: number;

  constructor() { }

  ngOnInit() {
  }

}
