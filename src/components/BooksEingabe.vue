<template>


  <div class="container">


    <div v-if="validationError" class="alert alert-danger" role="alert">
      {{ validationError }}
    </div>

    <div class="row">
      <div class="col-sm-10">
        <h1>Books</h1>

        <hr>
        
        <button @click="backSite" type="button" class="btn btn-light">Back</button>
        
        <br><br>

        <button @click="addBook()" type="button" class="btn btn-success btn-sm">Add Book</button>

        <input type="text" placeholder="Titel" v-model="addBookForm.title">
        <input type="text" placeholder="Author" v-model="addBookForm.author">
        <input type="string" placeholder="Erscheinungsjahr" v-model="addBookForm.jahr">

      </div>
    </div>
  </div>

</template>



<script lang="ts">
import axios, { AxiosResponse } from 'axios';

export default {
  data() {
    return {
      addBookForm: {
        title: '',
        author: '',
        jahr: "",
      },
      books: [],
      validationError: '',
    };
  },
  methods: {

    backSite() {
      this.$router.push('/books');
    },



    //Frontend-Validierung
    validateInput() {
      console.log(this.addBookForm.jahr);
      if (!this.addBookForm.title || !this.addBookForm.author || !this.addBookForm.jahr) {
        this.validationError = 'Bitte füllen Sie alle Felder aus.';
        return false;
      }
      
      const yearRegex = /\b\d{4}\b/; // Gültiges Jahr: Vier aufeinanderfolgende Ziffern, umgeben von Wortgrenzen
      if (!yearRegex.test(this.addBookForm.jahr)) {
        this.validationError = 'Bitte geben Sie ein gültiges Erscheinungsjahr ein.';
        return false;
      }

      this.validationError = ''; 
      return true;
    },

  

    // POST-Anfrage aufs Backend
    // also Buch hinzufügen, innerhalb GET um Listenansicht zu erneuern
    addBook() {


      // Eingabe validieren 
      if (!this.validateInput()) {
        return; // Beende falls ungültige Eingabe
      }
      // Eingabe validieren 


      const payload = {
        title: this.addBookForm.title,
        author: this.addBookForm.author,
        jahr: this.addBookForm.jahr
      };
      


      const path = 'http://localhost:5001/books';
      axios.post(path, payload)
        .then(() => {
          this.getBooks();
          this.$router.push('/books');  //falls erfolgreich, so gehe zurück!
        })
        .catch((error) => {
          console.log(error);
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
  },


  created() {                                  //beim erstellen wird getBooks aufgerufen
    this.getBooks();
  },
};
</script>















