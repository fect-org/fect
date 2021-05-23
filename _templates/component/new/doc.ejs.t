---
to: docs/zh-cn/components/<%=h.changeCase.lcFirst(name) %>.mdx
---

export const meta = {
  title: '<%= name %>',
  group:'',
}

<fe-CodeShow
  title="默认的"
  name="ex-<%=h.changeCase.lcFirst(name) %>-default"
/>