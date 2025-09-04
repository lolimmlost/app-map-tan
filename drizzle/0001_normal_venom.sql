ALTER TABLE "app" ADD COLUMN "remote_ip" varchar(45);--> statement-breakpoint
ALTER TABLE "app" ADD COLUMN "domain" varchar(253);--> statement-breakpoint
ALTER TABLE "app" ADD COLUMN "subdomain" varchar(253);--> statement-breakpoint
ALTER TABLE "app" ADD COLUMN "user_id" text NOT NULL;--> statement-breakpoint
ALTER TABLE "app" ADD CONSTRAINT "app_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;