# Node.js Lesson 24

## EJS Template Syntax

| Tag | Description | Example |
|-----|-------------|---------|
| `<%` | **Scriptlet tag** - Executes JavaScript code without output | `<% if (user) { %>` |
| `<%=` | **Output tag** - Outputs the value (HTML escaped) | `<%= user.name %>` |
| `<%-` | **Unescaped output tag** - Outputs raw HTML without escaping | `<%- htmlContent %>` |
| `<%#` | **Comment tag** - Does not execute or output anything | `<%# This is a comment %>` |
| `<%%` | **Literal tag** - Outputs a literal `<%` | `<%%` |
| `%>` | **Closing tag** - Closes an EJS tag | `{ %>` |
| `-%>` | **Trim-mode closing tag** - Removes trailing whitespace | `<% code -%>` |
| `_%>` | **Slurp-mode closing tag** - Removes all whitespace after tag | `<% code _%>` |

### Common Usage Examples

```ejs
<!-- Variable output (HTML escaped) -->
<h1><%= pageTitle %></h1>

<!-- Loop -->
<% products.forEach(function(product) { %>
  <div><%= product.name %></div>
<% }); %>

<!-- Conditional -->
<% if (isLoggedIn) { %>
  <p>Welcome back!</p>
<% } else { %>
  <p>Please log in</p>
<% } %>

<!-- Raw HTML output (use with caution) -->
<%- rawHtmlContent %>

<!-- Comment (not visible in output) -->
<%# This is an EJS comment %>
```
