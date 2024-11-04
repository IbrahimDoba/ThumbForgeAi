ALTER TABLE "generated_images" ALTER COLUMN "id" SET DATA TYPE uuid;--> statement-breakpoint
ALTER TABLE "generated_images" ALTER COLUMN "id" SET DEFAULT gen_random_uuid();--> statement-breakpoint
ALTER TABLE "generated_images" ADD COLUMN "enhanced_prompt" text;--> statement-breakpoint
ALTER TABLE "generated_images" ADD COLUMN "credit_cost" integer DEFAULT 2;--> statement-breakpoint
ALTER TABLE "user" ADD COLUMN "credits" integer DEFAULT 6;