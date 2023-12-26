import db from '../models/index';
require( 'dotenv' ).config();
const Sequelize = require( 'sequelize' )
const Op = Sequelize.Op;
import _ from 'lodash';
import EmailSevise from "./EmailService"
const MAX_NUMBER_SCHEDULE = process.env.MAX_NUMBER_SCHEDULE;
let getTopDoctorHome = ( limitInput ) =>
{
    return new Promise( async ( resolve, reject ) =>
    {
        try
        {
            let users = await db.User.findAll( {
                limit: limitInput,
                order: [ [ "createdAt", "DESC" ] ],
                where: { roleId: "R2" },
                attributes: {
                    exclude: [ 'password' ]
                },
                include: [
                    { model: db.Allcode, as: 'positionData', attributes: [ 'valueEn', 'valueVi' ] },
                    { model: db.Allcode, as: 'genderData', attributes: [ 'valueEn', 'valueVi' ] }
                ],
                raw: true,
                nest: true
            } )
            resolve( {
                errCode: 0,
                data: users
            } )
        } catch ( e )
        {
            reject( e );
        }
    } )
}

let getAllDoctor = () =>
{
    return new Promise( async ( resolve, reject ) =>
    {
        try
        {
            let doctors = await db.User.findAll( {
                where: { roleId: "R2" },
                attributes: {
                    exclude: [ "password" ]
                },
                include: [
                    { model: db.Allcode, as: 'positionData', attributes: [ 'valueEn', 'valueVi' ] },
                    { model: db.Markdowns, attributes: [ 'description', "contentHTML", "ContentMarkdown" ] },
                ],
                raw: true,
                nest: true

            } )
            resolve( {
                errCode: 0,
                data: doctors
            } )
        }
        catch ( e )
        {
            reject( e );
        }
    } )
}

let saveInforDoctor = ( dataInput ) =>
{
    return new Promise( async ( resolve, reject ) =>
    {
        try
        {
            /*selectedPrice: this.state.selectedPrice.value,
            selectedProvince: this.state.selectedPayment.value,
            selectedPayment: this.state.selectedProvince.value,
            nameClicnic: this.state.nameClicnic,
            addressclicnic: this.state.addressclicnic,
            note: this.state.note,
            */
            if ( !dataInput.doctorId
                || !dataInput.contentHTML
                || !dataInput.contentMarkdown
                || !dataInput.action
                || !dataInput.selectedPrice
                || !dataInput.selectedProvince
                || !dataInput.selectedPayment
                || !dataInput.nameClicnic
                || !dataInput.addressclicnic
                || !dataInput.note
                || !dataInput.specialtyId,
                !! !dataInput.clinicId )
            {
                resolve( {
                    errCode: 1,
                    errMessage: "Missing paramiter!"
                } )
            }
            else
            {
                if ( dataInput.action === 'CREATE' )
                {
                    await db.Markdowns.create( {
                        contentHTML: dataInput.contentHTML,
                        ContentMarkdown: dataInput.contentMarkdown,
                        description: dataInput.discription,
                        doctorId: dataInput.doctorId,
                    } )
                }
                if ( dataInput.action === 'EDIT' )
                {
                    let doctorMarkdown = await db.Markdowns.findOne( {
                        where: {
                            doctorId: dataInput.doctorId
                        },
                        raw: false,
                    } )

                    if ( doctorMarkdown )
                    {
                        doctorMarkdown.contentHTML = dataInput.contentHTML;
                        doctorMarkdown.ContentMarkdown = dataInput.contentMarkdown;
                        doctorMarkdown.description = dataInput.discription;
                        await doctorMarkdown.save();
                    }
                }

                let doctorInfor = await db.Doctor_infor.findOne( {
                    where: {
                        doctorId: dataInput.doctorId
                    },
                    raw: false,
                } )
                if ( doctorInfor )
                {
                    doctorInfor.priceId = dataInput.selectedPrice;
                    doctorInfor.provinceId = dataInput.selectedPayment;
                    doctorInfor.paymentId = dataInput.selectedProvince;
                    doctorInfor.addressClinic = dataInput.addressclicnic;
                    doctorInfor.nameClinic = dataInput.nameClicnic;
                    doctorInfor.note = dataInput.note;
                    doctorInfor.doctorId = dataInput.doctorId;
                    doctorInfor.clinicId = dataInput.clinicId;
                    doctorInfor.specialtyId = dataInput.specialtyId;
                    await doctorInfor.save();
                } else
                {
                    await db.Doctor_infor.create( {
                        priceId: dataInput.selectedPrice,
                        provinceId: dataInput.selectedPayment,
                        paymentId: dataInput.selectedProvince,
                        addressClinic: dataInput.addressclicnic,
                        nameClinic: dataInput.nameClicnic,
                        note: dataInput.note,
                        doctorId: dataInput.doctorId,
                        clinicId: dataInput.clinicId,
                        specialtyId: dataInput.specialtyId,
                    } )
                }
                resolve( {
                    errCode: 0,
                    errMessage: "Save information doctor success!"
                } )


            }
        }
        catch ( e )
        {
            reject( e );
        }
    } )
}

let getDetialDoctorbyid = ( inputId ) =>
{
    return new Promise( async ( resolve, reject ) =>
    {
        try
        {
            if ( !inputId )
            {
                resolve( {
                    errCode: 1,
                    errMessage: "Missing required paramiter!"
                } );
            } else
            {
                let user = await db.User.findOne( {
                    where: { id: inputId },
                    attributes: {
                        exclude: [ 'password', ]
                    },
                    include: [
                        { model: db.Markdowns, attributes: [ 'description', "contentHTML", "ContentMarkdown" ] },
                        { model: db.Allcode, as: 'genderData', attributes: [ 'valueEn', 'valueVi' ] },
                        { model: db.Allcode, as: 'positionData', attributes: [ 'valueEn', 'valueVi' ] },
                        {
                            model: db.Doctor_infor,
                            attributes: {
                                exclude: [ 'id' ]
                            },
                            include: [
                                { model: db.Allcode, as: 'priceIdData', attributes: [ 'valueEn', 'valueVi' ] },
                                { model: db.Allcode, as: 'provinceIdData', attributes: [ 'valueEn', 'valueVi' ] },
                                { model: db.Allcode, as: 'paymentIdData', attributes: [ 'valueEn', 'valueVi' ] },

                            ]
                        },

                    ],
                    raw: false,
                    nest: true
                } )
                if ( user && user.image )
                {
                    user.image = new Buffer( user.image, 'base64' ).toString( 'binary' );
                }

                if ( !user ) user = {}

                resolve( {
                    errCode: 0,
                    data: user
                } )
            }
        }
        catch ( e )
        {
            reject( e );
        }
    } )
}

let bulkCreateSchedule = ( data ) =>
{
    return new Promise( async ( resolve, reject ) =>
    {
        try
        {
            if ( !data.arrSchedule || !data.doctorId || !data.date )
            {
                resolve( {
                    errCode: 1,
                    errMessage: "Missing required paramiter!"
                } )
            }
            else
            {
                let schedule = data.arrSchedule;
                if ( schedule && schedule.length > 0 )
                {
                    schedule = schedule.map( item =>
                    {
                        item.maxNumber = MAX_NUMBER_SCHEDULE;
                        return item;
                    } )
                }
                let existing = await db.Schedule.findAll( {
                    where: {
                        doctorId: data.doctorId,
                        date: data.date
                    },
                    attributes: [ "timeType", "date", "doctorId", "maxNumber" ],
                    raw: true,
                } )

                let toCreate = _.differenceWith( schedule, existing, ( a, b ) =>
                {
                    return a.timeType === b.timeType && +a.date === +b.date;
                } );
                if ( toCreate && toCreate.length > 0 )
                {
                    await db.Schedule.bulkCreate( toCreate );
                }
                resolve( {
                    errCode: 0,
                    errMessage: "Bulk create schedule success!"
                } )
            }
        }
        catch ( e )
        {
            reject( e );
        }
    } )
}

let getScheduleDoctorDate = ( doctorId, date ) =>
{
    return new Promise( async ( resolve, reject ) =>
    {
        try
        {
            if ( !doctorId || !date )
            {
                resolve( {
                    errCode: 1,
                    errMessage: "Missing required paramiter!"
                } )
            }

            else
            {
                let data = await db.Schedule.findAll( {
                    where: {
                        doctorId: doctorId,
                        date: date
                    },
                    attributes: {
                        exclude: [ 'id' ]
                    },
                    include: [
                        { model: db.Allcode, as: 'timeTypeData', attributes: [ 'valueEn', 'valueVi' ] },
                        { model: db.User, as: 'doctorIdData', attributes: [ 'firstName', 'lastName' ] }
                    ],
                    raw: false,
                    nest: true
                } )

                if ( !data ) data = [];
                resolve( {
                    errCode: 0,
                    data: data
                } )
            }
        }
        catch ( e )
        {
            reject( e );
        }
    } )
}

let getExtraInforDoctor = ( doctorId ) =>
{
    return new Promise( async ( resolve, reject ) =>
    {
        try
        {
            if ( !doctorId )
            {
                resolve( {
                    errCode: 1,
                    errMessage: "Missing required paramiter!"
                } )
            }
            else
            {
                let data = await db.Doctor_infor.findOne( {
                    where: {
                        doctorId: doctorId
                    },
                    include: [
                        { model: db.Allcode, as: 'priceIdData', attributes: [ 'valueEn', 'valueVi' ] },
                        { model: db.Allcode, as: 'provinceIdData', attributes: [ 'valueEn', 'valueVi' ] },
                        { model: db.Allcode, as: 'paymentIdData', attributes: [ 'valueEn', 'valueVi' ] },

                    ],
                    raw: false,
                    nest: true
                } )

                if ( !data ) data = {};
                resolve( {
                    errCode: 0,
                    data: data
                } )
            }
        }
        catch ( e )
        {
            reject( e );
        }
    } )
}

let getProfileDoctor = ( inputId ) =>
{
    return new Promise( async ( resolve, reject ) =>
    {
        try
        {
            if ( !inputId )
            {
                resolve( {
                    errCode: 1,
                    errMessage: "Missing required paramiter!"
                } )
            }
            else
            {
                let user = await db.User.findOne( {
                    where: { id: inputId },
                    attributes: {
                        exclude: [ 'password', ]
                    },
                    include: [
                        { model: db.Markdowns, attributes: [ 'description', "contentHTML", "ContentMarkdown" ] },
                        { model: db.Allcode, as: 'positionData', attributes: [ 'valueEn', 'valueVi' ] },
                        {
                            model: db.Doctor_infor,
                            attributes: {
                                exclude: [ 'id', 'doctorId' ]
                            },
                            include: [
                                { model: db.Allcode, as: 'priceIdData', attributes: [ 'valueEn', 'valueVi' ] },
                                { model: db.Allcode, as: 'provinceIdData', attributes: [ 'valueEn', 'valueVi' ] },
                                { model: db.Allcode, as: 'paymentIdData', attributes: [ 'valueEn', 'valueVi' ] },
                            ]
                        },

                    ],
                    raw: false,
                    nest: true
                } );

                if ( user && user.image )
                {
                    user.image = new Buffer( user.image, 'base64' ).toString( 'binary' );
                }

                if ( !user ) user = {}

                resolve( {
                    errCode: 0,
                    data: user
                } )
            }
        }
        catch ( e )
        {
            reject( e );
        }
    } );
}

let getPatientForDoctor = ( doctorId, date ) =>
{
    return new Promise( async ( resolve, reject ) =>
    {
        try
        {
            if ( !doctorId || !date )
            {
                resolve( {
                    errCode: 1,
                    errMessage: "Missing required paramiter!"
                } )
            }
            else
            {
                let data = await db.Booking.findAll( {
                    where: {
                        statusId: "S2",
                        doctorId: doctorId,
                        date: date
                    },
                    include: [
                        {
                            model: db.User, as: "patientIdData",
                            attributes: [ 'email', 'lastName', "address", "gender" ],
                            include: [
                                { model: db.Allcode, as: 'genderData', attributes: [ 'valueEn', 'valueVi' ] },
                            ]
                        },
                        { model: db.Allcode, as: 'timeTypeBookingData', attributes: [ 'valueEn', 'valueVi' ] },

                    ],
                    raw: true,
                    nest: true,
                    order: [ 'id' ]
                } )
                console.log( data )
                resolve( {
                    errCode: 0,
                    data: data
                } )
            }
        }
        catch ( e )
        {
            reject( e );
        }
    } );
}


let sendRemedy = ( data ) =>
{
    return new Promise( async ( resolve, reject ) =>
    {
        try
        {
            if ( !data.email || !data.patientId || !data.doctorId )
            {
                resolve( {
                    errCode: 1,
                    errMessage: "Missing required paramiter!"
                } )
            }
            else
            {
                let appoiment = await db.Booking.findOne( {
                    where: {
                        doctorId: data.doctorId,
                        patientId: data.patientId,
                        statusId: "S2"
                    },
                    raw: false
                } )
                await db.History.create( {
                    doctorId: data.doctorId,
                    patientId: data.patientId,
                    date: data.timeType,
                    files: data.imgBase64,
                    description: data.Diagnostics

                } )
                if ( appoiment )
                {
                    appoiment.statusId = "S3";
                    await appoiment.save();
                }
                await EmailSevise.sendAttachment( {
                    email: data.email,
                    language: data.language,
                    imgBase64: data.imgBase64
                } )
                resolve( {
                    errCode: 0,
                    errMessage: "ok",
                } )
            }
        }
        catch ( e )
        {
            reject( e );
        }
    } );
}


let searchDoctor = ( data ) =>
{
    return new Promise( async ( resolve, reject ) =>
    {
        try
        {
            let doctors = await db.User.findAll( {
                where: {
                    [ Op.or ]: [
                        {
                            lastName: {
                                [ Op.like ]: `%${ data }%`
                            }
                        },
                        {
                            firstName: {
                                [ Op.like ]: `%${ data }%`
                            }
                        },
                    ],
                    roleId: "R2"
                },
                attributes: {
                    exclude: [ "password" ]
                },
                include: [
                    { model: db.Allcode, as: 'positionData', attributes: [ 'valueEn', 'valueVi' ] },
                    { model: db.Markdowns, attributes: [ 'description', "contentHTML", "ContentMarkdown" ] },
                ],
                raw: true,
                nest: true

            } )
            resolve( {
                errCode: 0,
                data: doctors
            } )
        }
        catch ( e )
        {
            reject( e );
        }
    } )
}

module.exports = {
    getTopDoctorHome: getTopDoctorHome,
    getAllDoctor: getAllDoctor,
    saveInforDoctor: saveInforDoctor,
    getDetialDoctorbyid: getDetialDoctorbyid,
    bulkCreateSchedule: bulkCreateSchedule,
    getScheduleDoctorDate: getScheduleDoctorDate,
    getExtraInforDoctor: getExtraInforDoctor,
    getProfileDoctor: getProfileDoctor,
    getPatientForDoctor: getPatientForDoctor,
    sendRemedy: sendRemedy,
    searchDoctor: searchDoctor
}