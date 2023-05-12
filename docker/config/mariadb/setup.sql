-- create use for phpmyadmin
CREATE USER 'padmin'@'localhost'
IDENTIFIED BY 'kirikou';
GRANT ALL PRIVILEGES ON *.* TO 'padmin'@'%' IDENTIFIED BY 'my_optional_remote_password' WITH GRANT OPTION;

-- admin account
GRANT ALL PRIVILEGES ON *.* 
TO 'padmin'@'localhost' WITH GRANT OPTION;


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
FLUSH PRIVILEGES;
