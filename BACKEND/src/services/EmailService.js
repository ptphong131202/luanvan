require( 'dotenv' ).config();
import nodemailer from 'nodemailer';

let sendSimpleEmail = async ( dataSend ) =>
{
    let transporter = nodemailer.createTransport( {
        host: 'smtp.gmail.com',
        port: 587,
        secure: false,
        auth: {
            user: process.env.EMAIL_SEND,
            pass: process.env.EMAILAPPPASSWORD
        }
    } );

    let infor = await transporter.sendMail( {
        from: "From BookingCare",
        to: dataSend.recieverEmail,
        subject: 'Thông tin đặt lịch khám bệnh',
        html: getBodyHTMLEmail( dataSend ),
    } );
}

let getBodyHTMLEmail = ( dataSend ) =>
{
    let result = '';
    if ( dataSend.language === 'vi' )
    {
        result =
            `<h3>Xin chào ${ dataSend.patientName }!</h3>
        <p>Bạn đã nhận được Email này vì đã đặt lịch khám bệnh online trên trang BookingCare!</p>
        <p>Thông tin đặt lịch khám bệnh:</p>
        <div>
        <b>Thời gian: ${ dataSend.time }</b>
        </div>
        <div>
        <b>Bác sĩ: ${ dataSend.doctorName }</b>
        </div>
        <p>Nếu thôn tin trên là đúng sự thật, Vui lòng nhấn vào đường link để xác nhận và hoàn tất thủ tục!
        <span><a href="${ dataSend.redirectLink }" target="_blank"> Tại đây!</a></span></p>
        <div>Xin chân thành cảm ơn!</div>
        `
    }
    if ( dataSend.language === 'en' )
    {
        result = `<h3>Dear ${ dataSend.patientName },</h3>
        <p>You received this email because you booked an online consultation on BookingCare!</p>
        <p>Medical appointment booking information:</p>
        <div>
        <b>Time: ${ dataSend.time }</b>
        </div>
        <div>
        <b>Doctor: ${ dataSend.doctorName }</b>
        </div>
        <p>If the above information is true, please click on the link to confirm and complete the procedure!
        <div><a href="${ dataSend.redirectLink }" target="_blank"> Click here!</a></div></p>
        <div>Thank you very much!</div>
        `
    }

    return result;
}




let sendAttachment = async ( dataSend ) =>
{
    let transporter = nodemailer.createTransport( {
        host: 'smtp.gmail.com',
        port: 587,
        secure: false,
        auth: {
            user: process.env.EMAIL_SEND,
            pass: process.env.EMAILAPPPASSWORD
        }
    } );

    let infor = await transporter.sendMail( {
        from: "From BookingCare",
        to: dataSend.email,
        subject: 'Thông tin đặt lịch khám bệnh',
        html: getBodyHTMLEmailRemedy( dataSend ),
        attachments: [
            {
                filename: 'ket-qua-kham-benh.jpg',
                content: dataSend.imgBase64.split( "base64," )[ 1 ],
                encoding: 'base64'
            }
        ]
    } );
}


let getBodyHTMLEmailRemedy = ( dataSend ) =>
{
    let result = '';
    if ( dataSend.language === 'vi' )
    {
        result =
            `<h3>Xin chào !</h3>
        <p>Bạn đã nhận được Email này vì đã đặt lịch khám bệnh online trên trang BookingCare!</p>
        <p>Thông tin đặt lịch khám bệnh:</p>
       
        <div>Xin chân thành cảm ơn!</div>
        `
    }
    if ( dataSend.language === 'en' )
    {
        result = `<h3>Dear</h3>
        <p>You received this email because you booked an online consultation on BookingCare!</p>
        <p>Medical appointment booking information:</p>
        <div>Thank you very much!</div>
        `
    }
    return result;
}
module.exports = {
    sendSimpleEmail: sendSimpleEmail,
    getBodyHTMLEmail: getBodyHTMLEmail,
    sendAttachment: sendAttachment,
    getBodyHTMLEmailRemedy: getBodyHTMLEmailRemedy
}