-- Insert Admin
INSERT INTO "public"."user" ("id", "confirmed_at", "user_id", "email", "password")
VALUES ('456cfde8-03df-47ed-92e6-19e2c75d78de', 'now()', NULL, 'admin@example.com', '$2b$10$duT2HPbNTQ6OYyQVvj9gd.8nO4JiJwMK1vujdfw3usY4CTT2kexPK');

-- Insert Profile
INSERT INTO "public"."profile" ("user_id", "first_name", "last_name")
VALUES ('456cfde8-03df-47ed-92e6-19e2c75d78de', 'Admin', 'Admin');

-- Insert Permissions
INSERT INTO "public"."permission" ("user_id", "key") VALUES ('456cfde8-03df-47ed-92e6-19e2c75d78de', 'Activity:read');
INSERT INTO "public"."permission" ("user_id", "key") VALUES ('456cfde8-03df-47ed-92e6-19e2c75d78de', 'Company:create');
INSERT INTO "public"."permission" ("user_id", "key") VALUES ('456cfde8-03df-47ed-92e6-19e2c75d78de', 'Company:read');
INSERT INTO "public"."permission" ("user_id", "key") VALUES ('456cfde8-03df-47ed-92e6-19e2c75d78de', 'Company:update');
INSERT INTO "public"."permission" ("user_id", "key") VALUES ('456cfde8-03df-47ed-92e6-19e2c75d78de', 'Company:delete');

-- Insert Team 1 Lead
INSERT INTO "public"."user" ("id", "confirmed_at", "user_id", "email", "password")
VALUES ('61d20e69-d801-4cab-995e-86d629e7718a', 'now()', '456cfde8-03df-47ed-92e6-19e2c75d78de', 'team-1.lead@example.com', '$2b$10$duT2HPbNTQ6OYyQVvj9gd.8nO4JiJwMK1vujdfw3usY4CTT2kexPK');

-- Insert Profile
INSERT INTO "public"."profile" ("user_id", "first_name", "last_name")
VALUES ('61d20e69-d801-4cab-995e-86d629e7718a', 'Team 1', 'Lead');

-- Insert Permissions
INSERT INTO "public"."permission" ("user_id", "key") VALUES ('61d20e69-d801-4cab-995e-86d629e7718a', 'Activity:read');
INSERT INTO "public"."permission" ("user_id", "key") VALUES ('61d20e69-d801-4cab-995e-86d629e7718a', 'Company:create');
INSERT INTO "public"."permission" ("user_id", "key") VALUES ('61d20e69-d801-4cab-995e-86d629e7718a', 'Company:read');
INSERT INTO "public"."permission" ("user_id", "key") VALUES ('61d20e69-d801-4cab-995e-86d629e7718a', 'Company:update');
INSERT INTO "public"."permission" ("user_id", "key") VALUES ('61d20e69-d801-4cab-995e-86d629e7718a', 'Company:delete');

-- Insert Team 1 Member 1
INSERT INTO "public"."user" ("id", "confirmed_at", "user_id", "email", "password")
VALUES ('62bb3b9f-40ef-4d8c-b3fa-718a988083b1', 'now()', '61d20e69-d801-4cab-995e-86d629e7718a', 'team-1.member-1@example.com', '$2b$10$duT2HPbNTQ6OYyQVvj9gd.8nO4JiJwMK1vujdfw3usY4CTT2kexPK');

-- Insert Profile
INSERT INTO "public"."profile" ("user_id", "first_name", "last_name")
VALUES ('62bb3b9f-40ef-4d8c-b3fa-718a988083b1', 'Team 1', 'Member 1');

-- Insert Permissions
INSERT INTO "public"."permission" ("user_id", "key") VALUES ('62bb3b9f-40ef-4d8c-b3fa-718a988083b1', 'Activity:read');
INSERT INTO "public"."permission" ("user_id", "key") VALUES ('62bb3b9f-40ef-4d8c-b3fa-718a988083b1', 'Company:create');
INSERT INTO "public"."permission" ("user_id", "key") VALUES ('62bb3b9f-40ef-4d8c-b3fa-718a988083b1', 'Company:read');
INSERT INTO "public"."permission" ("user_id", "key") VALUES ('62bb3b9f-40ef-4d8c-b3fa-718a988083b1', 'Company:update');
INSERT INTO "public"."permission" ("user_id", "key") VALUES ('62bb3b9f-40ef-4d8c-b3fa-718a988083b1', 'Company:delete');

-- Insert Team 1 Member 2
INSERT INTO "public"."user" ("id", "confirmed_at", "user_id", "email", "password")
VALUES ('911b001a-899f-4410-8e6f-ceff31f10b14', 'now()', '61d20e69-d801-4cab-995e-86d629e7718a', 'team-1.member-2@example.com', '$2b$10$duT2HPbNTQ6OYyQVvj9gd.8nO4JiJwMK1vujdfw3usY4CTT2kexPK');

-- Insert Profile
INSERT INTO "public"."profile" ("user_id", "first_name", "last_name")
VALUES ('911b001a-899f-4410-8e6f-ceff31f10b14', 'Team 1', 'Member 2');

-- Insert Permissions
INSERT INTO "public"."permission" ("user_id", "key") VALUES ('911b001a-899f-4410-8e6f-ceff31f10b14', 'Activity:read');
INSERT INTO "public"."permission" ("user_id", "key") VALUES ('911b001a-899f-4410-8e6f-ceff31f10b14', 'Company:create');
INSERT INTO "public"."permission" ("user_id", "key") VALUES ('911b001a-899f-4410-8e6f-ceff31f10b14', 'Company:read');
INSERT INTO "public"."permission" ("user_id", "key") VALUES ('911b001a-899f-4410-8e6f-ceff31f10b14', 'Company:update');
INSERT INTO "public"."permission" ("user_id", "key") VALUES ('911b001a-899f-4410-8e6f-ceff31f10b14', 'Company:delete');

-- Insert Team 2 Lead
INSERT INTO "public"."user" ("id", "confirmed_at", "user_id", "email", "password")
VALUES ('bb102dee-adcc-420a-98ed-539d73fb1ac6', 'now()', '456cfde8-03df-47ed-92e6-19e2c75d78de','team-2.lead@example.com', '$2b$10$duT2HPbNTQ6OYyQVvj9gd.8nO4JiJwMK1vujdfw3usY4CTT2kexPK');

-- Insert Profile
INSERT INTO "public"."profile" ("user_id", "first_name", "last_name")
VALUES ('bb102dee-adcc-420a-98ed-539d73fb1ac6', 'Team 2', 'Lead');

-- Insert Permissions
INSERT INTO "public"."permission" ("user_id", "key") VALUES ('bb102dee-adcc-420a-98ed-539d73fb1ac6', 'Activity:read');
INSERT INTO "public"."permission" ("user_id", "key") VALUES ('bb102dee-adcc-420a-98ed-539d73fb1ac6', 'Company:create');
INSERT INTO "public"."permission" ("user_id", "key") VALUES ('bb102dee-adcc-420a-98ed-539d73fb1ac6', 'Company:read');
INSERT INTO "public"."permission" ("user_id", "key") VALUES ('bb102dee-adcc-420a-98ed-539d73fb1ac6', 'Company:update');
INSERT INTO "public"."permission" ("user_id", "key") VALUES ('bb102dee-adcc-420a-98ed-539d73fb1ac6', 'Company:delete');

-- Insert Team 2 Member 1
INSERT INTO "public"."user" ("id", "confirmed_at", "user_id", "email", "password")
VALUES ('e7c19c59-f1fb-4da3-8bfc-7adc98679dc1', 'now()', 'bb102dee-adcc-420a-98ed-539d73fb1ac6', 'team-2.member-1@example.com', '$2b$10$duT2HPbNTQ6OYyQVvj9gd.8nO4JiJwMK1vujdfw3usY4CTT2kexPK');

-- Insert Profile
INSERT INTO "public"."profile" ("user_id", "first_name", "last_name")
VALUES ('e7c19c59-f1fb-4da3-8bfc-7adc98679dc1', 'Team 2', 'Member 1');

-- Insert Permissions
INSERT INTO "public"."permission" ("user_id", "key") VALUES ('e7c19c59-f1fb-4da3-8bfc-7adc98679dc1', 'Activity:read');
INSERT INTO "public"."permission" ("user_id", "key") VALUES ('e7c19c59-f1fb-4da3-8bfc-7adc98679dc1', 'Company:create');
INSERT INTO "public"."permission" ("user_id", "key") VALUES ('e7c19c59-f1fb-4da3-8bfc-7adc98679dc1', 'Company:read');
INSERT INTO "public"."permission" ("user_id", "key") VALUES ('e7c19c59-f1fb-4da3-8bfc-7adc98679dc1', 'Company:update');
INSERT INTO "public"."permission" ("user_id", "key") VALUES ('e7c19c59-f1fb-4da3-8bfc-7adc98679dc1', 'Company:delete');

-- Insert Team 2 Member 2
INSERT INTO "public"."user" ("id", "confirmed_at", "user_id", "email", "password")
VALUES ('ef14ec62-fa54-43cc-ad95-db9c5211bedf', 'now()', 'bb102dee-adcc-420a-98ed-539d73fb1ac6', 'team-2.member-2@example.com', '$2b$10$duT2HPbNTQ6OYyQVvj9gd.8nO4JiJwMK1vujdfw3usY4CTT2kexPK');

-- Insert Profile
INSERT INTO "public"."profile" ("user_id", "first_name", "last_name")
VALUES ('ef14ec62-fa54-43cc-ad95-db9c5211bedf', 'Team 2', 'Member 2');

-- Insert Permissions
INSERT INTO "public"."permission" ("user_id", "key") VALUES ('ef14ec62-fa54-43cc-ad95-db9c5211bedf', 'Activity:read');
INSERT INTO "public"."permission" ("user_id", "key") VALUES ('ef14ec62-fa54-43cc-ad95-db9c5211bedf', 'Company:create');
INSERT INTO "public"."permission" ("user_id", "key") VALUES ('ef14ec62-fa54-43cc-ad95-db9c5211bedf', 'Company:read');
INSERT INTO "public"."permission" ("user_id", "key") VALUES ('ef14ec62-fa54-43cc-ad95-db9c5211bedf', 'Company:update');
INSERT INTO "public"."permission" ("user_id", "key") VALUES ('ef14ec62-fa54-43cc-ad95-db9c5211bedf', 'Company:delete');
