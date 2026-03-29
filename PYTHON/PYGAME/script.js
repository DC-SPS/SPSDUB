document.addEventListener('DOMContentLoaded', () => {
  const codeBlocks = document.querySelectorAll('pre');

  codeBlocks.forEach((pre) => {
    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'copy-code-button';
    button.textContent = 'Kopírovať kód';

    button.addEventListener('click', async () => {
      const code = pre.querySelector('code');
      if (!code) return;
      const text = code.innerText;

      try {
        await navigator.clipboard.writeText(text);
        button.textContent = 'Skopírované!';
        setTimeout(() => {
          button.textContent = 'Kopírovať kód';
        }, 1400);
      } catch (err) {
        console.error('Kopírovanie zlyhalo:', err);
        button.textContent = 'Skopírovanie neúspešné';
        setTimeout(() => {
          button.textContent = 'Kopírovať kód';
        }, 1400);
      }
    });

    pre.style.position = 'relative';
    pre.insertAdjacentElement('afterbegin', button);
  });
});
