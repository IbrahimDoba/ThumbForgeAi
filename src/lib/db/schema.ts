import { pgTable, uuid, varchar, timestamp, text, boolean, pgEnum, serial, integer, json } from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';

export const subscriptionPlanEnum = pgEnum('subscription_plan', ['free', 'basic', 'premium', 'pro']);

export const users = pgTable('user', {
  id: uuid('id').defaultRandom().primaryKey(),
  name: varchar('name', { length: 255 }),
  username: text('username').unique().notNull(),
  email: varchar('email', { length: 255 }).notNull().unique(),
  emailVerified: timestamp('emailVerified', { mode: 'date' }),
  image: text('image'),
  bio: text('bio'),
  socials: json('socials').$type<string[]>(),
  location: text('location'),
  subscriptionPlan: subscriptionPlanEnum('subscriptionPlan').default('free'),
  credits: integer('credits').default(6),
  createdAt: timestamp('createdAt').defaultNow(),
  updatedAt: timestamp('updatedAt').defaultNow(),
});

export const accounts = pgTable('account', {
  id: uuid('id').defaultRandom().primaryKey(),
  userId: uuid('userId').notNull().references(() => users.id, { onDelete: 'cascade' }),
  type: varchar('type', { length: 255 }).notNull(),
  provider: varchar('provider', { length: 255 }).notNull(),
  providerAccountId: varchar('providerAccountId', { length: 255 }).notNull(),
  refresh_token: text('refresh_token'),
  access_token: text('access_token'),
  expires_at: integer('expires_at'),
  token_type: varchar('token_type', { length: 255 }),
  scope: varchar('scope', { length: 255 }),
  id_token: text('id_token'),
  session_state: varchar('session_state', { length: 255 }),
});

export const sessions = pgTable('session', {
  id: uuid('id').defaultRandom().primaryKey(),
  userId: uuid('userId').notNull().references(() => users.id, { onDelete: 'cascade' }),
  sessionToken: varchar('sessionToken', { length: 255 }).notNull().unique(),
  expires: timestamp('expires', { mode: 'date' }).notNull(),
});

export const verificationTokens = pgTable('verificationToken', {
  identifier: varchar('identifier', { length: 255 }).notNull(),
  token: varchar('token', { length: 255 }).notNull().unique(),
  expires: timestamp('expires', { mode: 'date' }).notNull(),
});

export const generatedImages = pgTable('generated_images', {
  id: serial('id'),
  imageId: uuid('image_id').defaultRandom().notNull().primaryKey(), 
  userId: uuid('user_id').notNull().references(() => users.id, { onDelete: 'cascade' }),
  imageUrl: text('image_url').notNull(),
  prompt: text('prompt').notNull(),
  thumbnailText: varchar('thumbnail_text', { length: 255 }),
  enhancedPrompt: text('enhanced_prompt'),
  imageType: varchar('image_type', { length: 50 }),
  aspectRatio: varchar('aspect_ratio', { length: 20 }),
  colorPalette: varchar('color_palette', { length: 50 }),
  enhancePrompt: varchar('enhance_prompt', { length: 5 }),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  creditCost: integer('credit_cost').default(2),

});

// Relations
export const usersRelations = relations(users, ({ many }) => ({
  generatedImages: many(generatedImages),
  accounts: many(accounts),
  sessions: many(sessions),
}));

export const generatedImagesRelations = relations(generatedImages, ({ one }) => ({
  user: one(users, {
    fields: [generatedImages.userId],
    references: [users.id],
  }),
}));

// Types
export type User = typeof users.$inferSelect;
export type NewUser = typeof users.$inferInsert;
export type Account = typeof accounts.$inferSelect;
export type NewAccount = typeof accounts.$inferInsert;
export type Session = typeof sessions.$inferSelect;
export type NewSession = typeof sessions.$inferInsert;
export type VerificationToken = typeof verificationTokens.$inferSelect;
export type NewVerificationToken = typeof verificationTokens.$inferInsert;
export type GeneratedImage = typeof generatedImages.$inferSelect;
export type NewGeneratedImage = typeof generatedImages.$inferInsert;