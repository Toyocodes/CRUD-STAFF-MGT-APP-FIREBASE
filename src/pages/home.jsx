import React, { useContext, useEffect, useState} from 'react'
// import {dbRef, ref, onValue, get, child} from '../config/firebase';
// import {db, ref, onValue, remove} from '../firebase';
import { collection, getDocs, deleteDoc, doc, onSnapshot} from "firebase/firestore";
import { db } from "../firebase"
import {Link, useParams} from 'react-router-dom'
import './Home.css'
import Navbar from "../Components/Navbar/Navbar";
import { toast } from 'react-toastify';


const home = () => {
  const [data, setData] = useState([]);



  //to retrieve data from firebase and let it show on homw page
  useEffect(() => {
    // const fetchData = async () => {
    //   let list = [];
    //   try {
    //     const querySnapshot = await getDocs(collection(db, 'staffs'));
    //     querySnapshot.forEach((doc) => {
    //       list.push({ id: doc.id, ...doc.data() });
    //     });
    //     setData(list);
    //   } catch (err) {
    //     console.log(err.message);
    //   }
    // };
    // fetchData();
    
    // LISTEN (REALTIME)
      const unsub = onSnapshot(collection(db, "staffs"),(snapShot) => {
          let list = [];
          snapShot.docs.forEach((doc) => {
            list.push({ id: doc.id, ...doc.data() });
          });
          setData(list);
        },
        (error) => {
          console.log(error);
        }
      );

      return () => {
        unsub();
      };
  }, []);

  const onDelete = async (id) => {
    if (window.confirm('Are you sure that you want to delete that contact?')) {
      try {
        await deleteDoc(doc(db, 'staffs', id));
        setData(data.filter((item) => item.id !== id));
        toast.success('Contact Deleted Successfully');
      } catch (err) {
        console.log(err);
        toast.error('Deleting was not successful');
      }
    }
  };

  return (
    <div>
      <Navbar />
      <div style={{ marginTop: '100px' }}>
        <table className="styled-table">
          <thead>
            <tr>
              <th style={{ textAlign: 'center' }}>No.</th>
              <th style={{ textAlign: 'center' }}>Image</th>
              <th style={{ textAlign: 'center' }}>Name</th>
              <th style={{ textAlign: 'center' }}>Email</th>
              <th style={{ textAlign: 'center' }}>Contact</th>
              <th style={{ textAlign: 'center' }}>Action</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => (
              <tr key={item.id}>
                <th scope="row">{index + 1}</th>
                <td>
                  <img
                    src={item.img}
                    alt="avatar"
                    className="w-[50px] h-[50px] rounded-full"
                  />
                </td>
                <td>{item.name}</td>
                <td>{item.email}</td>
                <td>{item.contact}</td>
                <td>
                  <Link to={`/update/${item.id}`}>
                    <button className="bttn btn-edit">Edit</button>
                  </Link>
                  <button
                    className="bttn btn-delete"
                    onClick={() => onDelete(item.id)}
                  >
                    Delete
                  </button>
                  <Link to={`/view/${item.id}`}>
                    <button className="bttn btn-view">View</button>
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};




export default home