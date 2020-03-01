import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { FruitPage } from './fruit.page';

describe('FruitPage', () => {
  let component: FruitPage;
  let fixture: ComponentFixture<FruitPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FruitPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(FruitPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
