import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModelData } from 'src/app/models/data.model';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-homepage',
  template: `
    <h1 class="text-center mb-5">Proto</h1>
    <div class="mx-auto container-fluid text-center">
      <select #orderBy class="form-select"style="max-width: 300px" (change)="orderVids(orderBy.value)">
        <option value="newest">Newest</option>
        <option value="oldest">Oldest</option>
      </select>
    </div>
    <div class="mx-auto container-fluid d-inline-flex flex-wrap justify-content-around">
      <div class="item rounded m-3" *ngFor="let res of dataForPage" (click)="goToVid(res.id)">
        <h5 class="thumbnailText title card-title position-absolute text-white p-2">{{ res.title }}</h5>
        <p class="thumbnailText desc card-text position-absolute text-white p-3" hidden="true">{{ res.description }}</p>
        <div *ngFor="let img of res?.images" [class]="img?.type" style="background: url({{ img?.url }})"></div>
        <h5 class="duration card-body text-white"><span class="px-1 pb-1" style="background-color: black; opacity: 0.7;">{{ res.duration }}</span></h5>
      </div>
    </div>
  `,
  styles: [`
    .item {
      width: 350px; 
      height: 195px;
    }
    .item:hover .title {
      display: none;
    }
    .item:hover .desc {
      display: block !important;
      pointer-events: none
    }
    .thumbnailText {
      max-width: 325px; 
      font-size: 15px
    }
    .thumbnail {
      box-shadow: inset 0px 40px 40px rgba(0,0,0,0.9);
      background-repeat: no-repeat !important;
      background-size: 100% !important;
      width: 100%;
      height: 100%;
    }
    .thumbnail:hover {
      animation-name: shadowDrop;
      animation-duration: 1s;
      box-shadow: inset 0px 120px 40px rgba(0,0,0,0.9);
      cursor: pointer;
    }
    .duration {
      position: relative;
      top: -50px;
      float: right;
    }
    @media (max-width: 430px) {
      .thumbnail {
        display: none;
      }
      .packshot {
        box-shadow: inset 0px 40px 40px rgba(0,0,0,0.9);
        background-repeat: no-repeat !important;
        background-size: 100% !important;
        width: 100%;
        height: 100%;
      }
      .item {
        height: 27vh;
      }
    }
    @keyframes shadowDrop {
      from {box-shadow: inset 0px 40px 40px rgba(0,0,0,0.9)}
      to {box-shadow: inset 0px 120px 40px rgba(0,0,0,0.9)}
    }
  `]
})
export class HomepageComponent implements OnInit {
  dataForPage: ModelData[];

  constructor(private dataService: DataService, private router: Router) { }

  ngOnInit(): void {
    this.dataService.getData().subscribe((data) => {
      if (data != null) {
        this.dataForPage = data.slice(0, 4);
      }
    })
  }

  goToVid(id: number) {
    this.router.navigate(['/video/' + id]);;
  }

  orderVids(orderBy) {
    console.log(orderBy);
    switch (orderBy) {
      case "newest": 
        this.dataForPage.sort((a, b) => new Date(b.releaseDate).getTime() - new Date(a.releaseDate).getTime());
        break;
      case "oldest":
        this.dataForPage.sort((a, b) => new Date(a.releaseDate).getTime() - new Date(b.releaseDate).getTime());
        break;
      default:
        this.dataForPage.sort((a, b) => new Date(b.releaseDate).getTime() - new Date(a.releaseDate).getTime());
        break;
    }
  }
}
