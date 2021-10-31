import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Book } from '../models/book.model';
import * as firebase from 'firebase/database'

@Injectable({
  providedIn: 'root'
})
export class BooksService {

  books: Book[] = [];
  bookSubject = new Subject<Book[]>();
  dataBase = firebase.getDatabase();
  


  constructor() { }

  emitBooks() {
    this.bookSubject.next(this.books);
  }

  saveBooks() {
    console.log('sauvegarde nouveau livre');
    
    const bookDB = firebase.ref(this.dataBase, '/books');
    firebase.set(bookDB, this.books).catch(
      (error) => {
        console.error(error);
        
      }
    )
  }

  getBooks() {
    const bookDB = firebase.ref(this.dataBase, '/books');
    firebase.onValue(bookDB, (data) => {
      this.books = data.val() ? data.val():[];
      this.emitBooks();
    });
  }

  getSingleBook(id:number) {
    console.log("je suis dans la methode de chargement du single book");
    
    const bookDB = firebase.ref(this.dataBase, '/books' + id);
//    firebase.get(bookDB).then( 
//      (data) => {
//        if (data) {
//          console.log(data)
//        } else {
//          console.log('no data available')
//        }
//      }
//    ).catch( (error) => {
//      console.error(error);
//    })
    return new Promise(
      (resolve, reject) => {
        firebase.onValue(bookDB, 
          (data) => {
          resolve(data.val);
          }, 
          (error) => {
          reject(error);
          }
        )
      }
    );
  }    

  createNewBook(bookToCreate:Book) {
    this.books.push(bookToCreate);
    this.saveBooks();
    this.emitBooks();
  }

  removeBook(bookToRemove:Book) {
    const indexBookToRemove = this.books.findIndex((bookElement) => {
        if (bookElement === bookToRemove) {
           true;
        }
      });

    if(indexBookToRemove) {
      this.books.splice(indexBookToRemove, 1);
      this.saveBooks();
      this.emitBooks();
    }
  }
}
