(function () {
  var datesEl = document.getElementById('school-dates');
  if (!datesEl || !datesEl.dataset.end) return;

  var closesAt = new Date(datesEl.dataset.end + 'T23:59:59');
  if (new Date() <= closesAt) return;

  document.querySelectorAll('.btn-register, .btn-register-white').forEach(function (btn) {
    btn.classList.add('is-disabled');
    btn.setAttribute('aria-disabled', 'true');
    btn.removeAttribute('href');
    btn.removeAttribute('target');
    btn.addEventListener('click', function (e) { e.preventDefault(); });

    var note = document.createElement('p');
    note.className = 'registration-closed-note';
    note.innerHTML = '<i class="bi bi-x-circle me-1"></i>Registration is closed.';
    btn.insertAdjacentElement('afterend', note);
  });
})();
