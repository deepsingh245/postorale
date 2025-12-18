import * as admin from 'firebase-admin';
import dotenv from 'dotenv';

dotenv.config();

if (!admin.apps.length) {
    try {
        admin.initializeApp({
            credential: admin.credential.applicationDefault()
        });
        console.log('🔥 Firebase Admin Initialized');
    } catch (error) {
        console.error('❌ Firebase Admin Initialization Failed:', error);
    }
}

export const auth = admin.auth();
