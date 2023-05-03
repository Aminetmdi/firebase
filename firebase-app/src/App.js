import React, { useEffect, useState } from "react";
import "./App.css";
import { Auth } from "./components/auth";
import { db, auth, storage } from "./config/firebase";
import {
  getDocs,
  collection,
  addDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { ref, uploadBytes } from "firebase/storage";
const App = () => {
  const [movieList, setMovieList] = useState([]);
  // New Movie State
  const [newMovieTitle, setNewMovieTitle] = useState("");
  const [newReleaseDate, setNewReleaseDate] = useState(0);
  const [isNewMovieOscar, setisNewMovieOscar] = useState(false);

  const [fileUpload, setFileUpload] = useState(null);

  const moviesCollectionRef = collection(db, "movies");

  const getMovieList = async () => {
    try {
      const data = await getDocs(moviesCollectionRef);
      const filtredData = data.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setMovieList(filtredData);
    } catch (err) {
      console.error(err);
    }
  };

  const deleteMovie = async (id) => {
    try {
      const movieDoc = doc(db, "movies", id);
      await deleteDoc(movieDoc);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    getMovieList();
  }, []);
  const onSubmitMovie = async () => {
    try {
      await addDoc(moviesCollectionRef, {
        title: newMovieTitle,
        releaseDate: newReleaseDate,
        receivedAnOscar: isNewMovieOscar,
        userId: auth?.currentUser?.uid,
      });

      getMovieList();
    } catch (err) {
      console.error(err);
    }
  };
  const uploadFile = async () => {
    if (!fileUpload) return;
    const filesFolderRef = ref(storage, `userImage/${fileUpload.name}`);

    try {
      await uploadBytes(filesFolderRef, fileUpload);
    } catch (err) {
      console.error(err);
    }
  };
  return (
    <div className="App">
      <Auth />

      <div className="input-container">
        <h1 style={{ padding: "16px 0px" }}>List of movie</h1>
        <input
          className="input-app"
          type="text"
          placeholder="Movie title..."
          onChange={(e) => setNewMovieTitle(e.target.value)}
        />
        <input
          className="input-app"
          type="number"
          placeholder="Release Date..."
          onChange={(e) => setNewReleaseDate(Number(e.target.value))}
        />
        <input
          type="checkbox"
          checked={isNewMovieOscar}
          onChange={(e) => setisNewMovieOscar(e.target.checked)}
        />
        <label htmlFor=""> Received an Oscar </label>
        <button onClick={onSubmitMovie}>Submit Movie</button>
      </div>

      <div className="Listofmovie">
        {movieList.map((movie) => (
          <div className="" key={movie.id}>
            <h1 style={{ color: movie.receivedAnOscar ? "green" : "red" }}>
              {movie.title}
            </h1>
            <h5>Date : {movie.releaseDate}</h5>

            <button onClick={() => deleteMovie(movie.id)}>Delete Movie</button>
          </div>
        ))}
      </div>

      <div className="uploadFile">
        <h1>Upload File</h1>
        <input type="file" onChange={(e) => setFileUpload(e.target.files[0])} />
        <button onClick={uploadFile}>Upload file</button>
      </div>
    </div>
  );
};

export default App;
