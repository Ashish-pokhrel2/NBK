const db = require('./config/db');

async function addIsReadColumn() {
  try {
    // Check if column exists first
    const [columns] = await db.query(`
      SHOW COLUMNS FROM notifications LIKE 'isRead'
    `);
    
    if (columns.length === 0) {
      // Add the isRead column if it doesn't exist
      await db.query(`
        ALTER TABLE notifications 
        ADD COLUMN isRead BOOLEAN DEFAULT FALSE
      `);
      console.log('Added isRead column to notifications table');
    } else {
      console.log('isRead column already exists');
    }
    
    // Update existing notifications to be unread
    await db.query(`
      UPDATE notifications 
      SET isRead = FALSE 
      WHERE isRead IS NULL
    `);
    
    console.log('Successfully updated notifications table');
    process.exit(0);
  } catch (error) {
    console.error('Error updating notifications table:', error);
    process.exit(1);
  }
}

addIsReadColumn();
