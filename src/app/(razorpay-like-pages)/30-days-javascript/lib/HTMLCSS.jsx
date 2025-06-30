'use client';
import Image from 'next/image';

export default function HTMLCSS() {
  return (
    <section className="mt-9 md:mt-20 md:px-4">
      <div className="bg-white border border-gray-200 rounded-xl p-6 md:p-10 text-center shadow-md max-w-4xl mx-auto">
        
        {/* Title */}
        <h3 className="text-xl md:text-3xl font-semibold text-gray-900 mb-6">
          🎁 BONUS: HTML & CSS Guides (100% FREE)
        </h3>

        {/* Image */}
        <div className="w-full justify-center mb-6">
          <Image
            src="/html_css.webp"
            alt="Free HTML and CSS Guides"
            width={500}
            height={400}
            className="w-[290px] md:w-[380px] h-auto mx-auto rounded-md hover:scale-105 transition-transform duration-300 ease-in-out"
          />
        </div>

        {/* Persuasive Bullet Points */}
        <div className="text-gray-700 text-base md:text-lg leading-relaxed text-left max-w-2xl mx-auto">
          <ul className="list-disc list-inside space-y-3">
            <li><strong>Instantly level up</strong> your frontend skills — no boring theory, just action.</li>
            <li><strong>Real-world examples</strong> that teach you how websites are actually built.</li>
            <li><strong>Zero fluff:</strong> Every page teaches something practical you can use today.</li>
            <li>Perfect for both <strong>beginners</strong> and those who want to sharpen fundamentals.</li>
           
          </ul>

        
        </div>
      </div>
    </section>
  );
}
