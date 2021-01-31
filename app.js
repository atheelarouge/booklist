// Book constructor
function Book(title, author, isbn) {
    this.title = title;
    this.author = author;
    this.isbn = isbn;
}

// UI constructor
function UI() {}

// Add book list proto function
UI.prototype.addBooklist = function(book) {
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

// Show Alert
UI.prototype.showAlert = function(message, className) {
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
}

// Clear alert
function clearAlert () {
    document.querySelector('.alert').remove();
}


// Clear filds
UI.prototype.clearFilds = function() {
    document.getElementById('title').value = '';
    document.getElementById('author').value = '';
    document.getElementById('isbn').value = '';
}

UI.prototype.deleteBook = function(target) {
    if (target.classList.contains('delete')) {
        target.parentElement.parentElement.remove();
        ui = new UI();
        // Show Alert
        ui.showAlert('Book Removed', 'success')
    }
    
}


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
        // Show success error
        ui.showAlert('Book Added', 'success')
        // clear filds
        ui.clearFilds();
        
    }

    e.preventDefault();
})

// Event listener for delete book
document.querySelector('#book-list').addEventListener('click', function(e) {
    // Instantiate ui
    const ui = new UI();

    ui.deleteBook(e.target);
  
    e.preventDefault();
})