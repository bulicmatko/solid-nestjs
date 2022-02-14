-- Insert Users
INSERT INTO "public"."user" ("id", "user_id", "email", "created_at", "updated_at", "deleted_at") VALUES
(1, NULL, 'admin@example.com', 'now()', 'now()', NULL);
INSERT INTO "public"."user" ("id", "user_id", "email", "created_at", "updated_at", "deleted_at") VALUES
(2, 1, 'team-1.lead@example.com', 'now()', 'now()', NULL);
INSERT INTO "public"."user" ("id", "user_id", "email", "created_at", "updated_at", "deleted_at") VALUES
(3, 2, 'team-2.member@example.com', 'now()', 'now()', NULL);
INSERT INTO "public"."user" ("id", "user_id", "email", "created_at", "updated_at", "deleted_at") VALUES
(4, 1, 'team-2.lead@example.com', 'now()', 'now()', NULL),
(5, 4, 'team-2.member@example.com', 'now()', 'now()', NULL);

-- Insert Permissions
INSERT INTO "public"."permission" ("id", "user_id", "key", "active_from", "active_to", "note", "created_at", "updated_at") VALUES
(1, 1, 'create:Company', NULL, NULL, NULL, 'now()', 'now()');
INSERT INTO "public"."permission" ("id", "user_id", "key", "active_from", "active_to", "note", "created_at", "updated_at") VALUES
(2, 1, 'read:Company:sub', NULL, NULL, NULL, 'now()', 'now()');
INSERT INTO "public"."permission" ("id", "user_id", "key", "active_from", "active_to", "note", "created_at", "updated_at") VALUES
(3, 2, 'create:Company', NULL, NULL, NULL, 'now()', 'now()');
INSERT INTO "public"."permission" ("id", "user_id", "key", "active_from", "active_to", "note", "created_at", "updated_at") VALUES
(4, 2, 'read:Company:sub', NULL, NULL, NULL, 'now()', 'now()'),
(6, 3, 'read:Company:own', NULL, NULL, NULL, 'now()', 'now()'),
(5, 3, 'create:Company', NULL, NULL, NULL, 'now()', 'now()'),
(7, 4, 'create:Company', NULL, NULL, NULL, 'now()', 'now()'),
(8, 4, 'read:Company:sub', NULL, NULL, NULL, 'now()', 'now()'),
(9, 5, 'create:Company', NULL, NULL, NULL, 'now()', 'now()'),
(10, 5, 'read:Company:sub', NULL, NULL, NULL, 'now()', 'now()');

-- Insert Companies
INSERT INTO "public"."company" ("id", "user_id", "name", "created_at", "updated_at", "deleted_at") VALUES
(1, 1, 'Admin Company', 'now()', 'now()', NULL);
INSERT INTO "public"."company" ("id", "user_id", "name", "created_at", "updated_at", "deleted_at") VALUES
(2, 2, 'Team 1 Leader Company', 'now()', 'now()', NULL);
INSERT INTO "public"."company" ("id", "user_id", "name", "created_at", "updated_at", "deleted_at") VALUES
(3, 3, 'Team 1 Member Company', 'now()', 'now()', NULL);
INSERT INTO "public"."company" ("id", "user_id", "name", "created_at", "updated_at", "deleted_at") VALUES
(4, 4, 'Team 2 Leader Company', 'now()', 'now()', NULL),
(5, 5, 'Team 2 Member Company', 'now()', 'now()', NULL);

