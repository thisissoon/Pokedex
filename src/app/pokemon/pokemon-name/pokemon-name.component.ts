import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-pokemon-name',
  templateUrl: './pokemon-name.component.html',
  styleUrls: ['./pokemon-name.component.scss']
})
export class PokemonNameComponent implements OnInit {

  @Input()
  public name: string;
  @Input()
  public loading: boolean;

  constructor() { }

  ngOnInit() {
  }

}
