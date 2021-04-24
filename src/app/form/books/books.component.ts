import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GeneralService } from '../general.service';

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.css']
})
export class BooksComponent implements OnInit {

  category: string = "";
  allBooks: Object;
  books: {
    bookTitle: string;
    bookPic: string,
    bookAuthur: string,
    link: string
  }[] = []
  loader: boolean = true;
  blnError: boolean = false;
  strMessage: string = "";
  searchData: Object;

  constructor(private generalService: GeneralService, private router: Router) { }

  ngOnInit(): void {
    this.category = history.state['category'];

    if (this.category != undefined && this.category != null && this.category != "") {
      this.getBooks(this.category);
    }
    else {
      this.category = "Books"
      this.getBooks("")
    }
  }


  getBooks(category) {
    let param = "books?topic={0}";
    param = param.replace('{0}', category);


    this.generalService.getSearchResult(param).subscribe(data => {
      if (data != undefined && data != null && data != "") {
        this.books = [];
        this.loader = false;
        this.getFilterbooks(data);

        console.log(data['results'].length);
      }

    },
      err => {
        console.log(err);        
        this.loader = false;
        this.blnError = true;
        this.strMessage = "Some error occured!!";
      })
  }

  getFilterbooks(books) {

    this.allBooks = books;
    for (let book of this.allBooks['results']) {
      let bookTitle
      let imageObj = ""
      let AutObject=''
      let links = ""

      if (book['title'] != undefined && book['title'] != null && book['title'] != "") {
        bookTitle = book['title'];
      }


      if (book['formats']['image/jpeg'] != undefined && book['formats']['image/jpeg'] != null && book['formats']['image/jpeg'] != '') {
        imageObj = book['formats']['image/jpeg'];
      }
      else {
        imageObj = "/assets/images/emptyBook.jpg"
      }


      if (book['authors'] != undefined && book['authors'] != null && book['authors'].length != 0) {
        AutObject = book['authors'][0]['name'];
      }


      if (book['formats'] != undefined && book['formats'] != null && book['formats'].length != 0) {
        let HTMLkeyName = ""
        let HTMLblnExtension
        //HTML
        HTMLkeyName = Object.keys(book['formats']).filter(x => x.includes('text/html'))[0];
        if (HTMLkeyName != undefined && HTMLkeyName != "") {
          HTMLblnExtension = book['formats'][HTMLkeyName].includes('.htm');
        }


        //PDF
        let PDFkeyName = ""
        let PDFblnExtension

        PDFkeyName = Object.keys(book['formats']).filter(x => x.includes('text/pdf'))[0];
        if (PDFkeyName != undefined && PDFkeyName != "") {
          PDFblnExtension = book['formats'][PDFkeyName].includes('.pdf');
        }

        //TXT
        let TXTkeyName = ""
        let TXTblnExtension

        TXTkeyName = Object.keys(book['formats']).filter(x => x.includes('text/plain'))[0];


        if (TXTkeyName != undefined && TXTkeyName != null && TXTkeyName != "") {
          TXTblnExtension = book['formats'][TXTkeyName].includes('.txt');
        }


        if (HTMLblnExtension) {
          links = book['formats'][HTMLkeyName];
        }
        else if (PDFblnExtension) {
          links = book['formats'][PDFkeyName];
        }
        else if (TXTblnExtension) {
          links = book['formats'][PDFkeyName];
        }
        else {
          links = "alert"
        }
      }
      this.books.push({
        bookTitle: bookTitle,
        bookPic: imageObj,
        bookAuthur: AutObject,
        link: links
      })
      this.loader = false;
    }
  }

  back() {
    this.router.navigate(['/'])
  }

  search(event) {
    let searchkeyword = "";

    searchkeyword = event.target.value;
    let encodedvalue = ""

    encodedvalue = encodeURIComponent(searchkeyword);
    let param = "books?topic={0}&search={1}";
    param = param.replace('{0}', this.category).replace('{1}', encodedvalue);

    this.loader = true;
    this.generalService.getSearchResult(param).subscribe(data => {
      if (data != undefined && data != null && data != "") {
        if (data['results'] != undefined && data['results'] != null && data['results'].length != 0) {
          this.searchData = data;
          this.books = [];
          this.getFilterbooks(data);
        }
        else {
          this.blnError = true;
          this.strMessage = "No Match Found!!!"
        }
      }
    },
    err=>{
      console.log(err);      
      this.blnError = true;
      this.strMessage = "No Match Found!!!"
    })
  }

  bookDetails(link) {
    if (link == "alert") {
      alert("No viewable version available");
    }
    else {
      window.open(link, "_blank")
    }
  }

  onScroll() {
    this.getFilterbooks(this.allBooks)

  }
}
