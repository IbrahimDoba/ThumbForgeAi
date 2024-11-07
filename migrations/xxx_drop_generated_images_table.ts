// migrations/xxx_drop_generated_images_table.ts

import { sql } from 'drizzle-orm';

export async function up(db) {
  await db.execute(sql`DROP TABLE IF EXISTS generated_images;`);
}

export async function down(db) {
  // Optional: Recreate the table if needed to rollback this migration
  await db.execute(sql`
    CREATE TABLE generated_images (
      id UUID PRIMARY KEY,
      user_id UUID NOT NULL,
      image_url TEXT NOT NULL,
      prompt TEXT NOT NULL,
      thumbnail_text VARCHAR(255),
      enhanced_prompt TEXT,
      image_type VARCHAR(50),
      aspect_ratio VARCHAR(20),
      color_palette VARCHAR(50),
      enhance_prompt VARCHAR(5),
      created_at TIMESTAMP DEFAULT now() NOT NULL,
      credit_cost INTEGER DEFAULT 2
    );
  `);
}
