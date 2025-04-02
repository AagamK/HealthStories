// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDGAOq2Zru4GYVU0sIu--bM09XbX_xe7bE",
    authDomain: "health-stories.firebaseapp.com",
    projectId: "health-stories",
    storageBucket: "health-stories.firebasestorage.app",
    messagingSenderId: "921022442431",
    appId: "1:921022442431:web:9d0502e9e501389da28f0a"
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const db = firebase.firestore();

// Set Firestore settings before enabling persistence
db.settings({
    cacheSizeBytes: firebase.firestore.CACHE_SIZE_UNLIMITED,
    merge: true
});

// Enable Firestore persistence
try {
    db.enablePersistence({
        synchronizeTabs: true
    });
} catch (error) {
    console.log('Persistence failed:', error);
}

const logoutUser = async () => {
    try {
        await auth.signOut();
    } catch (error) {
        console.log('Error signing out:', error);
    }
};

export { app, auth, db, logoutUser };
