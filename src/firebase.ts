import { initializeApp } from 'firebase/app';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
    apiKey: 'AIzaSyBfPaggB2wINtG4_0E6qa8P0xPDNKUDEZc',
    authDomain: 'framewiise.firebaseapp.com',
    projectId: 'framewiise',
    storageBucket: 'framewiise.appspot.com',
    messagingSenderId: '324699121949',
    appId: '1:324699121949:web:ba1e76b73e447443ad59f4',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const storage = getStorage(app);
