import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PokemonNumberComponent } from './pokemon-number.component';

describe('PokemonNumberComponent', () => {
  let component: PokemonNumberComponent;
  let fixture: ComponentFixture<PokemonNumberComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PokemonNumberComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PokemonNumberComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
