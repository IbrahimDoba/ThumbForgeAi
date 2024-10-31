CREATE TABLE IF NOT EXISTS "generated_images" (
	"id" serial PRIMARY KEY NOT NULL,
	"image_url" text NOT NULL,
	"prompt" text NOT NULL,
	"thumbnail_text" varchar(255),
	"image_type" varchar(50),
	"aspect_ratio" varchar(20),
	"color_palette" varchar(50),
	"enhance_prompt" varchar(5),
	"created_at" timestamp DEFAULT now() NOT NULL
);
