---
title: مكتبة React.js
description: شنو هي React، ليش صارت المعيار بسوق العمل، وشلون تبدي تتعلمها بالطريقة الصحيحة.
---

# React.js

## شنو هي React؟

React مكتبة JavaScript من **Meta** (فيسبوك سابقاً) لبناء واجهات المستخدم (UI). مو Framework كامل — هي بس مسؤولة عن الـ View Layer. انت تختار باقي الأدوات (Routing, State Management, etc.) حسب مشروعك.

الفكرة الأساسية: بدل ما تكتب HTML وتعدله يدوياً بـ JavaScript (DOM Manipulation)، بـ React انت توصف شنو تريد يطلع بالشاشة، وهي تتكفل بالتحديثات تلقائياً.

---

## ليش React بالذات؟

### 1. السوق يطلبها

أغلب الشركات (محلياً وعالمياً) تطلب React بالـ Job Listings. سواء تريد تشتغل Remote أو بشركة عراقية، React هي الخيار الأكثر طلباً بفرق واضح عن أي مكتبة ثانية.

### 2. Component-Based Architecture

React تخليك تقسم الصفحة لقطع صغيرة اسمها **Components**. كل Component مسؤول عن جزء معين (Navbar, Card, Button). تكتبه مرة وحدة، وتعيد استخدامه بأي مكان. هذا يخلي الكود منظم وسهل الصيانة.

### 3. مجتمع ضخم ومصادر هواية

أي مشكلة تواجهك، ابحثها بكوكل وراح تلكى عشرات الحلول. المكتبات الجاهزة (Libraries) كثيرة جداً، من UI Components لحد State Management والـ Animation.

### 4. الطريق لـ Next.js

**Next.js** (الـ Framework اللي أغلب الشركات تستخدمه هسه) مبني على React. يعني من تتعلم React، انت فاتح الباب لـ Next.js والـ Full-stack Development بشكل مباشر.

---

## قبل ما تبدي (المتطلبات)

> **تحذير:** اذا ما ضابط JavaScript زين، **لا تقرب لـ React**. 90% من المشاكل اللي راح تواجهك بـ React هي بالحقيقة مشاكل بأساسيات JS.

لازم تكون مرتاح بهاي المواضيع قبل ما تبدي:

**Array Methods** مثل `map`, `filter`, `find` — راح تستخدمها كل يوم بـ React لعرض قوائم البيانات.

**Destructuring** — استخراج البيانات من الـ Objects والـ Arrays. هذا أساس التعامل مع الـ Props والـ State.

**Async/Await** — لأن أي تطبيق حقيقي راح يجيب بيانات من API.

**ES6 Modules** — `import` و `export`. React كلها مبنية على هذا النظام.

> **ملاحظة:** مو لازم تكون خبير بكلشي. بس لازم من تشوف هاي المفاهيم بالكود، تعرف شنو صاير. اذا بعدك ما ضابطهم، ارجع لصفحة [JavaScript](/web-development/frontend/technologies/javascript) وخذ وقتك.

---

## المفاهيم الأساسية

### JSX

بـ React، تكتب الـ HTML داخل JavaScript. هذا الشي اسمه **JSX**. يشبه HTML بس بالحقيقة هو JavaScript.

```jsx
function Welcome() {
  const name = "Omar";
  return <h1>مرحبا {name}</h1>;
}
```

لاحظ: تكدر تحط أي Expression جوة `{}` مباشرة.

### Components

كل شي بـ React عبارة عن **Component** — دالة (Function) ترجع JSX.

```jsx
function UserCard({ name, role }) {
  return (
    <div>
      <h2>{name}</h2>
      <p>{role}</p>
    </div>
  );
}

// استخدامه:
<UserCard name="Ahmed" role="Frontend Developer" />
```

### Props

الـ **Props** هي البيانات اللي تدزها من Component الأب للـ Component الابن. تشبه الـ Attributes بـ HTML.

### State (useState)

الـ **State** هي بيانات تتغير مع الوقت (مثل عداد، محتوى Input، أو بيانات من API). لما الـ State يتغير، React تحدث الشاشة تلقائياً.

```jsx
import { useState } from "react";

function Counter() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>العدد: {count}</p>
      <button onClick={() => setCount(count + 1)}>زيد</button>
    </div>
  );
}
```

### useEffect

لما تريد تسوي شغلة "جانبية" (Side Effect) مثل جلب بيانات من API أو تغيير عنوان الصفحة، تستخدم `useEffect`.

```jsx
import { useState, useEffect } from "react";

function Users() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((res) => res.json())
      .then((data) => setUsers(data));
  }, []);

  return (
    <ul>
      {users.map((user) => (
        <li key={user.id}>{user.name}</li>
      ))}
    </ul>
  );
}
```

---

## شلون تبدي عملياً؟

### 1. نصب البيئة

أسرع طريقة تبدي بيها هي **Vite**:

```bash
npm create vite@latest my-app -- --template react
cd my-app
npm install
npm run dev
```

> **ملاحظة:** اذا تريد تبدي بـ TypeScript من البداية (وهذا الأفضل)، استخدم `--template react-ts` بدل `--template react`.

### 2. ابني مشاريع صغيرة

لا تضل تتفرج كورسات. ابني شي:

**مشروع أول:** Counter App (عداد بسيط) — تتعلم `useState` والـ Events.

**مشروع ثاني:** Todo List — تتعلم التعامل مع الـ Arrays والـ State المعقد.

**مشروع ثالث:** جلب بيانات من API وعرضها — تتعلم `useEffect` والـ Loading States.

**مشروع رابع:** Portfolio شخصي بـ React — تجمع كل اللي تعلمته وترفعه على النت.

### 3. بعدين شنو؟

من تخلص الأساسيات وتبني 3-4 مشاريع، انتقل لـ:

**React Router** — للتنقل بين الصفحات.

**[Next.js](https://nextjs.org/)** — الـ Framework اللي يبني على React وينطيك SSR, Routing, والكثير. هذا هو الستاندرد الحالي بالشركات.

---

## مصادر التعلم

### فيديوهات (YouTube)

- **[React Tutorial for Beginners - Programming with Mosh](https://www.youtube.com/watch?v=SqcY0GlETPk)**
  (كورس إنكليزي واضح وسريع، ممتاز كبداية.)

- **[React Full Course - Traversy Media](https://www.youtube.com/watch?v=LDB4uaJ87e0)**
  (كورس شامل يغطي أغلب المواضيع.)

### مراجع (Documentation)

- **[react.dev](https://react.dev/)** — الموقع الرسمي الجديد. فيه Tutorial تفاعلي ممتاز، ابدي بيه.
- **[react.dev/learn](https://react.dev/learn)** — قسم "Learn" بالموقع الرسمي هو أفضل مصدر مكتوب حالياً.

---

## خلاصة

React مو صعبة بس تحتاج أساسيات JavaScript قوية. لا تحاول تحفظ كلشي — ابني مشاريع وتعلم من الأخطاء. ابدي بـ `useState` و `useEffect` وافهمهم زين، والباقي راح يجي وياك تدريجياً بالممارسة.

**تحدي:** سوي Todo App كاملة بـ React — إضافة، حذف، وتعديل المهام. اذا كملتها، انت جاهز تنتقل للمرحلة الجاية.