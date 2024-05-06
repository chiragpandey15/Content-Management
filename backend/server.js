
// import express from 'express';
// import cors from 'cors';
// import { createClerkClient } from '@clerk/clerk-sdk-node';
// import bodyParser from 'body-parser';

const express = require('express')
const cors = require('cors')
const { createClerkClient } = require('@clerk/clerk-sdk-node');
bodyParser = require("body-parser");
const admin = require('firebase-admin');
// import admin from 'firebase-admin';


const app = express();
const port = 3001;

const  serviceAccount = require("./service-account-key.json");
const databaseName = 'linkedin-post'

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();

const clerkClient = createClerkClient({ secretKey: 'YOUR_SECRET_KET'})
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

// app.post('/fetchUserPosts', async (req,res)=>{
//   let body = req.body;
  
//   // Getting access Token of linkedin from clerk
//   const token = await clerkClient.users.getUserOauthAccessToken(body.userID, provider);
  
//   try {

//      // Getting userID from linkedin, required in future api call
//   var response  = await fetch ('https://api.linkedin.com/v2/userinfo',{
//     headers: {
//         'Authorization': `Bearer ${token[0].token}`,
//       },
//     });

//   const data = await response.json();
//       console.log(`https://api.linkedin.com/rest/posts?author=urn%3Ali%3Aperson%3A${data.sub}&q=author&count=10&sortBy=LAST_MODIFIED`);
//       console.log(token[0].token);

//       response = await fetch(`https://api.linkedin.com/rest/posts?author=urn%3Ali%3Aperson%3A${data.sub}&q=author&count=10&sortBy=LAST_MODIFIED`, {
//         headers: {
//           'Authorization': `Bearer ${token[0].token}`,
//           'X-RestLi-Method':'FINDER',
//           'X-Restli-Protocol-Version': '2.0.0',
//           'LinkedIn-Version':'202301'
//         }});

//       // Process posts
//       console.log(response);
//       const posts = response.data.elements;
//       for (const post of posts) {
//           console.log(post.id);
//           console.log(post.content);
//           // await fetchPostReactions(post.id);
//       }
//   } catch (error) {
//       console.error('Error fetching user posts:', error);
//   }
// });


app.get('/publishScheduledPost',async (req,res) => {
    workAsScheduled();
    res.send("ok");
});





// const PORT = process.env.PORT || 8080;
// app.listen(PORT, () => {
//   console.log(`Server listening on port ${PORT}...`);
// });
app.listen(port);