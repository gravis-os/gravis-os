/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

const visit = require('unist-util-visit')

const codeBlockTitleRegex =
  /containerClassName=(?<quote>["'])(?<containerClassName>.*?)\1/

module.exports = function plugin() {
  const transformer = (root) => {
    visit(root, 'code', (node, index, parent) => {
      /**
       * Render the component if the user has provided a code block.
       * @type {boolean}
       */
      const isJsx = node.lang === 'jsx'
      const isHtml = node.lang === 'html'
      if (isJsx || isHtml) {
        const containerClassName =
          node.meta?.match(codeBlockTitleRegex)?.groups.containerClassName

        const JsxValue = `${node.value}<br />`
        const HtmlValue = `<div${
          containerClassName ? ` className="${containerClassName}"` : ' '
        } dangerouslySetInnerHTML={{__html: \`${node.value}\`}}/><br />`

        // Inject the component just above the code block.
        parent.children.splice(parent.children.indexOf(node), 0, {
          type: 'jsx',
          value: isJsx ? JsxValue : HtmlValue,
        })

        return index + 2
      }
    })
  }
  return transformer
}
