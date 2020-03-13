import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { PayRollComponent } from './pay-roll.component';

describe('PayRollComponent', () => {
  let component: PayRollComponent;
  let fixture: ComponentFixture<PayRollComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PayRollComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(PayRollComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
