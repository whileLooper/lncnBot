
document.querySelector('button[id="copyBtn"]').addEventListener('click', (e) => {
  const options = {
    method: "POST",
    headers: { "Content-Type": "application/json; charset=utf-8" },
  };

  fetch("/.netlify/functions/copy-node", options)
    .then((res) => res.json())
    .then((res) => {
      copyToClipboard(res.message)
    })
    .catch((err) => {
      console.log(err)
      document.getElementById('result').textContent = `Error: ${err.toString()}`
  });;
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
  const result = document.querySelector('div[id="copy_result"]');
  result.style.display = 'block';
};