console.log("this is es6 version of project");
showBooks()
class Book {
    constructor(name, author, type) {
        this.name = name;
        this.author = author;
        this.type = type;
    }
}

class Display {
    add(book) {

        let bookData = localStorage.getItem("bookData");

        let bookObj;
        if (bookData == null) {
            bookObj = [];
        } else {
            bookObj = JSON.parse(bookData);
        }

        let myObj = {
            name: book.name,
            author: book.author,
            type: book.type
        }

        bookObj.push(myObj);

        localStorage.setItem("bookData", JSON.stringify(bookObj));

        showBooks()
        // let tableBody = document.getElementById("tableBody");

        // let uiString = `<tr>
        //                     <td>${book.name}</td>
        //                     <td>${book.author}</td>
        //                     <td>${book.type}</td>
        //                 </tr> `;

        // tableBody.innerHTML += uiString;

        console.log("adding to UI");
    }

    clear() {
        let libraryForm = document.getElementById("libraryForm");
        libraryForm.reset();
    }

    validate(book) {

        if (book.name.length < 2 || book.author.length < 2) {
            return false;
        }
        else {
            return true;
        }
    }

    show(type, msg) {
        let message = document.getElementById("message");
        let boldTxt;
        if (type === "success") {
            boldTxt = `Success`;
        }
        else {
            boldTxt = `Error`;
        }
        message.innerHTML = `<div class="alert alert-${type} alert-dismissible fade show" role="alert">
                                <strong>${boldTxt}!</strong> ${msg}
                                <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                                    <span aria-hidden="true">&times;</span></button>
                            </div>`;

        setTimeout(function () {
            message.innerHTML = '';
        }, 5000);
    }
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
    e.preventDefault();

}

// Function to show elements from localStorage
function showBooks() {
    console.log("yes show my books")
    let bookData = localStorage.getItem("bookData");
    let bookObj;
    if (bookData == null) {
        bookObj = [];
    } else {
        bookObj = JSON.parse(bookData);
    }

    let html = '';

    bookObj.reverse();
    bookObj.forEach(function (element, index) {
        html += `<tr>
                    <td>${element.name}</td>
                    <td>${element.author}</td>
                    <td>${element.type}</td>
                    <td><button class="btn btn-danger" id="${index}" onclick="deleteBook(this.id)" type="submit">Delete</button></td>
                 </tr> `;
    });

    let booksElem = document.getElementById("tableBody");
    if (bookObj.length != 0) {
        booksElem.innerHTML = html;
    }
    else {
        booksElem.innerHTML = `<tr><td colspan="3">Nothing to show,Use above "Add a book" section to add books</td></tr>`;
    }
}

function deleteBook(index) {
    console.log("delete",index)
    let bookData = localStorage.getItem("bookData");
    if (bookData == null) {
        bookObj = [];
    } else {
        bookObj = JSON.parse(bookData);
    }

    let delSure = confirm('Are you sure you want to delete this book?');
    if (delSure == true) {
        bookObj.splice(index, 1);
    }
    localStorage.setItem("bookData", JSON.stringify(bookObj));
    showBooks()
}

