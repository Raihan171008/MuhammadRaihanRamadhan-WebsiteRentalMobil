document.addEventListener('DOMContentLoaded', function() {
    // Mobile Menu Toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const nav = document.querySelector('nav');
    
    if (menuToggle && nav) {
        menuToggle.addEventListener('click', function() {
            nav.classList.toggle('active');
        });
    }

    // Transaksi Page Functionality
    if (document.getElementById('transaksi-table')) {
        // Sample transaction data
        const transactions = [
            {
                id: 1,
                nama: 'Hans Aja',
                mobil: 'Toyota Avanza',
                tglSewa: '2025-10-15',
                tglKembali: '2025-10-17',
                total: 'Rp700.000',
                status: 'Selesai'
            },
            {
                id: 2,
                nama: 'Yats Aja',
                mobil: 'Honda Civic',
                tglSewa: '2025-11-05',
                tglKembali: '2025-11-10',
                total: 'Rp2.500.000',
                status: 'Berlangsung'
            },
            {
                id: 3,
                nama: 'Erlangga',
                mobil: 'Toyota Fortuner',
                tglSewa: '2025-11-20',
                tglKembali: '2025-11-25',
                total: 'Rp3.500.000',
                status: 'Dibatalkan'
            }
        ];

        // Populate transaction table
        const tableBody = document.querySelector('#transaksi-table tbody');
        transactions.forEach((trans, index) => {
            const row = document.createElement('tr');
            
            let statusClass = '';
            if (trans.status === 'Selesai') statusClass = 'success';
            else if (trans.status === 'Berlangsung') statusClass = 'warning';
            else if (trans.status === 'Dibatalkan') statusClass = 'danger';
            
            row.innerHTML = `
                <td>${index + 1}</td>
                <td>${trans.nama}</td>
                <td>${trans.mobil}</td>
                <td>${formatDate(trans.tglSewa)}</td>
                <td>${formatDate(trans.tglKembali)}</td>
                <td>${trans.total}</td>
                <td><span class="status-badge ${statusClass}">${trans.status}</span></td>
            `;
            tableBody.appendChild(row);
        });

        // Form submission for new transaction
        const formTransaksi = document.getElementById('form-transaksi');
        const tglSewaInput = document.getElementById('tgl-sewa');
        const tglKembaliInput = document.getElementById('tgl-kembali');
        const totalHargaInput = document.getElementById('total-harga');
        
        // Set minimum date to today
        const today = new Date().toISOString().split('T')[0];
        tglSewaInput.min = today;
        
        // Calculate price when dates change
        tglSewaInput.addEventListener('change', calculatePrice);
        tglKembaliInput.addEventListener('change', calculatePrice);
        
        formTransaksi.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const nama = document.getElementById('nama').value;
            const mobil = document.getElementById('mobil').value;
            const tglSewa = tglSewaInput.value;
            const tglKembali = tglKembaliInput.value;
            const total = totalHargaInput.value;
            
            if (!nama || !mobil || !tglSewa || !tglKembali) {
                alert('Harap lengkapi semua data!');
                return;
            }
            
            // In a real app, you would send this to a server
            alert('Transaksi berhasil disimpan!');
            formTransaksi.reset();
            totalHargaInput.value = '';
            
            // Reload the page to see the new transaction (simulation)
            setTimeout(() => location.reload(), 1000);
        });
        
        function calculatePrice() {
            const mobilSelect = document.getElementById('mobil');
            const selectedCar = mobilSelect.value;
            
            if (!selectedCar || !tglSewaInput.value || !tglKembaliInput.value) {
                return;
            }
            
            const tglSewa = new Date(tglSewaInput.value);
            const tglKembali = new Date(tglKembaliInput.value);
            
            if (tglKembali < tglSewa) {
                alert('Tanggal kembali tidak boleh sebelum tanggal sewa!');
                tglKembaliInput.value = '';
                return;
            }
            
            // Calculate days difference
            const diffTime = Math.abs(tglKembali - tglSewa);
            const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
            
            // Get price per day from selected car
            const carPriceText = mobilSelect.options[mobilSelect.selectedIndex].text;
            const pricePerDay = parseInt(carPriceText.match(/Rp(\d+\.?\d*)/)[1].replace('.', ''));
            
            // Calculate total price
            const totalPrice = pricePerDay * diffDays;
            
            // Format to IDR currency
            totalHargaInput.value = 'Rp${totalPrice.toLocaleString("id-ID")}';
        }
        
        function formatDate(dateString) {
            const options = { year: 'numeric', month: 'long', day: 'numeric' };
            return new Date(dateString).toLocaleDateString('id-ID', options);
        }
    }

    // Login Page Functionality
    if (document.getElementById('form-login')) {
        const loginForm = document.getElementById('form-login');
        const usernameInput = document.getElementById('username');
        const passwordInput = document.getElementById('password');
        const usernameError = document.getElementById('username-error');
        const passwordError = document.getElementById('password-error');
        
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            let isValid = true;
            
            // Validate username
            if (!usernameInput.value.trim()) {
                usernameError.textContent = 'Username harus diisi';
                usernameError.style.display = 'block';
                isValid = false;
            } else {
                usernameError.style.display = 'none';
            }
            
            // Validate password
            if (!passwordInput.value.trim()) {
                passwordError.textContent = 'Password harus diisi';
                passwordError.style.display = 'block';
                isValid = false;
            } else if (passwordInput.value.length < 6) {
                passwordError.textContent = 'Password minimal 6 karakter';
                passwordError.style.display = 'block';
                isValid = false;
            } else {
                passwordError.style.display = 'none';
            }
            
            if (isValid) {
                // In a real app, you would send this to a server
                alert('Login berhasil! Mengarahkan ke halaman beranda...');
                
                // Simulate login success
                setTimeout(() => {
                    window.location.href = 'index.html';
                }, 1000);
            }
        });
        
        // Clear error messages when typing
        usernameInput.addEventListener('input', function() {
            usernameError.style.display = 'none';
        });
        
        passwordInput.addEventListener('input', function() {
            passwordError.style.display = 'none';
        });
    }
});