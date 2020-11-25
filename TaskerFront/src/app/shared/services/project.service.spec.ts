import { HttpClient } from '@angular/common/http';
import { ProjectService } from './project.service';
import { autoSpy } from 'auto-spy';
import { of } from 'rxjs';
import { ProjectDetail } from '../models/project-detail.models';

describe('ProjectService', () => {
  it('when post is called it should', () => {
    // arrange
    const { build, http } = setup().default();
    const p = build();
    http.post.and.returnValue(of({}))
    // act
    let result = p.post();
    // assert
    expect(result).toBeTruthy()
  });
  it('when put is called it should', () => {
    // arrange
    const { build } = setup().default();
    const p = build();
    p.formData = {
      ProjectId: 0,
      Date: null,
      Title: "",
      Description: null
    }
    // act
    let result = p.put();
    // assert
    expect(result).toBeUndefined();
  });
  it('when delete is called it should', () => {
    // arrange
    const { build } = setup().default();
    const p = build();
    // act
    let result = p.delete(0);
    // assert
    expect(result).toBeUndefined()
  });
  it('when get is called it should resolve promise', () => {
    // arrange
    const { build, http } = setup().default();
    const p = build()

    http.get.and.returnValues(of())
    // act
    let result = p.get();
    // assert
    expect(result).toBeTruthy();
  });
  it('when edit is called it should edit formdata', () => {
    // arrange
    const { build } = setup().default();
    const p = build();
    const data = {
      ProjectId: 0,
      Date: null,
      Title: "",
      Description: null
    }
    // act
    p.edit(data, true);
    // assert
    expect(p.formData).toEqual(data)
  });

  it('when edit is called it should reset', () => {
    // arrange
    const { build } = setup().default();
    const p = build();
    const data = {
      ProjectId: 0,
      Date: null,
      Title: "",
      Description: null
    }
    // act
    p.edit(data, false);
    let expectedResult = {
      ProjectId: 0,
      Date: null,
      Title: "",
      Description: null
    }
    // assert
    expect(p.formData).toEqual(expectedResult)
  });

  it('when resetForm is called it should', () => {
    // arrange
    const { build } = setup().default();
    const p = build();
    // act
    p.resetForm();
    // assert
    expect(p.formData.ProjectId).toEqual(0)
  });
  it('when sort is called it should', () => {
    // arrange
    const { build } = setup().default();
    const p = build();
    let list=[new ProjectDetail(), new ProjectDetail()]
    p.list = list
    // act
    p.sort();
    // assert
    expect(p.list).toBe(list)
  });

  //  SITUOS RASAU PATS 
  it('when sort is called shoul return same list', () => {
    const { build } = setup().default();
    const p = build();

   const list  = [{ProjectId: 1, Date: new Date("2019-01-16"), Title: '', Description: '' }, 
    {ProjectId: 1, Date: new Date("2020-01-16"), Title: '', Description: '' }, 
    {ProjectId: 1, Date: new Date("2021-01-16"), Title: '', Description: '' }]

    p.list = list
    p.sort();

    expect(p.list).toBe(list)
  })
  
});

function setup() {
  const http = autoSpy(HttpClient);
  const builder = {
    http,
    default() {
      return builder;
    },
    build() {
      return new ProjectService(http);
    }
  };

  return builder;
}
