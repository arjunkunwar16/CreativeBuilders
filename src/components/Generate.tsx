import { useEffect, useState } from 'react';
import axios from 'axios';
import ReactMarkdown from 'react-markdown';

const Generate = () => {
    const [content, setContent] = useState('');
    const [prompt, setPrompt] = useState('hi');
    const [tempPrompt, setTempPrompt] = useState('hi');
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
        <div>
            <h1>Generated Content</h1>
            {isLoading ? <p>Loading...</p> : <ReactMarkdown>{content}</ReactMarkdown>} {/* display loading text when loading, otherwise display the content */}
            <input type="text" value={tempPrompt} onChange={e => setTempPrompt(e.target.value)} />
            <button onClick={handleSubmit}>Submit</button>
            <br/>
            <br/>
            <a href="/">Go to Home</a>
        </div>
    );
};

export default Generate;