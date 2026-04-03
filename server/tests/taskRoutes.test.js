const request = require("supertest");
const app = require("../src/app");

describe("Task API", () => {
  test("GET / should return API status message", async () => {
    const response = await request(app).get("/");

    expect(response.statusCode).toBe(200);
    expect(response.body.message).toBe("Kanban Task Manager API running");
  });

  test("GET /api/tasks should return all tasks", async () => {
    const response = await request(app).get("/api/tasks");

    expect(response.statusCode).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });

  test("POST /api/tasks should create a new task", async () => {
    const newTask = {
      title: "Write backend API tests",
      description: "Add Jest and Supertest for API validation",
      status: "todo",
      priority: "high",
    };

    const response = await request(app).post("/api/tasks").send(newTask);

    expect(response.statusCode).toBe(201);
    expect(response.body.title).toBe(newTask.title);
    expect(response.body.description).toBe(newTask.description);
    expect(response.body.status).toBe(newTask.status);
    expect(response.body.priority).toBe(newTask.priority);
  });
});