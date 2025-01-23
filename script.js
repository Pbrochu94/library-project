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
        read: "Not read",
    },
    {
        name:"Lord of the rings",
        author:"J.R.R. Tolkien",
        pages: 900,
        read: "Not read",
    },
    {
        name:"Star wars",
        author:"George Lucas",
        pages: 120,
        read: "Not read",
    }
];
let bookInFront;
let readPrompt;

//good functions
const Book = function(name, author, pages){
    this.name = name;
    this.author= author;
    this.pages = pages;
    this.read = "not read";
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
    bookStorage.prepend(newBookTable)

    let newBookTableHead = document.createElement("thead");
    newBookTable.append(newBookTableHead);
    let tableHeadData = document.createElement("th");
    newBookTableHead.append(tableHeadData);
    tableHeadData.textContent = bookOfArray.name;


    let newBookTableBody = document.createElement("tbody");
    newBookTable.append(newBookTableBody);

    let newBookTableReadRow = document.createElement("tr")
    newBookTableBody.append(newBookTableReadRow)
    let newBookTableReadData = document.createElement("td")
    newBookTableReadRow.append(newBookTableReadData)
    newBookTableReadData.textContent = bookOfArray.read
    

    let newBookTableAuthorRow = document.createElement("tr");
    newBookTableBody.append(newBookTableAuthorRow)
    let newBookTableAuthorData = document.createElement("td")
    newBookTableAuthorRow.append(newBookTableAuthorData)
    newBookTableAuthorData.textContent = bookOfArray.author;


    let newBookTableFoot = document.createElement("tfoot");
    newBookTable.append(newBookTableFoot);
    let tableFootData = document.createElement("td");
    newBookTableFoot.append(tableFootData);
    tableFootData.textContent = bookOfArray.pages;

    newBookTable.classList.add("book-card")
    
    //add the click event listener
    newBookTable.addEventListener("click", function(){
        if(bookInFront)//if a book is already in focus
        {
            bookStorage.lastChild.remove();
        }
        focusBook(bookOfArray)
        bookInFront = bookOfArray;        
    })
}

function focusBook(bookTable){
    let newDiv = document.createElement("div")

    let closingSymbolWrapper = document.createElement("div")
    closingSymbolWrapper.classList.add("closing-section")
    closingSymbolWrapper.addEventListener("click", function(){
        newDiv.remove()
        bookInFront = 0;
    })
    let xImage = document.createElement("img")
    xImage.setAttribute("src", "img/x-icon.png")
    closingSymbolWrapper.append(xImage)


    let divTitle = document.createElement("h1");
    divTitle.textContent = bookTable.name;

    let divAuthor = document.createElement("h2");
    divAuthor.textContent = bookTable.author;

    let divRead = document.createElement("div");
    divRead.classList.add("read-button-wrapper")
    let divReadButton1 = document.createElement("button");
    divReadButton1.textContent = "Not read"
    divReadButton1.classList.add("read-toggle", "not-read-prompt")
    let divReadButton2 = document.createElement("button");
    divReadButton2.textContent = "Read"
    divReadButton2.classList.add("read-toggle", "read-prompt")
    divRead.append(divReadButton1)
    divRead.append(divReadButton2)
    
    let deleteButtonWrapper = document.createElement("div")
    deleteButtonWrapper.classList.add("delete-button-wrapper")
    let deleteButton = document.createElement("button")
    deleteButton.classList.add("delete-button")
    deleteButton.textContent = "Delete book from library"
    deleteButtonWrapper.append(deleteButton)

    let divPages = document.createElement("p");
    divPages.textContent = bookTable.pages;

    newDiv.classList.add("front-card");

    bookStorage.append(newDiv);
    newDiv.append(closingSymbolWrapper);
    newDiv.append(divTitle);
    newDiv.append(divAuthor);
    newDiv.append(divRead);
    newDiv.append(deleteButtonWrapper);
    newDiv.append(divPages);

    addReadButtonsEvent()
}

function addReadButtonsEvent(){
    let readyPromptButtons = document.querySelectorAll(".read-toggle")
    let readyButtonQuery = document.querySelector(".read-prompt")
    let notReadyButtonQuery = document.querySelector(".not-read-prompt")
    readyPromptButtons.forEach(function(object){
        object.addEventListener("click", function(){
            if(this.classList.contains("not-read-prompt")){
                readPrompt = false;
            }
            else if(this.classList.contains("read-prompt")){
                readPrompt = true;
            }
            if(readPrompt){
                notReadyButtonQuery.style.backgroundColor = "rgb(168, 138, 117)"
                readyButtonQuery.style.backgroundColor = "green"
            }
            else if(!readPrompt){
                notReadyButtonQuery.style.backgroundColor = "red"
                readyButtonQuery.style.backgroundColor = "rgb(168, 138, 117)"
            }
        })
    })
}