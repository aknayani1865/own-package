import mongoose from "mongoose";
import { mailSender } from "../utils/sendmail.js";

export const OTPSchema = new mongoose.Schema({
   email: {
    type: String,
    required : true,

   },
   otp : {
    type:String,
    required:true,
   },
   createdAt: {
    type:Date,
    default:Date.now(),
    expires: 90000000,
   }
});

async function sendVerificationEmail(email , otp)
{
   try {
      const mailResponse = await mailSender(email , "Verification Email from Akgram" , otp);
      console.log("email send successfully:" , mailResponse);
   }
   catch(error)
   {
      console.log(  "error occured while sending mail:", error);
      throw error;
   }
}
OTPSchema.pre("save" , async function(next){
   await sendVerificationEmail(this.email , this.otp);
   next();
} )

export default  mongoose.model('OTP', OTPSchema);