const mysql = require('mysql');

// Create connection configuration
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'carebridge'
});

// Attempt to connect
console.log('🔄 Attempting to connect to MySQL...');

connection.connect((err) => {
    if (err) {
        console.error('❌ Error connecting to MySQL:', err.message);
        if (err.code === 'ER_ACCESS_DENIED_ERROR') {
            console.log('Please check your MySQL username and password');
        }
        if (err.code === 'ECONNREFUSED') {
            console.log('Please check if MySQL server is running');
        }
        process.exit(1);
    }
    
    console.log('✅ Connected to MySQL successfully!');
    
    // Test if database exists
    connection.query('SHOW DATABASES LIKE "carebridge"', (err, results) => {
        if (err) {
            console.error('❌ Error checking database:', err.message);
            connection.end();
            process.exit(1);
        }
        
        if (results.length === 0) {
            console.log('❌ Database "carebridge" does not exist');
            connection.end();
            process.exit(1);
        }
        
        console.log('✅ Found database "carebridge"');
        
        // Check if contacts table exists
        connection.query('SHOW TABLES LIKE "contacts"', (err, results) => {
            if (err) {
                console.error('❌ Error checking tables:', err.message);
                connection.end();
                process.exit(1);
            }
            
            if (results.length === 0) {
                console.log('❌ Table "contacts" does not exist');
            } else {
                console.log('✅ Found table "contacts"');
                
                // Check table structure
                connection.query('DESCRIBE contacts', (err, fields) => {
                    if (err) {
                        console.error('❌ Error getting table structure:', err.message);
                    } else {
                        console.log('📋 Table structure:');
                        console.table(fields);
                    }
                    connection.end();
                });
            }
        });
    });
});