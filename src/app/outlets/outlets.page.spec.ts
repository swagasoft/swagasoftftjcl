import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { OutletsPage } from './outlets.page';

describe('OutletsPage', () => {
  let component: OutletsPage;
  let fixture: ComponentFixture<OutletsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OutletsPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(OutletsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
