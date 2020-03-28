import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { EditBadStockComponent } from './edit-bad-stock.component';

describe('EditBadStockComponent', () => {
  let component: EditBadStockComponent;
  let fixture: ComponentFixture<EditBadStockComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditBadStockComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(EditBadStockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
