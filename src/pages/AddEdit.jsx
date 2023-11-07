import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import './AddEdit.css';
import Navbar from "../Components/Navbar/Navbar";
import { toast } from 'react-toastify';
import {ImFolderDownload} from 'react-icons/im'
import { collection, doc, getDoc, setDoc, addDoc, serverTimestamp } from "firebase/firestore"; 
import { db, storage} from "../firebase"

import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

const AddEdit = () => {

    const [data, setData] = useState({
      name: '',
      email: '',
      contact: '',
      img:'',
    });
   
    
    const [file, setFile] = useState("")

    const [percent, setPercent] = useState(null) //this is not compulsory tho

    const navigate = useNavigate()

//to send image to firebase and store it there
    useEffect(() => {
      const uploadFile = () =>{
        const name = new Date().getTime() + file.name //this will create a new timestamp
        const storageRef = ref(storage, file.name);

        const metadata = {
          contentType: file.type,
        };

        const uploadTask = uploadBytesResumable(storageRef, file);

        uploadTask.on('state_changed', 
          (snapshot) => {
            const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log('Upload is ' + progress + '% done');
            setPercent(progress)
            switch (snapshot.state) {
              case 'paused':
                console.log('Upload is paused');
                break;
              case 'running':
                console.log('Upload is running');
                break;
                default:
                  break;
            }
          }, 
          (error) => {
            console.log(error)
          }, 
          () => {
            // Handle successful uploads on complete
            // For instance, get the download URL: https://firebasestorage.googleapis.com/...
            getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
              setData((prev) => ({ ...prev, img: downloadURL }));
            });
          }
        );
        
      }
      file && uploadFile();
    }, [file])

    const handleInputChange = (e) => {
      const id = e.target.id;
      const value = e.target.value;
      setData({ ...data, [id]: value });
      // const { name, value } = e.target;
      // setData({ ...data, [name]: value });
    };
    console.log(data)


    //to send data input to firebase step 1
    const handleSubmit = async (e) => {
      e.preventDefault();
    
      try {
        if (id) {
          // Editing an existing contact
          const docRef = doc(db, "staffs", id);
          await setDoc(docRef, {
            ...data,
            timeStamp: serverTimestamp(),
          });
          toast.success('Contact Updated Successfully');
          navigate('/home')
        } else {
          // Adding a new contact
          const docRef = await addDoc(collection(db, "staffs"), {
            ...data,
            timeStamp: serverTimestamp(),
          });
          toast.success('Contact Added Successfully');
          navigate('/home');
        }
      } catch (err) {
        console.error('Error:', err);
        toast.error(err.message);
      }
    };
    
      //to edit data
      const { id } = useParams()

      useEffect(() => {
          if (id) {
              // Fetch the existing contact data if in edit mode
              const fetchData = async () => {
                  const docRef = doc(db, `staffs/${id}`);
                  const staffDoc = await getDoc(docRef);
                  if (staffDoc.exists()) {
                      const staffData = staffDoc.data();
                      setData(staffData);
                  } else {
                      console.error('Contact not found');
                  }
              }
              fetchData();
          }
      }, [id]);

  
      // Function to update the contact data
      // const updateContact = async () => {
      //     try {
      //         const docRef = doc(db, `staffs/${id}`);
      //         await updateDoc(docRef, {
      //             ...data,
      //             timeStamp: serverTimestamp(),
      //         });
      //         toast.success('Contact Updated Successfully');
      //         setTimeout(() => navigate('/home'), 300);
      //     } catch (error) {
      //         console.error('Error updating contact:', error);
      //         toast.error(error.message);
      //     }
      // };
  
  
  
  return (
    <div>
      <Navbar/>
      <div className='mt-[100px] flex flex-col md:flex-row justify-center items-center gap-x-10'>
       
        <div className='flex justify-center items-center'>
            <img
              src={
                file
                  ? URL.createObjectURL(file)
                  : "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"
              }
            alt=""
            className="w-[150px] h-[150px] rounded-full"
            />
        </div>
        
        <div>
        <form
        style={{
          margin: 'auto',
          padding: '15px',
          maxWidth: '400px',
          alignContent: 'center',
        }}
        onSubmit={handleSubmit}
      >
        {/* <label htmlFor="file" className=''>
         <div className='flex gap-4 items-center'> Image: Click here <ImFolderDownload size={30}/> to upload image</div>
        </label> */}
        <input
          type="file"
          id="file"
          onChange={(e) => setFile(e.target.files[0])}
        //   style={{ display: "none" }}
        
        />
       
        <input
          type="text"
          id="name"
          name="name"
          placeholder="Your Name ..."
          value={data.name}
          onChange={handleInputChange}
        />
       
        <input
          type="email"
          id="email"
          name="email"
          placeholder="Your Email ..."
          value={data.email}
          onChange={handleInputChange}
        />
      
        <input
          type="number" 
          id="contact"
          name="contact"
          placeholder="Your Contact No ..."
          value={data.contact}
          onChange={handleInputChange}
        />
            <input type="submit" value={id ? 'Update' : 'Save'} />
            </form>
        </div>
      </div>
    </div>
  ) 
}

export default AddEdit