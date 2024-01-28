import logo from './logo.svg';
import './App.css';
import Navbar from './Navbar';
import TableData from './TableData';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <div className="eduall-schools">
       <ToastContainer />
       <Navbar  /><br/><br/><br/><br/>
       <TableData />

       { /**Mongodb passowrd r91KIAaG0tgIugWu  kiossocamuegi*/}
    </div>
  );
}

export default App;
