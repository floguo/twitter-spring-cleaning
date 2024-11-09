import crypto from 'crypto';

const secret = crypto.randomBytes(32).toString('hex');
console.log('Your NextAuth Secret:');
console.log(secret);