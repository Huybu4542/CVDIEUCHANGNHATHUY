// Chuyển đổi chế độ sáng/tối
document.getElementById('theme-toggle').addEventListener('click', () => {
    const body = document.body;
    const themeToggleButton = document.getElementById('theme-toggle');

    body.classList.toggle('dark-mode');
    body.classList.toggle('light-mode');

    // Cập nhật nút theo chế độ hiện tại
    if (body.classList.contains('dark-mode')) {
        themeToggleButton.innerHTML = '<i class="fas fa-sun"></i> Light Mode';
    } else {
        themeToggleButton.innerHTML = '<i class="fas fa-moon"></i> Dark Mode';
    }
});

// Cài đặt chế độ mặc định ban đầu
window.onload = () => {
    const themeToggleButton = document.getElementById('theme-toggle');
    if (document.body.classList.contains('dark-mode')) {
        themeToggleButton.innerHTML = '<i class="fas fa-sun"></i> Light Mode';
    } else {
        themeToggleButton.innerHTML = '<i class="fas fa-moon"></i> Dark Mode';
    }
};
// Tải CV dưới dạng PDF ở chế độ Dark Mode
function downloadPDF() {
    const { jsPDF } = window.jspdf; // Sử dụng jsPDF
    const pdf = new jsPDF();

    const element = document.querySelector('.container'); // Nội dung cần chuyển đổi

    // Chuyển sang Dark Mode trước khi tải PDF
    document.body.classList.remove('light-mode');
    document.body.classList.add('dark-mode');

    // Ẩn nút chuyển đổi chế độ và tải PDF
    const themeToggleButton = document.getElementById('theme-toggle');
    themeToggleButton.style.display = 'none'; // Ẩn nút

    // Sử dụng html2canvas để chụp nội dung và tạo PDF
    html2canvas(element).then((canvas) => {
        const imgData = canvas.toDataURL('image/png');
        const imgWidth = 190; // Chiều rộng PDF (A4 - trừ lề)
        const pageHeight = 295; // Chiều cao PDF (A4)
        const imgHeight = (canvas.height * imgWidth) / canvas.width; // Tỉ lệ ảnh

        let position = 10; // Vị trí bắt đầu in trên PDF
        pdf.addImage(imgData, 'PNG', 10, position, imgWidth, imgHeight);

        pdf.save("CV_DieuChangNhatHuy.pdf"); // Lưu tệp PDF

        // Hiển thị lại nút sau khi tạo PDF
        themeToggleButton.style.display = 'block';
    });
}
// Hiệu ứng nền ngôi sao
const canvas = document.getElementById('stars');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const stars = [];
const numStars = 150;

// Tạo ngôi sao
for (let i = 0; i < numStars; i++) {
    stars.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: Math.random() * 2,
        speed: Math.random() * 0.5 + 0.2
    });
}

// Vẽ ngôi sao
function drawStars() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = 'white';
    for (let i = 0; i < stars.length; i++) {
        const star = stars[i];
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
        ctx.fill();
        star.y += star.speed;
        if (star.y > canvas.height) {
            star.y = 0;
            star.x = Math.random() * canvas.width;
        }
    }
    requestAnimationFrame(drawStars);
}

drawStars();