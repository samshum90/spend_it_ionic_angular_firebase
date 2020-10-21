import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { PasswordForgetPage } from './password-forget.page';

describe('PasswordForgetPage', () => {
  let component: PasswordForgetPage;
  let fixture: ComponentFixture<PasswordForgetPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PasswordForgetPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(PasswordForgetPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
