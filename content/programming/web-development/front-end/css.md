---
title: تعلم CSS
description: تنسيق صفحات الويب باستخدام CSS
---

# تعلم CSS

CSS (Cascading Style Sheets) تتحكم في شكل وتصميم الموقع.

## طرق إضافة CSS

### داخل HTML

```html
<style>
  p {
    color: red;
  }
</style>
```

### ملف خارجي

```html
<link rel="stylesheet" href="style.css" />
```

## المحددات (Selectors)

```css
/* حسب العنصر */
p {
  color: blue;
}

/* حسب الكلاس */
.highlight {
  background: yellow;
}

/* حسب الـ ID */
#header {
  font-size: 24px;
}
```

## الألوان والخطوط

```css
body {
  color: #333;
  background-color: #f5f5f5;
  font-family: "Arial", sans-serif;
  font-size: 16px;
}
```

## Flexbox

```css
.container {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 20px;
}
```
