export function modifySearchLinkOpen () {
  const links = document.querySelectorAll('.gsc-results .gs-title a');
  links.forEach((link) => {
    link.setAttribute('target', '_blank');
    link.setAttribute('rel', 'noopener noreferrer');
  });
}