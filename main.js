document.addEventListener('DOMContentLoaded', function () {
  const submitForm = document.getElementById('inputBook');
  submitForm.addEventListener('submit', function (event) {
    event.preventDefault();
    addBook();

  });
});

const books = [];
const RENDER_EVENT = 'ngasalll';

  function addBook() {
    const judulBuku = document.getElementById('inputBookTitle').value;
    const penulisBuku = document.getElementById('inputBookAuthor').value;
    const tahunBuku = document.getElementById('inputBookYear').value;
   
    const generatedID = generateId();
    const bookObject = generateBukuObject(generatedID, judulBuku, penulisBuku, tahunBuku, false);
    books.push(bookObject);
   
    document.dispatchEvent(new Event(RENDER_EVENT));
  }

  function generateId() {
    return +new Date();
  }

  function generateBukuObject(id, judul, penulis, tahun, sudahSelesai) {
    return {
      id,
      judul,
      penulis,
      tahun,
      sudahSelesai
    }
  }

  // document.addEventListener(RENDER_EVENT, function () {
  //   console.log(books);
  // });

  // =============================================================

  function makeBook (bookObject) {
    const judulBuku = document.createElement('h3');
    judulBuku.innerText = bookObject.judul;

    const penulisBuku = document.createElement('p');
    penulisBuku.innerText = bookObject.penulis;

    const tahunBuku = document.createElement('p');
    tahunBuku.innerText = bookObject.tahun;

    const buttonGreen = document.createElement('button');
    buttonGreen.classList.add('green');
    buttonGreen.innerText = 'selesai di Baca';
 
    const buttonRed = document.createElement('button');
    buttonRed.classList.add('red')
    buttonRed.innerText = "Hapus buku";
 
    const action = document.createElement('div');
    action.classList.add('action');
    action.append(buttonGreen, buttonRed);

    const textContainer = document.createElement('article');
    textContainer.classList.add('book_item');
    textContainer.append(judulBuku, penulisBuku, tahunBuku, action);
    textContainer.setAttribute('id', 'buku-${bookObject.id}');

    return textContainer;
  }

  document.addEventListener(RENDER_EVENT, function () {
    const uncompletedBookList = document.getElementById('incompleteBookshelfList');
    uncompletedBookList.innerHTML = '';
 
    const completedBookList = document.getElementById('completeBookshelfList');
    completedBookList.innerHTML = '';
 
    for (const bookItem of books) {
      const bookElement = makeBook(bookItem);
      if(bookItem.Iscomplete){
        completedBookList.append(bookElement)
      }else{
        uncompletedBookList.append(bookElement)
      }
  }
});