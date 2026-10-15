<?php

// Copy to the host account tmp/mailgun.php, outside public_html. Do not commit the real file.

return [
    'key' => 'YOUR_MAILGUN_PRIVATE_API_KEY',
    'domain' => 'mg.example.com',
    'endpoint' => 'https://api.mailgun.net',
    'from' => 'Return 官網 <noreply@mg.example.com>',
    'to' => 'you@example.com',
];
