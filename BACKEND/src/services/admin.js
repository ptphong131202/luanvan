import db from '../models/index';
import admin from '../models/admin';
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
let checkUserEmail = ( userEmail ) =>
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

// create a new admin
let createNewAdmin = ( data ) =>
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
                || !data.fullName
                || !data.password
                || !data.phone
                || !data.role
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

                await db.Admin.create( {
                    email: data.email,
                    password: hashPassWordFromBcrypt,
                    fullName: data.fullName,
                    phone: data.phone,
                    role: data.role,
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


// get all user
let getAdmin = () =>
{
    return new Promise( async ( resolve, reject ) =>
    {
        try
        {
            let admins = await db.Admin.findAll( {
                attributes: {
                    exclude: [ 'password' ]
                }
            } );
            resolve( {
                errCode: 0,
                message: "ok!",
                data: admins
            } );
        }
        catch ( e )
        {
            reject( e );
        }
    } )
}


// get patient by id
let getAdminById = ( adminId ) =>
{
    return new Promise( async ( resolve, reject ) =>
    {
        if ( !adminId === null )
        {
            resolve( {
                errCode: 2,
                errMessage: 'Missing required parameter '
            } )
        }

        try
        {
            let admin = await db.Admin.findOne(
                {
                    where: { id: adminId },
                    attributes: {
                        exclude: [ 'password' ]
                    }
                }
            );
            if ( admin )
            {
                resolve( {
                    errCode: 0,
                    message: "Get admin by id successfully!",
                    admin: admin
                } );
            }
            else
                resolve( {
                    errCode: 0,
                    message: "Get admin by id fail!",
                } );
        }
        catch ( e )
        {
            reject( e );
        }
    } )
}


let deleteAdmin = ( userid ) =>
{
    return new Promise( async ( resolve, reject ) =>
    {
        let user = await db.Admin.findOne( {
            where: { id: userid },
        } );

        if ( !user )
        {
            resolve( {
                errCode: 2,
                errMessage: 'User not found!'
            } );
        }

        await db.Admin.destroy( {
            where: { id: userid },
        } );
        resolve( {
            errCode: 0,
            errMessage: 'Delete user succeed!'
        } );
    } )
}




let updateAdmin = ( data ) =>
{
    return new Promise( async ( resolve, reject ) =>
    {
        try
        {
            if ( !data.email || !data.fullName ||
                !data.phone )
            {
                resolve( {
                    errCode: 2,
                    errMessage: 'Missing required parameter!'
                } )
            }
            let admin = await db.Admin.findOne( {
                where: { id: data.id },
                raw: false

            } )
            if ( admin )
            {
                admin.email = data.email;
                admin.fullName = data.fullName;
                admin.phone = data.phone;
                await admin.save();

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

module.exports = {
    createNewAdmin: createNewAdmin,
    getAdmin: getAdmin,
    getAdminById: getAdminById,
    updateAdmin: updateAdmin,
    hashUserPassword: hashUserPassword,
    deleteAdmin: deleteAdmin,
}