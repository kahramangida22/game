// Kanka, bu kısmı kendi Firebase projenin ayarlarından ("Web" uygulaması) kopyalaman gerekiyor!
const firebaseConfig = {
  apiKey: "AIzaSyDcneigub2eAJjTrfrkiETuLgy5ule8L6s",
  authDomain: "testlik.firebaseapp.com",
  projectId: "testlik",
  storageBucket: "testlik.firebasestorage.app",
  messagingSenderId: "668524500496",
  appId: "1:668524500496:web:579bb4fc5990c87afedc95",
  measurementId: "G-8ZEYBJCV3T"
};

// Firebase'i başlat
firebase.initializeApp(firebaseConfig);

// Gerekli servisleri çağır
const auth = firebase.auth();
const db = firebase.firestore();

// HTML elementlerini yakala
const loginBtn = document.getElementById('loginBtn');
const logoutBtn = document.getElementById('logoutBtn');
const userInfoDiv = document.getElementById('userInfo');
const userNameH2 = document.getElementById('userName');
const userPhotoImg = document.getElementById('userPhoto');

// Google ile Giriş Yapma Fonksiyonu
const signInWithGoogle = () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    auth.signInWithPopup(provider)
        .then(result => {
            console.log("Başarıyla giriş yapıldı!", result.user);
            const user = result.user;
            // Kullanıcı bilgilerini Firestore'a kaydet/güncelle
            db.collection('users').doc(user.uid).set({
                displayName: user.displayName,
                email: user.email,
                photoURL: user.photoURL,
                lastLogin: firebase.firestore.FieldValue.serverTimestamp()
            }, { merge: true }); // merge:true ile eski verileri silmeden güncelle
        })
        .catch(error => {
            console.error("Giriş sırasında hata oluştu:", error);
        });
};

// Çıkış Yapma Fonksiyonu
const signOut = () => {
    auth.signOut()
        .then(() => {
            console.log("Başarıyla çıkış yapıldı.");
        })
        .catch(error => {
            console.error("Çıkış sırasında hata oluştu:", error);
        });
};

// Butonlara tıklama olaylarını ata
loginBtn.addEventListener('click', signInWithGoogle);
logoutBtn.addEventListener('click', signOut);


// Kullanıcının giriş durumunu sürekli dinle (en önemli kısım)
auth.onAuthStateChanged(user => {
    if (user) {
        // Kullanıcı giriş yapmışsa...
        console.log("Aktif kullanıcı:", user.displayName);
        // Arayüzü güncelle
        userInfoDiv.classList.remove('hidden');
        loginBtn.classList.add('hidden');
        
        userNameH2.textContent = user.displayName;
        userPhotoImg.src = user.photoURL;

    } else {
        // Kullanıcı giriş yapmamışsa (veya çıkış yapmışsa)...
        console.log("Aktif kullanıcı yok.");
        // Arayüzü güncelle
        userInfoDiv.classList.add('hidden');
        loginBtn.classList.remove('hidden');
    }
});
