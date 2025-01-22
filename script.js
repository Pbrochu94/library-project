const bookStorage = document.querySelector(".inner-wrapper")
console.log(bookStorage)

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

createBookElement(library[0], bookStorage)

function createBookElement(bookOfArray)
{
    let newBookTable = document.createElement("table");

    let newBookTableHead = document.createElement("thead");
    newBookTable.append(newBookTableHead);
    let tableHeadData = document.createElement("th");
    newBookTableHead.append(tableHeadData);
    tableHeadData.textContent = bookOfArray.name;


    let newBookTableBody = document.createElement("tbody");
    newBookTable.append(newBookTableBody);
    let tableBodyData = document.createElement("td");
    newBookTableBody.append(tableBodyData);
    tableBodyData.textContent = bookOfArray.author;


    let newBookTableFoot = document.createElement("tfoot");
    newBookTable.append(newBookTableFoot);
    let tableFootData = document.createElement("td");
    newBookTableFoot.append(tableFootData);
    tableFootData.textContent = bookOfArray.pages;

    newBookTable.classList.add("book-card")
    bookStorage.prepend(newBookTable)
}

function addBookToLibrary(library){
    let newBook = {
        name: prompt("name of the book"),
        author: prompt("name of the author"),
        pages: prompt("number of pages"),
    }
    library.push(newBook)
    createBookElement(newBook)
}