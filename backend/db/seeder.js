const { Client } = require("pg");
const { faker } = require("@faker-js/faker");

const client = new Client({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_DB,
});

function pickRandom(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
}

async function seed() {
    await client.connect();

    // Reset tables cleanly (dev only)
    await client.query(`
    TRUNCATE users, tickets, user_roles, ticket_notes, user_tickets
    RESTART IDENTITY CASCADE
  `);

    // =========================
    // SEED USERS
    // =========================
    const userIds = [];

    for (let i = 0; i < 50; i++) {
        const result = await client.query(
            `
      INSERT INTO users (
        first_name,
        preferred_name,
        middle_name,
        last_name,
        suffix,
        email,
        phone_number,
        created_at,
        modified_at
      )
      VALUES ($1,$2,$3,$4,$5,$6,$7,to_timestamp($8 / 1000.0),to_timestamp($9 / 1000.0))
      RETURNING id
      `,
            [
                faker.person.firstName(),
                faker.person.firstName(),
                faker.person.middleName(),
                faker.person.lastName(),
                faker.person.suffix(),
                faker.internet.email(),
                faker.phone.number({ style: "international" }),
                Date.now(),
                Date.now(),
            ],
        );

        userIds.push(result.rows[0].id);
    }

    // =========================
    // SEED TICKETS
    // =========================
    const statuses = ["open", "in_progress", "resolved", "closed"];
    const priorities = ["low", "medium", "high", "critical"];

    for (let i = 0; i < 100; i++) {
        const agentId = pickRandom(userIds);
        const requesterId = pickRandom(userIds);

        await client.query(
            `
      INSERT INTO tickets (
        agent_id,
        requester_id,
        subject,
        description,
        status,
        priority,
        contact_number,
        created_at,
        modified_at
      )
      VALUES ($1,$2,$3,$4,$5,$6,$7,to_timestamp($8 / 1000.0),to_timestamp($9 / 1000.0))
      `,
            [
                agentId,
                requesterId,
                faker.lorem.sentence(),
                faker.lorem.paragraph(),
                pickRandom(statuses),
                pickRandom(priorities),
                faker.phone.number({ style: "international" }),
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
