'use client';
import Image from 'next/image';

export default function ProjectsBookSection() {
  return (
    <section className="mt-10 md:mt-20 px-0 md:px-4">
      <div className="bg-white border border-gray-200 rounded-xl p-6 md:p-10 text-center shadow-md max-w-3xl mx-auto">

        {/* Book Title */}
        <h3 className="text-xl md:text-3xl font-semibold text-gray-900 mb-6">
          100+ JavaScript Projects (Beginner to Advanced)
        </h3>

        {/* Book Image */}
       <div className="w-full md:w-94 flex-shrink-0">
                <Image
                  src="/js-project.webp"
                  alt="30 Days of JavaScript"
                  width={300}
                  height={400}
                  className="w-[100%] mx-auto md:w-full h-auto "
                />
              </div>

        {/* Book Description */}
        <div className="text-gray-600 text-base md:text-lg leading-relaxed space-y-4">
          <p>
            Master JavaScript by building <strong>100+ real-world projects</strong> — from simple mini tools to advanced full-stack interfaces.
          </p>
          <p>
            Every project includes <strong>clean, well-commented code</strong> so you not only build, but deeply understand how things work behind the scenes.
          </p>
          <p>
            Boost your portfolio, crack coding interviews, and gain confidence by learning through practical application — <strong>the fastest way to grow as a developer</strong>.
          </p>
        </div>

      </div>
    </section>
  );
}
