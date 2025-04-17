// Do your work here...


document.addEventListener('DOMContentLoaded', function () {
  const submitBuku = document.getElementById('bookForm');

  submitBuku.addEventListener('submit', function() {
    event.preventDefault();

   const inputTitle = document.getElementById('bookFormTitle').value;
   const inputAuthor = document.getElementById('bookFormAuthor').value;
   const inputBookYear = document.getElementById('bookFormYear').value;
   const inputBookStatus = document.getElementById('bookFormIsComplete');

   // Get the boolean status directly using the .checked property
   const isComplete = inputBookStatus.checked;


  //  if (inputBookStatus.checked) {
  //     inputBookStatus.value
  //  } else {
  //      console.log('Checkbox tidak dicentang.');
  //  }
 
  console.log('Title:', inputTitle);
  console.log('Author:', inputAuthor);
  console.log('Year:', parseInt(inputBookYear));
  console.log('Is Complete:', isComplete);
 
   
 });
});


// --- Further actions would go here ---
    // For example, creating a book object and adding it to a list:
    /*
    const newBook = {
        id: +new Date(), // Simple way to generate a unique ID
        title: inputTitle,
        author: inputAuthor,
        year: parseInt(inputBookYear), // Convert year to number
        isComplete: isComplete
    };
    // Add the newBook object to your books array/list
    // Trigger a render event like in your example code
    */