const mongoose = require('mongoose');

const { Schema } = mongoose;
const { Types: { ObjectId } } = Schema;
const commentSchema = new Schema({
  commenter: {
    type: ObjectId, // ref에 의해 User schema의 ObjectId를 가리킴 
    required: true,
    ref: 'User',
    // ref가 없다면 User의 _id만 가져오게 되고 다른 정보를 가져오지 못함
  },
  comment: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});
/*
population: 문서의 경로를 다른 컬렉션의 실제 문서로 자동으로 바꾸는 방법
우리는 schema에 ref를 정의하고 몽구스는 해당 ref를 이용하여 문서를 찾는다
*/

module.exports = mongoose.model('Comment', commentSchema);
