// Imports needed - supertest & our server
const request = require('supertest');
const server = require('./server.js');

// 1. Test if server is "up"

describe("Servr is running", () => {
    describe("GET /", () => {
        it("returns 200", () => {
            return request(server)
            .get("/")
            .then(res => {
                expect(res.status).toBe(200);
            })
            .catch()
        })
        it("returns the type of JSON", () => {
            return request(server)
            .get("/")
            .then(res => {
                expect(res.type).toMatch(/json/i)
            })
            .catch()
        });
    });
}); // END OF SERVER RUNNING TEST

describe("GET Users /", () => {
    it("returns an array os users", async () => {
        const expected = [{ name: "Ben" }];
        const res = await request(server).get("/users");
        expect(res.body).toEqual(expect.arrayContaining(expected)); /* expect.arrayContaining(array) expect.arrayContaining(array) matches a received array which contains all of the elements in the expected array. That is, the expected array is a subset of the received array. Therefore, it matches a received array which contains elements that are not in the expected array.*/
        expect(res.body.length).toEqual(3);
    });
}); // END GET users test

describe("POST Users /", () => {
    it("returns a successful user added", async () => {
        const newUser = { name: "Billy" };
        const res = await request(server)
        .post("/users")
        .send(newUser);

        expect(res.status).toBe(201);

        //get the added user
        const expected = [{ name: "Billy" }];
        const nextRes = await request(server).get("/users");
        expect(nextRes.body).toEqual(expect.arrayContaining(expected));
    });
    it("POST request checks if there is empty data set", async () => {
        const res = await request(server).post("/users");
        expect(res.status).toBe(401);
    });
});

describe("Delete a User", () => {
    it("returns a user that was deleted", async () => {
        const deleteUser = { name: "Ben" };
        const res = await request(server)
        .delete("/users")
        .send(deleteUser);

        expect(res.status).toBe(201)
        const expected = [{ name: "Ben" }];
        const newRes = await request(server).get("/users");
        expect(newRes.body).toEqual(expect.not.arrayContaining(expected));
    });
    it("delete request if no user", async () => {
        const res = await request(server).delete("/users");
        expect(res.status).toBe(401);
    });
});