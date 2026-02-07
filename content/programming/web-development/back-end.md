---
title: الواجهة الخلفية
description: تعلم Back-end Development
---

# الواجهة الخلفية (Back-end)

الواجهة الخلفية تعمل على الخادم وتتعامل مع البيانات والمنطق.

## المهام الرئيسية

- إدارة قواعد البيانات
- معالجة الطلبات (APIs)
- الأمان والمصادقة
- منطق التطبيق

## اللغات الشائعة

### Node.js (JavaScript)

```javascript
const express = require("express");
const app = express();

app.get("/api/users", (req, res) => {
  res.json([{ name: "أحمد" }]);
});

app.listen(3000);
```

### Python (Flask/Django)

```python
from flask import Flask, jsonify
app = Flask(__name__)

@app.route('/api/users')
def get_users():
    return jsonify([{'name': 'أحمد'}])
```

## قواعد البيانات

- **SQL**: PostgreSQL, MySQL
- **NoSQL**: MongoDB, Redis

## الخطوة التالية

اختر لغة وابدأ ببناء API بسيط!
