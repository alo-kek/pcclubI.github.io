let bookings = [];

function bookPC() {
  const name = document.getElementById('clientName').value;
  const phone = document.getElementById('clientPhone').value;
  const zone = document.getElementById('zone').value;
  const date = document.getElementById('date').value;
  const time = document.getElementById('time').value;

  if(name === '' || phone === '' || date === '' || time === '') {
    alert('Заполните все поля!');
    return;
  }

  const booking = {
    id: Date.now(),
    name,
    phone,
    zone,
    date: date + ' ' + time,
    status: 'Ожидание'
  };

  bookings.push(booking);
  alert('Бронирование успешно отправлено!');
  renderBookings();

  document.getElementById('clientName').value = '';
  document.getElementById('clientPhone').value = '';
  document.getElementById('date').value = '';
  document.getElementById('time').value = '';
}

function renderBookings() {
  const table = document.getElementById('bookingTable');
  if (!table) return;
  
  table.innerHTML = '';

  bookings.forEach((booking) => {
    let statusClass = 'pending';
    
    if(booking.status === 'Подтверждено') {
      statusClass = 'approved';
    }
    if(booking.status === 'Отменено') {
      statusClass = 'declined';
    }

    table.innerHTML += `
      <tr>
        <td>${booking.name}</td>
        <td>${booking.phone}</td>
        <td>${booking.zone}</td>
        <td>${booking.date}</td>
        <td>
          <span class="status ${statusClass}">
            ${booking.status}
          </span>
        </td>
        <td>
          <button onclick="approveBooking(${booking.id})">✔</button>
          <button onclick="declineBooking(${booking.id})">✖</button>
        </td>
      </tr>
    `;
  });
}

function approveBooking(id) {
  bookings = bookings.map(booking => {
    if(booking.id === id) {
      booking.status = 'Подтверждено';
    }
    return booking;
  });
  renderBookings();
}

function declineBooking(id) {
  bookings = bookings.map(booking => {
    if(booking.id === id) {
      booking.status = 'Отменено';
    }
    return booking;
  });
  renderBookings();
}

function openAdminPanel() {
  const password = prompt('Введите код администратора');
  if(password === 'admin123') {
    document.getElementById('admin').scrollIntoView({ behavior: 'smooth' });
    document.getElementById('adminPanel').classList.remove('hidden');
    document.getElementById('loginBox').classList.add('hidden');
  } else {
    alert('Неверный код администратора!');
  }
}

function adminLogin() {
  const password = document.getElementById('adminPassword').value;
  if(password === 'admin123') {
    document.getElementById('adminPanel').classList.remove('hidden');
    document.getElementById('loginBox').classList.add('hidden');
  } else {
    alert('Неверный пароль!');
  }
}

function payNow() {
  alert('Оплата успешно выполнена!');
}