import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FavoriteResultComponent } from './favorite-result.component';

describe('FavoriteResultComponent', () => {
  let component: FavoriteResultComponent;
  let fixture: ComponentFixture<FavoriteResultComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FavoriteResultComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FavoriteResultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
