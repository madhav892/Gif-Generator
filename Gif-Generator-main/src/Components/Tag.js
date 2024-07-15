
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Spinner from './Spinner';
const API_KEY = process.env.REACT_APP_GIPHY_API_KEY || 'Xr0MBP9JBTftSYWFkfMLC70Sq5dgTxA7';

const Tag = () => {
  const [gif, setGif] = useState('')
    const [loading, setLoading] = useState(false)
    const [tag , setTag] =useState('')

    async function fetchData() {
        setLoading(true); // Start loading
        const url = `https://api.giphy.com/v1/gifs/random?api_key=${API_KEY}&tag=${tag}`;
        const output = await axios.get(url);
        const imageSource = output.data.data.images.downsized_large.url;
        setGif(imageSource);
        setLoading(false); // End loading
    }

    useEffect(() => {
        fetchData();
    }, [])

    function clickHandler() {
        fetchData();
    }
    function ChangeHandler(event){
      setTag(event.target.value)
    }

    return (
        <div className='w-1/2  bg-green-400 rounded-lg border border-black flex flex-col items-center gap-y-5 mt-[15px]'>
            <h1 className='text-2xl mt-[15px] underline uppercase font-bold'>Random {tag} Gif </h1>
            {
                loading ? (<Spinner />) : (<img width="400" src={gif} alt="gif" />)
            }

            <input
            className='w-10/12 text-lg py-2 rounded-lg mb-[3px] text-center'
            value={tag}
            onChange={ChangeHandler}
            />

            <button className='w-10/12 mb-[20px] bg-green-700 text-lg rounded-lg text-white' onClick={clickHandler}>Generate</button>
        </div>
    )
}

export default Tag