import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'author-card',
  templateUrl: './author-card.component.html',
  styleUrls: ['./author-card.component.scss']
})
export class AuthorCardComponent implements OnInit {

  @Input()
  card;

  constructor() { }

  ngOnInit(): void {
  }

}
