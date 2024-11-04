ALTER TABLE "generated_images" ALTER COLUMN "id" SET DATA TYPE serial;--> statement-breakpoint
ALTER TABLE "generated_images" ALTER COLUMN "id" DROP DEFAULT;--> statement-breakpoint
ALTER TABLE "generated_images" ADD COLUMN "image_id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL;