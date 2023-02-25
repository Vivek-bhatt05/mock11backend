const mongoose = require("mongoose")


const connection =mongoose.connect("mongodb+srv://vivek:bhatt@cluster0.dkgsblh.mongodb.net/mock11?retryWrites=true&w=majority")

module.exports={
    connection
}