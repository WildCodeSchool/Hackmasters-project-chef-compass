import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LogoAndGreetingComponent } from './logo-and-greeting.component';

describe('LogoAndGreetingComponent', () => {
  let component: LogoAndGreetingComponent;
  let fixture: ComponentFixture<LogoAndGreetingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LogoAndGreetingComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(LogoAndGreetingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
