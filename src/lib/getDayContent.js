// // src/lib/getCourseContent.js
// import fs from 'fs';
// import path from 'path';

// export const getDayContent = (day) => {
//   const filePath = path.join(process.cwd(), 'src/content', `day-${day}.mdx`);
//   return fs.readFileSync(filePath, 'utf-8');
// };

import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

export function getDayContent(day) {
  const filePath = path.join(process.cwd(), 'src/content', `day-${day}.mdx`);
  const source = fs.readFileSync(filePath, 'utf8');
  const { content, data } = matter(source);
  return { content, data };
}
