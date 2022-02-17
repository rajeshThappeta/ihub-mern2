//create express mini app
const exp = require("express")
const userApp = exp.Router()
const jwt = require("jsonwebtoken")

const bcryptjs = require("bcryptjs")

//use body parser middleware
userApp.use(exp.json())

//middleware to extract userCollectionObj
let userCollectionObj;

const getUserCollectionObj = (req, res, next) => {
    userCollectionObj = req.app.get("userCollectionObj")
    next()
}
userApp.use(getUserCollectionObj)


//create user
userApp.post("/createuser", (req, res) => {
    //extract body
    let userObj = req.body
    //hash the password
    bcryptjs.hash(userObj.password, 5, (err, hashedPasword) => {
        if (err) {
            console.log("err in hashing password");
        }
        else {
            //replace paint pw with hashed pa
            userObj.password = hashedPasword;
            //save userObj to usercollection
            userCollectionObj.insertOne(userObj, (err, success) => {
                if (err) {
                    console.log("err in creating user ", err);
                    res.send({ message: "error", payload: err.message })
                }
                else {
                    res.send({ message: "success", payload: success })
                }
            })

        }
    })
})



//user login
userApp.post('/login', (req, res) => {

    //get body
    let userCredObj = req.body

    //verify username
    userCollectionObj.findOne({ username: userCredObj.username }, (err, userObj) => {
        if (err) {
            console.log("err in username verification", err);
        }
        //if user is not existed
        else if (userObj == null) {
            res.send({ message: "invalid-username" })
        }
        //if user existed
        else {
            //verify password
            bcryptjs.compare(userCredObj.password, userObj.password, (err, status) => {


                if (err) {
                    console.log("err in username verification", err);
                }
                else if (status == false) {
                    res.send({ message: "invalid-password" })
                }
                else {
                    //create  a token
                    let token = jwt.sign({ username: userObj.username }, 'abcdef', { expiresIn: "10000" })
                    //send token as response
                    res.send({ message: "success", payload: token, userObj: userObj })
                }
            })
        }
    })

})


//token verification process
let verifyToken = (req, res, next) => {
    //get token from header of req object
    let token = req.headers.authorization;

    console.log("token", token);

    //if token not existed
    if (token == 'null') {
        res.send({ message: "Unauthorized access" })
    }
    //if token existed
    else {
        //verify token
        jwt.verify(token, 'abcdef', (err, decoded) => {
            console.log("err is ", err);
            //if token is expired
            if (err) {
                res.send({ message: "Session expired...plz relogin to continue..." })
            }
            else {
                next()
            }
        })

    }
}

//private route
userApp.get('/private', verifyToken, (req, res) => {
    res.send({ message: "This is res from private route" })
})



//export
module.exports = userApp