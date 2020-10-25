import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { IncomeCreatePage } from './income-create.page';

describe('IncomeCreatePage', () => {
  let component: IncomeCreatePage;
  let fixture: ComponentFixture<IncomeCreatePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IncomeCreatePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(IncomeCreatePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
