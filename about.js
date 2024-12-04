```javascript
//pages/index.js
import Link from 'next/link';

export default function Home() {
  return (
    <div>
      <h1>Welcome to my Next.js app</h1>
      <Link href='/about'>
        <a>Go to About Page</a>
      </Link>
    </div>
  );
}
```
```javascript
//pages/about.js

export default function About() {
  // Simulate a slow API call
  const data = fetch('/api/data').then(res => res.json());

  return (
    <div>
      <h1>About Page</h1>
      {/* Before this line is the cause of the bug */}      <p>Data from API: {JSON.stringify(data)}</p> {/* This line causes the error in Next.js 15.  The data is a Promise and will not render correctly.  */} 
    </div>
  );
}
```
```javascript
//pages/api/data.js

export default async function handler(req, res) {
  // Simulate a delay
  await new Promise(resolve => setTimeout(resolve, 2000));
  res.status(200).json({ message: 'Data from API' });
}
```