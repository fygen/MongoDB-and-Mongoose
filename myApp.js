require('dotenv').config();
const mongoose = require('mongoose');
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });
const Schema = mongoose.Schema;

const personSchema = new Schema({
  name: { type: String, required: true },
  age: Number,
  favoriteFoods: [String]
})

let Person = mongoose.model("Person", personSchema);

const createAndSavePerson = (done) => {
  let zuu = new Person({
    name: "zuu",
    age: 25,
    favoriteFoods: [
      "zibili", "zibbbb"
    ]
  })
  zuu.save(function (err, data) {
    if (err) return console.error(err);
    done(null, data);
  })
};

var arrayOfPeople = [
  {
    name: "zoo",
    age: 21,
    favoriteFoods: ["za", "pierogi"]
  }, {
    name: "zaaa",
    age: 32,
    favoriteFoods: ["hit", "hand"]
  }, {
    name: "zuıu",
    age: 91,
    favoriteFoods: ["water", "grass"]
  }
];

const createManyPeople = (arrayOfPeople, done) => {
  Person.create(arrayOfPeople, function (err, people) {
    if (err) return console.error(err);
    else console.log(people);
    done(null, people);
  })
};

const findPeopleByName = (personName, done) => {
  Person.find({ name: personName }, function (err, people) {
    if (err) return console.error(err);
    else console.log(people);
    done(null, people);
  })

};

const findOneByFood = (food, done) => {
  Person.findOne({ favoriteFoods: food }, function (err, person) {
    if (err) return console.error(err);
    else console.log(person);
    done(null, person);
  })
};

const findPersonById = (personId, done) => {
  Person.findById(personId, (err, person) => {
    if (err) return console.error(err);
    else console.log(person);
    done(null, person);
  })
};

const findEditThenSave = (personId, done) => {
  const foodToAdd = "hamburger";
  Person.findById(personId, (err, person) => {
    if (err) return console.error(err);
    else console.log(`${person} is found adding Food ${foodToAdd} to the list`)
    person.favoriteFoods.push(foodToAdd);
    console.log(person);
    person.save((err, person) => {
      if (err) console.error(err)
      else console.log("Saved to the database.");
      done(null, person);
    })
  })
};

const findAndUpdate = (personName, done) => {
  const ageToSet = 20;
  Person.findOneAndUpdate({ name: personName }, { age: ageToSet }, { new: true },
    (err, person) => {
      if (err) console.error(err);
      else console.log(`${person} is saved.`)
      done(null, person);
    })
};

const removeById = (personId, done) => {
  Person.findByIdAndRemove(personId, (err, person) => {
    if (err) console.error(err);
    else console.log(`${person} is removed from database.`)
    done(null, person);
  })
};

const removeManyPeople = (done) => {
  const nameToRemove = "Mary";
  Person.remove({ name: nameToRemove }, (err, persons) => {
    if (err) console.error(err);
    else console.log(`${persons.deletedCount} people removed from database.`)
    done(null, persons);
  })
};


const queryChain = (done) => {
  const foodToSearch = "burrito";
  Person.find({favoriteFoods: foodToSearch})
    .sort({ name: 1 })
    .limit(2)
    .select({ age: false })
    .exec((err, data) => {
      if(err) console.error(err)
      else console.log(data);
      done(null, data);
    })
};

/** **Well Done !!**
/* You completed these challenges, let's go celebrate !
 */

//----- **DO NOT EDIT BELOW THIS LINE** ----------------------------------

exports.PersonModel = Person;
exports.createAndSavePerson = createAndSavePerson;
exports.findPeopleByName = findPeopleByName;
exports.findOneByFood = findOneByFood;
exports.findPersonById = findPersonById;
exports.findEditThenSave = findEditThenSave;
exports.findAndUpdate = findAndUpdate;
exports.createManyPeople = createManyPeople;
exports.removeById = removeById;
exports.removeManyPeople = removeManyPeople;
exports.queryChain = queryChain;
