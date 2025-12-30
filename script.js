const bookTitle = document.querySelector("#title");
const bookAuthor = document.querySelector("#author");
const bookPages = document.querySelector("#pages");

const page = document.querySelector(".page");
const libraryDiv = document.querySelector(".library-container");
const addBookBtn = document.querySelector(".add-book-btn");
const removeBookBtn = document.querySelector(".remove-book-btn");
const overlayPopup = document.querySelector(".overlay");
const addBookPopup = document.querySelector(".add-book-popup");
const addBtn = document.querySelector("#addBtn");
const book = document.querySelector(".book");

const myLibrary = [];

function Book() {
  this.id = crypto.randomUUID();
  this.title = bookTitle.value;
  this.author = bookAuthor.value;
  this.pages = bookPages.value;
}

function addBookToLibrary(title, author, pages) {
  myLibrary.push(new Book(title, author, pages));
  displayLibrary();
}

function displayLibrary() {
  const libraryDiv = document.querySelector(".library-container");

  libraryDiv.innerHTML = "";

  myLibrary.forEach((book, index) => {
    const bookDiv = document.createElement("div");
    bookDiv.classList.add("book");

    bookDiv.innerHTML = `
      <h3><u>${book.title}</u></h3>
      <p><em>${book.author}</em></p>
      <p>${book.pages} pages</p>
      <button class="remove-book-btn">❌</button>
    `;

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
    addBookToLibrary(title, author, pages);
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

libraryDiv.addEventListener("click", (e) => {
  if (e.target.classList.contains("remove-book-btn")) {
    e.target.closest(".book").remove();
  }
});
