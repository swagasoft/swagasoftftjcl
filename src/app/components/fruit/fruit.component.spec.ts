import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { FruitComponent } from './fruit.component';

describe('FruitComponent', () => {
  let component: FruitComponent;
  let fixture: ComponentFixture<FruitComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FruitComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(FruitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
