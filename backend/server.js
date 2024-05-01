
// import express from 'express';
// import cors from 'cors';
// import { createClerkClient } from '@clerk/clerk-sdk-node';
// import bodyParser from 'body-parser';

const express = require('express')
const cors = require('cors')
const { createClerkClient } = require('@clerk/clerk-sdk-node');
bodyParser = require("body-parser");




const app = express();
const port = 3001;

const clerkClient = createClerkClient({ secretKey: 'YOUR_CLERK_SECRET_KEY'})
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

app.post('/publishTextImage',async (req, res) => {
  
  const imageData = req.body.image;
  const base64Data = imageData.replace(/^data:image\/\w+;base64,/, '');
  const image = Buffer.from(base64Data, 'base64');
  

  // Getting access Token of linkedin from clerk
  const token = await clerkClient.users.getUserOauthAccessToken(req.body.userID, provider);
  
  // Getting userID from linkedin, required in future api call
  var response  = await fetch ('https://api.linkedin.com/v2/userinfo',{
    headers: {
      'Authorization': `Bearer ${token[0].token}`,
    },
  });

  const data = await response.json();

  

  // registering image
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
// res.json({"stauts":"ok"});

});



const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}...`);
});
// app.listen(port);