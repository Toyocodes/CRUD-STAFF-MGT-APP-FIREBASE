import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { db, ref, onValue, orderByChild, equalTo, startAt, endAt, query } from '../firebase';
import { doc, getDoc } from "firebase/firestore"; 
import './Search.css';

const Search = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);

    const useQuery = () => {
        return new URLSearchParams(useNavigate().search);
    }

    let queryParam = useQuery();
    let search = queryParam.get('name');
    console.log("search:", search);

    useEffect(() => {
        if (search) {
            searchData(search);
        }
    }, [search]);

      const searchData = ()=>{
        setLoading(true);
        const docRef = ref(db, 'staffs')
        .orderByChild(docRef)
        .equalTo(search)
       .on("value", (snapshot) => {
            if (snapshot.val()) {
                const data = snapshot.val();
                setData(data)
              }
              setLoading(false)
        })
    }

    // const searchData = (search) => {
    //     setLoading(true);
    //     const docRef = doc(db, 'staffs');
    //     const queryRef = query(docRef, orderByChild('name'), equalTo(search));
        
    //     onValue(queryRef, (snapshot) => {
    //         if (snapshot.exists()) {
    //             const data = snapshot.val();
    //             setData(data);
    //         } else {
    //             setData([]);
    //         }
    //         setLoading(false);
    //     });
    // };

    return (
        <div style={{ marginTop: "100px" }}>
            {loading ? (
                <p>Loading...</p>
            ) : (
                data.length > 0 ? (
                    <table className="styled-table">
                        <thead>
                            <tr>
                                <th style={{ textAlign: "center" }}>No.</th>
                                <th style={{ textAlign: "center" }}>Name</th>
                                <th style={{ textAlign: "center" }}>Email</th>
                                <th style={{ textAlign: "center" }}>Contact</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.map((contact, index) => (
                                <tr key={index}>
                                    <th scope="row">{index + 1}</th>
                                    <td>{contact.name}</td>
                                    <td>{contact.email}</td>
                                    <td>{contact.contact}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                ) : (
                    <p>No results found with the name</p>
                )
            )}
        </div>
    );
}

export default Search;
