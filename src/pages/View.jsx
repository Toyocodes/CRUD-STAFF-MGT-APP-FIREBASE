import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { db } from "../firebase"
import { getDoc, doc } from "firebase/firestore"; 
import Navbar from "../Components/Navbar/Navbar";


const View = () => {

  const [user, setUser] = useState({});

  const {id} = useParams()

  useEffect(()=>{
    if (id) {
      const docRef = doc(db, `staffs/${id}`);
      getDoc(docRef)
        .then((staffDoc) => {
          if (staffDoc.exists()) {
            setUser({ ...staffDoc.data() });
          } else {
            setUser({});
          }
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, [id]);


  return (
    <div>
      <Navbar/>
      <div>
      <div class="bg-gray-100 min-h-screen flex items-center justify-center">
      <div class="max-w-md w-full p-6 bg-white rounded-lg shadow-md">
        <div class="card">
          <div class="card-header bg-blue-500 text-white py-2 text-center">
            <p class="text-2xl font-semibold">User Contact Detail</p>
          </div>
          <div class="p-4">
            <strong class="block mb-2 text-lg font-semibold">ID:</strong>
            <span class="block mb-4">{id}</span>

            <strong class="block mb-2 text-lg font-semibold">Name:</strong>
            <span class="block mb-4">{user.name}</span>

            <strong class="block mb-2 text-lg font-semibold">Email:</strong>
            <span class="block mb-4">{user.email}</span>

            <strong class="block mb-2 text-lg font-semibold">Contact:</strong>
            <span class="block mb-4">{user.contact}</span>

            <div class="text-center">
              <a href="/home" class="btn-edit text-white bg-blue-500 py-2 px-4 rounded-full inline-block hover:bg-blue-600">Go Back</a>
            </div>
          </div>
        </div>
      </div>
</div>

    </div>
    </div>
  )
}

export default View