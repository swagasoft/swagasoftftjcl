import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { FruiteditComponent } from './fruitedit.component';

describe('FruiteditComponent', () => {
  let component: FruiteditComponent;
  let fixture: ComponentFixture<FruiteditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FruiteditComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(FruiteditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
