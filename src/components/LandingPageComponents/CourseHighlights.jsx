const highlights = [
  {
    title: 'HTML & Page Structure',
    description: 'Master the foundational building blocks of web pages using semantic HTML tags and structure.',
  },
  {
    title: 'CSS Styling & Layouts',
    description: 'Learn how to style and layout your website using CSS properties, margins, paddings, and the box model.',
  },
  {
    title: 'Responsive Design with Flexbox',
    description: 'Understand Flexbox deeply to create flexible and responsive layouts for all devices.',
  },
  {
    title: 'Modern Web Design with JavaScript',
    description: 'Add interactivity to your web pages using modern JavaScript fundamentals.',
  },
  {
    title: 'Projects & Hands-on Practice',
    description: 'Work on real-world web design projects to apply and reinforce your learning.',
  },
  {
    title: 'Final Certification & Portfolio Boost',
    description: 'Earn a certificate and build a portfolio-ready website to showcase your new skills.',
  },
];

const CourseHighlights = () => {
  return (
    <div className="bg-white text-gray-800 px-6 py-5 sm:py-16 sm:space-y-24 space-y-12">
      {/* What You'll Learn */}
      <section className=" max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold mb-5 text-gray-900">What you'll learn</h2>
        <div className="grid md:grid-cols-2 sm:gap-6 gap-4">
          {highlights.map((item, idx) => (
            <div
              key={idx}
              className=" flex items-start gap-3 bg-white border border-gray-200 rounded-xl px-5 py-4 shadow-sm hover:shadow-md transition"
            >
              <div className="text-green-600 text-xl mt-1">✓</div>
              <div>
                <h3 className="font-semibold text-base text-gray-900">{item.title}</h3>
                <p className="text-sm text-gray-600 leading-relaxed mt-1">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Certificate Section */}
      <section className="p-5 border-2 border-dashed border-gray-500  xl:max-w-3xl max-w-6xl mx-auto flex flex-col lg:flex-row items-center lg:gap-5 gap-5">
        <div className="flex-1 text-center md:text-left">
          <h2 className=" text-2xl sm:text-3xl mb-2  font-bold xl:mb-0 text-gray-900">Course Completion Certificate <span className="text-yellow-500">⭐</span></h2>
          <p className="text-gray-600 text-sm">
          Make your resume outstand among other's.
          </p>
        </div>
        <div className="flex-1">
          <div className="border border-gray-200 rounded-xl shadow p-2 ">
            <img
              src="/certificate-template.jpg"
              alt="Course Completion Certificate"
              className="w-full max-w-xs mx-auto rounded-lg"
            />
          </div>
        </div>
      </section>
    </div>
  );
};

export default CourseHighlights;
