// harita.js
// ...
// loadMap fonksiyonu içindeki tıklama olayı güncellendi:
// Artık tek bir eylem sayfasına yönlendiriyor.
if (slotData.owner_uid !== currentUser.uid) {
    slotDiv.addEventListener('click', () => {
        // Eylem sayfasına hedef ID ve isimle git
        window.location.href = `action.html?target_id=${slotData.owner_uid}&target_name=${slotData.owner_name}`;
    });
}
// ...
