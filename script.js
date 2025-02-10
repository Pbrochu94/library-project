//constructors
class book{
    constructor(name, author, pages){
        this.name = name;
        this.author= author;
        this.pages = pages;
        this.read = "Not read";
    }
        static library = [
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
        static storage = document.querySelector(".inner-wrapper")
        static addButton = document.querySelector(".add-section")
        static submitForm = document.querySelector("form")
        static bookInFront;
        static readPrompt;
        static bookid = -1;
        static submitButton = document.querySelector(`input[type="submit"]`)
        static addBookCloseButton = document.querySelector(".close-form")

        static addEvent(){
            this.addButton.addEventListener("click", function(){
                book.submitForm.classList.remove("hidden");
                book.addBookCloseButton.addEventListener("click", function(){
                    book.submitForm.classList.add("hidden");
                    book.submitForm.reset();
                })
                book.submitButton.addEventListener("click", book.submit)
            })
        }
        static createBookTemplate(bookOfArray)
        {
            let newBookTable = document.createElement("table");
            newBookTable.dataset.id = book.library.indexOf(bookOfArray);
            bookOfArray.id =  newBookTable.dataset.id
            book.storage.prepend(newBookTable)
            
        
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
                if(book.bookInFront)//if a book is already in focus
                {
                    book.storage.lastChild.remove();
                }
                book.focusBook(bookOfArray)
                book.bookInFront = bookOfArray;        
            })
        }
        static closeAddingWindow(){
            book.submitForm.reset();
            book.submitForm.classList.toggle("hidden");
        }
        static submit(){
            event.preventDefault();
            book.submitForm.classList.add("hidden");
            let bookNameField = document.querySelector(`input[name="title"]`)
            let bookAuthorField = document.querySelector(`input[name="author"]`)
            let bookPageField = document.querySelector(`input[type="number"]`)
            let newBook = {
                name: bookNameField.value,
                author: bookAuthorField.value,
                pages: bookPageField.value,
                read:"Not read",
            }
            book.library.push(newBook)
            newBook.id = book.library.indexOf(newBook)
            book.submitForm.reset();
            book.createBookTemplate(newBook)
        }
        static focusBook(bookTable){
            let newDiv = document.createElement("div")
            newDiv.dataset.id = bookTable.id
        
            let closingSymbolWrapper = document.createElement("div")
            closingSymbolWrapper.classList.add("closing-section")
            closingSymbolWrapper.addEventListener("click", function(){
                newDiv.remove()
                book.bookInFront = 0;
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
        
            deleteButton.addEventListener("click", function(){
                book.deleteBook(newDiv, book.bookInFront)    
            })
            deleteButton.textContent = "Delete book from library"
            deleteButtonWrapper.append(deleteButton)
        
            let divPages = document.createElement("p");
            divPages.textContent = bookTable.pages;
        
            newDiv.classList.add("front-card");
        
            book.storage.append(newDiv);
            newDiv.append(closingSymbolWrapper);
            newDiv.append(divTitle);
            newDiv.append(divAuthor);
            newDiv.append(divRead);
            newDiv.append(deleteButtonWrapper);
            newDiv.append(divPages);
        
            book.addReadButtonsEvent(newDiv)
        }
        static addReadButtonsEvent(frontBook){
            let readyPromptButtons = document.querySelectorAll(".read-toggle")
            let readyButtonQuery = document.querySelector(".read-prompt")
            let notReadyButtonQuery = document.querySelector(".not-read-prompt")
            readyPromptButtons.forEach(function(object){
                object.addEventListener("click", function(){
                    if(this.classList.contains("not-read-prompt")){
                        book.readPrompt = false;
                        book.library[frontBook.dataset.id].read = "Not read"
                        let backBook = document.querySelector(`table[data-id="${frontBook.dataset.id}"]>tbody>tr:first-child>td`)
                        backBook.textContent = "Not read"
                        backBook.style.color = "red"
                    }
                    else if(this.classList.contains("read-prompt")){
                        book.readPrompt = true;
                        book.library[frontBook.dataset.id].read = "Read"
                        let backBook = document.querySelector(`table[data-id="${frontBook.dataset.id}"]>tbody>tr:first-child>td`)
                        backBook.textContent = "Read"
                        backBook.style.color = "green"
                    }
                    if(book.readPrompt){
                        notReadyButtonQuery.style.backgroundColor = "rgb(168, 138, 117)"
                        readyButtonQuery.style.backgroundColor = "green"
                    }
                    else if(!book.readPrompt){
                        notReadyButtonQuery.style.backgroundColor = "red"
                        readyButtonQuery.style.backgroundColor = "rgb(168, 138, 117)"
                    }
                })
            })
        }
        static addReadButtonsEvent(frontBook){
            let readyPromptButtons = document.querySelectorAll(".read-toggle")
            let readyButtonQuery = document.querySelector(".read-prompt")
            let notReadyButtonQuery = document.querySelector(".not-read-prompt")
            readyPromptButtons.forEach(function(object){
                object.addEventListener("click", function(){
                    if(this.classList.contains("not-read-prompt")){
                        book.readPrompt = false;
                        book.library[frontBook.dataset.id].read = "Not read"
                        let backBook = document.querySelector(`table[data-id="${frontBook.dataset.id}"]>tbody>tr:first-child>td`)
                        backBook.textContent = "Not read"
                        backBook.style.color = "red"
                    }
                    else if(this.classList.contains("read-prompt")){
                        book.readPrompt = true;
                        book.library[frontBook.dataset.id].read = "Read"
                        let backBook = document.querySelector(`table[data-id="${frontBook.dataset.id}"]>tbody>tr:first-child>td`)
                        backBook.textContent = "Read"
                        backBook.style.color = "green"
                    }
                    if(book.readPrompt){
                        notReadyButtonQuery.style.backgroundColor = "rgb(168, 138, 117)"
                        readyButtonQuery.style.backgroundColor = "green"
                    }
                    else if(!book.readPrompt){
                        notReadyButtonQuery.style.backgroundColor = "red"
                        readyButtonQuery.style.backgroundColor = "rgb(168, 138, 117)"
                    }
                })
            })
        }
        static deleteBook(frontBookToDelete){
            book.bookInFront = 0;
            let bookOnShelfToDelete = document.querySelector(`table[data-id="${frontBookToDelete.dataset.id}"]`);
            book.library.splice(frontBookToDelete.dataset.id, 1); 
            bookOnShelfToDelete.remove()
            frontBookToDelete.remove()
        }
        static initializeTemplateBooks(){
            for(let currentBook of book.library)//loop to create template books
            {
                book.createBookTemplate(currentBook)
            }
        }
}

book.addEvent()

book.initializeTemplateBooks()   