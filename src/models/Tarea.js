const {Schema,model} = require('mongoose');

const TareaSchema = new Schema({
    title: {
        type:String,
        required:true
    },
    userId:{
        type:String,
        require:true
    },
    description:{
        type:String,
        required:true
    },
    completed:{
        type:Boolean,
        default:false
    }
},{
     timestamps:false
});

module.exports = model('Tarea',TareaSchema);