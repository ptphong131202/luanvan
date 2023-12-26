import adminService from "../services/admin"

// function create new user
let createNewAdmin = async ( req, res ) =>
{
    let message = await adminService.createNewAdmin( req.body );
    return res.status( 200 ).json( message );
}


// get all patient
let getAdmin = async ( req, res ) =>
{
    let message = await adminService.getAdmin();
    return res.status( 200 ).json( message );
}

// get patient by id
let getAdminById = async ( req, res ) =>
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
        let message = await adminService.getAdminById( req.query.id );
        return res.status( 200 ).json( message );
    }
}


// update patient by id
let updateAdmin = async ( req, res ) =>
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
        let message = await adminService.updateAdmin( req.body );
        return res.status( 200 ).json( message );
    }
}



let deleteAdmin = async ( req, res ) =>
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
        let message = await adminService.deleteAdmin( req.body.id );
        return res.status( 200 ).json( message );
    }
}
module.exports = {
    createNewAdmin: createNewAdmin,
    getAdmin: getAdmin,
    getAdminById: getAdminById,
    updateAdmin: updateAdmin,
    deleteAdmin: deleteAdmin,
}