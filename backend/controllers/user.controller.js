import getDataUri from "backend/utils/datauri.js";
import { User } from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import cloudinary from "backend/utils/cloudinary.js";

export const register = async (req, res) => {
    try {
        const { fullname, email, phoneNumber, password, role } = req.body;
        if (!fullname || !email || !phoneNumber || !password || !role) {
            return res.status(400).json({
                message: "Required Fields Imcomplete",
                success: false
            });
        };
        const file = req.file;
        const fileUri=getDataUri(file);
        const cloudResponse = await cloudinary.uploader.upload(fileUri.content);

        const user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({
                message: 'User already exists with this Email.',
                success: false,
            });
        };
        const hashedPassword = await bcrypt.hash(password, 10);

        await User.create({
            fullname,
            email,
            phoneNumber,
            password: hashedPassword,
            role,
            profile:{
                profilePhoto: cloudResponse.secure_url,
            }
        });

        return res.status(201).json({
            message: " Account Created Successfully",
            success: true
        });
    } catch (error) {
        console.log(error);
    }
}
export const login = async (req, res) => {
    try {
        const { email, password, role } = req.body;
        if (!email || !password || !role) {
            return res.status(400).json({
                message: "Required Fields Imcomplete",
                success: false
            });
        };
        let user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({
                message: "Incorrect Email or Password",
                success: false,
            })
        }
        const isPasswordMatch = await bcrypt.compare(password, user.password);
        if (!isPasswordMatch) {
            return res.status(400).json({
                message: "Incorrect Email or Password",
                success: false,
            })
        };
        // check role is correct or not 
        if (role != user.role) {
            return res.status(400).json({
                message: "Account doesn't exist with current role",
                success: false,
            })
        };

        const tokenData = {
            userID: user._id
        }
        const token = await jwt.sign(tokenData, process.env.SECRET_KEY, { expiresIn: '1d' });

        user = {
            _id: user._id,
            fullname: user.fullname,
            email: user.fullname,
            phoneNumber: user.phoneNumber,
            role: user.role,
            profile: user.profile
        }

        return res.status(200).cookie("token", token, { maxAge: 1 * 24 * 60 * 60 * 1000, httpsOnly: true, sameSite: 'strict' }).json({
            message: `Welcome back ${user.fullname}`,
            user,
            success: true
        })
    } catch (error) {
        console.log(error);
    }
}
export const logout = async (req,res) => {
    try{
        return res.status(200).cookie("token","" , {maxAge:0}).json({
            message:"Logged Out Successfully",
            success: true
        });
    }  catch (error){
        console.log(error);
    }
}
export const updateProfile = async (req,res) => {
    try{
        const {fullname,email,phoneNumber,bio,skills}=req.body;
        const file = req.file;

        // if (!fullname || !email || !phoneNumber || !bio || !skills) {
        //     return res.status(400).json({
        //         message: "Required Fields Imcomplete",
        //         success: false
        //     });
        // };

        // cloudinary
        const fileUri=getDataUri(file);
        const cloudResponse = await cloudinary.uploader.upload(fileUri.content);
        


        let skillsArray;
        if (skills){
            const skillsArray = skills.split(",");
        }
        
        const userID = req.id; // middleware Authentication
        let user = await User.findById(userID);

        if (!user){
            return res.status(400).json({
                message: "User not Found",
                success: false,
            });
        }

        // updating data
        if(fullname) user.fullname=fullname
        if (email) user.email= email
        if (phoneNumber) user.phoneNumber = phoneNumber
        if (bio) user.profile.bio = bio
        if (skills) user.profile.skills = skillsArray

        // resume will be implemented here
        if(cloudResponse){
            user.profile.resume = cloudResponse.secure_url // save the url
            user.profile.resumeOrigunalName = file.originalname 
        }

        await user.save();

        user = {
            _id: user._id,
            fullname: user.fullname,
            email: user.fullname,
            phoneNumber: user.phoneNumber,
            role: user.role,
            profile: user.profile
        }

        return res.status(200).json({
            message: "Profile Updated Successfully",
            user,
            success: true
        });

    } catch (error){
        console.log(error);
    }
}