import React, { useEffect, useState } from 'react';
import { collection, getDocs, deleteDoc, doc, onSnapshot, query, where, orderBy } from 'firebase/firestore';
import { db } from '../firebase';
import { Link, useNavigate, useParams } from 'react-router-dom';
import './Home.css';
import Navbar from '../Components/Navbar/Navbar';
import { toast } from 'react-toastify';

const Home = () => {
  const [data, setData] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');


  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  useEffect(() => {
    const unsub = onSnapshot(
      query(
        collection(db, 'staffs'),
        where('name', '>=', searchQuery),
        orderBy('name')
      ),
      (snapShot) => {
        const regex = new RegExp(searchQuery, 'i');
        let list = snapShot.docs
          .filter((doc) => regex.test(doc.data().name))
          .map((doc) => ({ id: doc.id, ...doc.data() }));
        setData(list);
      },
      (error) => {
        console.log(error);
      }
    );

    return () => {
      unsub();
    };
  }, [searchQuery]);

  

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
      <Navbar searchQuery={searchQuery} setSearchQuery={setSearchQuery} onSearchSubmit={handleSearch} />
      <div style={{ marginTop: '50px' }}>
        <h1 className="text-xl font-bold mb-20">
          This is a Staff's contact management app where you can collate the
          names of your staffs
        </h1>
        {/* <input
          type="text"
          placeholder="Search by name"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        /> */}
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

export default Home;
