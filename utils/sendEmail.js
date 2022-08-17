const nodemailer=require('nodemailer')

const sendmail=(options)=>{
    const transporter=nodemailer.createTransport({
        service:"Gmail",
        auth:{
            user:"issa.ally.mdoe@gmail.com",
            pass:"@Issaally99",
        }
    })

    const mailOptions={
        from:"Issa Mdoe Authentication APP",
        to:options.email,
        subject:options.subject,
        Text:options.message
    }

    transporter.sendMail(mailOptions);
}

module.exports=sendmail;