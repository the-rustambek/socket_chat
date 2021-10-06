const mongoose =  require("mongoose");

const messageSchema =  new mongoose.Schema({
  message_text:{
    type:String,
    required:true,
    maxlength:1024,
  },

  owner_id:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"users",
  },
  receiver_id:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"users",
  },
});

const messages = mongoose.model("messages",messageSchema);
module.exports =  messages;