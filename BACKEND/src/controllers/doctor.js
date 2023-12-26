import doctorService from "../services/doctor"


// function create new user
let createNewDoctor = async ( req, res ) =>
{
    let message = await doctorService.createNewDoctor( req.body );
    return res.status( 200 ).json( message );
}

// get all patient
let getDoctor = async ( req, res ) =>
{
    let message = await doctorService.getDoctor();
    return res.status( 200 ).json( message );
}


// update patient by id
let updateDoctor = async ( req, res ) =>
{
    if ( !req.body )
    {
        return res.status( 400 ).json( {
            errCode: 1,
            message: "Invalid information patient!"
        } );
    }
    else
    {
        let message = await doctorService.updateDoctor( req.body );
        return res.status( 200 ).json( message );
    }
}


// get all code table
let getAllCode = async ( req, res ) =>
{
    try
    {
        let data = await doctorService.getAllCode( req.query.type );
        return res.status( 200 ).json( data );

    }
    catch ( err )
    {
        console.log( "Get all code error", err );
        return res.status( 200 ).json( {
            errCode: -1,
            errMessage: "Error from server!"
        } )
    }
}


let getDoctorById = async ( req, res ) =>
{
    try
    {

        let infor = await doctorService.getDoctorById( req.query.id );
        return res.status( 200 ).json( infor );
    }
    catch ( e )
    {
        console.log( e );
        return res.status( 200 ).json( {
            errCode: -1,
            errMessage: "Error from the serser!"
        } )
    }
}


let deleteDoctor = async ( req, res ) =>
{
    if ( !req.body.id )
    {
        return res.status( 400 ).json( {
            errCode: 1,
            message: "Invalid patient id!"
        } );
    }
    else
    {
        let message = await doctorService.deleteDoctor( req.body.id );
        return res.status( 200 ).json( message );
    }
}

module.exports = {
    createNewDoctor: createNewDoctor,
    getDoctor: getDoctor,
    updateDoctor: updateDoctor,
    getAllCode: getAllCode,
    getDoctorById: getDoctorById,
    deleteDoctor: deleteDoctor,
}