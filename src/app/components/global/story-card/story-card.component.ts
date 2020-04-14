import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'story-card',
  templateUrl: './story-card.component.html',
  styleUrls: ['./story-card.component.scss']
})
export class StoryCardComponent implements OnInit {
  @Input()
  story: any;

  constructor() { }

  ngOnInit(): void {
  }

}
