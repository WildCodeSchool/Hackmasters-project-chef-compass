import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecipesdisplayComponent } from './recipes-display.component';

describe('RecipesdisplayComponent', () => {
  let component: RecipesdisplayComponent;
  let fixture: ComponentFixture<RecipesdisplayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RecipesdisplayComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RecipesdisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
