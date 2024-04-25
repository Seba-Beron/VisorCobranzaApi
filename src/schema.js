
var { buildSchema, GraphQLScalarType } = require("graphql");
var { Kind } = require("graphql/language");

const persons = [
    {
        id: "123",
        name: "seba",
        phone: 123,
        city: "General",
        street: "Estrada",
        birthdate: new Date()
    },
    {
        id: "1234",
        name: "carlos",
        phone: 1234,
        city: "General"
    }
]

module.exports = {

    schema: buildSchema(`

    type User {
        rut: Int!
        name: String!
        email: String
        birthdate: Date
        password: String!
    }

    type Person {
        id: ID!
        name: String!
        phone: Int
        street: String
        address: String
        city: String
        birthdate: Date
    }

    type Query {
        personCount: Int!
        allPersons(phone: YesNo): [Person]!
        findPerson(name: String!): Person!
        allUsers: [User!]
    }

    type Mutation {
        addPerson(
            name: String!
            phone: Int
            street: String
            city: String
            birthdate: Date
        ): Person
        editNumber(
            name: String!
            phone: String!
        ): Person
    }

    scalar Date
    type MyType {
        created: Date
    }

    enum YesNo {
        YES
        NO
    }
    `),

    root: {
        hello() {
            return "Hello world!"
        },
        personCount: () => persons.length,
        allPersons: ({phone}) => {
            if (!phone) return persons

            return persons
                .filter(person => {
                    return phone == "YES" ? person.phone : !person.phone
                })
        },
        findPerson: ({ name }) => {
            return persons.find(person => person.name == name)
        },
        addPerson: ({person}) => {
            const p = { ...person, id: uuid() }
            persons.push(p)
            return p
        },
        allUsers: () => {
            
        },
        editNumber: ({ name, phone }) => {
            const personIndex = persons.findIndex(person => person.name == name)

            if (!personIndex == -1) return null
            persons[personIndex].phone = phone;

            return persons[personIndex];
        },
        Person: {
            address: (root) => `${root.street},${root.city}`
        },
        Date: new GraphQLScalarType({
            name: 'Date',
            description: 'Date custom scalar type',
            parseValue(value) {
                return new Date(value); // value from the client
            },
            serialize(value) {
                return value.getTime(); // value sent to the client
            },
            parseLiteral(ast) {
                if (ast.kind === Kind.INT) {
                    return parseInt(ast.value, 10); // ast value is always in string format
                }
                return null;
            },
        })
    }
}


