import User from "../models/User.js";
import Wallet from "../models/Wallet.js";
import bcrypt from 'bcryptjs'
import jwt  from "jsonwebtoken";

//user registration
export const register = async (req, res) =>{
    try{

        //hashing password
        const username=req.body.username;
        const email=req.body.email;
        const password = req.body.password
        const photo=req.body.photo
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(password, salt);

        // const newUser = new User({
        //     username: req.body.usernme,
        //     email: req.body.email,
        //     password: hash,
        //     photo: req.body.photo
        // });
    const user=await User.create({
        username: username,
        email: email,
        password: hash,
        photo: photo,

    })
      //  await newUser.save();

        res.status(200).json({
            user:user,
            success:true, 
            message:'Successfully created'
        });

        // Automatically create a wallet for the user with a default balance
        await Wallet.create({
            userId: user._id,
            balance: 0,
        });

    } catch (err) {
        console.log(err)
        res.status(500).json({
            success:false, 
            message:'failed to create, try again'
        });
    }
}

//user login
export const login = async(req, res) =>{
    
    const email = req.body.email;
console.log(req.body)
    try{
        const user = await User.findOne({email})
    //  if user dosen't exist
    if(!user){
        return res.status(404).json
        ({
            success:false,
            message:"User not found"
        })
    }

 //   if user exist then check the password or compare password
        const checkCorrectPassword = await bcrypt.compare(
            req.body.password, 
            user.password
            )

     // if password is incorrect
     if(!checkCorrectPassword){
        return res.status(401).json
        ({
            success:false, 
            message:'Incorrect email or password'
        });
     }   
     
     const { password, role, ...rest } = user._doc;

     //create jwt token
     const token = jwt.sign(
        {id: user._id, role: user.role},
        process.env.JWT_SECRET_KEY,
        { expiresIn: "15d" }
     );

     //set token in the browser cookies 
     //and send the response to the client
        res.cookie('accessToken', token, {
            httpOnly: true,
            expires:token.expiresIn
        }).status(200).json
            ({
                token,
                data: {...rest},
                role,
                message:"Succesfully Signed in"
            });   
    } catch (err) {
        res.status(500).json
        ({
            success:false, 
            message:"Failed to login"
        });
    }
}