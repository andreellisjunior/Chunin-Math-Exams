import React, { useEffect } from 'react';
import { useAppContext } from './context/AppContext';
import { Link, useNavigate } from 'react-router-dom';

function App() {
  const { name, setName } = useAppContext();
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setName(value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(name);
    localStorage.setItem('name', JSON.stringify(name));
    navigate('/difficulty');
  };

  const savedName = JSON.parse(localStorage.getItem('name')!);
  useEffect(() => {
    if (savedName) setName(savedName);
  }, [savedName, setName]);

  console.log(name, localStorage.getItem('name'));

  return (
    <div className='flex flex-col justify-between items-center py-24 gap-12 h-full'>
      <div className='text-center'>
        <h1 className='font-heading text-7xl text-center mb-2'>
          Chunin Math Exams
        </h1>
        <p className='font-body font-light uppercase tracking-[5px]'>
          Test your math skills
        </p>
      </div>
      {!savedName ? (
        <form onSubmit={handleSubmit} className='w-full'>
          <div className='flex flex-col w-full items-center gap-2'>
            <h4 className='text-2xl font-body'>What's your first name?</h4>
            <input
              type='text'
              name='firstName'
              className='mt-auto bg-transparent border p-4 text-center w-full rounded-3xl text-white font-body text-xl'
              placeholder='First name...'
              onChange={(e) => handleChange(e)}
              required
            />
            <button
              className='bg-[#008B37] w-full border rounded-3xl p-4 font-body'
              type='submit'
            >
              GET STARTED
            </button>
          </div>
        </form>
      ) : (
        <div className='flex flex-col w-full items-center gap-5'>
          <h2 className='text-2xl font-body'>Welcome Back, {name}!</h2>
          <Link
            to='/difficulty'
            className='bg-[#008B37] w-full border rounded-3xl p-4 font-body text-center'
          >
            CONTINUE
          </Link>
        </div>
      )}
    </div>
  );
}

export default App;
