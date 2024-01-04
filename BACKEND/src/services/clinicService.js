import db from '../models/index';
const Sequelize = require( 'sequelize' )
const Op = Sequelize.Op;

let createNewClinic = ( data ) =>
{
    return new Promise( async ( resolve, reject ) =>
    {
        try
        {
            if ( !data.name || !data.imageBase64 ||
                !data.address || !data.descriptionHTML ||
                !data.descriptionMarkdown )
            {
                return reject( {
                    errCode: 1,
                    errMessage: "Missing required parameter!"
                } )
            }
            else
            {

                let createClinic = await db.Clinic.create( {
                    name: data.name,
                    address: data.address,
                    image: data.imageBase64,
                    descriptionHTML: data.descriptionHTML,
                    descriptionMarkdown: data.descriptionMarkdown,
                } )

                if ( createClinic )
                {
                    resolve( {
                        errCode: 0,
                        errMessage: "Create a new Specialty successfully!"
                    } )
                }
                else
                {
                    resolve( {
                        errCode: 1,
                        errMessage: "Create a new Specialty fail!"
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


let getAllClinic = () =>
{
    return new Promise( async ( resolve, reject ) =>
    {
        try
        {
            let clinic = await db.Clinic.findAll();
            if ( clinic && clinic.length > 0 )
            {
                clinic.map( item =>
                {
                    item.image = new Buffer( item.image, 'base64' ).toString( 'binary' );
                    return item;
                } )
            }
            if ( clinic && clinic.length > 0 )
            {
                resolve( {
                    errCode: 0,
                    data: clinic
                } )
            }
            else
            {
                resolve( {
                    errCode: 1,
                    errMessage: "No clinic found!"
                } )
            }
        }
        catch ( e )
        {
            reject( e );
        }
    } )
}
let getDetalClinicById = ( id ) =>
{
    return new Promise( async ( resolve, reject ) =>
    {
        try
        {
            if ( !id )
            {
                return reject( {
                    errCode: 1,
                    errMessage: "Missing required parameter!"
                } )
            }
            else
            {
                let clinic = await db.Clinic.findOne( {
                    where: { id: id },
                } );
                if ( clinic )
                {
                    clinic.image = new Buffer( clinic.image, 'base64' ).toString( 'binary' );

                }
                else clinic = {};

                resolve( {
                    errCode: 0,
                    data: clinic,
                    errMessage: "ok"
                } )
            }
        }
        catch ( e )
        {
            reject( e );
        }
    } )
}

let searchClinic = ( data ) =>
{
    return new Promise( async ( resolve, reject ) =>
    {
        try
        {
            let clinic = await db.Clinic.findAll( {
                where: {
                    name: {
                        [ Op.like ]: `%${ data }%`
                    }
                }
            } );
            if ( clinic && clinic.length > 0 )
            {
                clinic.map( item =>
                {
                    item.image = new Buffer( item.image, 'base64' ).toString( 'binary' );
                    return item;
                } )
            }
            if ( clinic && clinic.length > 0 )
            {
                resolve( {
                    errCode: 0,
                    data: clinic
                } )
            }
            else
            {
                resolve( {
                    errCode: 1,
                    errMessage: "No clinic found!"
                } )
            }
        }
        catch ( e )
        {
            reject( e );
        }
    } )
}


let updateClinic = ( data ) =>
{
    console.log( data )
    return new Promise( async ( resolve, reject ) =>
    {
        try
        {
            let clinic = await db.Clinic.findOne( {
                where: { id: data.id },
                raw: false

            } )
            if ( clinic )
            {
                clinic.name = data.name;
                clinic.address = data.address;
                clinic.descriptionMarkdown = data.descriptionMarkdown;
                clinic.descriptionHTML = data.descriptionHTML;
                await clinic.save();

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


// delete 
let deleteClinic = ( clinicId ) =>
{
    return new Promise( async ( resolve, reject ) =>
    {
        let user = await db.Clinic.findOne( {
            where: { id: clinicId },
        } );

        if ( !user )
        {
            resolve( {
                errCode: 2,
                errMessage: 'User not found!'
            } );
        }

        await db.Clinic.destroy( {
            where: { id: clinicId },
        } );


        resolve( {
            errCode: 0,
            errMessage: 'Delete user succeed!'
        } );
    } )
}

module.exports = {
    createNewClinic: createNewClinic,
    getAllClinic: getAllClinic,
    getDetalClinicById: getDetalClinicById,
    searchClinic: searchClinic,
    deleteClinic: deleteClinic,
    updateClinic: updateClinic
}
