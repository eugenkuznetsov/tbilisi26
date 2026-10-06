(function () {
  var list = document.querySelector('.speaker-details-list');
  if (!list) return;

  fetch('assets/data/abstracts.json')
    .then(function (res) { return res.json(); })
    .then(function (abstracts) {
      list.querySelectorAll('li[data-speaker]').forEach(function (li) {
        var data = abstracts[li.getAttribute('data-speaker')];
        var talk = li.querySelector('.sd-talk');
        if (!data || !talk) return;

        var collapseId = 'abstract-' + li.getAttribute('data-speaker');

        var title = document.createElement('p');
        title.className = 'sd-title';
        title.innerHTML = '<span class="sd-title-label">Title:</span> ' + data.title;

        var btn = document.createElement('button');
        btn.type = 'button';
        btn.className = 'sd-abstract-btn';
        btn.setAttribute('data-bs-toggle', 'collapse');
        btn.setAttribute('data-bs-target', '#' + collapseId);
        btn.setAttribute('aria-expanded', 'false');
        btn.setAttribute('aria-controls', collapseId);
        btn.innerHTML = 'Abstract <i class="bi bi-chevron-down"></i>';

        var collapse = document.createElement('div');
        collapse.className = 'collapse sd-abstract';
        collapse.id = collapseId;

        var body = document.createElement('div');
        body.className = 'sd-abstract-body';
        data.abstract.forEach(function (paragraph) {
          var p = document.createElement('p');
          p.innerHTML = paragraph;
          body.appendChild(p);
        });
        collapse.appendChild(body);

        talk.appendChild(title);
        talk.appendChild(btn);
        talk.appendChild(collapse);

        if (data.slides && data.slides.length) {
          var slidesWrap = document.createElement('div');
          slidesWrap.className = 'sd-slides';
          data.slides.forEach(function (slide) {
            var link = document.createElement('a');
            link.className = 'sd-slides-link';
            link.href = slide.url;
            link.target = '_blank';
            link.rel = 'noopener noreferrer';
            link.innerHTML = '<i class="bi bi-file-earmark-pdf"></i> ' + slide.label;
            slidesWrap.appendChild(link);
          });
          talk.appendChild(slidesWrap);
        }
      });
    })
    .catch(function (err) {
      console.error('Could not load speaker abstracts:', err);
    });
})();
