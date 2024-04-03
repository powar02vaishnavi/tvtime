import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StorageResultComponent } from './storage-result.component';

describe('StorageResultComponent', () => {
  let component: StorageResultComponent;
  let fixture: ComponentFixture<StorageResultComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StorageResultComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StorageResultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
