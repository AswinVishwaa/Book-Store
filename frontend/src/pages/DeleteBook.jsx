import React,{useState} from 'react';
import Backbutton from '../Components/Backbutton';
import Spinner from '../Components/Spinner';
import { useNavigate,useParams } from 'react-router-dom';
import axios from 'axios';
import { useSnackbar } from 'notistack';

const DeleteBook = () => {
  const [loading,setLoading] = useState(false);
  const {id} = useParams();
  const navigate = useNavigate();
  const {enqueueSnackbar} = useSnackbar();
  const HandleDeleteBook = () =>{
    setLoading(true);
    axios
      .delete(`http://localhost:3000/book/${id}`)
      .then(()=>{
        setLoading(false);
        enqueueSnackbar('Successfully deleted the book',{variant:"success"});
        navigate('/');
      })
      .catch((error) =>{
        setLoading(false);
        console.log(error);
        enqueueSnackbar("An error occured",{variant:'error'});
        //alert("An error has Occured Please Check the Console");
      })
  };
  return (
    <div className='p-4'>
      <Backbutton />
      <h1 className='text-3xl my-4'>Delete Book</h1>
      {loading?<Spinner />:''}
      <div className='flex flex-col items-center border-2 border-sky-400 rounded-xl p-8 w-[600px] mx-auto'>
        <h3 className='text-2xl text-red-600'>Are you sure want to Delete the Book?</h3>
        <button className='p-4 bg-red-600 text-white m-8 w-full' onClick={HandleDeleteBook}>Delete</button>
      </div>
    </div>
  )
}

export default DeleteBook
