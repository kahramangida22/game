const firebaseConfig = {
  apiKey: "AIzaSyDcneigub2eAJjTrfrkiETuLgy5ule8L6s",
  authDomain: "testlik.firebaseapp.com",
  projectId: "testlik",
  storageBucket: "testlik.firebasestorage.app",
  messagingSenderId: "668524500496",
  appId: "1:668524500496:web:579bb4fc5990c87afedc95",
  measurementId: "G-8ZEYBJCV3T"
};

firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();

const loginBtn = document.getElementById('loginBtn');
const loadingDiv = document.getElementById('loading-div');

loginBtn.addEventListener('click', () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    auth.signInWithPopup(provider).catch(error => {
        console.error("Giriş sırasında hata:", error);
    });
});

auth.onAuthStateChanged(user => {
    if (user) {
        // Kullanıcı giriş yapmış, oyun ekranına yönlendir
        loginBtn.classList.add('hidden');
        loadingDiv.classList.remove('hidden');
        window.location.href = 'oyun.html';
    } else {
        // Kullanıcı giriş yapmamış, giriş butonunu göster
        loginBtn.classList.remove('hidden');
        loadingDiv.classList.add('hidden');
    }
});
