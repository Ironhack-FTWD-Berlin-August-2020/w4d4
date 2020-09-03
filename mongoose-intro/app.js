const mongoose = require('mongoose');

// 'mongodb://localhost/<NameOfTheDatabase>'

mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.set('useUnifiedTopology', true);

mongoose.connect('mongodb://localhost/mongoose-intro')
    .then(x => {
        console.log('Connected to Mongo');
    })
    .catch(err => {
        console.error('Error connecting to Mongo', err);
    });

const catSchema = mongoose.Schema({
    name: String,
    lives: Number
});

const Cat = mongoose.model('Cat', catSchema);


// Cat.create({ name: 'Kitty' })
//     .then(catFromDB => {
//         console.log(`A new cat was created: ${catFromDB}`);
//     })
//     .catch(err => {
//         console.log(`Error while creating cat: ${err}`);
//     });

// find() returns all documents from the collection

// Cat.find().then(cats => {
//     console.log(cats[0].name);
// })

// Cat.findById('5f50f7896ae53ec7ffda737b')
//     .then(cat => console.log(cat));

// findOne() - returns the first document that matches the query

// Cat.findOne({ name: 'Kitty' })
//     .then(cat => console.log(cat));

// updates the first document that matches the query
// Cat.updateOne({ name: 'Kitty' }, { name: 'Garfield' })
//     .then(cat => console.log(cat));


// Cat.findByIdAndDelete('5f50f7896ae53ec7ffda737b')
//     .then(cat => {
//         console.log(cat);
//     })

// deletes the first document that matches the query
// Cat.deleteOne({ hungry: true }).then(result => {
//     console.log(result);
// });

// updates cat with this id
// Cat.findByIdAndUpdate('id890890', { name: 'foo' });


// Cat.updateMany(query, changes) -> updates all documents matching the given query and apply the changes to these documents
// Cat.updateMany({ age: 9 }, { age: 18, hungry: true })
//     .then(result => {
//         console.log(result);
//     })
//     .catch(err => {
//         console.log(err);
//     });


// insertMany gets an array of objects
// Cat.insertMany([
//     { name: 'Kitty' },
//     { name: 'Garfield' }
// ]).then(cats => {
//     console.log(cats);
// })

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 20,
        set: value => {
            return value
                .split(' ')
                .map(str => str[0].toUpperCase() + str.slice(1).toLowerCase())
                .join(' ')
        }
    },
    age: {
        type: Number,
        min: 18,
        max: 120
    },
    hobbies: [String],
    address: Object,
    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user'
    },
    email: {
        type: String,
        required: true,
        trim: true,
        validate: {
            message: 'Validation failed',
            validator: value => {
                // check if email is lowercase and contains an @
                if (value.toLowerCase() === value && value.includes('@')) return true;
                else return false;
            }
        }
    }
});

const User = mongoose.model('User', userSchema);

User.create({
    name: "john doe",
    email: 'johndoe@gmail.com'
}).then(user => {
    console.log(user);
}).catch(err => {
    console.log(err);
});