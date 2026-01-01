const bookTitle = document.querySelector("#title");
const bookAuthor = document.querySelector("#author");
const bookPages = document.querySelector("#pages");

const page = document.querySelector(".page");
const libraryDiv = document.querySelector(".library-container");
const addBookBtn = document.querySelector(".add-book-btn");
const removeBookBtn = document.querySelector(".remove-book-btn");
const overlayPopup = document.querySelector(".overlay");
const addBookPopup = document.querySelector(".add-book-popup");
const isReadCheckbox = document.querySelector("#read");
const addBtn = document.querySelector("#addBtn");
const book = document.querySelector(".book");

const myLibrary = [];

class Book {
  constructor(title, author, pages, read) {
    this.id = crypto.randomUUID();
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
  }
}

function addBookToLibrary(title, author, pages, read) {
  myLibrary.push(new Book(title, author, pages, read));
  displayLibrary();
  addBookPopup.reset();
}

function displayLibrary() {
  libraryDiv.innerHTML = "";

  myLibrary.forEach((book, index) => {
    const bookDiv = document.createElement("div");
    bookDiv.classList.add("book");

    bookDiv.innerHTML = `
      <h3><u>${book.title}</u></h3>
      <p><em>${book.author}</em></p>
      <p>${book.pages} pages</p>
      <button class="is-read-btn" data-id="${book.id}">Read</button>
      <button class="remove-book-btn" data-id="${book.id}">❌</button>
    `;

    const readBtn = bookDiv.querySelector(`.is-read-btn[data-id="${book.id}"]`);
    if (book.read) {
      readBtn.classList.add("read");
    }

    libraryDiv.appendChild(bookDiv);
  });
}

// Event listeners
addBookBtn.addEventListener("click", () => {
  overlayPopup.classList.remove("disabled");
  page.classList.add("blur");
});

addBtn.addEventListener("click", () => {
  if (addBookPopup.checkValidity()) {
    addBookToLibrary(
      bookTitle.value,
      bookAuthor.value,
      bookPages.value,
      isReadCheckbox.checked
    );
    overlayPopup.classList.add("disabled");
    page.classList.remove("blur");
  } else alert("All fields are required");
});

overlayPopup.addEventListener("click", () => {
  overlayPopup.classList.add("disabled");
  page.classList.remove("blur");
});

addBookPopup.addEventListener("click", (e) => {
  e.stopPropagation();
});

// Read button
libraryDiv.addEventListener("click", (e) => {
  if (e.target.classList.contains("is-read-btn")) {
    const id = e.target.dataset.id;
    const book = myLibrary.find((b) => b.id === id);

    book.read = !book.read;
    displayLibrary();
  }
});

// Remove button
libraryDiv.addEventListener("click", (e) => {
  if (e.target.classList.contains("remove-book-btn")) {
    const id = e.target.dataset.id;
    const index = myLibrary.findIndex((b) => b.id === id);

    myLibrary.splice(index, 1);
    displayLibrary();
  }
});
