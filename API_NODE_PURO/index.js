import http from "http";
import { v4 } from "uuid";

const PORT = 3000;

const DB_Grades = [];

const server = http.createServer((request, response) => {
  const { method, url } = request;
  let body = "";

  request.on("data", (chunk) => {
    body += chunk.toString();
  });

  request.on("end", () => {
    const id = url.split("/")[2];

    if (url === "/grades" && method === "GET") {
      response.writeHead(200, { "Content-Type": "application/json" });
      response.end(JSON.stringify(DB_Grades));
    } else if (url === "/grades" && method === "POST") {
      const { studentName, subject, grade } = JSON.parse(body);
      const newGrade = { id: v4(), studentName, subject, grade };
      DB_Grades.push(newGrade);
      response.writeHead(201, { "Content-Type": "application/json" });
      response.end(JSON.stringify(newGrade));
    } else if (url.startsWith("/grades/") && method === "PUT") {
      const { studentName, subject, grade } = JSON.parse(body);
      const gradeToUpdate = DB_Grades.find((element) => element.id === id);

      if (gradeToUpdate) {
        gradeToUpdate.studentName = studentName;
        gradeToUpdate.subject = subject;
        gradeToUpdate.grade = grade;
        response.writeHead(200, { "Content-Type": "Application/json" });
        response.end(JSON.stringify(gradeToUpdate));
      } else {
        response.writeHead(404, { "Content-Type": "application/json" });
        response.end(JSON.stringify({ message: "Grade not found." }));
      }
    } else if (url.startsWith("/grades/") && method === "DELETE") {
      const indexToDelete = DB_Grades.findIndex((element) => element.id === id);
      if (indexToDelete !== -1) {
        DB_Grades.splice(indexToDelete, 1);
        response.writeHead(204);
        response.end();
      } else {
        response.writeHead(404, { "Content-Type": "application/json" });
        response.end(JSON.stringify({ message: "Grade not found" }));
      }
    } else {
      response.writeHead(404, { "Content-Type": "application/json" });
      response.end(JSON.stringify({ message: "Route not found" }));
    }
  });
});

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});


//https://learning.dnc.group/course/desenvolvedor-full-stack/player/145710/content/393301