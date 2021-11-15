export default function jQuery3dot6Fix(): void {
  // Register fixes when document has fully loaded
  $(() => {
    // Select2 auto search select fix, caused by jQuery 3.6
    // See https://github.com/select2/select2/issues/5993
    $(document).on('select2:open', () => {
      const allFound: NodeListOf<HTMLElement> =
        document.querySelectorAll('.select2-container--open .select2-search__field');
      allFound[allFound.length - 1].focus();
    });
  });
}
