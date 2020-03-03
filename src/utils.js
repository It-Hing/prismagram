import { adjectivesm, nouns, adjectives } from "./words"
import nodemailer from "nodemailer";//메일을 보내는 작업을 할때 주로 쓰는 라이브러리
import sgTransport from "nodemailer-sendgrid-transport";//transport를 만들기 위한 라이브러리
import jwt from "jsonwebtoken";//jwt

export const generateSecret = () => {
    const randomNumber = Math.floor(Math.random() * adjectives.length);
    return `${adjectives[randomNumber]} ${nouns[randomNumber]}`;
};

const sendMail = (email) => {
    const options = {
        auth:{
            api_user: process.env.SENDGRID_USERNAME,
            api_key: process.env.SENDGRID_PASSWORD
        }
    };

    const client = nodemailer.createTransport(sgTransport(options));
    //.createTransport(sgTransport(options));
    return client.sendMail(email);
};
//sendMail함수는 외부에서 사용하지 않으므로 export해주지 않는다.

export const sendSecretMail = (address, secret) => {
    const email = {
        from: "seong@sinabro.com",
        to: address,
        subject: "Login Secret for Prismagram 🔐",
        html: `Hello! Your login secret its <strong>${secret}</strong>.<br/>Copy and paste on the app.`
    }

    return sendMail(email);
}

export const generateToken = (id) => jwt.sign({id}, process.env.JWT_SECRET);
//비밀키?(private key)사용
//jsonwebtoken 모듈을 사용(jwt)