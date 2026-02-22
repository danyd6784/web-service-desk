CREATE TABLE users (
    id              BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    first_name      TEXT,
    preferred_name  TEXT,
    middle_name     TEXT,
    last_name       TEXT,
    suffix          TEXT,
    email           TEXT UNIQUE,
    phone_number    TEXT,
    --Standard Audit fields
    created_at      TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    modified_at     TIMESTAMP WITH TIME ZONE DEFAULT NOW(),

    CONSTRAINT email_format CHECK (
        email ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}'
    ),
    CONSTRAINT phone_format CHECK (
        phone_number IS NULL OR
        phone_number ~ '^\+[1-9]\d{1,14}$'
    )
);


CREATE TABLE roles (
    id              BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    name            TEXT NOT NULL UNIQUE,
    descr           TEXT,
    created_at      TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    modified_at     TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

INSERT INTO roles (name, descr) VALUES
    ( 'Admin', 'Organization administrator'),
    ( 'Agent', 'Service Desk Agent'),
    ( 'User', 'Generic user role');

CREATE TABLE user_roles (
    id              BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    user_id         BIGINT REFERENCES users(id) ON DELETE CASCADE,
    role_id         BIGINT REFERENCES roles(id) ON DELETE CASCADE,
    created_at      TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    modified_at     TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE (user_id, role_id)
);

CREATE TABLE tickets (
    id              BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    agent_id        BIGINT REFERENCES users(id) ON DELETE SET NULL, --agent can be unassigned, so allow null
    --not null to ensure every ticket has a requester, but can be assigned to an agent later
    requester_id    BIGINT  NOT NULL REFERENCES users(id),
    subject         TEXT NOT NULL,
    description     TEXT,
    status          TEXT NOT NULL DEFAULT 'open',
    priority        TEXT NOT NULL DEFAULT 'medium',
    contact_number  TEXT,
    created_at      TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    modified_at     TIMESTAMP WITH TIME ZONE DEFAULT NOW(),

    CONSTRAINT status_check CHECK (
        status IN ('open', 'in_progress', 'resolved', 'closed')
    ),
    CONSTRAINT priority_check CHECK (
        priority IN ('low', 'medium', 'high', 'critical')
    )
);

CREATE TABLE ticket_notes (
    id          BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    ticket_id   BIGINT NOT NULL REFERENCES tickets(id) ON DELETE CASCADE,
    author_id   BIGINT NOT NULL REFERENCES users(id),
    body        TEXT NOT NULL,
    created_at  TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);


CREATE TABLE user_tickets (
    id              BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    user_id         BIGINT REFERENCES users(id) ON DELETE CASCADE,
    ticket_id       BIGINT REFERENCES tickets(id) ON DELETE CASCADE,
    created_at      TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    modified_at     TIMESTAMP WITH TIME ZONE DEFAULT NOW(),

    UNIQUE (user_id, ticket_id)
);

--indexes for performance
CREATE INDEX idx_tickets_requester_status ON tickets(requester_id, status);
CREATE INDEX idx_tickets_agent ON tickets(agent_id);
CREATE INDEX idx_ticket_notes_ticket_id ON ticket_notes(ticket_id);