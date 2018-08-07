var map = {
"<": "&lt;",
">": "&gt;",
"&": "&amp;"
};

$('code[class*="language-"]').each((index, el) => {
  console.log(el);
  $(el).html($(el).html().replace(/([<>\&])/g, (match, p1) => {
    console.log('match:', p1, map[p1]);
    return map[p1];
  }))
});
Prism.highlightAll(false, () => {
  console.log('done highlighting')
})