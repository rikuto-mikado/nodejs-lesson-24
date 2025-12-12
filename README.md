# Node.js Lesson 24 - EJS Template Engine

## What I Learned

### 1. Setting Up EJS as Template Engine
Configure Express to use EJS for rendering dynamic HTML views:

**app.js**
```javascript
const express = require('express');
const app = express();

// Set EJS as the template engine for rendering dynamic HTML views
app.set('view engine', 'ejs');
app.set('views', 'views');  // Directory where template files are located
```

### 2. Rendering Views with Data
Pass data from routes to EJS templates using `res.render()`:

**routes/shop.js**
```javascript
router.get('/', (req, res, next) => {
  const products = adminData.products;
  res.render('shop', {
    prods: products,
    pageTitle: 'Shop',
    path: '/',
    hasProducts: products.length > 0
  });
});
```

### 3. EJS Comment Tags for Documentation
Use `<%#` comment tags to document code directly in EJS templates:

**views/shop.ejs**
```ejs
<%# Loop through each element in the prods array %>
<%# 'let product' creates a variable for each item, 'of prods' iterates over the array %>
<% for (let product of prods) { %>
    <h1 class="product__title"><%= product.title %></h1>
<% } %>
```

### 4. Loop Methods: `for...of` vs `forEach`
Both methods work for iterating over arrays in EJS:

```ejs
<%# Method 1: for...of loop (cleaner syntax) %>
<% for (let product of prods) { %>
    <div><%= product.title %></div>
<% } %>

<%# Method 2: forEach (alternative) %>
<% prods.forEach(function(product) { %>
    <div><%= product.title %></div>
<% }); %>
```

### 5. Conditional Rendering in EJS
Use JavaScript conditionals to display content based on data:

**views/shop.ejs**
```ejs
<%# Check if there are any products to display %>
<% if (prods.length > 0) { %>
    <div class="grid">
        <!-- Display products -->
    </div>
<%# If no products exist, display a fallback message %>
<% } else { %>
    <h1>No Products Found!!</h1>
<% } %>
```

### 6. Dynamic Active Navigation with Path Variable
Routes pass a `path` variable to highlight the current page in navigation:

**Route (admin.js)**
```javascript
router.get('/add-product', (req, res, next) => {
  res.render('add-product', {
    pageTitle: 'Add Product',
    path: '/admin/add-product'  // Passed to view for navigation highlighting
  });
});
```

**Navigation (nav.ejs)**
```ejs
<li class="main-header__item">
    <a class="<%= path === '/' ? 'active' : '' %>" href="/">Shop</a>
</li>
<li class="main-header__item">
    <a class="<%= path === '/admin/add-product' ? 'active' : '' %>" href="/admin/add-product">Add Product</a>
</li>
```

### 7. Passing View-Specific Flags from Routes
Control view-specific styling and UI state using boolean flags:

**routes/admin.js**
```javascript
router.get('/add-product', (req, res, next) => {
  // Pass flags to the view: formCSS/productCSS conditionally load stylesheets
  // activeAddProduct highlights navigation
  // This is a common pattern to control view-specific styling and UI state from the route handler
  res.render('add-product', {
    pageTitle: 'Add Product',
    path: '/admin/add-product',
    formCSS: true,
    productCSS: true,
    activeAddProduct: true
  });
});
```

### 8. Include Method Best Practices
- Use `<%-` (unescaped) for includes, not `<%=`
- Partial files like `head.ejs` don't include closing tags (`</head>`)
- Main files add the closing tag to allow page-specific CSS/scripts

**views/add-product.ejs**
```ejs
<%- include('includes/head.ejs') %>
    <link rel="stylesheet" href="/css/forms.css">
    <link rel="stylesheet" href="/css/product.css">
</head>
```

### 9. 404 Error Page Rendering
Handle 404 errors with a custom error page:

**app.js**
```javascript
app.use((req, res, next) => {
    res.status(404).render('404', { pageTitle: 'Page Not Found' });
});
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

### 1. Understanding EJS Tag Differences
Initially confused about when to use different EJS tags:
- `<%=` for escaped output (user data)
- `<%-` for unescaped HTML (includes, trusted content)
- `<%` for control flow (loops, conditionals)
- `<%#` for comments

**Solution:** Created a mental model: `=` outputs text, `-` outputs HTML, no symbol executes code, `#` is ignored.

### 2. Managing Partial File Structure
Struggled with deciding what to include in partial files vs main files, especially with the `</head>` closing tag.

**Solution:** Realized the pattern: partials should end at a point where page-specific content might be inserted. Leaving `</head>` in main files allows each page to add custom stylesheets before closing the tag.

### 3. Dynamic Navigation Highlighting
Figuring out how to dynamically highlight the active page in navigation required understanding how to pass context from routes to views.

**Solution:** Learned to pass a `path` variable from each route and use ternary operators in EJS to conditionally apply CSS classes:
```ejs
<a class="<%= path === '/admin/add-product' ? 'active' : '' %>" href="/admin/add-product">
```

### 4. Choosing Between for...of and forEach
Unsure which loop method to use in EJS templates for better readability and maintainability.

**Solution:** Found that `for...of` provides cleaner syntax with explicit loop variable declaration, making it more readable in templates. `forEach` works but requires function syntax which adds visual noise.

---

## Memo

This lesson covered **EJS (Embedded JavaScript)** templating in Express.js. Key takeaways:

- **EJS** is a simple templating engine that lets you write HTML with embedded JavaScript
- **Template data** is passed from routes using `res.render('view-name', { data })`
- **Partials** (includes) promote code reusability and maintainability
- **Dynamic content** is rendered using `<%= %>` for escaped output and `<%- %>` for HTML
- **Control flow** (`if`, `for`, `forEach`) enables conditional and iterative rendering
- **Path-based navigation** highlighting improves UX by showing users their current location

EJS is more flexible than Pug (no strict indentation) and more JavaScript-native than Handlebars (full JS expressions allowed), making it ideal for developers who prefer writing familiar JavaScript syntax in templates.
