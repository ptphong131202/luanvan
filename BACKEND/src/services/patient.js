import db from '../models/index';
import patient from '../models/patient';
import bcrypt from 'bcryptjs';

const salt = bcrypt.genSaltSync( 10 );
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


// check email exists 
let checkUserEmail2 = ( userEmail ) =>
{
    return new Promise( async ( resolve, reject ) =>
    {
        try
        {
            let user = await db.Admin.findOne( {
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

// check email exists 
let checkUserEmail = ( userEmail ) =>
{
    return new Promise( async ( resolve, reject ) =>
    {
        try
        {
            let user = await db.Patient.findOne( {
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

let handlePatientLogin = ( email, password ) =>
{
    return new Promise( async ( resolve, reject ) =>
    {
        try
        {
            let userData = {};
            let isExist = await checkUserEmail( email );
            let isExist2 = await checkUserEmail2( email );
            if ( isExist || isExist2 )
            {
                //user already exist
                let user = await db.Patient.findOne( {
                    attributes: [ "id", 'email', 'fullName', 'password', 'address', 'birthday', 'gender', 'phone', 'role' ],
                    where: { email: email },
                    raw: true,

                } );
                if ( user )
                {
                    //compare password: dùng cách 1 hay cách 2 đều chạy đúng cả =))
                    // Cách 1: dùng asynchronous (bất đồng bộ)
                    let check = await bcrypt.compare( password, user.password );



                    if ( check )
                    {
                        userData.errCode = 0;
                        userData.errMessage = 'Login successful!';

                        delete user.password;
                        userData.user = user;
                    }
                    else
                    {
                        userData.errCode = 3;
                        userData.errMessage = 'Wrong password!';
                    }
                } else
                {
                    let user = await db.Admin.findOne( {
                        attributes: [ "id", 'email', 'fullName', 'password', 'phone', 'role' ],
                        where: { email: email },
                        raw: true,

                    } );
                    if ( user )
                    {
                        //compare password: dùng cách 1 hay cách 2 đều chạy đúng cả =))
                        // Cách 1: dùng asynchronous (bất đồng bộ)
                        let check = await bcrypt.compare( password, user.password );



                        if ( check )
                        {
                            userData.errCode = 0;
                            userData.errMessage = 'Login successful!';

                            delete user.password;
                            userData.user = user;
                        }
                        else
                        {
                            userData.errCode = 3;
                            userData.errMessage = 'Wrong password!';
                        }
                    } else
                    {
                        userData.errCode = 2;
                        userData.errMessage = `User not found!`;
                    }
                }

            } else
            {
                //return error
                userData.errCode = 1;
                userData.errMessage = `Your's Email isn't exist in our system, plz try other email`
            }
            resolve( userData )
        } catch ( e )
        {
            reject( e );
        }
    } )
}

// get all user
let getPatient = () =>
{
    return new Promise( async ( resolve, reject ) =>
    {
        try
        {
            let patients = await db.Patient.findAll(
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

// get patient by id
let getPatientById = ( patientId ) =>
{
    return new Promise( async ( resolve, reject ) =>
    {
        if ( !patientId === null )
        {
            resolve( {
                errCode: 2,
                errMessage: 'Missing required parameter '
            } )
        }

        try
        {
            let patient = await db.Patient.findOne(
                {
                    where: { id: patientId },
                    attributes: {
                        exclude: [ 'password' ]
                    }
                }
            );
            if ( patient )
            {
                resolve( {
                    errCode: 0,
                    message: "Get patient by id successfully!",
                    patient: patient
                } );
            }
            else
                resolve( {
                    errCode: 0,
                    message: "Get patient by id fail!",
                } );

        }
        catch ( e )
        {
            reject( e );
        }
    } )
}


// create a new patient
let createNewPatient = ( data ) =>
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

            let hashPassWordFromBcrypt = await hashUserPassword( data.password )

            let user = await db.Patient.create( {
                email: data.email,
                password: hashPassWordFromBcrypt,
                fullName: data.fullName,
                birthday: data.birthday,
                address: data.address,
                phone: data.phone,
                gender: data.gender,
                role: data.role,
            } )
            if ( user )
            {
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


let updatePatient = ( data ) =>
{
    return new Promise( async ( resolve, reject ) =>
    {
        try
        {
            let patient = await db.Patient.findOne( {
                where: { id: data.id },
                raw: false

            } )
            if ( patient )
            {
                patient.email = data.email;
                patient.fullName = data.fullName;
                patient.address = data.address;
                patient.gender = data.gender;
                patient.birthday = data.birthday;
                patient.phone = data.phone;
                await patient.save();

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

// delete patient
let deletePatient = ( userid ) =>
{
    return new Promise( async ( resolve, reject ) =>
    {
        let user = await db.Patient.findOne( {
            where: { id: userid },
        } );

        if ( !user )
        {
            resolve( {
                errCode: 2,
                errMessage: 'User not found!'
            } );
        }

        await db.Patient.destroy( {
            where: { id: userid },
        } );
        resolve( {
            errCode: 0,
            errMessage: 'Delete user succeed!'
        } );
    } )
}


module.exports = {
    getPatient: getPatient,
    getPatientById: getPatientById,
    createNewPatient: createNewPatient,
    updatePatient: updatePatient,
    deletePatient: deletePatient,
    hashUserPassword: hashUserPassword,
    handlePatientLogin: handlePatientLogin,

}