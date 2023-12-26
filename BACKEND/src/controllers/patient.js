import patientService from "../services/patient"


// function create new user
let createNewPatient = async ( req, res ) =>
{
    let message = await patientService.createNewPatient( req.body );
    return res.status( 200 ).json( message );
}

// get all patient
let getPatient = async ( req, res ) =>
{
    let message = await patientService.getPatient();
    return res.status( 200 ).json( message );
}

// get patient by id
let getPatientById = async ( req, res ) =>
{
    if ( !req.query.id )
    {
        return res.status( 400 ).json( {
            errCode: 1,
            message: "Invalid patient id!"
        } );
    }
    else
    {
        let message = await patientService.getPatientById( req.query.id );
        return res.status( 200 ).json( message );
    }
}

// update patient by id
let updatePatient = async ( req, res ) =>
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
        let message = await patientService.updatePatient( req.body );
        return res.status( 200 ).json( message );
    }
}

let deletePatient = async ( req, res ) =>
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
        let message = await patientService.deletePatient( req.body.id );
        return res.status( 200 ).json( message );
    }
}

module.exports = {
    createNewPatient: createNewPatient,
    getPatient: getPatient,
    getPatientById: getPatientById,
    updatePatient: updatePatient,
    deletePatient: deletePatient,

}
