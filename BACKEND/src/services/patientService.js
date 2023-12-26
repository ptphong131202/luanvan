import db from '../models/index';
require( 'dotenv' ).config();
import _, { reject } from 'lodash';
import { v4 as uuidv4 } from 'uuid';
import emailservice from './EmailService';

// ⇨ '9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d'
let builURLEmail = ( doctorId, token ) =>
{
    let result = '';
    result = `${ process.env.URL_REACT }/verify-booking?token=${ token }&doctorId=${ doctorId }`
    return result;
}

let postPatientBookingOppointment = ( data ) =>
{
    return new Promise( async ( resolve, reject ) =>
    {
        try
        {
            /**
             * fullName: this.state.fullName,
            phoneNumber: this.state.phoneNumber,
            email: this.state.email,
            address: this.state.address,
            reason: this.state.reason,
            date: date,
            genders: this.state.selectedGender.value,
            doctorId: this.state.doctorId,
            timeType: this.state.timeType,
            language: this.props.language,
            timeString: timestamp,
            doctorName: doctorName
             */
            if ( !data.email || !data.doctorId || !data.date ||
                !data.timeType || !data.phoneNumber || !data.address || !data.reason ||
                !data.genders || !data.fullName || !data.timeString || !data.doctorName )
            {
                resolve( {
                    errCode: 1,
                    errMessage: "Missing required paramiter!"
                } )
            }
            else
            {
                let token = uuidv4();
                await emailservice.sendSimpleEmail( {
                    recieverEmail: data.email,
                    patientName: data.fullName,
                    time: data.timeString,
                    doctorName: data.doctorName,
                    language: data.language,
                    redirectLink: builURLEmail( data.doctorId, token ),
                } )

                let user = await db.User.findOrCreate( {
                    where: { email: data.email },
                    defaults: {
                        email: data.email,
                        roleId: "R3",
                        address: data.address,
                        gender: data.genders,
                        lastName: data.fullName,
                        phonenumber: data.phoneNumber
                    }
                } );
                resolve( {
                    errCode: 0,
                    errMessage: "Save infor doctor successfully!"
                } );
                if ( user && user[ 0 ] )
                {
                    await db.Booking.findOrCreate( {
                        where: { patientId: user[ 0 ].id },
                        defaults: {
                            statusId: 'S1',
                            patientId: user[ 0 ].id,
                            doctorId: data.doctorId,
                            date: data.date,
                            timeType: data.timeType,
                            token: token
                        }

                    } )
                }
            }
        }
        catch ( e )
        {
            reject( e );
        }
    } )
};


let postVerifyBookingOppointment = ( data ) =>
{
    return new Promise( async ( resolve, reject ) =>
    {
        try
        {
            if ( !data.token ||
                !data.doctorId )
            {
                resolve( {
                    errCode: 1,
                    errMessage: "Missing required paramiter!"
                } )
            }
            else
            {
                let appoinment = await db.Booking.findOne( {
                    where: {
                        token: data.token,
                        doctorId: data.doctorId,
                        statusId: 'S1'
                    },
                    raw: false,
                } )

                if ( appoinment )
                {
                    appoinment.statusId = 'S2';
                    await appoinment.save()
                    resolve( {
                        errCode: 0,
                        errMessage: "Update appoinment successfully!"
                    } )
                }
                else
                {
                    resolve( {
                        errCode: 2,
                        errMessage: "The appointment has been confirmed or does not exist!"
                    } )
                }
            }
        }
        catch ( e )
        {
            reject( e );
        }
    } )
}

module.exports = {
    postPatientBookingOppointment: postPatientBookingOppointment,
    builURLEmail: builURLEmail,
    postVerifyBookingOppointment: postVerifyBookingOppointment
}