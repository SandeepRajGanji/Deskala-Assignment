const express = require("express");
const bcrypt = require("bcrypt");
const router = express.Router();
const Schemas = require('../models/Schemas.js');
// const { Candidates } = require("../models/Schemas.js");
const jwt = require("jsonwebtoken");



/* router.get('/register',async(request,response) =>{
    const user = {emailId:"random@ranodm.com",phoneNumber:"1234567890",password:"randomPassword"};
    const newUser = new Schemas.Users(user);

    try{
        await newUser.save( async(error,newUserResult) =>{
            console.log("New user created");
            response.send("New user created");
        });
    }catch(error){
        console.log(error);
        response.send("User not added");
    }
});*/

// Register 
router.post('/register',  async(request, response) => {
    const {emailId,phoneNumber,password} = request.body
    const user = Schemas.Users;
    const findEmailId = await user.findOne({emailId:emailId}).exec();
    // console.log(request.body)
    // console.log(findEmailId)
   if(findEmailId === null){
         const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new Schemas.Users({
            emailId: emailId,
            phoneNumber:phoneNumber,
            password:hashedPassword
        });
       
        try {
            await newUser.save((error, newUserResults) => {
                if (error){
                    const errorMsg = {
                        message : 'Error Saving.'
                    };
                    response.send(errorMsg);
                }else{
                    const responseMsg = {
                        message:"User Created Successfully"
                    };
                    response.send(responseMsg);
                    response.status(200)
                    // response.redirect('/login')
                }
              
            });
        } catch(error) {
            const errorMsg = {
                message : 'Error Saving.'
            };
            response.send(errorMsg);
            // response.redirect('/register');
        }
    }else{
        const errorMsg = {
            message:"User already exists"
        };
        response.send(errorMsg);

    }
    
});

// Login
router.post('/login',  async(request, response) => {
    const {emailId,password} = request.body
    const user = Schemas.Users;
    const findEmailId = await user.findOne({emailId:emailId}).exec();
    // console.log(request.body)
     console.log(findEmailId)
   if(findEmailId !== null){
        
        const checkPassword = await bcrypt.compare(password, findEmailId.password);
        if (checkPassword === true) {
            const payload = { emailId: emailId };
            const jwtToken = jwt.sign(payload, "secret_key");
            response.send({ jwtToken });
            response.status(200)
            // response.redirect('/candidates')
        } else {
            const errorMsg = {
                message : "Invalid password"
            };
            response.status(401)
            response.send(errorMsg);
        }
        
    }else{
        const errorMsg = {
            message:"User doesn't exists. Enter a valid credentials"
        };
        response.status(401)
        response.send(errorMsg);

    }
    
});

// Adding Candidates
router.post('/add-candidate',  async(request, response) => {
    const {name,dateOfBirth,age,address,selectState,pincode,emailId} = request.body

        
        const candidate = Schemas.Candidates;
        const findEmailId = await candidate.findOne({emailId:emailId}).exec();
        // console.log(request.body)
        // console.log(findEmailId)
        if(findEmailId === null){
            const newCandidate = new Schemas.Candidates({
                name:name,
                dateOfBirth:dateOfBirth,
                age:age,
                emailId:emailId,
                address:address,
                state:selectState,
                pincode:pincode,
                shortList:false,
            });
           
            try {
                await newCandidate.save((error, newUserResults) => {
                    if (error){
                        const errorMsg = {
                            message : 'Error adding Candidate.'
                        };
                        response.send(errorMsg);
                    }else{
                        const responseMsg = {
                            message:"Candidate added Successfully"
                        };
                        response.send(responseMsg);
                        response.status(200)
                        // response.redirect('/candidates')
                    }
                  
                });
            } catch(error) {
                const errorMsg = {
                    message : 'Error adding Candidate sag.'
                };
                response.send(errorMsg);
                
            }
        }else{
            const errorMsg = {
                message:"Candidate already exists"
            };
            
            response.send(errorMsg);
    
        }
});

// Getting All Candidates Data
router.get('/candidates',  async(request, response) => {
    const candidates = Schemas.Candidates;

    // this code will get all tweets
    //const userTweets = await tweets.find({}, (err, tweetData) => {

    // this code will get all tweets and join the user table
    const candidatesList = await candidates.find({}).exec((err, candidateData) => {
        if (err) throw err;
        if (candidateData) {
            response.send(JSON.stringify(candidateData));
            response.status(200);
        } 
    });
    
});

// Updating Result Status of Candidates
router.put("/candidatesResult",async(request,response) =>{
    const {id} = request.body 
    console.log(id)
    const candidates = Schemas.Candidates;
    const candidateRequest = await candidates.findById(id)
    if(candidateRequest.shortList === "ShortList")
    {
        candidateRequest.shortList = "Rejected"
    }else{
        candidateRequest.shortList = "ShortList"
    }
    const temp  = await candidateRequest.save()
    const resultMsg = {
        message :"Candidate result updated successfully"
    }
    response.send(resultMsg)
    response.status(200)
})

// Getting candidate data based on id for updating 
router.get('/candidates/:id',  async(request, response) => {
    const {id} = request.params
    const candidates = Schemas.Candidates;

    // this code will get all tweets
    //const userTweets = await tweets.find({}, (err, tweetData) => {

    // this code will get all tweets and join the user table
     const candidatesList = await candidates.findById(id).exec((err, candidateData) => {
        if (err) throw err;
        if (candidateData) {
            response.send(JSON.stringify(candidateData));
            response.status(200);
        } 
    });

});

// Updating candidate data
router.put("/update-candidate",async(request,response) =>{
    const {id,name,dateOfBirth,age,emailId,address, selectState,pincode} = request.body 
    
    const candidates = Schemas.Candidates;
    const candidateRequest = await candidates.findById(id)
    candidateRequest.name = name
    candidateRequest.dateOfBirth = dateOfBirth
    candidateRequest.age = age
    candidateRequest.emailId = emailId
    candidateRequest.address = address
    candidateRequest.state = selectState
    candidateRequest.pincode = pincode
    await candidateRequest.save()
    const resultMsg = {
        message :"Candidate data updated successfully"
    }
    response.send(resultMsg)
    response.status(200)
})


// Deleting candidate data
router.delete("/candidates",async(request,response) =>{
    const {id} = request.body 
    console.log(id)
    const candidates = Schemas.Candidates;
    const candidateRequest = await candidates.deleteOne({_id:id})
    
    const resultMsg = {
        message :"Candidate deleted successfully"
    }
    response.send(resultMsg)
    response.status(200)
})


module.exports = router;