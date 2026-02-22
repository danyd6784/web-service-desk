import pkg from "pg";
import { faker } from "@faker-js/faker";

const { Client } = pkg;
const client = new Client({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DB,
});

async function seed() {
  await client.connect();
  await client.query("DELETE FROM tickets");
  await client.query("DELETE FROM users");

  // generate users and insert into database
  const users = [];
  for (let i = 0; i < 50; i++) {
    users.push({
      first_name: faker.name.first_name(),
      preferred_name: faker.name.first_name(),
      middle_name: faker.name.middle_name(),
      last_name: faker.name.last_name(),
      suffix: faker.name.suffix(),
      email: faker.internet.email(),
      phone_number: faker.phone.number(),
      createdAt: Date.now(),
      modifiedAt: Date.now(),
    });
  }
  for (const user of users) {
    await client.query(
      "INSERT INTO users (first_name, preferred_name, middle_name, last_name, suffix, email, phone_number, created_at, modified_at) VALUES ($1, $2, $3, $4, $5, $6, $7, to_timestamp($8 / 1000.0), to_timestamp($9 / 1000.0))",
      [
        user.first_name,
        user.preferred_name,
        user.middle_name,
        user.last_name,
        user.suffix,
        user.email,
        user.phone_number,
        user.createdAt,
        user.modifiedAt,
      ],
    );
  }

  // generate 100 tickets and insert into database
  for (let i = 0; i < 100; i++) {
    const randomUser = users[Math.floor(Math.random() * users.length)];
    await client.query(
      "INSERT INTO tickets (agent_id, requester_id, subject, description, status, priority, contact_number created_at, modified_at) VALUES ($1, $2, $3, $4, $5, $6, to_timestamp($7 / 1000.0), to_timestamp($8 / 1000.0))",
      [
        faker.lorem.sentence(),
        faker.lorem.paragraph(),
        "Open",
        "Medium",
        randomUser.email,
        null,
        Date.now(),
        Date.now(),
      ],
    );
  }

  await client.end();
  console.log("Database seeded successfully");
}

seed().catch((err) => {
  console.error("Error seeding database:", err);
});
