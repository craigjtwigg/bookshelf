

//DOM VARIABLES

const bookListDiv = document.getElementById('books');
const newBookFormDiv = document.querySelector('.popdiv')
const addNewBookButton = document.getElementById('addbook');
const popUpForm = document.querySelector('.popform');
const whiteout = document.querySelector('.whiteout');
const closebutton = document.querySelector('.closeformbutton');
const submitButton = document.querySelector('#formsubmit');
const bookForm = document.querySelector('#addnewbook');
const resetButton = document.querySelector('#resetlibrary');

// EVENT LISTENERS

addNewBookButton.addEventListener('click', newBookForm);
window.addEventListener('keydown', keyboardSupport);
closebutton.addEventListener('click', closeBookForm);
bookForm.addEventListener('submit', submitBook);
resetButton.addEventListener('click', clearLibrary)


// KEYBOARD CONTROLS

function keyboardSupport(e){
    if(e.key === "Escape") closeBookForm();
    if(e.key === "+") newBookForm();
}

//BOOK CONSTRUCTOR

function Book(title, author, pages, completed) {
this.title = title
this.author = author
this.pages = pages
this.completed = completed
this.info = function() {
    return this.title + " by " + this.author + ", " + this.pages + " pages, " + this.completed + "."; 
}
}

//ALL OF THE BOOKS TO BE PUSHED TO THIS ARRAY

let myLibrary = [];
loadLibrary();
displayBooks(myLibrary);

//DUMMY BOOKS

//const book1 = new Book('A Clockwork Orange', 'Anthony Burgess', '192', 'not yet read');
//addBookToLibrary(book1);
//const book2 = new Book('The Shining', 'Stephen King', '659', 'not yet read')
//addBookToLibrary(book2);
//const book3 = new Book('Think Like A Programmer', 'V. Anton Spraul', '231', 'in process of reading')
//addBookToLibrary(book3);


// NEW BOOK FORM

function newBookForm(){
    bookForm.reset();
    newBookFormDiv.style.transform = "rotate(360deg)";
    newBookFormDiv.style.scale = "1";
    newBookFormDiv.style.opacity = "1";
    whiteout.style.opacity = "0.6";
    whiteout.style.scale = "1";
}

function closeBookForm(){
    newBookFormDiv.style.scale = "0";
    whiteout.style.scale = "0";
}

function submitBook(e){
    e.preventDefault();
    addBookToLibrary(formInput());
    closeBookForm();
}


function formInput(){
    const title = document.querySelector('#formtitle').value;
    const author = document.querySelector('#formauthor').value;
    const pages = document.querySelector('#formpages').value;
    const read = document.querySelector('#formread').checked;

    return new Book(title, author, pages, read);
}


// ADDING BOOKS TO ARRAY

function addBookToLibrary(book){
    myLibrary.push(book);
    console.table(myLibrary);
    resetDisplay();
    displayBooks(myLibrary);
    saveLibrary();
}

function displayBooks(arr){
        for (let i = 0; i < arr.length; i++){
            const card = document.createElement('div');
            const title = document.createElement('div');
            const author = document.createElement('div');
            const pages = document.createElement('div');
            const readbutton = document.createElement('button');
            const deletebook = document.createElement('button');
            
            bookListDiv.appendChild(card);
            card.classList.add('bookcard');

            title.textContent = `"${arr[i].title}"`;
            card.appendChild(title);
            title.classList.add('booktitle');

            author.textContent = `by ${arr[i].author}`;
            card.appendChild(author);
            author.classList.add('bookauthor');

            pages.textContent = `${arr[i].pages} pages`;
            card.appendChild(pages);
            pages.classList.add('bookpages')

            if (`${arr.read}`) {
                readbutton.textContent = "Read";
                readbutton.style.background = "yellowgreen";
            } else {
                readbutton.textContent = "Not Read";
                readbutton.style.background = "coral"
            }
            card.appendChild(readbutton);
            readbutton.classList.add('readbutton');

            deletebook.textContent = "Remove";
            card.appendChild(deletebook);
            deletebook.classList.add('deletebookbutton');
        }
    }

function resetDisplay(){
    bookListDiv.innerHTML= "";
}


//LOCAL STORAGE

 function saveLibrary(){
    localStorage.setItem('myLibrary', JSON.stringify(myLibrary));

 }

 function loadLibrary(){
    myLibrary = JSON.parse(localStorage.getItem('myLibrary'));
     if(myLibrary === null) myLibrary = [];
 }

 function clearLibrary(){
     localStorage.clear();
     resetDisplay();
 }

console.log(myLibrary);
displayBooks();