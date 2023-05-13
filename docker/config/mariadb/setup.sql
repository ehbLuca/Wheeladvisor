-- create user for phpmyadmin
DROP USER IF EXISTS 'padmin'@'%';
DROP DATABASE IF EXISTS padmindb;

CREATE DATABASE padmindb;

CREATE USER padmin IDENTIFIED BY 'bulbizarre';
GRANT ALL PRIVILEGES ON padmindb.* 
TO 'padmin'@'%' WITH GRANT OPTION;

-- From sql secure installation
-- Remove anonymous user
DELETE FROM mysql.global_priv WHERE User='';

-- Disable root remote login
DELETE FROM mysql.global_priv
WHERE User='root' AND Host NOT IN ('localhost', '127.0.0.1', '::1');

-- Don't create default 'test' schema
DROP DATABASE IF EXISTS test;
DELETE FROM mysql.db WHERE Db='test' OR Db='test\\_%'

-- Reload changes
-- FLUSH PRIVILEGES;
