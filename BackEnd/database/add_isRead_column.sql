-- Add isRead column to notifications table
ALTER TABLE notifications ADD COLUMN isRead BOOLEAN DEFAULT FALSE;

-- Update existing notifications to be unread by default
UPDATE notifications SET isRead = FALSE WHERE isRead IS NULL;
