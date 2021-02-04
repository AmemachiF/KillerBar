import MarkdownItEmoji from 'markdown-it-emoji'
import MarkdownItSubscript from 'markdown-it-sub'
import MarkdownItSuperscript from 'markdown-it-sup'
import MarkdownItFootnote from 'markdown-it-footnote'
import MarkdownItDeflist from 'markdown-it-deflist'
import MarkdownItCheckbox from 'markdown-it-checkbox'
import MarkdownItAbbreviation from 'markdown-it-abbr'
import MarkdownItInsert from 'markdown-it-ins'
import MarkdownItMark from 'markdown-it-mark'
import MarkdownItKatex from 'markdown-it-katex'
import MarkdownItTasklists from 'markdown-it-task-lists'
import MarkdownItLatex from 'markdown-it-latex'
import MarkdownItContainer from 'markdown-it-container'
import MarkdownItGithubToc from 'markdown-it-github-toc'
import MarkdownItSourceMap from 'markdown-it-source-map'
import MarkdownItHighlight from 'markdown-it-highlightjs'
import hljs from './markdown-it-highlightjs'

export default function (md) {
  md
    .use(MarkdownItEmoji)
    .use(MarkdownItSubscript)
    .use(MarkdownItSuperscript)
    .use(MarkdownItFootnote)
    .use(MarkdownItDeflist)
    .use(MarkdownItCheckbox)
    .use(MarkdownItAbbreviation)
    .use(MarkdownItInsert)
    .use(MarkdownItMark)
    .use(MarkdownItHighlight, { hljs })
    .use(MarkdownItLatex)
    .use(MarkdownItSourceMap)
    .use(MarkdownItKatex, { throwOnError: false, errorColor: '#cc0000' })
    .use(MarkdownItTasklists, { enable: true, label: true, labelAfter: true })
    .use(MarkdownItContainer, 'warning', {
      validate (params) {
        return params.trim() === 'warning'
      },
      render: (tokens, idx) => {
        if (tokens[idx].nesting === 1) {
          const icon = '<i class="markdown-it-vue-alert-icon markdown-it-vue-alert-icon-warning"><svg viewBox="64 64 896 896" data-icon="exclamation-circle" width="1em" height="1em" fill="currentColor" aria-hidden="true" class=""><path d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm-32 232c0-4.4 3.6-8 8-8h48c4.4 0 8 3.6 8 8v272c0 4.4-3.6 8-8 8h-48c-4.4 0-8-3.6-8-8V296zm32 440a48.01 48.01 0 0 1 0-96 48.01 48.01 0 0 1 0 96z"></path></svg></i>'
          return `<div class="markdown-it-vue-alter markdown-it-vue-alter-warning">${icon}`
        } else {
          return '</div>'
        }
      }
    })
    .use(MarkdownItContainer, 'info', {
      validate (params) {
        return params.trim() === 'info'
      },
      render: (tokens, idx) => {
        if (tokens[idx].nesting === 1) {
          const icon = '<i class="markdown-it-vue-alert-icon markdown-it-vue-alert-icon-info"><svg viewBox="64 64 896 896" data-icon="info-circle" width="1em" height="1em" fill="currentColor" aria-hidden="true" class=""><path d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm32 664c0 4.4-3.6 8-8 8h-48c-4.4 0-8-3.6-8-8V456c0-4.4 3.6-8 8-8h48c4.4 0 8 3.6 8 8v272zm-32-344a48.01 48.01 0 0 1 0-96 48.01 48.01 0 0 1 0 96z"></path></svg></i>'
          return `<div class="markdown-it-vue-alter markdown-it-vue-alter-info">${icon}`
        } else {
          return '</div>'
        }
      }
    })
    .use(MarkdownItContainer, 'success', {
      validate (params) {
        return params.trim() === 'success'
      },
      render: (tokens, idx) => {
        if (tokens[idx].nesting === 1) {
          const icon = '<i class="markdown-it-vue-alert-icon markdown-it-vue-alert-icon-success"><svg viewBox="64 64 896 896" data-icon="check-circle" width="1em" height="1em" fill="currentColor" aria-hidden="true" class=""><path d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm193.5 301.7l-210.6 292a31.8 31.8 0 0 1-51.7 0L318.5 484.9c-3.8-5.3 0-12.7 6.5-12.7h46.9c10.2 0 19.9 4.9 25.9 13.3l71.2 98.8 157.2-218c6-8.3 15.6-13.3 25.9-13.3H699c6.5 0 10.3 7.4 6.5 12.7z"></path></svg></i>'
          return `<div class="markdown-it-vue-alter markdown-it-vue-alter-success">${icon}`
        } else {
          return '</div>'
        }
      }
    })
    .use(MarkdownItContainer, 'error', {
      validate (params) {
        return params.trim() === 'error'
      },
      render: (tokens, idx) => {
        if (tokens[idx].nesting === 1) {
          const icon = '<i class="markdown-it-vue-alert-icon markdown-it-vue-alert-icon-error"><svg viewBox="64 64 896 896" data-icon="close-circle" width="1em" height="1em" fill="currentColor" aria-hidden="true" class=""><path d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm165.4 618.2l-66-.3L512 563.4l-99.3 118.4-66.1.3c-4.4 0-8-3.5-8-8 0-1.9.7-3.7 1.9-5.2l130.1-155L340.5 359a8.32 8.32 0 0 1-1.9-5.2c0-4.4 3.6-8 8-8l66.1.3L512 464.6l99.3-118.4 66-.3c4.4 0 8 3.5 8 8 0 1.9-.7 3.7-1.9 5.2L553.5 514l130 155c1.2 1.5 1.9 3.3 1.9 5.2 0 4.4-3.6 8-8 8z"></path></svg></i>'
          return `<div class="markdown-it-vue-alter markdown-it-vue-alter-error">${icon}`
        } else {
          return '</div>'
        }
      }
    })
    .use(MarkdownItGithubToc, {
      tocFirstLevel: 2,
      tocLastLevel: 3,
      tocClassName: 'toc',
      anchorLinkSymbol: '',
      anchorLinkSpace: false,
      anchorClassName: 'anchor',
      anchorLinkSymbolClassName: 'octicon octicon-link'
    })
}
