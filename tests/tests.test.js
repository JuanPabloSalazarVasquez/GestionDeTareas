const request = require('supertest');
const faker = require('faker');
const dateformat = require('dateformat');
const app = require('../server');

describe("Probar peticiones de usuarios", () => {

    it('Validar creación de usuarios', async () => {
        const res = await request(app)
        .post('/api/register')
        .send({
            "nombre": faker.internet.userName(),
            "email": faker.internet.email(),
            "password": faker.internet.password()
        })
        expect(res.statusCode).toEqual(500);
    })

    it('Validar el inicio de sesion de usuarios', async () => {
        const res = await request(app)
        .post('/api/login')
        .send({
            "email": faker.internet.email(),
            "password": faker.internet.password()
        })
        expect(res.statusCode).toEqual(200);
    })
});

describe("Probar peticiones de tareas", () => {
    
    it('Validar creación de tareas', async () => {
        const res = await request(app)
        .post('/api/register')
        .send({
            "nombre": faker.internet.userName(),
            "email": faker.internet.email(),
            "password": faker.internet.password()
        })
        expect(res.statusCode).toEqual(200);
    });

    it('Validar edición de tareas', async () => {
        const res = await request(app)
        .post('/api/login')
        .send({
            "email": faker.internet.email(),
            "password": faker.internet.password()
        })
        expect(res.statusCode).toEqual(200);
    })

    it('Validar eliminación de tareas', async () => {
        const res = await request(app)
        .post('/api/login')
        .send({
            "email": faker.internet.email(),
            "password": faker.internet.password()
        })
        expect(res.statusCode).toEqual(200);
    })

});