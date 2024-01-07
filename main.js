const booktodos = [];
const RENDER_EVENT = "render-book";

document.addEventListener("DOMContentLoaded", function () {

  const addBookSubmit = document.getElementById("inputBook");
  addBookSubmit.addEventListener("submit", function (event) {
    event.preventDefault();
    addBook();

  });

  if (isStorageExist()) {
    loadDataFromStorage();
  }

});

function addBook() {

  const bookTitle = document.getElementById("inputBookTitle").value;
  const bookWrite = document.getElementById("inputBookAuthor").value;
  const year = document.getElementById("inputBookYear").value;
  // const status = document.getElementById("inputBookIsComplete").value
  const generateID = generateId();
  const bookObject = generateBookObject(

    generateID,
    bookTitle,
    bookWrite,
    year,
    false

  );

  booktodos.push(bookObject);
  document.dispatchEvent(new Event(RENDER_EVENT));
  saveData();

}

function generateId() {
  return +new Date();
}

function generateBookObject(id, title, author, year, isCompleted) {

  return {
    id,
    title,
    author,
    year,
    isCompleted,
  };

}

document.addEventListener(RENDER_EVENT, function () {

  const uncompletedBOOKList = document.getElementById("incompleteBookshelfList");
  uncompletedBOOKList.innerHTML = "";

  const completedBOOKList = document.getElementById("completeBookshelfList");
  completedBOOKList.innerHTML = "";

  for (const bookItem of booktodos) {

    const bookElement = makeBook(bookItem);
    if (!bookItem.isCompleted) uncompletedBOOKList.append(bookElement);
    else completedBOOKList.append(bookElement);

  }

});

function makeBook(bookObject) {

  const bookTitle = document.createElement("h3");
  bookTitle.innerText = bookObject.title;

  const author = document.createElement("p");
  author.innerText = "Penulis: " + bookObject.author;

  const year = document.createElement("p");
  year.innerText = "Tahun: " + bookObject.year;

  const buttonCompleted = document.createElement("button")
  buttonCompleted.classList.add("green")
  buttonCompleted.innerText = "Selesai dibaca";

  // const buttonBookDelete = document.createElement("button")
  // buttonBookDelete.classList.add("red")
  // buttonBookDelete.innerText = "Hapus buku";

  // const containerButton = document.createElement("div");
  // containerButton.classList.add("action");
  // containerButton.append(buttonCompleted, buttonBookDelete);

  const bookContainer = document.createElement("article");
  bookContainer.classList.add("book_item");
  bookContainer.append(bookTitle, author, year,);
  bookContainer.setAttribute("id", `book-${bookObject.id}`);



  if (bookObject.isCompleted) {

    const undoButton = document.createElement("button");
    undoButton.innerHTML = '';
    undoButton.className = "green";
    undoButton.addEventListener("click", function () {

      undoBookFromCompleted(bookObject.id);

    });

    const trashButton = document.createElement("button");
    trashButton.innerHTML = '';
    trashButton.className = "red";
    trashButton.addEventListener("click", function () {

      removeBookFromCompleted(bookObject.id);

    });

    bookContainer.append(undoButton, trashButton);

  } else {

    const checkButton = document.createElement("button");
    checkButton.innerHTML = '';
    checkButton.className = "btn btn-success";
    checkButton.style.marginLeft = "10px";
    checkButton.addEventListener("click", function () {

      addBookToCompleted(bookObject.id);

    });

    bookContainer.append(checkButton);

  }

  return bookContainer;

}

function addBookToCompleted(bookId) {

  const bookTarget = findBook(bookId);
  if (bookTarget == null) return;
  bookTarget.isCompleted = true;

  document.dispatchEvent(new Event(RENDER_EVENT));
  saveData();

}

function removeBookFromCompleted(bookId) {

  const bookTarget = findBookIndex(bookId);
  if (bookTarget === -1) return;

  booktodos.splice(bookTarget, 1);

  document.dispatchEvent(new Event(RENDER_EVENT));

  saveData();

}

function undoBookFromCompleted(bookId) {

  const bookTarget = findBook(bookId);
  if (bookTarget == null) return;
  bookTarget.isCompleted = false;

  document.dispatchEvent(new Event(RENDER_EVENT));
  saveData();

}

function findBookIndex(bookId) {

  for (const index in booktodos) {
    if (booktodos[index].id === bookId) {
      return index;

    }

  }

  return -1;

}

function findBook(bookId) {

  for (const bookItem of booktodos) {
    if (bookItem.id === bookId) {
      return bookItem;

    }

  }

  return null;

}

function saveData() {

  if (isStorageExist()) {

    const parsed = JSON.stringify(booktodos);
    localStorage.setItem(STORAGE_KEY, parsed);
    document.dispatchEvent(new Event(SAVED_EVENT));

  }

}

const SAVED_EVENT = "saved-book";
const STORAGE_KEY = "BOOK_APPS";

function isStorageExist() {

  if (typeof Storage === undefined) {
    alert("Browser kamu tidak mendukung local storage");
    return false;
  }
  return true;

}

document.addEventListener(SAVED_EVENT, function () {
  console.log(localStorage.getItem(STORAGE_KEY));

});

function loadDataFromStorage() {
  const serializedData = localStorage.getItem(STORAGE_KEY);
  let data = JSON.parse(serializedData);

  if (data !== null) {

    for (const todo of data) {

      booktodos.push(todo);

    }

  }

  document.dispatchEvent(new Event(RENDER_EVENT));

}