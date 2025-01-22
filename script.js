let bookStorage = document.querySelector(".innerWrapper")

const library= [
    {
        name:"Harry Potter",
        author:"JK rowling",
        pages: 500,
    },
    {
        name:"Lord of the rings",
        author:"J.R.R. Tolkien",
        pages: 900,
    },
    {
        name:"Star wars",
        author:"George Lucas",
        pages: 120,
    }
];


let eachBook = document.querySelectorAll(".book-card");
let bookInFront;
//apply click event listener to each book of the array
eachBook.forEach(function(bookCard){
    console.log(bookCard)
    bookCard.addEventListener("click", function(){
        if(bookCard.classList.contains("add-section"))
        {
            addBookToLibrary(library);
        }
        else if(bookInFront)//if a book is already in focus
        {
            bookInFront.classList.remove("front-card")
            this.classList.add("front-card");
            bookInFront = this;
        }
        else{
            this.classList.add("front-card");
            bookInFront = this;
        }

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