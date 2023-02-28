require("dotenv").config();

const mongoose = require("mongoose");
const supertest = require("supertest");
const { app } = require("../app");
const { User } = require("../models/user");

const { HOST_URI_TEST } = process.env;

describe("register", () => {
  beforeAll(async () => {
    await mongoose.connect(HOST_URI_TEST);
  });

  afterAll(async () => {
    await User.deleteMany();
    await mongoose.disconnect();
  });

  it("should register a new user", async () => {
    const response = await supertest(app).post("/api/auth/register").send({
      email: "user1@gmail.com",
      password: "123456",
    });

    expect(response.status).toEqual(201);
    expect(response.body).toEqual({
      data: {
        user: {
          email: "user1@gmail.com",
          id: expect.any(String),
        },
      },
    });
  });

  it("should register a new user", async () => {
    await supertest(app).post("/api/auth/register").send({
      email: "user2@gmail.com",
      password: "123456",
    });

    const response = await supertest(app).post("/api/auth/register").send({
      email: "user2@gmail.com",
      password: "123456",
    });

    expect(response.status).toEqual(409);
  });
});
