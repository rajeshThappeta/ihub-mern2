//create express app
const exp = require("express")
const app = exp()
const path = require('path')
const userApi = require('./APIS/userApi')
const mclient = require("mongodb").MongoClient

//connecting express server with react build
app.use(exp.static(path.join(__dirname, '../build')))

//when path starts with /user, use userApi
app.use("/user", userApi)

//create db connection
const dburl = "mongodb+srv://ihubb2:ihubb2@cluster0.rjvoz.mongodb.net/ihubb2db?retryWrites=true&w=majority"

mclient.connect(dburl, (err, clientDB) => {
    if (err) {
        console.log("Error in connecting to DB", err)
    }
    else {
        let dbobj = clientDB.db();
        let userCollectionObj = dbobj.collection("usercollection")
        app.set("userCollectionObj", userCollectionObj)
        console.log("DB server started")
    }
})


//assgn port
const PORT = 5000
app.listen(PORT, () => console.log(`Web server running on port ${PORT}..`))