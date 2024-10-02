import axios from 'axios';
import React, { useEffect, useState } from 'react';

function Chatbot({ questions, allDiv, setAllDiv }: any) {
  const [chat, setChat] = useState<string>('');
  const [result, setResult] = useState<string>('');

  

  useEffect(() => {
    if (questions != null) {
      setAllDiv([...allDiv, questions]);
    }
  }, [questions]);

  console.log(allDiv);
  const [useDataService,setUserDataService]=useState<typeOfUser|null>();



  interface typeOfUser{
    name : number,
    emailid : String,
    phone : number,
    serviceID: String
  }

  async function PassData() {
    
    const response = await axios.get("http://localhost:3001/question-store?que=" + chat);
    setChat('');
    console.log(response.data);

    if(!response.data?.name){
      
      const newData: string = `<p> ${response.data}</p>`;
      setAllDiv([...allDiv,newData]);
    }
    else{
      console.log(response.data)
      setUserDataService(response.data)
      setAllDiv([]);

    }
    
  }

  return (
    <div className="fixed bottom-20 right-10 bg-white shadow-lg border border-gray-200 p-4 rounded-lg w-[26rem] h-5/6">
      <h2 className="text-xl font-semibold mb-3">Chatbot</h2>

      {/* Container for the chat messages with scrollable feature */}

      {
        useDataService?
        <div>
          <h1 className='text-2xl font-semibold'
          >Hello user this is your Information And Service Id</h1>
          <p className='text-xl'>Name: {useDataService.name}</p>
          <p className='text-xl' >Email Id: {useDataService.emailid}</p>
          <p className='text-xl'>Phone No.: {useDataService.phone}</p>
          <p className='text-xl'>{useDataService.serviceID}</p>



        </div>
        :
      

      
      <div className="overflow-y-auto h-[70%] pr-2">
        {allDiv?.map((singleDiv: any, ind: number) => {
          return (
            <div
              className="bg-gray-200 text-black w-5/6 rounded my-4 p-2"
              key={ind}
              dangerouslySetInnerHTML={{ __html: singleDiv }}
            >
            </div>
          );
        })}
      </div>
}


      <div className="absolute bottom-3 w-[90%] flex">
        <input
          type="text"
          className="border p-2 rounded-lg flex-grow"
          placeholder="Enter prompt"
          value={chat}
          onChange={(e) => setChat(e.target.value)}
        />
        <button onClick={PassData} className="p-2 bg-black text-white rounded-lg">Submit</button>
      </div>
    </div>
  );
}

export default Chatbot;
