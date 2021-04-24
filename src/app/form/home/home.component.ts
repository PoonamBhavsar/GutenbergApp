import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GeneralService } from '../general.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  genere: object = [];
  blnBook: boolean = false;
  category: string = ""

  constructor(private generalService: GeneralService, private router: Router) { }

  ngOnInit(): void {
    this.getGenere();
  }

  getGenere() {
    this.generalService.getGenere().subscribe(data => {
      console.log(data);
      this.genere = data;

    })
  }

  selectedGenere(gener) {
    console.log("on click");
    console.log(gener);
    this.blnBook = true;
    this.category = gener;

    this.router.navigate(["/books"], { state: { category: this.category } })

  }

}
