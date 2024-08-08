const { CreateError } = require("./ErrorHandler");
const db = require("../db.json");

const validate = (req, res, next) => {
    let { name, email, password } = req.body;//accessing the name email password from req
    if (name && email && password) {// making sure all these should be present while creating user
        let database = db;
        //finding index of user, if email already present in database
        let index = database.findIndex((elm) => elm.email.toLowerCase() == email.toLowerCase());// return index || -1
        if (index >= 0) { // if user is there then response error message
            next(CreateError(208, "User Already Exists, Use another Email"))
        }
        else {// else store it in database because user email is unique and not already registered
            let newUser = {
                id: new Date().getTime().toString().slice(5),
                name, email, password
            }

            req.newUser = newUser; // storing newUser object in req object
            next();// calling next so that next route handler can handle the req & res
        }
    }
    else {// if name || email || password  is missing then response error message 
        next(CreateError(416, "Not Acceptable - email, name & password Required"))
    }
}

module.exports = validate;