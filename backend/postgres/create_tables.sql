-- Создание таблицы users
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    telegram_id INT UNIQUE NOT NULL
);

-- Создание таблицы tasks
CREATE TABLE tasks (
    id SERIAL PRIMARY KEY,
    user_id INT NOT NULL,
    task_type VARCHAR(50) NOT NULL,
    name VARCHAR(255) NOT NULL,
    description VARCHAR(255),
    tags VARCHAR(255),
    date VARCHAR(50),
    notification_time INT,
    status VARCHAR(15) NOT NULL,
    priority VARCHAR(25),
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- Создание таблицы events
CREATE TABLE events (
    id SERIAL PRIMARY KEY,
    user_id INT NOT NULL,
    event_type VARCHAR(50) NOT NULL,
    name VARCHAR(255) NOT NULL,
    description VARCHAR(255),
    date VARCHAR(50),
    notification_time INT,
    status VARCHAR(15) NOT NULL,
    start_time VARCHAR(50) NOT NULL,
    finish_time VARCHAR(50) NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);
