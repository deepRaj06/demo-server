const mongoose = require("mongoose")

const ticketSchema = new mongoose.Schema({
    Category  : {type : String, required : true},
    Title : {type : String, required : true},
    Message  : {type : String, required : true},
})

const ticketModel = mongoose.model("blog", ticketSchema)

module.exports = {
    ticketModel
}