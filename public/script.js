
document.querySelector('button[id="copyBtn"]').addEventListener('click', (e) => {
  fetch("/.netlify/functions/copy-node", options)
    .then((res) => res.json())
    .then((res) => {
      copyToClipboard(res.message)
    });
})

const copyToClipboard = str => {
  const el = document.createElement('textarea');
  el.value = str;
  el.setAttribute('readonly', '');
  el.style.position = 'absolute';
  el.style.left = '-9999px';
  document.body.appendChild(el);
  el.select();
  document.execCommand('copy');
  document.body.removeChild(el);
};