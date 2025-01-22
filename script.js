const bookStorage = document.querySelector(".inner-wrapper")
const addButton = document.querySelector(".add-section")
addButton.addEventListener("click", function(){
    createNewBook(library)
})
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
let bookInFront;

//good functions
const Book = function(name, author, pages){
    this.name = name;
    this.author= author;
    this.pages = pages;
}

for(let book of library)//loop to create template books
{
    createBookElement(book)
}

function createNewBook(library){
    let newBook = {
        name: prompt("name of the book"),
        author: prompt("name of the author"),
        pages: prompt("number of pages"),
    }
    library.push(newBook)
    createBookElement(newBook)
}

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
    //add the click event listener
    newBookTable.addEventListener("click", function(){
        if(bookInFront)//if a book is already in focus
        {
            //bookInFront.classList.remove("front-card")
            //this.classList.add("front-card");
            //bookInFront = this;
        }
        else{
            focusBook(bookOfArray)
        }
    })
}

function focusBook(bookTable){
    console.log(bookTable)
    let newDiv = document.createElement("div")

    let divTitle = document.createElement("h1");
    divTitle.textContent = bookTable.name;

    let divAuthor = document.createElement("h2");
    divAuthor.textContent = bookTable.author;

    let divPages = document.createElement("p");
    divPages.textContent = bookTable.pages;

    newDiv.classList.add("front-card");

    bookStorage.append(newDiv);
    newDiv.append(divTitle);
    newDiv.append(divAuthor);
    newDiv.append(divPages);
}
