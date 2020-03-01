import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { PayRollPage } from './pay-roll.page';

describe('PayRollPage', () => {
  let component: PayRollPage;
  let fixture: ComponentFixture<PayRollPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PayRollPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(PayRollPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
