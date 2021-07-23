import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-video',
  template: `
    <h2 class="container text-center mt-5">
      Video id: {{ id }}
    </h2>
  `,
})
export class VideoComponent implements OnInit {
  id: string;
  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
  }

}
