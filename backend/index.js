
import express from 'express';
import fs from 'fs';
import csv from 'csv-parser'
import "dotenv/config";
import cors from "cors"
import {services} from "./data.js"

const port=process.env.PORT

const app = express();
app.use(express.json());

app.use(cors())


/////////////////////////////////chat gpt

import OpenAI from 'openai';





/*

1. user give chatbot a id "Category ID" then chatbot reply with 
hii i am luffy i am here to help you and reture the category name

2. user again enter the category name and in reply chatbot ask a question based on that category name 

3. and later chatbot ask users information and show the user a specific service id





*/


let theQuestion=null;





app.get("/check", async (req, res) => {
  const { propmt } = req.query;



  const chatCompletion = await client.chat.completions.create({
    messages: [
      { role: 'system', content: 'You are a helpful assistant. Your name is Luffy. ' },
      { role: 'user', content: 'Here is the data on the basis of which you reply to the user. You will reply with a category name, and the user will provide you a category ID: ' + JSON.stringify(services) },
      { role: 'user', content: 'This is the category ID: ' + propmt },
      {role:'system', content:"replay with the category name and ask both question with the option and also say hi to the user and tell your name and also apply tailwind css to your name to look better"},
      {role:'system', content:"cover with p tag "}
    ],
    model: 'gpt-3.5-turbo',
  });

  theQuestion=chatCompletion.choices[0].message;


   res.json(chatCompletion.choices[0].message);




});


let serviceId=null;



let userData={
  name:"",
  emailid:"",
  phone:"",
  serviceID:""
};

let numbers=1;

app.get("/question-store", async (req, res) => {
  const { que } = req.query;

  if(numbers===1){

  

  const chatCompletion = await client.chat.completions.create({
    messages: [
      { role: 'system', content: 'You are a helpful assistant. Your name is Luffy. ' },
      { role: 'system', content: 'Here is the data on the basis of which you reply to the user. You will reply with a category name, and the user will provide you a answer of the questions: ' + JSON.stringify(services) },
      
      { role: 'user', content: 'This is the both ansser ' + que },
      
      { role: 'system', content: 'on the basis of'+theQuestion+ 'user send you the both answer on that questions you reply a service id ' },
    ],
    model: 'gpt-3.5-turbo',
  });
  serviceId=chatCompletion.choices[0].message.content;

  userData.serviceID=serviceId;
  numbers=numbers+1;

  res.send(" Enter your the Name");
  return;
}


if(numbers===2){

userData.name=que;
numbers=numbers+1;
res.send("Enter Email Id")
return;


}

if(numbers===3){
  userData.emailid=que;
  numbers=numbers+1;
  res.send("Enter Mobile Number")
  return;
}

if(numbers===4){
  userData.phone=que;
  numbers=1;
  const temp=userData;
  userData={
    name:"",
    emailid:"",
    phone:"",
    serviceID:""
  };
  res.send(temp)
  return;

}



});








const client =  new OpenAI({
    apiKey: process.env.GPT_API_KEY, // This is the default and can be omitted
  });
// console.log(OPENAI_API_KEY)


// const firstData= await client.chat.completions.create({
//   messages: [{ role: 'user', content: services+'\n   this is data' }],
//   model: 'gpt-4',
// });

// console.log(services)

// console.log( "this is data"+ firstData.choices[0].message.content)



  

  app.get("/let",async(req,res)=>{
    const {pro}=  req.query;

    const chatCompletion = await client.chat.completions.create({
          messages: [{ role: 'user', content: pro }],
          model: 'gpt-4',
        });

       
      
      
      

      res.json(chatCompletion.choices[0].message.content)

  })





app.listen(port, () => {
  console.log('Server running on port ',port);
});
