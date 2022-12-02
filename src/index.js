//import firebase9 specific functions
import { initializeApp } from "firebase/app";
import {
  getFirestore,
  collection,
  // getDocs,
  addDoc,
  doc,
  deleteDoc,
  onSnapshot,
  serverTimestamp,
} from "firebase/firestore";
import dotenv from "dotenv";

//init evn
dotenv().config();

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.FIRE_API_KEY,
  authDomain: "fire9-30d1a.firebaseapp.com",
  projectId: "fire9-30d1a",
  storageBucket: "fire9-30d1a.appspot.com",
  messagingSenderId: "698861877368",
  appId: process.env.FIRE_APP_ID,
};

//init app
initializeApp(firebaseConfig);

//init services
const db = getFirestore();

//collection refs
const colRef = collection(db, "books");

//get collection data
/*
const bookContainer = document.getElementById("books-container");
getDocs(colRef)
  .then((docs) => {
    let data = [];

    docs.docs.forEach((doc) => data.push({ ...doc.data(), id: doc.id }));

    data.forEach((book) => {
      const bookItem = document.createElement("h4");
      bookItem.innerText = book.title;
      bookContainer.appendChild(bookItem);
    });
  })
  .catch((err) => {
    console.log("ColRef Error: ", err);
  });

  */

//RealTime Query
onSnapshot(colRef, (snapShot) => {
  const bookContainer = document.getElementById("books-container");
  let data = [];

  snapShot.docs.forEach((doc) => data.push({ ...doc.data(), id: doc.id }));
  console.log(data);
  data.forEach((book) => {
    const bookItem = document.createElement("h4");
    bookItem.innerText = book.title;
    bookContainer.appendChild(bookItem);
  });
});

// add new book
document.getElementById("add-book-form").addEventListener("submit", (e) => {
  e.preventDefault();

  addDoc(colRef, {
    author: e.target["author"].value,
    title: e.target["title"].value,
    createAt: serverTimestamp(),
  })
    .then(() => {
      //reset form
      e.target["author"].value = "";
      e.target["title"].value = "";
    })
    .catch((err) => {
      console.log(err);
    });
});

//@desc - delete doc
document.getElementById("delete-doc").addEventListener("click", () => {
  //create docRef
  const docRef = doc(collection, "doc_id");

  //delete doc
  deleteDoc(docRef)
    .then(() => {
      console.log("Document deleted!");
    })
    .catch((err) => {
      console.log("Deleting Doc Error: ", err);
    });
});
