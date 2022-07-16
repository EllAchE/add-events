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
    console.log('repeat whil');
    switch (child.nodeType) {
      //   case 1:
      //     console.log('case ' + child.nodeType);
      //     if (excludeElements.indexOf(child.tagName.toLowerCase()) > -1) {
      //       break;
      //     }
      //     replaceText(child, regex, callback, excludeElements);
      //     break;
      case 3:
        console.log('case ' + child.nodeType);
        let bk = 0;
        child.data.replace(regex, function (all: HTMLElement[]) {
          let args = [].slice.call(arguments);
          let offset = args[args.length - 2];
          let newTextNode = child.splitText(offset + bk);
          let tag;

          bk -= child.data.length + all.length;

          newTextNode.data = newTextNode.data.substr(all.length);
          tag = callback.apply(window, [child].concat(args));
          console.log('adding buttton to ');
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

// export function replaceText(
//   node: any,
//   regex: RegExp,
//   callback: any,
//   excludeElements?: string[]
// ) {
//   excludeElements = ['script', 'style', 'iframe', 'canvas'];
//   if (
//     !node?.tagName ||
//     node.className.toLowerCase() == 'add_to_cal_button_ce' ||
//     excludeElements.indexOf(node.tagName.toLowerCase()) > -1
//   ) {
//     console.log('early ex');
//     console.log(node.data);
//     console.log(node.tagName);
//     console.log(node.className);
//     return;
//   }
//   let bk = 0;
//   node.data.replace(regex, function (all: HTMLElement[]) {
//     let args = Array.prototype.slice.call(arguments);
//     let offset = args[args.length - 2];
//     let newTextNode = node.splitText(offset + bk);
//     let tag;

//     bk -= node.data.length + all.length;

//     newTextNode.data = newTextNode.data.substr(all.length);
//     tag = callback.apply(window, [node].concat(args));

//     console.log('inserting button');
//     node.parentNode.insertBefore(tag, newTextNode);
//     node = newTextNode;
//   });
//   regex.lastIndex = 0;
// }
