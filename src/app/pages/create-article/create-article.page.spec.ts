import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CreateArticlePage } from './create-article.page';

describe('CreateArticlePage', () => {
  let component: CreateArticlePage;
  let fixture: ComponentFixture<CreateArticlePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateArticlePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CreateArticlePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
