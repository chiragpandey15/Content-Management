
const express = require('express')
const cors = require('cors')
const { createClerkClient } = require('@clerk/clerk-sdk-node');
bodyParser = require("body-parser");
const admin = require('firebase-admin');

const dotenv = require('dotenv');
const {GoogleGenerativeAI} = require('@google/generative-ai');
const { collection, query, where, getDocs, documentId } = require('firebase/firestore');


dotenv.config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);


const app = express();
const port = 3001;

const  serviceAccount = require("./service-account-key.json");
const databaseName = 'linkedin-post'

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();

const clerkClient = createClerkClient({ secretKey: process.env.CLERK_SECRET_KEY})
const provider = 'oauth_linkedin_oidc';

app.use(cors({
  origin: '*'
}))

app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

app.get('/',(req,res)=>{
  res.send("Hello from the server");
});

app.post('/publishText',async(req,res)=>{
  let body = req.body;
  
  // Getting access Token of linkedin from clerk
  const token = await clerkClient.users.getUserOauthAccessToken(body.userID, provider);
  
  // Getting userID from linkedin, required in future api call
  var response  = await fetch ('https://api.linkedin.com/v2/userinfo',{
    headers: {
      'Authorization': `Bearer ${token[0].token}`,
    },
  });

  const data = await response.json();

  if(body.image!=undefined){
    // registering image

    const imageData = req.body.image;
    const base64Data = imageData.replace(/^data:image\/\w+;base64,/, '');
    const image = Buffer.from(base64Data, 'base64');
      console.log("Hi");
      response = await fetch('https://api.linkedin.com/v2/assets?action=registerUpload', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token[0].token}`,
          'Content-Type': 'application/json',
          'X-Restli-Protocol-Version': '2.0.0'
        },
        body: JSON.stringify(
          {
            "registerUploadRequest": {
                "recipes": [
                    "urn:li:digitalmediaRecipe:feedshare-image"
                ],
                "owner": `urn:li:person:${data.sub}`,
                "serviceRelationships": [
                    {
                        "relationshipType": "OWNER",
                        "identifier": "urn:li:userGeneratedContent"
                    }
                ]
            }
        }
        )
      });

      const uploadRequest = await response.json();

      // Uploading image
      await fetch(`${uploadRequest.value.uploadMechanism['com.linkedin.digitalmedia.uploading.MediaUploadHttpRequest'].uploadUrl}`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token[0].token}`,
          'Content-Type': 'image/png'
        },
        body: image
      });
      
      
      // Uploading content 
      await fetch('https://api.linkedin.com/v2/ugcPosts', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token[0].token}`,
        'Content-Type': 'application/json',
        'X-Restli-Protocol-Version': '2.0.0'
      },
      body: JSON.stringify({
        "author": `urn:li:person:${data.sub}`,
        "lifecycleState": "PUBLISHED",
        "specificContent": {
          "com.linkedin.ugc.ShareContent": {
            "shareCommentary": {
              "text": body.text
            },
            "shareMediaCategory": "IMAGE",
            "media": [
                {
                    "status": "READY",
                    "media": `${uploadRequest.value.asset}`,
                    
                }
            ]
          }
        },
        "visibility": {
          "com.linkedin.ugc.MemberNetworkVisibility": "PUBLIC"
        }
      })
    });
  }
  else{
        // Share content
      await fetch('https://api.linkedin.com/v2/ugcPosts', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token[0].token}`,
          'Content-Type': 'application/json',
          'X-Restli-Protocol-Version': '2.0.0'
        },
        body: JSON.stringify({
          "author": `urn:li:person:${data.sub}`,
          "lifecycleState": "PUBLISHED",
          "specificContent": {
            "com.linkedin.ugc.ShareContent": {
              "shareCommentary": {
                "text": body.text
              },
              "shareMediaCategory": "NONE"
            }
          },
          "visibility": {
            "com.linkedin.ugc.MemberNetworkVisibility": "PUBLIC"
          }
        })
      })
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        console.log('LinkedIn API response:', data);
      })
      .catch(error => {
        console.error('Error:', error);
      });
  }
  


  res.json({"stauts":"ok"});
});


async function publishText(body){
  // Getting access Token of linkedin from clerk
  const token = await clerkClient.users.getUserOauthAccessToken(body.userID, provider);
  
  // Getting userID from linkedin, required in future api call
  var response  = await fetch ('https://api.linkedin.com/v2/userinfo',{
    headers: {
      'Authorization': `Bearer ${token[0].token}`,
    },
  });

  const data = await response.json();

  if(body.image!=undefined){
    // registering image

    const imageData = body.image;
    const base64Data = imageData.replace(/^data:image\/\w+;base64,/, '');
    const image = Buffer.from(base64Data, 'base64');
      console.log("Hi");
      response = await fetch('https://api.linkedin.com/v2/assets?action=registerUpload', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token[0].token}`,
          'Content-Type': 'application/json',
          'X-Restli-Protocol-Version': '2.0.0'
        },
        body: JSON.stringify(
          {
            "registerUploadRequest": {
                "recipes": [
                    "urn:li:digitalmediaRecipe:feedshare-image"
                ],
                "owner": `urn:li:person:${data.sub}`,
                "serviceRelationships": [
                    {
                        "relationshipType": "OWNER",
                        "identifier": "urn:li:userGeneratedContent"
                    }
                ]
            }
        }
        )
      });

      const uploadRequest = await response.json();

      // Uploading image
      await fetch(`${uploadRequest.value.uploadMechanism['com.linkedin.digitalmedia.uploading.MediaUploadHttpRequest'].uploadUrl}`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token[0].token}`,
          'Content-Type': 'image/png'
        },
        body: image
      });
      
      
      // Uploading content 
      await fetch('https://api.linkedin.com/v2/ugcPosts', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token[0].token}`,
        'Content-Type': 'application/json',
        'X-Restli-Protocol-Version': '2.0.0'
      },
      body: JSON.stringify({
        "author": `urn:li:person:${data.sub}`,
        "lifecycleState": "PUBLISHED",
        "specificContent": {
          "com.linkedin.ugc.ShareContent": {
            "shareCommentary": {
              "text": body.text
            },
            "shareMediaCategory": "IMAGE",
            "media": [
                {
                    "status": "READY",
                    "media": `${uploadRequest.value.asset}`,
                    
                }
            ]
          }
        },
        "visibility": {
          "com.linkedin.ugc.MemberNetworkVisibility": "PUBLIC"
        }
      })
    });
  }
  else{
        // Share content
      await fetch('https://api.linkedin.com/v2/ugcPosts', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token[0].token}`,
          'Content-Type': 'application/json',
          'X-Restli-Protocol-Version': '2.0.0'
        },
        body: JSON.stringify({
          "author": `urn:li:person:${data.sub}`,
          "lifecycleState": "PUBLISHED",
          "specificContent": {
            "com.linkedin.ugc.ShareContent": {
              "shareCommentary": {
                "text": body.text
              },
              "shareMediaCategory": "NONE"
            }
          },
          "visibility": {
            "com.linkedin.ugc.MemberNetworkVisibility": "PUBLIC"
          }
        })
      })
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        console.log('LinkedIn API response:', data);
      })
      .catch(error => {
        console.error('Error:', error);
      });
  }
}

async function createDocument(data) {
  try {
      // Collection and document reference
      const usersCollection = db.collection(databaseName);
      const newUserRef = usersCollection.doc(); // Auto-generated ID
      // Set the data in the document
      await newUserRef.set(data);
      console.log('Document created successfully!');
      return true;
  } catch (error) {
      console.error('Error creating document:', error);
  }
  return false;
}

app.post('/schedulePost',async (req, res) => {
  if(await createDocument(req.body))
    return res.json({'status':'ok'});
  else
    return res.json({'status':'Something went wrong.'});
});

async function workAsScheduled(){
  
  const collectionRef = db.collection(databaseName);

  const snapshot = await collectionRef.get();

  let now = new Date();
  
  date = now.getFullYear().toString() +"-"+now.getMonth().toString()+"-"+
  now.getDate().toString();

  time = now.getHours();
  
  console.log("Date Time: " + date +" "+time);
  const deletionPromises = [];

  try{
    
    snapshot.forEach(async document => {
        body = document.data();
        if(body.scheduledDate== date && body.scheduledTime == time){
          await publishText(body);
          deletionPromises.push(document.ref.delete());
        }
    });
    await Promise.all(deletionPromises);

  }catch(e){
    console.log(e);
  } 
  
}


app.get('/publishScheduledPost',async (req,res) => {
    workAsScheduled();
    res.send("ok");
});



async function grammarCheck(text){
  const model = genAI.getGenerativeModel({model:'gemini-pro'});
  
  const prompt = `${text} \n \n Give grammatically correct version of the above text.`;

  const result = await model.generateContent(prompt);

  const res = result.response.text();
  return res;
}

app.post('/checkGrammar', async (req,res)=>{
    let body = req.body;

    try{
      
      text = await grammarCheck(body.text);
      
      res.json({'text':text});
    }catch(error){
      console.log(error);
      res.json({'error':error});
    }
    
});


async function generateContent(topic,style){

  
  const prompt = `Give content for linkedin post for following topic and in following style. 
  \n\n Topic: ${topic} \n\n Style: ${style}`;
  console.log(prompt);
  
  const model = genAI.getGenerativeModel({model:'gemini-pro'});
  

  const result = await model.generateContent(prompt);

  const res = result.response.text();
  return res;
}


app.post('/generateContent',async (req,res)=>{
  let body = req.body;

  try{
    text = await generateContent(body.topic, body.style);
    console.log(text);
    res.json({'text':text});
  }catch(e){
    console.log(e);
    res.json({'error':e});
  }
});

app.get('/getScheduledPost',async (req,res)=>{
  userID = req.query.userID;
  console.log("Hi there");
  try{
    const collectionRef = db.collection(databaseName);

    const snapshot = await collectionRef.get();
    const post = [];

    snapshot.forEach(async document => {
        body = document.data();
        if(body.userID==userID){
          body.documentID = document.id;
          post.push(body);
        }
    });
    console.log(post);
    res.json(post);


  }catch(e){
    console.log(e);
    res.send({'error':e});
  }
});

app.post("/editSchedulePost",async (req,res)=>{
  body = req.body;

  try{
    let docPath = databaseName+'/'+body.documentID;

    delete req.body.documentID;

    db.doc(docPath).update(body)
    .then(() => {
      console.log('Document successfully updated!');
    })
    .catch((error) => {
      console.error('Error updating document:', error);
    });

  }catch(e){
    console.log(e);
    res.json({'error':e});
  }

});

app.post("/deleteSchedulePost", async (req,res)=>{
  body = req.body;
  console.log(req.body);
  try{
    console.log("In Delete");
    console.log(body);
    let docID = body.documentID;
    await db.collection(databaseName).doc(docID).delete();
    
    res.json({'status':'ok'});
  }catch(e){
    console.log(e);
    res.json({"error":e});
  }
});


const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}...`);
});
// app.listen(port);
