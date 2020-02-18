//  Book constructor
function Book(title, author, isbn) {
    this.title = title;
    this.author = author;
    this.isbn = isbn;
}


// UI constractor
function UI() {

}

// Add book to list
UI.prototype.AddBookToList = function (book) {
    const list = document.getElementById('book-list');
    //  Create tr element
    const row = document.createElement('tr');
    // Insert cols
    row.innerHTML = `
        <td>${book.title}</td>
        <td>${book.author}</td>
        <td>${book.isbn}</td>
        <td><a href="#" class="delete">X</a></td>
    `;
    // Appending to list
    list.appendChild(row);
}

// Show alert
UI.prototype.showAlert = function(message, className) {
    // Create a div
    const div = document.createElement('div');

    // Add class
    div.className = `alert ${className}`;

    //  Add text
    div.appendChild(document.createTextNode(message));

    // Get parent
    const container = document.querySelector('.container');
    const form = document.querySelector('#book-form');

    // Insert alert
    container.insertBefore(div, form);

    // Set timeout after 3 sec
    setTimeout(function() {
        document.querySelector('.alert').remove();
    }, 3000);
}

// Remove book from the list
UI.prototype.deleteBook = function(target) {
    if (target.className === 'delete') {
        target.parentElement.parentElement.remove();
    }
}

// Clear field after submiting
UI.prototype.clearFields = function() {
    document.getElementById('title').value = '';
    document.getElementById('author').value = '';
    document.getElementById('isbn').value = '';
}

// Event Lesteners
document.getElementById('book-form').addEventListener('submit', function(e) {
    // Get form values
    const title = document.getElementById('title').value,
        author = document.getElementById('author').value,
        isbn = document.getElementById('isbn').value
    
    // Instatiante new book object
    const book = new Book(title, author, isbn);

    // Instatiate new UI object
    const ui = new UI();

    // Validation
    if (title === '' || author === '' || isbn === '') {
        // Error alert
        ui.showAlert('Please fill in all fields', 'error');
    } else {
        // Add book to list
        ui.AddBookToList(book);

        // Show alert
        ui.showAlert('Book successfully added!', 'success');

        // Clear fields 
        ui.clearFields();
    }

    e.preventDefault();
});

// Event Listener for remove 
document.getElementById('book-list').addEventListener('click', function(e) {
    // Instantiate UI
    const ui = new UI();

    ui.deleteBook(e.target);

    // Show Alert
    ui.showAlert('Book has been removed!', 'success');


    e.preventDefault(); 
});