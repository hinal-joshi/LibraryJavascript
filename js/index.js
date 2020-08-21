//constructor
function Book(name, author, type) {
    this.name = name;
    this.author = author;
    this.type = type;
}

//Display Constructor
function Display() {

}

//Add methods to display prototype
Display.prototype.add = function (book) {
    let tableBody = document.getElementById('tableBody');
    let uiString = `<tr>
                    <td>${book.name}</td>
                    <td>${book.author}</td>
                    <td>${book.type}</td>
                    </tr>`;
    tableBody.innerHTML += uiString;
}
//Implementing clear function
Display.prototype.clear = function () {
    let libraryForm = document.getElementById('libraryForm');
    libraryForm.reset();
}

//Implementing validate function
Display.prototype.validate = function (book) {
    if (book.name.length < 2 || book.author.length < 2) {
        return false;
    }
    else {
        return true;
    }
}

Display.prototype.show = function (type,showmessage) {
    let message = document.getElementById('message');
    let boldText;
    if(type=='success'){
        boldText = 'Success';
    }
    else{
        boldText = 'Error';
    }
    message.innerHTML = `<div class="alert alert-${type} alert-warning alert-dismissible fade show" role="alert">
                        <strong>${boldText}: </strong> ${showmessage}
                        <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                        </button>
                        </div>`;
    setTimeout(function(){
        message.innerHTML = '';
    },2000)
}

//Add submit event listener to form
let libraryForm = document.getElementById('libraryForm');
libraryForm.addEventListener('submit', libraryFormSubmit);

function libraryFormSubmit(e) {
    console.log('You have submitted the form');
    let name = document.getElementById('bookName').value;
    let author = document.getElementById('author').value;
    let fiction = document.getElementById('fiction');
    let motivational = document.getElementById('motivational');
    let classic = document.getElementById('classic');
    let type

    if (fiction.checked) {
        type = fiction.value;
    }
    else if (motivational.checked) {
        type = motivational.value;
    }
    else {
        type = classic.value;
    }

    let book = new Book(name, author, type);

    console.log(book);

    let display = new Display();
    if (display.validate(book)) {
        display.add(book);
        display.clear();
        display.show('success','Your book has been added successfully');
    }
    else {
        //show error to the user
        display.show('danger','You need to fill the details to add the book');
    }


    e.preventDefault();
}