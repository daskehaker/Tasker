import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ToastrService } from 'ngx-toastr';
import { ProjectService } from 'src/app/shared/services/project.service';

import { ProjectListComponent } from './project-list.component';

describe('ProjectListComponent', () => {
  let component: ProjectListComponent;
  let fixture: ComponentFixture<ProjectListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProjectListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    TestBed.configureTestingModule({
      //provide component-under-test and dependent service
      providers: [
        ProjectListComponent,
        {provide: ProjectService, useClass: MockProjectService},
        {provide: ToastrService, useClass: MockTosterClass}
      ]
    });
    component = TestBed.inject(ProjectListComponent);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
class MockProjectService{
  resetForm(): void{

  }
}

class MockTosterClass {

}