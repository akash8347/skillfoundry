'use client';
import Image from 'next/image';

export default function Bonus() {
  return (
    <section className="mt-9 md:mt-20  px-4 md:space-y-20 space-y-10">

      {/* Interview Questions Book */}
      <div className="bg-white border border-gray-200 rounded-xl p-6 md:p-10 text-center shadow-md max-w-4xl mx-auto">
        <h3 className="text-xl md:text-3xl font-semibold text-gray-900 mb-6">
          BONUS: 100+ Most Asked JavaScript Interview Questions
        </h3>
        <div className="flex flex-col items-center justify-center mb-6">
          <Image
            src="/js-interview.png"
            alt="JavaScript Interview Questions"
            width={220}
            height={300}
            className="w-[250px] md:w-[300px] h-auto rounded-md hover:scale-105 transition-transform duration-300"
          />
        </div>
        <ul className="text-gray-600 text-base md:text-lg list-disc list-inside text-left space-y-2 max-w-md mx-auto">
          <li>Master the most commonly asked JavaScript interview questions.</li>
          <li>Learn how to frame your answers like a pro.</li>
          <li>Boost your confidence and land your dream role.</li>
        </ul>
      </div>

      {/* MCQs and Quizzes Book */}
      <div className="bg-white border border-gray-200 rounded-xl p-6 md:p-10 text-center shadow-md max-w-4xl mx-auto">
        <h3 className="text-xl md:text-3xl font-semibold text-gray-900 mb-6">
          BONUS: 100+ JavaScript MCQs & Quizzes
        </h3>
        <div className="flex flex-col items-center justify-center mb-6">
          <Image
            src="/js-mcq.png"
            alt="JavaScript MCQs and Quizzes"
            width={220}
            height={300}
            className="w-[250px] md:w-[300px] h-auto rounded-md hover:scale-105 transition-transform duration-300"
          />
        </div>
        <ul className="text-gray-600 text-base md:text-lg list-disc list-inside text-left space-y-2 max-w-md mx-auto">
          <li>Sharpen your JavaScript concepts with real MCQs.</li>
          <li>Test your understanding and identify weak spots.</li>
          <li>Includes answers and explanations to boost learning.</li>
        </ul>
      </div>

    </section>
  );
}
