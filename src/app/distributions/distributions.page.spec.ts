import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { DistributionsPage } from './distributions.page';

describe('DistributionsPage', () => {
  let component: DistributionsPage;
  let fixture: ComponentFixture<DistributionsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DistributionsPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(DistributionsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
