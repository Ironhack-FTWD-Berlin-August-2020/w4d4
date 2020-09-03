const mongoose = require('mongoose');

mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.set('useUnifiedTopology', true);

mongoose.connect('mongodb://localhost/promise-all')
    .then(x => {
        console.log('Connected to Mongo');
    })
    .catch(err => {
        console.error('Error connecting to Mongo', err);
    });

const Student = mongoose.model('Student', { firstName: String });
const City = mongoose.model('City', { name: String });

const promise1 = Student.insertMany([{ firstName: 'Alice' }, { firstName: 'Bob' }]);
const promise2 = City.insertMany([{ name: 'Madrid' }, { name: 'Barcelona' }, { name: 'Paris' }]);

mongoose.connection.close();
// Promise.all([promise1, promise2])
//     .then(values => {
//         console.log('students and cities have been inserted');
//         console.log(values);
//         mongoose.connection.close();
//     })
//     .catch(err => {
//         console.log(err);
//     })