CREATE TABLE IF NOT EXISTS "app" (
	"id" text PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"local_ip" varchar(15) NOT NULL,
	"port" integer NOT NULL,
	"description" text
);