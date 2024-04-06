import { useEffect, useState } from 'react';
import axios from 'axios';
import ReactMarkdown from 'react-markdown';

const Generate = () => {
    const [content, setContent] = useState('');
    const [prompt, setPrompt] = useState('Covert it into reality!');
    const [tempPrompt, setTempPrompt] = useState('Convert it into reality!');
    const [isLoading, setIsLoading] = useState(false); // new state variable for loading status

    const handleSubmit = () => {
        setIsLoading(true); // set loading to true at the start of the effect
        axios.get(`http://localhost:4000/generate?prompt=${prompt}`)
            .then(response => {
                setContent(response.data);
            })
            .catch(error => {
                console.error('There was an error!', error);
            })
            .finally(() => {
                setIsLoading(false); // set loading to false once the API call has completed
        });
        setPrompt(tempPrompt);
        const data = content;
        console.log(data);
        
    };

    return (
       <div className='h-[100vh] bg-[url(/src/assets/herobg.png)] pt-40'>
         <div className="bg-black text-white p-6 rounded-lg shadow-md max-w-md ml-4 mr-auto">
  <h1 className="text-3xl font-bold text-red-500 mb-4">Idea?</h1>
  <br />
  {isLoading ? (
    <p className="text-gray-400">Loading...</p>
  ) : (
    <ReactMarkdown className="prose prose-red">{content}</ReactMarkdown>
  )}
  <input
    type="text"
    value={tempPrompt}
    onChange={e => setTempPrompt(e.target.value)}
    className="mt-4 bg-gray-800 text-white border-none rounded-md p-2 w-full"
  />
  <br />
  <br />
  <button
  onClick={handleSubmit}
  className="mt-4 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded shadow"
>
  Generate
</button>
  <br />
  <br />
  <a href="/" className="text-red-500 hover:underline">
    Go to Home
  </a>
</div>
       </div>
    );
};

export default Generate;

