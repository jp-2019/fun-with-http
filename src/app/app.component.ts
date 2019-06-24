import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from "@angular/common/http";
import * as _ from 'lodash';
import { map } from 'rxjs/operators';

interface Course {
  description: string;
  courseListIcon: string;
  iconUrl: string;
  longDescription: string;
  url: string;
}

interface Color {
  results: string;
}

@Component({
  selector: 'app-root',
// this is the template for colors - won't work because not json file
//  template:`    <ul * ngIf="colors$ | async as colors else noData">
//          <li *ngFor="let color of colors">
//             {{color.results}}
//         </li> 
//     </ul>
//  < ng - template #noData > No Data Available < /ng-template>
//`
   template: `
      <ul *ngIf="courses$ | async as courses else noData">
          <li *ngFor="let course of courses">
  //            {{course.description}}
  //        </li> 
  //    </ul>
  //    <ng-template #noData>No Data Available</ng-template>
  //`
})
export class AppComponent implements OnInit {
  courses$: Observable<Course[]>;
  colors$: Observable<Color[]>;

  constructor(private http: HttpClient) {
  }

  ngOnInit() {
    this.getCourses();
  }
  // this is from angular university http example
  getCourses() {
    this.courses$ = this.http
      .get<Course[]>("https://angular-http-guide.firebaseio.com/courses.json").pipe(
        map(data => _.values(data)))
  }
  // this is from horse color api from Julia - won't work because the link is not to json file
  // getColors() {
  //  this.colors$ = this.http
  //    .get<Color[]>("http://avellinfalls.com/home/new_account_display_colors").pipe(
  //      map(data => _.values(data)))
  //  console.log('success');
  //}
}

