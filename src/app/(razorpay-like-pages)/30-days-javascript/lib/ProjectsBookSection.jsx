// 'use client';
// import Image from 'next/image';

// export default function ProjectsBookSection() {
//   return (
//     <section className="mt-10 md:mt-20 px-0 md:px-4">
//       <div className="bg-white border border-gray-200 rounded-xl p-6 md:p-10 text-center shadow-md max-w-3xl mx-auto">

//         {/* Book Title */}
//         <h3 className="text-xl md:text-3xl font-semibold text-gray-900 mb-6">
//           100+ JavaScript Projects (Beginner to Advanced)
//         </h3>

//         {/* Book Image */}
//        <div className="w-full md:w-94 flex-shrink-0 mx-auto">
//                 <Image
//                   src="/js-project.webp"
//                   alt="The JavaScript Mastery Pack"
//                   width={300}
//                   height={400}
//                   className="w-[100%] mx-auto md:w-full h-auto "
//                 />
//               </div>

//         {/* Book Description */}
//         <div className="text-gray-600 text-base md:text-lg leading-relaxed space-y-4">
//           <p>
//             Master JavaScript by building <strong>100+ real-world projects</strong> — from simple mini tools to advanced full-stack interfaces.
//           </p>
//           <p>
//             Every project includes <strong>clean, well-commented code</strong> so you not only build, but deeply understand how things work behind the scenes.
//           </p>
//           <p>
//             Boost your portfolio, crack coding interviews, and gain confidence by learning through practical application — <strong>the fastest way to grow as a developer</strong>.
//           </p>
//         </div>

//       </div>
//     </section>
//   );
// }


'use client';
import Image from 'next/image';

export default function ProjectsBookSection({ fromModal }) {
  return (
    <section className="mt-10 md:mt-20 px-0 md:px-4">
      <div className="bg-white border border-gray-200 rounded-xl p-6 md:p-10 text-center shadow-md max-w-3xl mx-auto">

        {/* Book Title */}
        <h3 className={`${fromModal ? "text-sm md:text-lg" : "text-xl md:text-3xl"} font-semibold text-gray-900 mb-3`}>
          100+ JavaScript Projects (Beginner to Advanced)
        </h3>

        {/* Book Image */}
        {/* <div className="w-full md:w-94 flex-shrink-0 mx-auto">
          <Image
            src="/js-project.webp"
            alt="The JavaScript Mastery Pack"
            width={300}
            height={400}
            className="w-[100%] mx-auto md:w-full h-auto "
          />
        </div> */}

        <div className="flex flex-col items-center justify-center mb-6">
          <Image
            src="/js-project.webp"
            alt="JavaScript Project"
            width={400}
            height={300}
            className="w-[full] md:w-[300px] h-auto rounded-md hover:scale-105 transition-transform duration-300"
          />
        </div>

        {/* Book Description */}
        <div
          className={`${fromModal ? "text-xs md:text-sm" : "text-base md:text-lg"} text-gray-600 leading-relaxed space-y-4`}
        >
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
