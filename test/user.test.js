const request = require('supertest')
const app = require('../index')

const objectToTest = {
    "id": 478451,
    "name": "John",
    "lastname": "Done",
    "email": "john@hotmail.com",
    "password": "password"
}

let userId;
let token;

/* describe('GET /', () => {
    it('should return 200 OK', async () => {
        const response = await request(app).get('/')
        console.log(response);
        expect(response.status).toBe(200)
        expect(response.text).toBe('Hello world')
    })
}) */

describe('GET /user', () => {
    it('response with status 200', async () => {
        const response = await request(app).get('/user')
        expect(response.status).toBe(200)
    })
    it('response with status 200', async () => {
        const response = await request(app).get('/user')
        const objeccToTest = {
            "_id": "65d3f84f6547e55d52a9c399",
            "id": 1234,
            "name": "felipe",
            "lastname": "User",
            "email": "felipe@gmail.com",
            "password": "$2b$10$VzbnqY.58hLBZrZBGpo2R.ts34Z7jx8opX1R0xGnQfzZiWkLnyC9O",
            "__v": 0,
            "avatar": "uploads\\1708391721189-animated-gifs-of-fighting-game-backgrounds-6.gif"
        }
        expect(Array.isArray(response.body)).toBe(true)
        expect(response.body).toEqual(expect.arrayContaining([objeccToTest]))
    })
})


describe('POST /user', () => {
    it('responds with a new user', async () => {
        const newUser = objectToTest;
        const response = await request(app).post('/user').send(newUser);
        /**
         * Asiganacion de id a la variable
         */
        userId = response.body._id;
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('_id');
        expect(response.body.name).toBe(newUser.name);
        expect(response.body.lastname).toBe(newUser.lastname);
        expect(response.body.email).toBe(newUser.email);

    })
})

describe('GET /user/:id', () => {
    it('responds with on Object that contains an specific user', async () => {
        const id = userId;
        const response = await request(app).get(`/user/${id}`);
        expect(response.status).toBe(200);
        expect(typeof response.body == "object").toBe(true);
        expect(response.body).toHaveProperty('_id');
        expect(response.body.name).toBe(objectToTest.name);
        expect(response.body.lastname).toBe(objectToTest.lastname);
        expect(response.body.email).toBe(objectToTest.email);
    })
})

describe('POST/login', () => {
    it('responds with a token', async () => {
        const user = objectToTest
        const response = await request(app).post('/login').send(user);
        token = response.body.token;
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('token');
        expect(response.body.status).toBe('success');
    })
    it('responds with a error', async () => {
        const user = {
            "email": "felipe@gmail.com",
            "password": "pass"
        }
        const response = await request(app).post('/login').send(user);
        expect(response.status).toBe(401);
        expect(response.body).not.toHaveProperty('token');
        expect(response.body.status).toBe('error');
    })
})

describe('DELETE/delete', () => {
    it('responds with a success', async () => {
        const id = userId;
        const tokenUser = token;
        const response = await request(app).delete('/user/' + id).set('Authorization', 'Bearer ' + tokenUser);
        expect(response.status).toBe(200);
        expect(response.body.status).toBe('success');
    })
})
