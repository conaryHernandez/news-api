const User = require('../../models/user');
const feedController = require('../feed');
const mongoose = require('mongoose');

describe('Feed Controller - Get User status', () => {
    let connection;
  
    beforeAll(async() => {
        const MONGODB_URI = `mongodb://conaryh:k9X9MpdWnfHYcqMC@cluster0-shard-00-00-nvbxl.mongodb.net:27017,cluster0-shard-00-01-nvbxl.mongodb.net:27017,cluster0-shard-00-02-nvbxl.mongodb.net:27017/test-messages?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&w=majority`;

        connection = await mongoose.connect(MONGODB_URI);
        const user = new User({
            email: 'test@test.com',
            password: 'test',
            name: 'test',
            posts: [],
            _id: '5c0f66b979af55031b34727a'
        })

        return user.save();
    });
  
    afterAll(async () => {
        const deletedUser = await User.deleteOne({_id: '5c0f66b979af55031b34727a'});
        
        return mongoose.disconnect();    
    });
    
    it('should send a response with a valid user status for existing user', (done) => {

        const req = { userId: '5c0f66b979af55031b34727a' };
        const res = {
            statusCode: 500,
            userStatus: null,
            status: function(code) {
                this.statusCode = code;

                return this;
            },
            json: function(data) {
                this.userStatus = data.status;
            }
        };

        feedController.getUserStatus(req, res, () => {}).then(() => {
            expect(res.statusCode).toEqual(200);
            expect(res.userStatus).toEqual('new');
            done();
        });
    });
});