/* utils/email.js */

import nodemailer from "nodemailer";
import { currentProfile } from "./current-profile";

export async function sendEmailToTeacher(essay) {
    /* Code to send email using nodemailer or a similar library
    Example: */
    console.log("email");
    const profile = await currentProfile();
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.USER_MAIL,
        pass: process.env.APP_PASSWORD,
      },
    });
  
    const mailOptions = {
      from: 'sudevaharsha1@gmail.com',
      to: profile?.teacherEmailId,
      subject: 'New Essay Submission',
      text: `A new essay has been submitted:\n\n${essay}`,
    };
  
    await transporter.sendMail(mailOptions);
  }
  
export async function sendEmailToStudent(marks,studentMailId) {
    /* Code to send email using nodemailer or a similar library
    Example: */
    console.log("email");
    const profile = await currentProfile();
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.USER_MAIL,
        pass: process.env.APP_PASSWORD,
      },
    });
  
    const mailOptions = {
      from: profile.email,
      to: studentMailId,
      subject: 'New Essay Evaluation',
      text: `your new essay has been evaluated:\n\n${marks}`,
    };
  
    await transporter.sendMail(mailOptions);
  }
  