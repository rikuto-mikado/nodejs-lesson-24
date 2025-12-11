# Node.js Lesson 24

## What I Learned

### 1. EJS Comment Tags for Documentation
Learned to use `<%#` comment tags to document code directly in EJS templates:

```ejs
<%# Loop through each element in the prods array %>
<%# 'let product' creates a variable for each item, 'of prods' iterates over the array %>
<% for (let product of prods) { %>
    <h1><%= product.title %></h1>
<% } %>
```

### 2. Loop Methods: `for...of` vs `forEach`
Both methods work for iterating over arrays in EJS:

```ejs
<%# Method 1: for...of loop %>
<% for (let product of prods) { %>
    <div><%= product.title %></div>
<% } %>

<%# Method 2: forEach (alternative) %>
<% prods.forEach(function(product) { %>
    <div><%= product.title %></div>
<% }); %>
```

### 3. Dynamic Active Class with Path Variable
Routes pass a `path` variable to highlight the current page in navigation:

**Route (admin.js)**
```javascript
res.render('add-product', {
    pageTitle: 'Add Product',
    path: '/admin/add-product'  // Passed to view
});
```

**Navigation (nav.ejs)**
```ejs
<a class="<%= path === '/' ? 'active' : '' %>" href="/">Shop</a>
<a class="<%= path === '/admin/add-product' ? 'active' : '' %>" href="/admin/add-product">Add Product</a>
```

### 4. Include Method Best Practices
- Use `<%-` (unescaped) for includes, not `<%=`
- Partial files like `head.ejs` don't include closing tags (`</head>`)
- Main files add the closing tag to allow page-specific CSS/scripts

```ejs
<%- include('includes/head.ejs') %>
    <link rel="stylesheet" href="/css/product.css">  <!-- Page-specific CSS -->
</head>
```

---

## EJS Template Syntax Reference

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

## EJS Include Method

The `include()` method allows you to embed partial templates into your main templates, promoting code reusability.

### Syntax

```ejs
<%- include('path/to/partial.ejs') %>
```

**Important:** Use `<%-` (unescaped) instead of `<%=` because you want to render the HTML, not escape it.

### File Structure Pattern

When using includes, you need to understand what each partial contains and what the main file must provide:

**includes/head.ejs** (Partial file)
```ejs
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title><%= pageTitle %></title>
    <link rel="stylesheet" href="/css/main.css">
<!-- NOTE: Does NOT include </head> closing tag -->
```

**404.ejs** (Main file)
```ejs
<%- include('includes/head.ejs') %>
</head>  <!-- YOU MUST include closing tag in each page -->
<body>
    <h1>Page Not Found!</h1>
</body>
</html>
```

### Why Keep `</head>` in Main Files?

Each page may need **different stylesheets** after the common head section:

```ejs
<%- include('includes/head.ejs') %>
    <link rel="stylesheet" href="/css/product.css">  <!-- Page-specific CSS -->
</head>
<body>
    ...
</body>
```

### Common Include Patterns

```ejs
<%- include('includes/head.ejs') %>
    <!-- Optional: page-specific <link> or <script> tags -->
</head>

<body>
    <%- include('includes/navigation.ejs') %>

    <main>
        <!-- Page-specific content -->
    </main>

    <%- include('includes/footer.ejs') %>
</body>
</html>
```

### Passing Data to Includes

You can pass variables to included files:

```ejs
<%- include('includes/header.ejs', { active: 'shop' }) %>
```

---

## Challenges I Faced
