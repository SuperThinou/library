const title = document.querySelector("#title");
const author = document.querySelector("#author");
const pages = document.querySelector("#pages");
const addBookBtn = document.querySelector(".add-book-btn");
const addBookPopup = document.querySelector(".add-book-popup");
const addBtn = document.querySelector("#addBtn");
const book = document.querySelector(".book");

const myLibrary = [];

function Book() {
  this.id = crypto.randomUUID();
  this.title = title.value;
  this.author = author.value;
  this.pages = pages.value;
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
    `;

    libraryDiv.appendChild(bookDiv);
  });
}

addBookBtn.addEventListener("click", () => {
  addBookPopup.classList.remove("disabled");
});

addBtn.addEventListener("click", () => {
  if (addBookPopup.checkValidity()) {
    addBookToLibrary(title, author, pages);
    addBookPopup.classList.add("disabled");
  } else alert("All fields are required");
});
