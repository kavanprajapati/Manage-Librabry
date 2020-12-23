console.log("yes")

//Constructor
function Book(name, author, type) {
    this.name = name;
    this.author = author;
    this.type = type;
}

// Display constructor
function Display() {

}

//Add methods to display prototype
Display.prototype.add = function (book) {
    let tableBody = document.getElementById("tableBody");

    let uiString = `<tr>
                        <td>${book.name}</td>
                        <td>${book.author}</td>
                        <td>${book.type}</td>
                    </tr> `;

    tableBody.innerHTML += uiString;

    console.log("adding to UI");
}

// Implement the clear function
Display.prototype.clear = function () {
    let libraryForm = document.getElementById("libraryForm");
    libraryForm.reset();
}

// Implement the validate function
Display.prototype.validate = function (book) {

    if (book.name.length < 2 || book.author.length < 2) {
        return false;
    }
    else {
        return true;
    }
}

//Implement display success/errors message function
Display.prototype.show = function (type, msg) {
    let message = document.getElementById("message");
    let boldTxt;
    if (type === "success") {
        boldTxt = `<b>Success</b>`;
    }
    else {
        boldTxt = `<b>Error</b>`;
    }
    message.innerHTML = `<div class="alert alert-${type} alert-dismissible fade show" role="alert">
                                <strong>${boldTxt}!</strong> ${msg}
                                <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                         </div>`;

    setTimeout(function () {
        message.innerHTML = '';
    }, 2000);
}




//Add submit event listner to libraryForm

let libraryForm = document.getElementById("libraryForm");
libraryForm.addEventListener("submit", libraryFormSubmit);

function libraryFormSubmit(e) {
    let name = document.getElementById("bookName").value;
    let author = document.getElementById("author").value;

    let fiction = document.getElementById("fiction");
    let programming = document.getElementById("programming");
    let cooking = document.getElementById("cooking");

    let type;

    if (fiction.checked) {
        type = fiction.value;
    } else if (programming.checked) {
        type = programming.value;
    } else {
        type = cooking.value;
    }

    let book = new Book(name, author, type);
    let display = new Display();

    if (display.validate(book)) {
        display.add(book);
        display.clear();
        display.show("success", "Your back has been successfully added!");
    }
    else {
        //show error to the user
        display.show("danger", "Sorry, you can not add book!");
    }

    console.log(book);
    e.preventDefault();
}