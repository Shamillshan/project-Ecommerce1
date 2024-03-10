import React, { useState } from 'react';
import { MdDriveFolderUpload } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';  // Import useNavigate
import { ImagetoBase64 } from '../utility/ImagetoBase64';
import toast from 'react-hot-toast';

const Newproduct = () => {
  const navigate = useNavigate();  // Initialize the useNavigate hook
  const [data, setData] = useState({
    name: '',
    category: '',
    image: '',
    price: '',
    description: '',
  });

  const handleOnChange = (e) => {
    const { name, value } = e.target;

    setData((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const uploadImage = async (e) => {
    const data = await ImagetoBase64(e.target.files[0]);

    setData((prev) => {
      return {
        ...prev,
        image: data,
      };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, image, category, price } = data;

    if (name && image && category && price) {
      const fetchData = await fetch(`${process.env.REACT_APP_SERVER_DOMAIN}/uploadProduct`, {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const fetchRes = await fetchData.json();
      toast(fetchRes.message);

      setData(() => {
        return {
          name: '',
          category: '',
          image: '',
          price: '',
          description: '',
        };
      });

      // Navigate to AdminDashboard page after successful submission
      navigate('/admin');
    } else {
      toast('Enter Required fields');
    }
  };

  return (
    <div className="p-4 ">
      <form className='m-auto w-full max-w-md shadow flex flex-col p-3 bg-white' onSubmit={handleSubmit}>
        <label htmlFor='name'>Name</label>
        <input type={'text'} name='name' id='name' className='bg-slate-200 p-1 my-1' onChange={handleOnChange} value={data.name}/>

        <label htmlFor='category'>Category</label>
        <select className='bg-slate-200 p-1 my-1' id='category' name='category' onChange={handleOnChange} value={data.category}>
          <option value={"other"}>Select Category</option>
          <option value={"headphones"}>Headphones</option>
          <option value={"earbuds"}>Earbuds</option>
          <option value={"earphones"}>Earphones</option>
          <option value={"neckbands"}>Neckbands</option>
        </select>

        <label htmlFor='image'>Image
        <div className='h-40 w-full bg-slate-200 rounded flex items-center justify-center cursor-pointer'>
          {
              data.image ? <img src={data.image} className='h-full'/> : <span className='text-6xl'><MdDriveFolderUpload /></span>
          }
          
      
          <input type={'file'} accept='image/*' id="image" onChange={uploadImage} className='hidden'/>
        </div>
        </label>

        <label htmlFor='price' className='my-1'>Price</label>
        <input type={"text"} className='bg-slate-200 p-1 my-1' name='price' id='price' onChange={handleOnChange} value={data.price}/>

        <label htmlFor='description'>Description</label>
        <textarea rows={2}  className='bg-slate-200 p-1 my-1 resize-none' name='description' id='description' onChange={handleOnChange} value={data.description}></textarea>

        <button className='bg-black text-white hover:bg-red-500 text-lg font-medium my-1 drop-shadow'>Save</button>

      </form>
    </div>
  )
}

export default Newproduct