<template>
  <div class="container">

    <div class="row">
      <div class="col-sm-10">
        <h1>Books</h1>
        <hr><br>
        Sortieren
        <br>
        <div class="btn-group" role="group">
            <button @click="sortByTitle()" type="button" class="btn btn-primary">Titel</button>
            <button @click="sortByAuthor()" type="button" class="btn btn-danger btn-sm">Author</button>
        </div>
        <button @click="addBookSite" type="button" class="btn btn-light">Add Booksite</button>

        <br>
        
        <table class="table table-hover">
          <thead>
            <tr>
              <th scope="col">Titel</th>
              <th scope="col">Author</th>
              <th scope="col">Erscheinungsjahr</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(book, index) in books" :key="index">
              <td>{{ book.title }}</td>
              <td>{{ book.author }}</td>
              <td>{{ book.jahr }}</td>

              <td>
                <div class="btn-group" role="group">
                  <button @click="handleDeleteBook(book)" type="button" class="btn btn-danger btn-sm">Delete</button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>

  

</template>



<script lang="ts">
import axios, { AxiosResponse } from 'axios';

export default {
  data() {
    return {


      //test
      //activeAddBookModal: false,
      addBookForm: {
        title: '',
        author: '',
        jahr: "",
      },
      books: [],
      sortOrder: 'asc'
    };
  },

  //computed: {
  //  sortedBooks() {
  //    return this.books;
  //  }
  //},


  methods: {


    addBookSite() {
      this.$router.push('/books-eingabe');
    },


    
    //DELETE-Anfrage
    // auch wieder GET um Listenansicht zu aktualisieren
    handleDeleteBook(book) {
      this.removeBook(book.id);
    },
    removeBook(bookID) {
      const path = `http://localhost:5001/books/${bookID}`;
      axios.delete(path)
        .then(() => {
          this.getBooks();
          this.message = 'Book removed!';
          this.showMessage = true;
    })
    .catch((error) => {
      console.error(error);
      this.getBooks();
    });
    },

  //GET-Anfrage aufs Backend
    async getBooks() {
      const path = 'http://localhost:5001/books';
      try {
        const result: AxiosResponse = await axios.get(path);        //await, da auf Ergebnis gewartet
        this.books = result.data.books;
      } catch (error) {
        console.error(error);
      }
    },


    
    // Sortieren
    async sortByTitle() {
          const sortedBooks = await this.sortBooksBy('title');
          this.books = sortedBooks;
        },
      
    async sortByAuthor() {
      const sortedBooks = await this.sortBooksBy('author');
      this.books = sortedBooks;
    },

    async sortBooksBy(field) {
      try {
        const response = await axios.get(`http://localhost:5001/books`, {
          params: {
            sortBy: field,
            sortOrder: this.sortOrder
          }
        });
        return response.data.books;
      } catch (error) {
        console.error('Fehler beim Abrufen der Daten:', error);
        return [];
      }
    },
  },
  created() {                                  //beim erstellen wird getBooks aufgerufen
    this.getBooks();
  },
};
</script>












<!--
<script>
import axios from 'axios';

export default {
  data() {
    return {
      books: [],
    };
  },
  methods: {
    getBooks() {
      const path = 'http://localhost:5001/books';
      axios.get(path)
        .then((res) => {
          this.books = res.data.books;
        })
        .catch((error) => {
          console.error(error);
        });
    },
  },
  created() {
    this.getBooks();
  },
};
</script>




<script lang="ts">
import axios, { AxiosResponse } from 'axios';

export default {
  data() {
    return {
      books: [] as Book[],
    };
  },
  methods: {


    // POST-Anfrage aufs Backend
    addBook(payload) {
      const path = 'http://localhost:5001/books';
      axios.post(path, payload)
        .then(() => {
          this.getBooks();
        })
        .catch((error) => {

          console.log(error);
          this.getBooks();
        });
    },


    //get-Anfrage aufs Backend
    async getBooks() {
      const path = 'http://localhost:5001/books';
      try {
        const result: AxiosResponse = await axios.get(path);        //await, da auf Ergebnis gewartet
        this.books = result.data.books;
      } catch (error) {
        console.error(error);
      }
    },
  },
  created() {                                  //beim erstellen wird getBooks aufgerufen
    this.getBooks();
  },
};
</script>









-->


