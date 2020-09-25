
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
  var oldContentEditable = el.contentEditable,
    oldReadOnly = el.readOnly,
    range = document.createRange();

  el.contentEditable = true;
  el.readOnly = false;
  range.selectNodeContents(el);

  var s = window.getSelection();
  s.removeAllRanges();
  s.addRange(range);

  el.setSelectionRange(0, 999999); // A big number, to cover anything that could be inside the element.

  el.contentEditable = oldContentEditable;
  el.readOnly = oldReadOnly;

  document.execCommand('copy');
};