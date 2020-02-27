import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ArticleListPage } from './article-list.page';

describe('ArticleListPage', () => {
  let component: ArticleListPage;
  let fixture: ComponentFixture<ArticleListPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ArticleListPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ArticleListPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
