---
title: تعلم JavaScript
description: إضافة التفاعل لمواقع الويب
---

# تعلم JavaScript

JavaScript تضيف التفاعل والحركة لمواقع الويب.

## المتغيرات

```javascript
let name = "أحمد";
const age = 25;
```

## الدوال

```javascript
function greet(name) {
  return `مرحباً ${name}!`;
}

const greet = (name) => `مرحباً ${name}!`;
```

## التعامل مع DOM

```javascript
const button = document.querySelector("#myButton");

button.addEventListener("click", () => {
  alert("تم الضغط على الزر!");
});
```

## Fetch API

```javascript
async function getData() {
  const response = await fetch("/api/data");
  const data = await response.json();
  console.log(data);
}
```

## الخطوة التالية

بعد تعلم الأساسيات، يمكنك التعمق في:

- React أو Vue.js
- TypeScript
- Node.js
