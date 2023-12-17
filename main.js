const books = [];
const RENDER_EVENT = 'render-book';

document.addEventListener('DOMContentLoaded', function () {
    const submitForm = document.getElementById('inputBook');
    submitForm.addEventListener('submit', function (event) {
      event.preventDefault();
      addBook();

      function addBook() {
        const judulBuku = document.getElementById('inputBookTitle').value;
        const penulisBuku = document.getElementById('inputBookAuthor').value;
        const tahunBuku = document.getElementById('inputBookYear').value;
       
        const generatedID = generateId();
        const bukuObject = generateBukuObject(generatedID, judulBuku, penulisBuku, tahunBuku, false);
        books.push(bukuObject);
       
        document.dispatchEvent(new Event(RENDER_EVENT));
      }

      function generateId() {
        return +new Date();
      }

      function generateBukuObject(id, judul, penulis, tahun, selesaiDibaca) {
        return {
          id,
          judul,
          penulis,
          tahun,
          selesaiDibaca
        }
      }
      
      document.addEventListener(RENDER_EVENT, function () {
        console.log(books);
      });

    });
  });

  function buatBuku (bukuObject) {
    const judulBuku = document.createElement('h3');
    judulBuku.innerText = bukuObject.judul;

    const penulisBuku = document.createElement('p');
    penulisBuku.innerText = bukuObject.penulis;

    const tahunBuku = document.createElement('p');
    tahunBuku.innerText = bukuObject.tahun;

    const textContainer = document.createElement('article');
    textContainer.classList.add('book_item');
    textContainer.append(judulBuku, penulisBuku, tahunBuku);
    textContainer.setAttribute('id', 'buku-${bukuObject.id}');


   if (bukuObject.selesaiDibaca) {
        const tombolSelesai = document.createElement('button');
        tombolSelesai.classList.add('green');

        tombolSelesai.addEventListener('click', function() {
            undoTaskFromCompleted(bukuObject.id);
        });

    const tombolHapus = document.createElement('button');
    tombolHapus.classList.add('red');

    tombolHapus.addEventListener('click', function (){
        removeTaskFromCompleted(bukuObject.id);
    });

    function removeTaskFromCompleted(bukuID) {
        const bukuTarget = findBukuIndex(bukuID)

        if (bukuTarget === -1) return;

        books.splice(bukuTarget, 1);
        document.dispatchEvent(new Event(RENDER_EVENT));
    }

    function undoTaskFromCompleted(bukuID) {
        const bukuTarget = findBuku(bukuID);

        if (bukuTarget == null) return;

        bukuTarget.selesaiDibaca = false;
        document.dispatchEvent(new Event(RENDER_EVENT));

        function findBukuIndex(bukuID) {
            for (const idex in books) {
                if (books[index].id === bukuID) {
                    return index;
                }
            }

        }

        return -1;
    }

    textContainer.append(tombolSelesai, tombolHapus);
   } else {
    const checkButton = document.createElement('button');
    checkButton.classList.add

   }


  }