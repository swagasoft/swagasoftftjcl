import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { PenaltyPage } from './penalty.page';

describe('PenaltyPage', () => {
  let component: PenaltyPage;
  let fixture: ComponentFixture<PenaltyPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PenaltyPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(PenaltyPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
