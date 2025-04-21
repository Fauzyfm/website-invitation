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
  apiKey: "AIzaSyBgvt09MQ7I5FGZT6ADjnJ5VEdPFuggipQ",
  authDomain: "tini-agus-web-invitation.firebaseapp.com",
  databaseURL: "https://tini-agus-web-invitation-default-rtdb.firebaseio.com/",
  projectId: "tini-agus-web-invitation",
  storageBucket: "tini-agus-web-invitation.firebasestorage.app",
  messagingSenderId: "81413055593",
  appId: "1:81413055593:web:346652fc4f52d01a392ef8",
  measurementId: "G-JLPBCNSYQN"
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
        <div class="font-sans ml-[10px] font-semibold text-[14px]">${comment.name}</div>
        <div class="mt-[5px] ml-[10px] text-[12px] font-raleway">${comment.message}</div>
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

const countDownDate = new Date("Dec 22, 2024 00:00:00").getTime()

const x = setInterval(function () {
    const nowDate = new Date().getTime()

    const distance = countDownDate - nowDate;

    const days = Math.floor(distance / (1000 * 60 * 60 * 24))
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60))
    const seconds = Math.floor((distance % (1000 * 60 )) / 1000)

    document.getElementById("Days").innerHTML = days;
    document.getElementById("Hours").innerHTML = hours;
    document.getElementById("Minutes").innerHTML = minutes;
    document.getElementById("Seconds").innerHTML = seconds;
}, 1000)



// Salin Rekning 1
document.getElementById('copyButton').addEventListener('click', function() {
    // Pilih elemen paragraf
    var rekeningNumber = document.getElementById('rekeningNumber').textContent;

    // Salin teks ke clipboard
    navigator.clipboard.writeText(rekeningNumber)
        .then(() => {
            // Jika berhasil menyalin
            document.getElementById('statusMSG').classList.remove('fa-copy')
            document.getElementById('statusMSG').classList.add('fa-clipboard')
        })
        .catch((err) => {
            // Jika terjadi kesalahan
            document.getElementById('statusMSG').textContent = 'Gagal menyalin nomor rekening.';
            console.error('Gagal menyalin teks: ', err);
        });
});
// Salin Rekning 2
document.getElementById('copyButton1').addEventListener('click', function() {
    // Pilih elemen paragraf
    var rekeningNumber = document.getElementById('rekeningNumber1').textContent;

    // Salin teks ke clipboard
    navigator.clipboard.writeText(rekeningNumber)
        .then(() => {
            // Jika berhasil menyalin
            document.getElementById('statusMSG1').classList.remove('fa-copy')
            document.getElementById('statusMSG1').classList.add('fa-clipboard')
        })
        .catch((err) => {
            // Jika terjadi kesalahan
            document.getElementById('statusMSG1').textContent = 'Gagal menyalin nomor rekening.';
            console.error('Gagal menyalin teks: ', err);
        });
});



// Reservasi Whatssapp

document.getElementById('konfirmasi-wa').addEventListener('click' , function() {
    var nama = document.getElementById('nama').value;
    var alamat = document.getElementById('alamat').value;
    var konfirmasi = document.querySelector('input[name="konfirmasi"]:checked').value;

    if (konfirmasi === 'Tidak_hadir') {
        var konfirmasi = "Maaf, saya tidak bisa hadir"
    } else if (konfirmasi === '1') {
        var konfirmasi = "1 Orang"
    } else if (konfirmasi === '2') {
        var konfirmasi = "2 Orang"
    } else if (konfirmasi === 'lebih') {
        var konfirmasi = 'Lebih dari 2 Orang'
    }

    var nomorWA = '6281382820300'; // Ganti dengan nomor WhatsApp tujuan
    var pesan = `
    Halo Kak Tini dan Kak Agus\nTerimakasih atas undangan yang telah diberikan.\nKami dengan senang hati mengonfirmasi kehadiran pada acara pernikahan kalian:
    \nNama : *${nama}* 
    \nAlamat: *${alamat}*
    \nKonfirmasi kehadiran: *${konfirmasi}*
    \n\nTerimakasih, Selamat menempuh kehidupan Baru ^_^`;   


    var urlWA = `https://wa.me/${nomorWA}?text=${encodeURIComponent(pesan)}`;

    // Buka URL WhatsApp di tab baru
    window.open(urlWA, '_blank');

})



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



    const musicButton = document.getElementById('music')
    const navigation = document.getElementById('navigation')
    const musicAudio = document.getElementById('music-audio') 
    const isiMusic = document.getElementById('isi-music')
    const isiIcon = document.getElementById('isi-icon')
    let isPlaying = false;

    document.getElementById('open-invitation').addEventListener('click', function() {
        musicButton.classList.remove('hidden')
        musicButton.classList.add('fade-up')
        musicButton.classList.add('flex')


        navigation.classList.remove('hidden')
        navigation.classList.add('fade-up')

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


    window.addEventListener('scroll', function(){
        const scrollHeight = document.documentElement.scrollHeight;
        const scrollPosition = window.innerHeight + window.scrollY;


        if (scrollPosition >= scrollHeight - 500) {
            navigation.classList.add("fade-down");
            // navigation.classList.add("opacity-0");

          } else {
            navigation.classList.remove("fade-down");
          }


    })

    // window.addEventListener('scroll', function(){
    //     const scrollatas = window.scrollY

    //     if (scrollatas >= 500) {
    //         navigation.classList.add('fade-down')
    //     } else {
    //         navigation.classList.remove("fade-down");

    //     }

    // })
    



// image slider

const images = ["public/Asset/gallery/1.jpg", 
                "public/Asset/gallery/2.jpg", 
                "public/Asset/gallery/3.jpg",
                "public/Asset/gallery/4.jpg",
                "public/Asset/gallery/5.jpg",
                "public/Asset/gallery/6.jpg",
                "public/Asset/gallery/7.jpg",
                "public/Asset/gallery/8.jpg",
                "public/Asset/gallery/9.jpg",]

let currentIndex = 0;


        // Fungsi untuk membuka lightbox dan menampilkan gambar sesuai indeks yang diklik
        function openLightbox(index) {
            currentIndex = index;  // Menyimpan indeks gambar yang diklik
            updateImage();          // Memperbarui gambar di lightbox
            // Menyembunyikan galeri dan menampilkan lightbox
            // document.getElementById('gallerys').classList.add('hidden');
            document.getElementById('lightbox').classList.remove('hidden');
        }

        // Fungsi untuk menutup lightbox dan kembali menampilkan galeri
        function closeLightbox() {
            // document.getElementById('gallerys').classList.remove('hidden');  // Menampilkan galeri
            document.getElementById('lightbox').classList.add('hidden');    // Menyembunyikan lightbox
        }

        // Fungsi untuk memperbarui gambar di lightbox berdasarkan indeks saat ini
        function updateImage() {
            const imageElement = document.getElementById('lightbox-image');   // Mengambil elemen gambar di lightbox
            const counterElement = document.getElementById('image-counter');  // Mengambil elemen counter
            imageElement.src = images[currentIndex];                          // Mengubah sumber gambar
            counterElement.textContent = `${currentIndex + 1} / ${images.length}`;  // Memperbarui teks counter
        }

        // Fungsi untuk menampilkan gambar berikutnya
        function nextImage() {
            currentIndex = (currentIndex + 1) % images.length;  // Menambah indeks dengan modular agar tidak melebihi batas
            updateImage();  // Memperbarui gambar di lightbox
        }

        // Fungsi untuk menampilkan gambar sebelumnya
        function prevImage() {
            currentIndex = (currentIndex - 1 + images.length) % images.length;  // Mengurangi indeks dengan modular
            updateImage();  // Memperbarui gambar di lightbox
        }


// RSVP

const buttonKonfirmasi = document.getElementById('button-konfirmasi-rsvp')
const konirmasiContainer = document.getElementById('konfirmasi-kehadiran-rsvp')
const isiRSVP = document.getElementById('isi-rsvp')
const section8 = document.getElementById('rsvp-comment')

buttonKonfirmasi.addEventListener('click', function () {
  isiRSVP.classList.remove('hidden')
  isiRSVP.classList.add('fade-up')

  konirmasiContainer.classList.add('hidden')

  section8.classList.remove('h-[844px]')
  section8.classList.add('h-[auto]')

})

// ucapan/comment

const buttonKonfirmasiUcapan = document.getElementById('button-konfirmasi-ucapan')
const konirmasiContainerUcapan = document.getElementById('konfirmasi-kehadiran-ucapan')
const isiucapan = document.getElementById('isi-ucapan')

buttonKonfirmasiUcapan.addEventListener('click', function () {
  isiucapan.classList.remove('hidden')
  isiucapan.classList.add('fade-up')

  konirmasiContainerUcapan.classList.add('hidden')

  section8.classList.remove('h-[844px]')
  section8.classList.add('h-[auto]')
  section8.classList.remove('bg-cover')
  section8.classList.add('bg-contain')

})