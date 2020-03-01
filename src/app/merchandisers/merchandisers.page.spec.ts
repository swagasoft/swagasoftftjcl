import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { MerchandisersPage } from './merchandisers.page';

describe('MerchandisersPage', () => {
  let component: MerchandisersPage;
  let fixture: ComponentFixture<MerchandisersPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MerchandisersPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(MerchandisersPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
