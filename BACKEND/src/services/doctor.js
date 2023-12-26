import db from '../models/index';
import admin from '../models/admin';
import bcrypt from 'bcryptjs';

const salt = bcrypt.genSaltSync( 10 );




// check email exists 
let checkUserEmail = ( userEmail ) =>
{
    return new Promise( async ( resolve, reject ) =>
    {
        try
        {
            let user = await db.Doctor.findOne( {
                where: { email: userEmail }
            } )
            if ( user )
            {
                resolve( true )
            } else
            {
                resolve( false )
            }

        } catch ( e )
        {
            reject( e )
        }
    } )
}


// create a new user
let createNewDoctor = ( data ) =>
{
    return new Promise( async ( resolve, reject ) =>
    {
        try
        {
            let checkEmail = await checkUserEmail( data.email );
            if ( checkEmail === true )
            {
                resolve( {
                    errCode: 1,
                    errMessage: `Your's Email is already exist in our system, plz try other email`
                } );
            }
            if ( !data.email
                || !data.password
                || !data.firstName
                || !data.lastName
                || !data.address
                || !data.gender
                || !data.position
                || !data.phone
                || !data.role
                || !data.image
            )
            {
                resolve( {
                    errCode: 2,
                    errMessage: 'Not in valid!'
                } )
            }
            else
            {
                let hashPassWordFromBcrypt = await hashUserPassword( data.password )

                await db.Doctor.create( {
                    email: data.email,
                    password: hashPassWordFromBcrypt,
                    firstName: data.firstName,
                    lastName: data.lastName,
                    address: data.address,
                    gender: data.gender,
                    position: data.position,
                    phone: data.phone,
                    role: data.role,
                    image: data.image,
                } )

                let doctor = await db.Doctor.findOne( {
                    where: { email: data.email },
                    raw: false

                } )
                await db.Doctor_infor.create( {
                    doctorId: doctor.id,
                } )
                resolve( {
                    errCode: 0,
                    errMessage: 'Create new user succeed!',
                } )
            }
        }
        catch ( err )
        {
            reject( err );
        }
    } )
}





let hashUserPassword = ( password ) =>
{
    return new Promise( async ( resolve, reject ) =>
    {
        try
        {
            //lưu ý, truyền vào đúng password cần hash
            // let hashPassWord = await bcrypt.hashSync("B4c0/\/", salt); => copy paste mà ko edit nè
            let hashPassWord = await bcrypt.hashSync( password, salt );

            resolve( hashPassWord );
        } catch ( e )
        {
            reject( e );
        }

    } )
}



// get all user
let getDoctor = () =>
{
    return new Promise( async ( resolve, reject ) =>
    {
        try
        {
            let patients = await db.Doctor.findAll(
                {
                    attributes: {
                        exclude: [ 'password' ]
                    }
                }
            );
            resolve( {
                errCode: 0,
                message: "ok!",
                data: patients
            } );
        }
        catch ( e )
        {
            reject( e );
        }
    } )
}



let updateDoctor = ( data ) =>
{
    return new Promise( async ( resolve, reject ) =>
    {
        try
        {
            let doctor = await db.Doctor.findOne( {
                where: { id: data.id },
                raw: false

            } )
            if ( doctor )
            {

                doctor.email = data.email;
                doctor.firstName = data.firstName;
                doctor.lastName = data.lastName;
                doctor.position = data.position;
                doctor.image = data.image;
                doctor.address = data.address;
                doctor.gender = data.gender;
                doctor.phone = data.phone;
                await doctor.save();

                resolve( {
                    errCode: 0,
                    errMessage: 'Update patient successfully!'
                } );

            } else
            {
                resolve( {
                    errCode: 2,
                    errMessage: 'User not found'
                } );

            }
        }
        catch ( e )
        {
            reject( e );
        }
    } )
}


let getAllCode = ( typeInput ) =>
{
    return new Promise( async ( resolve, reject ) =>
    {
        try
        {
            if ( !typeInput )
            {
                resolve( {
                    errCode: 1,
                    errMessage: 'Missing required parameter '
                } )

            }
            else
            {
                let res = {};
                let allCode = await db.Allcode.findAll( {
                    where: { type: typeInput },
                } );
                res.errCode = 0;
                res.data = allCode;
                resolve( res );
            }
        }
        catch ( e )
        {
            reject( e );
        }
    } )
}


let getDoctorById = ( inputId ) =>
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
                let user = await db.Doctor.findOne( {
                    where: { id: inputId },
                    attributes: {
                        exclude: [ 'password', ]
                    },
                    include: [
                        /*  { model: db.Markdowns, attributes: [ 'description', "contentHTML", "ContentMarkdown" ] }, */
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


// delete patient
let deleteDoctor = ( userid ) =>
{
    return new Promise( async ( resolve, reject ) =>
    {
        let user = await db.Doctor.findOne( {
            where: { id: userid },
        } );

        if ( !user )
        {
            resolve( {
                errCode: 2,
                errMessage: 'User not found!'
            } );
        }

        await db.Doctor.destroy( {
            where: { id: userid },
        } );
        await db.Doctor_infor.destroy( {
            where: { doctorId: userid },
        } );
        resolve( {
            errCode: 0,
            errMessage: 'Delete user succeed!'
        } );
    } )
}


module.exports = {
    createNewDoctor: createNewDoctor,
    hashUserPassword: hashUserPassword,
    getDoctor: getDoctor,
    updateDoctor: updateDoctor,
    getAllCode: getAllCode,
    getDoctorById: getDoctorById,
    deleteDoctor: deleteDoctor,
}