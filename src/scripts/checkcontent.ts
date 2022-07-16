export function replaceText(
  node: HTMLElement,
  regex: RegExp,
  callback: any,
  excludeElements?: string[]
) {
  excludeElements ||
    (excludeElements = ['script', 'style', 'iframe', 'canvas']);
  var child: any = node.firstChild;

  while (child) {
    switch (child.nodeType) {
      case 1:
        if (excludeElements.indexOf(child.tagName.toLowerCase()) > -1) break;
        replaceText(child, regex, callback, excludeElements);
        break;
      case 3:
        var bk = 0;
        child.data.replace(regex, function (all: HTMLElement[]) {
          var args = [].slice.call(arguments),
            offset = args[args.length - 2],
            newTextNode = child.splitText(offset + bk),
            tag;
          bk -= child.data.length + all.length;

          newTextNode.data = newTextNode.data.substr(all.length);
          tag = callback.apply(window, [child].concat(args));
          child.parentNode.insertBefore(tag, newTextNode);
          child = newTextNode;
        });
        regex.lastIndex = 0;
        break;
    }

    child = child.nextSibling;
  }

  return node;
}

// replaceText(
//   document.getElementsByTagName('article')[0],
//   new RegExp('\\b' + searchTerm + '\\b', 'g'),
//   function (node, match, offset) {
//     var span = document.createElement('span');
//     span.className = 'search-term';
//     span.textContent = match;
//     return span;
//   }
// );
