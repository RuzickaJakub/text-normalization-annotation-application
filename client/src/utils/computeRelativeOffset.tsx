export function computeRelativeOffset(node: Node, text: string) {
  /**
   * Compute the relative offset of the start of the node
   * to the parent.
   */
  let offset: number = 0;
  let parent = node.parentNode!;

  let parentOffset: number = 0;
  // if (parent.textContent !== text) {
  //   parentOffset = computeRelativeOffset(parent, text);
  // }
  for (var i = 0; parent.childNodes.length > i; i++) {
    const cnode = parent.childNodes[i];
    if (cnode === node) {
      break;
    }
    if (cnode.nodeType === document.TEXT_NODE) {
      offset += cnode.nodeValue?.length!;
    }
    if (cnode.nodeType === document.ELEMENT_NODE) {
      offset += cnode.textContent?.length!;
    }
  }
  return offset + parentOffset;
}
