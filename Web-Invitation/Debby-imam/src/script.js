// membuat website ketika di refresh langsung ke page pertama/halaman atas
window.onload = function () {
  window.scrollTo(0, 0);
};

// Hapus fragment dari URL saat halaman dimuat
window.addEventListener('load', function () {
  if (window.location.hash) {
      // Simpan fragment untuk digunakan jika diperlukan
      const fragment = window.location.hash;

      // Hapus fragment dari URL
      history.replaceState(null, document.title, window.location.pathname + window.location.search);

      // Optional: jika ingin langsung scroll ke posisi fragment setelah fragment dihapus
      // Uncomment baris di bawah ini
      // document.querySelector(fragment)?.scrollIntoView();
  }
});


import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-app.js";
import { getDatabase, ref, push, onValue } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-database.js";

// Firebase Configuration
const firebaseConfig = {
  apiKey: "AIzaSyADEUNrVyFzLjtS_EkyzNtlAFAurqPXFRY",
  authDomain: "comentsectionweb.firebaseapp.com",
  databaseURL: "https://comentsectionweb-default-rtdb.firebaseio.com/",
  projectId: "comentsectionweb",
  storageBucket: "comentsectionweb.firebasestorage.app",
  messagingSenderId: "403869665649",
  appId: "1:403869665649:web:25d4b22710804e919f0ed0",
  measurementId: "G-G3YHNTYK7Y"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

// DOM Elements
const form = document.getElementById("commentForm");
const commentsContainer = document.getElementById("commentsContainer");

// Load Comments
function loadComments() {
  const commentsRef = ref(database, "comments");
  onValue(commentsRef, (snapshot) => {
    commentsContainer.innerHTML = "";
    snapshot.forEach((childSnapshot) => {
      const comment = childSnapshot.val();
      const commentItem = document.createElement("div");
      commentItem.classList.add("comment-item");
      commentItem.innerHTML = `
        <div class="bg-white">
        <div class="font-sans font-semibold text-[14px]">${comment.name}</div>
        <div class="mt-[5px] text-[12px] font-raleway">${comment.message}</div>
        <div class="font-sans text-[8px] mt-[8px] text-end">${comment.timestamp}</div> <!-- Tambahkan tanggal -->
        </div>
      `;
      commentsContainer.appendChild(commentItem);
    });
  });
}

// Save Comment
function saveComment(name, message) {
  const commentsRef = ref(database, "comments");
  const timestamp = new Date().toLocaleString();
  push(commentsRef, { name, message, timestamp });
}


// Form Submit Event
form.addEventListener("submit", (e) => {
  e.preventDefault();
  const name = document.getElementById("nameInput").value.trim();
  const message = document.getElementById("messageInput").value.trim();
  if (name && message) {
    saveComment(name, message);
    form.reset();
  }
});

// Load Comments on Page Load
loadComments();

document.getElementById('konfirmasi-wa').addEventListener('click', function () {

  // RSVP Function connect to WhatsApp
    var nama = document.getElementById('nama').value;
    var alamat = document.getElementById('alamat').value;
    var konfirmasi = document.querySelector('input[name="konfirmasi"]:checked').value;
  
    if (konfirmasi === 'tidak-hadir') {
        var konfirmasi = "Maaf, saya tidak bisa hadir"
    } else if (konfirmasi === '1') {
        var konfirmasi = "1 Orang"
    } else if (konfirmasi === '2') {
        var konfirmasi = "2 Orang"
    } else if (konfirmasi === 'lebih') {
        var konfirmasi = 'Lebih dari 2 Orang'
    }
  
    if (!nama || !alamat || !konfirmasi) {
        alert("Harap isi semua data terlebih dahulu!");
        return;
    }
    var nomorWA = '62817720461'; // Ganti dengan nomor WhatsApp tujuan
    var pesan = `Hallo Kak Imam dan Kak Debby saya mau konfirmasi terkait kehadiran saya di acara kalian ^_^  \n\nNama : *${nama}*,\nAlamat: ${alamat}. \nKonfirmasi kehadiran: ${konfirmasi}.\n\nTerimakasih dan semoga acara nya berjalan dengan lancar ^0^`;    
  
  
    var urlWA = `https://wa.me/${nomorWA}?text=${encodeURIComponent(pesan)}`;
  
    // Buka URL WhatsApp di tab baru
    window.open(urlWA, '_blank');
  
})


// Salin Rekning
document.getElementById('copyButton').addEventListener('click', function() {
    // Pilih elemen paragraf
    var rekeningNumber = document.getElementById('rekeningNumber').textContent;

    // Salin teks ke clipboard
    navigator.clipboard.writeText(rekeningNumber)
        .then(() => {
            // Jika berhasil menyalin
            document.getElementById('statusMSG').textContent = 'Nomor rekening berhasil disalin!';
        })
        .catch((err) => {
            // Jika terjadi kesalahan
            document.getElementById('statusMSG').textContent = 'Gagal menyalin nomor rekening.';
            console.error('Gagal menyalin teks: ', err);
        });
});
document.getElementById('copyButton2').addEventListener('click', function() {
    // Pilih elemen paragraf
    var rekeningNumber = document.getElementById('rekeningNumber2').textContent;

    // Salin teks ke clipboard
    navigator.clipboard.writeText(rekeningNumber)
        .then(() => {
            // Jika berhasil menyalin
            document.getElementById('statusMSG2').textContent = 'Nomor rekening berhasil disalin!';
        })
        .catch((err) => {
            // Jika terjadi kesalahan
            document.getElementById('statusMSG2').textContent = 'Gagal menyalin nomor rekening.';
            console.error('Gagal menyalin teks: ', err);
        });
});

// open invitation
document.addEventListener("DOMContentLoaded", function() {
    // Lock scroll on page load
    document.body.classList.add("no-scroll");

    // Unlock scroll when button is clicked
    document.getElementById("open-invitation").addEventListener("click", function() {
        document.body.classList.remove("no-scroll");
    });
});



// menangkap paramater pada url
    // Function to get the 'to' parameter from the URL
    function getInviteeName() {
        const urlParams = new URLSearchParams(window.location.search);
        return urlParams.get('to') || 'Tamu Undangan'; // Default name if 'to' is not provided
    }

    // Inject the invitee name into the HTML content
    document.addEventListener("DOMContentLoaded", function () {
        const inviteeName = getInviteeName();
        const inviteeNameElement = document.getElementById('tamu-undangan');
        if (inviteeNameElement) {
            inviteeNameElement.textContent = inviteeName;
        }
    });





// MUSIC
const musicButton = document.getElementById('music')
const musicAudio = document.getElementById('music-audio') 

// window.addEventListener('load', function () {
//   musicAudio.play().catch(error => {
//       console.log('Autoplay dicegah oleh browser:', error);
//   });
// });

document.getElementById('open-invitation').addEventListener('click', function () {
  musicButton.classList.remove('hidden')
  musicButton.classList.add('fade-up')
  musicAudio.play()
})

const disk = document.getElementById('disk')
const play = document.getElementById('play')

musicButton.addEventListener('click', function () {
  if (musicAudio.paused) {
      musicAudio.play()
      disk.classList.remove('hidden')
      play.classList.add('hidden')
      musicButton.classList.add('rotate-box')
    } else {
      musicAudio.pause()
      play.classList.remove('hidden')
      disk.classList.add('hidden')
      musicButton.classList.remove('rotate-box')
    }
    isPlaying = !isPlaying;
})



// RSVP

const buttonKonfirmasi = document.getElementById('button-konfirmasi')
const konirmasiContainer = document.getElementById('konfirmasi-kehadiran')
const isiRSVP = document.getElementById('isi-rsvp')

buttonKonfirmasi.addEventListener('click', function () {
  isiRSVP.classList.remove('hidden')
  isiRSVP.classList.add('fade-up')

  konirmasiContainer.classList.add('hidden')


})


// Ucapan dan Doa
const buttonUcapan = document.getElementById('button-ucapan')
const ucapanContainer = document.getElementById('konfirmasi-ucapan')
const isiucapan = document.getElementById('isi-ucapan')

buttonUcapan.addEventListener('click', function () {
  isiucapan.classList.remove('hidden')
  isiucapan.classList.add('fade-up')

  ucapanContainer.classList.add('hidden')


})