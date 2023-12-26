import db from '../models/index';
import bcrypt from 'bcryptjs';
import user from '../models/user';

const salt = bcrypt.genSaltSync( 10 );
// hash password
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


let checkUserEmail3 = ( userEmail ) =>
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

let handleUserLogin = ( email, password ) =>
{
    return new Promise( async ( resolve, reject ) =>
    {
        try
        {
            let userData = {};
            let isExist = await checkUserEmail( email );
            let isExist2 = await checkUserEmail2( email );
            let isExist3 = await checkUserEmail3( email );
            if ( isExist || isExist2 || isExist3 )
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


module.exports = {
    handleUserLogin: handleUserLogin,
    hashUserPassword: hashUserPassword,
    getAllCode: getAllCode,

}