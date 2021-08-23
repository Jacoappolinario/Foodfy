DROP DATABASE IF EXISTS foodfy; -- Essa linha pode ser ignora na primeira inserção do banco de dados.
CREATE DATABASE foodfy; -- Caso tenha executado o postgres pela imagem do docker, ignore essa linha.

CREATE TABLE "recipes" (
  "id" SERIAL UNIQUE PRIMARY KEY,
  "chef_id" integer NOT NULL,
  "user_id" int,
  "title" text NOT NULL,
  "ingredients" text[] NOT NULL,
  "preparation" text[] NOT NULL,
  "information" text NOT NULL,
  "created_at" timestamp DEFAULT (now()),
  "updated_at" timestamp DEFAULT (now())
);

CREATE TABLE "files" (
  "id" serial PRIMARY KEY,
  "name" text,
  "path" text NOT NULL
);

CREATE TABLE "recipes_files" (
  "id" serial PRIMARY KEY,
  "recipe_id" INTEGER REFERENCES recipes(id) ON DELETE CASCADE,
  "file_id" INTEGER REFERENCES files(id) ON DELETE CASCADE
);

CREATE TABLE "chefs" (
  "id" SERIAL PRIMARY KEY,
  "name" text NOT NULL,
  "file_id" INTEGER REFERENCES files(id),
  "created_at" timestamp DEFAULT (now()),
  "updated_at" timestamp DEFAULT (now()) 
);

CREATE TABLE "users" (
  "id" SERIAL PRIMARY KEY,
  "name" text NOT NULL,
  "email" text UNIQUE NOT NULL,
  "password" text NOT NULL,
  "reset_token" text,
  "reset_token_expires" text,
  "is_admin" BOOLEAN DEFAULT false,
  "created_at" timestamp DEFAULT (now()),
  "updated_at" timestamp DEFAULT (now()) 
);

-- Foreign Key
ALTER TABLE "recipes" ADD FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE;

-- Insert admin
INSERT INTO users(name, email, password, is_admin) VALUES ('admin', 'admin@foodfy.com', '$2a$08$623m07nhd9N/JAjZyrEO8uhn7MBW5a0bSEc9Ky5g5FjCorbi4gmPy', true);

-- Create procedure
CREATE FUNCTION trigger_set_timestamp()
RETURNS TRIGGER AS $$
BEGIN
	NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Auto updated_at recipes
CREATE TRIGGER set_timestamp
BEFORE UPDATE ON recipes
FOR EACH ROW
EXECUTE PROCEDURE trigger_set_timestamp();

-- Auto updated_at users
CREATE TRIGGER set_timestamp
BEFORE UPDATE ON users
FOR EACH ROW
EXECUTE PROCEDURE trigger_set_timestamp();

-- Auto updated_at chefs
CREATE TRIGGER set_timestamp
BEFORE UPDATE ON chefs
FOR EACH ROW
EXECUTE PROCEDURE trigger_set_timestamp();

-- connect pg simple table
CREATE TABLE "session" (
  "sid" varchar NOT NULL COLLATE "default",
	"sess" json NOT NULL,
	"expire" timestamp(6) NOT NULL
)
WITH (OIDS=FALSE);

ALTER TABLE "session" ADD CONSTRAINT "session_pkey" PRIMARY KEY ("sid") NOT DEFERRABLE INITIALLY IMMEDIATE;

CREATE INDEX "IDX_session_expire" ON "session" ("expire");
