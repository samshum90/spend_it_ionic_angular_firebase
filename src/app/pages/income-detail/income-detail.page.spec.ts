import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { IncomeDetailPage } from './income-detail.page';

describe('IncomeDetailPage', () => {
  let component: IncomeDetailPage;
  let fixture: ComponentFixture<IncomeDetailPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IncomeDetailPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(IncomeDetailPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
