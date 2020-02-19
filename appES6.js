class Book {
    constructor(title, author, isbn) {
        this.title = title;
        this.author = author;
        this.isbn = isbn;
    }
}

class UI {
    AddBookToList(book) {
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

    showAlert(message, className) {
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

    deleteBook(target) {
        if (target.className === 'delete') {
            target.parentElement.parentElement.remove();
        }
    }

    clearFields() {
        document.getElementById('title').value = '';
        document.getElementById('author').value = '';
        document.getElementById('isbn').value = '';
    }
}

// Local storage class
class Store {
    static getBooks() {
        let books;
        if (localStorage.getItem('books') === null) {
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

            // Add book to UI
            ui.AddBookToList(book);
        })
    }

    static addBook(book) {
        const books = Store.getBooks();
        
        books.push(book);

        localStorage.setItem('books', JSON.stringify(books));
    }

    static removeBook(isbn) {
        const books = Store.getBooks();

        books.forEach(function (book, index) {
            if (book.isbn === isbn) {
                books.splice(index, 1);
            }
        });

        localStorage.setItem('books', JSON.stringify(books));
    }
}

// DOM load event
document.addEventListener('DOMContentLoaded', Store.displayBooks);

// Event Lesteners to add a book
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

        // Add to local storage
        Store.addBook(book);

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

    // Remove book
    ui.deleteBook(e.target);

    // Remove from local storage
    Store.removeBook(e.target.parentElement.previousElementSibling.textContent);

    // Show Alert
    ui.showAlert('Book has been removed!', 'success');


    e.preventDefault(); 
});