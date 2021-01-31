class Book {
    constructor(title, author, isbn) {
        this.title = title;
        this.author = author;
        this.isbn = isbn;
    }
}

class UI {
    addBooklist(book) {
        //get book list
        const list = document.getElementById('book-list');
        // create tr element
        const row = document.createElement('tr');
        // insert cols
        row.innerHTML = `
        <td>${book.title}</td>
        <td>${book.author}</td>
        <td>${book.isbn}</td>
        <td><a href="#" class="delete">X</a></td>
    `
    list.appendChild(row);
    }

    showAlert(message, className) {
        //create div
        const errorDiv = document.createElement('div');
        // add class
        errorDiv.className = `alert ${className}`;
        // create text Node and append to div
        errorDiv.appendChild(document.createTextNode(message));

        // Book list and heading UI
        const container = document.querySelector('.container'),
              form = document.getElementById('book-form');

        // insert errorDiv before heading
        container.insertBefore(errorDiv, form);

        // clear alert
        setTimeout(clearAlert, 2000);

        // Clear alert
        function clearAlert () {
            document.querySelector('.alert').remove();
        }
            
    }

    clearFilds() {
        document.getElementById('title').value = '';
        document.getElementById('author').value = '';
        document.getElementById('isbn').value = '';
    }

    deleteBook(target) {
        if (target.className === 'delete') {
            target.parentElement.parentElement.remove();
            // Show Alert
            this.showAlert('Record Removed', 'success')
            // Alert
            alert('Are you sure?')
        }
    }
}

// Local Storage Classes
class Store {
    static getBooks() {
        let books;
        if(localStorage.getItem('books') === null) {
            books = [];
        } else {
            books = JSON.parse(localStorage.getItem('books'));
        }

        return books;
    }

    static displayBooks() {
        const books = Store.getBooks();

        books.forEach(function(book) {
            const ui = new UI;

            // add book to ui
            ui.addBooklist(book);
        })
    }

    static addBooks(book) {
        const books = Store.getBooks();

        books.push(book);

        localStorage.setItem('books', JSON.stringify(books));
    }

    static removeBooks(isbn) {
        const books = Store.getBooks();

        books.forEach(function(book, index) {
            if (book.isbn === isbn) {
                books.splice(index, 1);
            }
        });
        
        localStorage.setItem('books', JSON.stringify(books));
    }
}

// DOM Load Event

document.body.addEventListener('DOMContentLoaded', Store.displayBooks());

// Event listener for add book
document.getElementById('book-form').addEventListener('submit', function(e){
    // Get form value
    const title = document.getElementById('title').value,
        author = document.getElementById('author').value,
        isbn = document.getElementById('isbn').value;
    
    // Instantiate book
    const book = new Book(title, author, isbn);
    
    // Instantiate ui
    const ui = new UI();

    // Validate
    if(title === '' || author === '' || isbn === '' ) {
        // Show Alert
        ui.showAlert('Please fill in all fields', 'error')
    } else {
        // Add book to list
        ui.addBooklist(book);
        // Add to LS
        Store.addBooks(book);
        // Show success error
        ui.showAlert('Record Added', 'success')
        // clear filds
        ui.clearFilds();
        
    }

    e.preventDefault();
})

// Event listener for delete book
document.querySelector('#book-list').addEventListener('click', function(e) {
    // Instantiate ui
    const ui = new UI();

    ui.deleteBook(e.target)

    Store.removeBooks(e.target.parentElement.previousElementSibling.textContent)

    e.preventDefault();
})