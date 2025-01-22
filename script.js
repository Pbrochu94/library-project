let bookStorage = document.querySelector(".innerWrapper")

const library= [];

//3 testing books
for(let i = 0;i < 5;i++){
    let newBook = {
        name: `book${i}`,
        author: `Author${i}`,
        pages: Math.round(Math.random()* 1000),
    }
    library.push(newBook)
}

let eachBook = document.querySelectorAll(".book-card")
eachBook.forEach(function(bookCard){
    bookCard.addEventListener("click", function(){
        this.style.backgroundColor = "red";
    })
})

//good functions
const Book = function(name, author, pages){
    this.name = name;
    this.author= author;
    this.pages = pages;
}



function addBookToLibrary(library){
    let newBook = {
        name: prompt("name of the book"),
        author: prompt("name of the author"),
        pages: prompt("number of pages"),
    }
    library.push(newBook)
}