import { useState } from 'react';
import Chatbot from './Chatbot';
import axios from 'axios';

const App: React.FC = () => {
  const [showChatbot, setShowChatbot] = useState(false);

  const handleLogoClick = () => {
    setShowChatbot((prev)=>!prev)
  };

  const [cateogryId,setCategoryId]=useState<string|null>('');
  const [questions,setQuestions]=useState<string|null>();

  async function  handleSubmit (e:React.FormEvent<HTMLFormElement>){

    e.preventDefault();
    console.log(cateogryId)
      const getOutPut= await axios.get("http://localhost:3001/check?propmt="+cateogryId)
      setQuestions(getOutPut.data.content);
      if(allDiv!=null){
        setAllDiv([]);
      }

  }
  console.log(questions)
  

  const [allDiv,setAllDiv]=useState<any>([]);

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100 relative">
      {/* Logo Div */}
      { (
        <div
          className="w-8 h-8 bg-gray-800 rounded-full  absolute bottom-10 right-10  cursor-pointer flex items-center justify-center"
          onClick={handleLogoClick}
        >
          <img src="https://easydrawingguides.com/wp-content/uploads/2021/09/how-to-draw-monkey-d-luffy-from-one-peace-featured-image-1200.png" 
          alt="Logo" 
          className="w-full h-full rounded-full" /> {/* Replace with your logo */}
        </div>
      )}

      

      <form onSubmit={(e)=>handleSubmit(e)}>
        <input placeholder='Provide me Category Id'
        className='p-2 ring-1 ring-black rounded-lg'
        onChange={(e)=>setCategoryId(e.target.value)}
        value={String(cateogryId)}
        
        />
        <button
        className='p-2 bg-black text-white rounded-lg'
        type='submit'>Submit</button>
      </form>

      {/* Chatbot display */}
      {showChatbot && <Chatbot questions={questions} allDiv={allDiv} setAllDiv={setAllDiv} />}
    </div>
  );
};

export default App;
