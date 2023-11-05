import {useContext, useState} from 'react'
import './login.scss'
import { signInWithEmailAndPassword } from "firebase/auth";
import {auth} from '../../firebase'
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { AuthContext } from '../../context/AuthContext';

const Login = () => {
    const [error, setError] = useState(false)
  
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate()

    const { dispatch } = useContext(AuthContext)

    const handleLogin = (e) => {
        e.preventDefault();

        signInWithEmailAndPassword(auth, email, password)
          .then((userCredential) => {
            // Signed in
            const user = userCredential.user;
            // console.log(user)
            dispatch({type:"LOGIN", payload:user})
            // navigate("/home")
            toast.success('Login Successfully');
            setTimeout(() => navigate('/home'), 300);
          })
          .catch((error) => {
            setError(true);
            toast.error(error.message);
          });
      };

  return (
  
      <div className="login">
        <div className=''>
          <form onSubmit={handleLogin}>
            <input
              type="email"
              placeholder="email"
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              placeholder="password"
              onChange={(e) => setPassword(e.target.value)}
            />
            <button type="submit">Login</button>
            {error && <span>Wrong email or password!</span>}
          </form>
          <div className='text-red-500 mt-10'>
          <h1>Use this as login details</h1>
          <p>admin@toyo.dev</p>
          <p>password: 123456</p>
        </div>
        </div>
        
      </div>
      

    
  )
}

export default Login