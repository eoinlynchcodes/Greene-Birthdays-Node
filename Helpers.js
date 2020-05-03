// DB Config
const db = require('./dbConfig');

module.exports = {
    addUser,
    findAllFamilyMembers,
    addFamilyMember,
    findUserBy
}

async function addUser(user){
    await db('users')
    .insert(user, 'id');
    return db('users');
}

async function addFamilyMember(familyMember){
    await db('familyMembers')
    .insert(familyMember, 'id');
    return db('familyMembers');
}

function findAllFamilyMembers(){
    return db('familyMembers')
}

function findUserBy(filter){
    return db('users').where(filter);
}