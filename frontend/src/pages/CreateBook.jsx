import React, {useState} from 'react';
import Spinner from '../Components/Spinner';
import Backbutton from '../Components/Backbutton';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useSnackbar } from 'notistack';

const CreateBook = () => {
  const [title,setTitle] = useState('');
  const [author,setAuthor] = useState('');
  const [publishYear,setPublishyear] = useState('');
  const [loading,setLoading] = useState(false);
  const navigation = useNavigate();
  const {enqueueSnackbar} = useSnackbar();
  const HandleSaveBook = () =>{
    const data = {
      title,
      author,
      publishYear
    };
    setLoading(true);
    axios
      .post(`http://localhost:3000/book`,data)
      .then(() =>{
        setLoading(false);
        enqueueSnackbar('Book created Successfully', {variant:'success'});
        navigation('/');
      })
      .catch((error) =>{
        console.log(error);
       // alert(`please check the console an error happened`);
        enqueueSnackbar('unexpected error occured',{variant:'error'})
        setLoading(false);
      })  
  };
  return (
    <div className='p-4'>
      <Backbutton />
      <h1 className='text-3xl my-4'>Create Book</h1>
      {loading ?<Spinner />:''}
    <div className='flex flex-col border-2 border-sky-400 rounded-xl w-[600px] p-4 mx-auto'>
      <div className='my-4'>
        <label className='text-xl mr-4 text-gray-500'>Title</label>
        <input type="text" value={title} onChange={(e) => setTitle(e.target.value)}
        className='border-2 border-gray-400 px-4 py-2 w-full'
        />
      </div>
      <div className='my-4'>
      <label className='text-xl mr-4 text-gray-500'>Author</label>
        <input type="text" value={author} onChange={(e) => setAuthor(e.target.value)}
        className='border-2 border-gray-400 px-4 py-2 w-full'
        />
      </div>
      <div className='my-4'>
      <label className='text-xl mr-4 text-gray-500'>Publish Year</label>
        <input type="text" value={publishYear} onChange={(e) => setPublishyear(e.target.value)}
        className='border-2 border-gray-400 px-4 py-2 w-full'
        />
      </div>
      <button className='p-2 bg-sky-300 m-8' onClick={HandleSaveBook}>Save</button>
    </div>
    </div>
  )
}

export default CreateBook
