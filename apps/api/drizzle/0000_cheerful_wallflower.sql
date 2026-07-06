CREATE TABLE "events" (
	"id" text PRIMARY KEY NOT NULL,
	"source_platform" text NOT NULL,
	"source_event_id" text NOT NULL,
	"source_url" text NOT NULL,
	"group_id" text NOT NULL,
	"title" text NOT NULL,
	"description" text DEFAULT '' NOT NULL,
	"date" text NOT NULL,
	"time" text NOT NULL,
	"location" text DEFAULT '' NOT NULL,
	"thumbnail_url" text,
	"event_type" text DEFAULT 'meetup' NOT NULL,
	"registration_url" text NOT NULL,
	"tags" jsonb DEFAULT '[]'::jsonb NOT NULL,
	"featured" boolean DEFAULT false NOT NULL,
	"raw_payload" jsonb,
	"first_seen_at" timestamp with time zone NOT NULL,
	"last_seen_at" timestamp with time zone NOT NULL,
	"updated_at" timestamp with time zone NOT NULL
);
--> statement-breakpoint
CREATE TABLE "sync_runs" (
	"id" text PRIMARY KEY NOT NULL,
	"source" text NOT NULL,
	"status" text NOT NULL,
	"started_at" timestamp with time zone NOT NULL,
	"finished_at" timestamp with time zone,
	"events_found" text DEFAULT '0' NOT NULL,
	"events_new" text DEFAULT '0' NOT NULL,
	"events_updated" text DEFAULT '0' NOT NULL,
	"error_message" text
);
--> statement-breakpoint
CREATE UNIQUE INDEX "event_source_unique" ON "events" USING btree ("source_platform","source_event_id");