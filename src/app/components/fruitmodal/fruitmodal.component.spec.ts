import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { FruitmodalComponent } from './fruitmodal.component';

describe('FruitmodalComponent', () => {
  let component: FruitmodalComponent;
  let fixture: ComponentFixture<FruitmodalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FruitmodalComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(FruitmodalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
