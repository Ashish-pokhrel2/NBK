-- Add necessary columns to faculty table
ALTER TABLE `faculty` 
ADD COLUMN `Position` varchar(100) DEFAULT NULL,
ADD COLUMN `EmploymentType` varchar(50) DEFAULT 'Full Time',
ADD COLUMN `Phone` varchar(20) DEFAULT NULL,
MODIFY COLUMN `Department` varchar(100) NULL,
MODIFY COLUMN `Description` longtext NULL;

-- If you need to drop unnecessary columns, uncomment these lines
-- ALTER TABLE `faculty` DROP COLUMN `Hierarchy`;
-- ALTER TABLE `faculty` DROP COLUMN `Office`;
-- ALTER TABLE `faculty` DROP COLUMN `Experience`;
