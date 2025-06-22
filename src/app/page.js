'use client';

import LandingFooter from '@/components/LandingPageComponents/LandingFooter';
import Image from 'next/image';
import Link from 'next/link';
import Head from 'next/head';


 function Home() {
  <Head>
  <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(courseSchema) }} />
  <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
  <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(orgSchema) }} />
</Head>

  return (
    <main className="bg-white text-gray-900 min-h-screen flex flex-col">
      {/* Navbar */}
      <header className="w-full border-b border-gray-200 shadow-sm bg-white sticky top-0 z-50">
        <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">
          <Link href="/" className="flex items-center space-x-2">
            <Image
              src="/logo.jpg"
              alt="Skill Foundry Logo"
              width={153}
              height={38}
              className="h-10 w-auto object-contain"
              priority
            />
          </Link>
          <nav className="flex items-center space-x-6">
            <Link href="#courses" className="text-sm font-medium hover:text-blue-600 transition">
              Courses
            </Link>
            <Link href="/download" className="text-sm font-medium hover:text-blue-600 transition">
              Dashboard
            </Link>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section
        className="relative flex flex-col items-center justify-center text-center px-6 py-32 overflow-hidden bg-gradient-to-tr from-purple-100 via-pink-100 to-blue-100"
        aria-label="Hero Section"
      >
        <div className="z-10 max-w-3xl mx-auto">
          <h1 className="text-5xl sm:text-6xl font-extrabold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600">
            Launch Your Tech Career with Coding Courses
          </h1>
          <p className="text-lg text-gray-700 max-w-xl mx-auto mb-8">
            Learn Python, JavaScript, Web Design & AI. Start building real-world projects, level up your skills, and get certified.
          </p>
          <Link
            href="#courses"
            className="inline-block bg-black text-white px-6 py-3 rounded-xl font-semibold hover:bg-gray-900 transition"
            title="Browse Available Programming Courses"
          >
            Explore Courses
          </Link>
        </div>
      </section>

      {/* Courses Section */}
<section id="courses" className="px-6 py-20 bg-gradient-to-br from-white via-gray-50 to-white border-t border-gray-200">
  <div className="max-w-6xl mx-auto">
    <h2 className="text-4xl sm:text-5xl font-extrabold mb-16 text-center text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
      Our Courses
    </h2>
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">
      
      {/* Course Card */}
      <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 flex flex-col">
        <Image
          src="/last.webp"
          alt="30 Days Python Pack"
          width={600}
          height={400}
className="w-full h-[250px] object-contain bg-white"
        />
        <div className="flex flex-col justify-between p-6 flex-grow">
          <h3 className="text-2xl font-bold text-gray-800 mb-4 text-center">30 Days Python Pack</h3>
          <Link
            href="/30-days-of-python"
            className="mt-auto text-center inline-block bg-blue-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-blue-700 transition"
          >
            Learn More
          </Link>
        </div>
      </div>

      {/* Course Card */}
      <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 flex flex-col">
        <Image
          src="/main-image.webp"
          alt="30 Days JavaScript Pack"
          width={600}
          height={400}
className="w-full h-[250px] object-contain bg-white"
        />
        <div className="flex flex-col justify-between p-6 flex-grow">
          <h3 className="text-2xl font-bold text-gray-800 mb-4 text-center">30 Days JavaScript Pack</h3>
          <Link
            href="/30-days-of-javascript"
            className="mt-auto text-center inline-block bg-blue-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-blue-700 transition"
          >
            Learn More
          </Link>
        </div>
      </div>

    </div>
  </div>
</section>

      {/* Roadmap Section */}
      <section className="px-6 py-20 bg-gray-50 border-t border-gray-200">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-green-500 to-teal-500">
            Upcoming Courses
          </h2>
          <p className="text-gray-600 mb-6 max-w-3xl mx-auto">
            We're building high-quality programming courses including AI, Java, and backend development — filled with real-world projects, certification paths, and interview prep.
          </p>
          <p className="text-gray-400 text-sm italic">Stay tuned for updates 🚀</p>
        </div>
      </section>

{/* Why Choose Skill Foundry Section */}
<section className="px-6 py-20 bg-white border-t border-gray-200">
  <div className="max-w-6xl mx-auto text-center">
    <h2 className="text-4xl font-bold mb-8 text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-blue-600">
      Why Choose Skill Foundry?
    </h2>
    <p className="text-gray-600 max-w-3xl mx-auto mb-12">
      Our mission is to make world-class tech education accessible to everyone. Whether you're a beginner or an aspiring developer, we provide the tools and content to help you succeed.
    </p>
    <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-3 text-left">
      <div className="bg-gray-50 rounded-xl p-6 border border-gray-100 hover:shadow transition">
        <h3 className="text-lg font-semibold mb-2">Beginner-Friendly Learning</h3>
        <p className="text-sm text-gray-600">
          Our structured content is designed for absolute beginners with step-by-step guidance and practical tasks.
        </p>
      </div>
      <div className="bg-gray-50 rounded-xl p-6 border border-gray-100 hover:shadow transition">
        <h3 className="text-lg font-semibold mb-2">Real-World Projects</h3>
        <p className="text-sm text-gray-600">
          Build hands-on projects to boost your resume and practice coding in real environments.
        </p>
      </div>
      <div className="bg-gray-50 rounded-xl p-6 border border-gray-100 hover:shadow transition">
        <h3 className="text-lg font-semibold mb-2">Flexible & Self-Paced</h3>
        <p className="text-sm text-gray-600">
          Learn anytime, anywhere — at your own pace. No deadlines, lifetime access.
        </p>
      </div>
      <div className="bg-gray-50 rounded-xl p-6 border border-gray-100 hover:shadow transition">
        <h3 className="text-lg font-semibold mb-2">Expert-Curated Curriculum</h3>
        <p className="text-sm text-gray-600">
          Each course is crafted by industry professionals with real-world experience in software development.
        </p>
      </div>
      <div className="bg-gray-50 rounded-xl p-6 border border-gray-100 hover:shadow transition">
        <h3 className="text-lg font-semibold mb-2">Affordable Learning</h3>
        <p className="text-sm text-gray-600">
          Get high-quality education without breaking the bank. Ideal for students, freelancers, and upskillers.
        </p>
      </div>
      <div className="bg-gray-50 rounded-xl p-6 border border-gray-100 hover:shadow transition">
        <h3 className="text-lg font-semibold mb-2">Community Support</h3>
        <p className="text-sm text-gray-600">
          Join a growing learner community, ask questions, share projects, and stay motivated together.
        </p>
      </div>
    </div>
  </div>
</section>

{/* Testimonials Section */}
<section className="px-6 py-20 bg-gray-50 border-t border-gray-200">
  <div className="max-w-6xl mx-auto text-center">
    <h2 className="text-4xl font-bold mb-8 text-transparent bg-clip-text bg-gradient-to-r from-pink-600 to-purple-600">
      What Learners Say About Us
    </h2>
    <p className="text-gray-600 max-w-3xl mx-auto mb-12">
      Thousands of learners have transformed their careers with Skill Foundry’s practical approach. Here’s what some of them had to say:
    </p>
    <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-3">
      <div className="bg-white p-6 rounded-xl shadow border border-gray-100 text-left">
        <p className="text-gray-700 italic mb-4">
          “The Python pack was a total game-changer for me. I went from zero to building full apps in weeks!”
        </p>
        <p className="text-sm font-semibold text-gray-800">— Rohan P., B.Tech Student</p>
      </div>
      <div className="bg-white p-6 rounded-xl shadow border border-gray-100 text-left">
        <p className="text-gray-700 italic mb-4">
          “Very clean content. The way topics are explained makes complex concepts simple. Totally worth it.”
        </p>
        <p className="text-sm font-semibold text-gray-800">— Aisha M., Aspiring Developer</p>
      </div>
      <div className="bg-white p-6 rounded-xl shadow border border-gray-100 text-left">
        <p className="text-gray-700 italic mb-4">
          “These courses made me confident enough to apply for internships. The projects are super useful.”
        </p>
        <p className="text-sm font-semibold text-gray-800">— Dev K., Computer Science Undergrad</p>
      </div>
    </div>
  </div>
</section>

{/* Career Growth Section */}
<section className="px-6 py-20 bg-white border-t border-gray-200">
  <div className="max-w-6xl mx-auto text-center">
    <h2 className="text-4xl font-bold mb-8 text-transparent bg-clip-text bg-gradient-to-r from-blue-700 to-indigo-600">
      Your Career, Supercharged with Skill Foundry
    </h2>
    <p className="text-gray-600 max-w-3xl mx-auto mb-12">
      Whether you're aiming for your first tech job, freelance gigs, or your own startup — Skill Foundry prepares you with real skills and industry insights.
    </p>
    <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-3 text-left">
      <div className="bg-gray-50 p-6 rounded-xl border border-gray-100 shadow-sm">
        <h3 className="text-lg font-semibold mb-2 text-blue-600">💼 Job Ready Skills</h3>
        <p className="text-sm text-gray-700">
          Learn exactly what recruiters expect — from clean code to version control and deployment fundamentals.
        </p>
      </div>
      <div className="bg-gray-50 p-6 rounded-xl border border-gray-100 shadow-sm">
        <h3 className="text-lg font-semibold mb-2 text-blue-600">📈 Portfolio-Worthy Projects</h3>
        <p className="text-sm text-gray-700">
          Build apps that you can actually showcase during interviews and in your GitHub portfolio.
        </p>
      </div>
      <div className="bg-gray-50 p-6 rounded-xl border border-gray-100 shadow-sm">
        <h3 className="text-lg font-semibold mb-2 text-blue-600">🌐 Freelancing Foundation</h3>
        <p className="text-sm text-gray-700">
          Learn how to work independently, communicate with clients, and manage small software projects.
        </p>
      </div>
      <div className="bg-gray-50 p-6 rounded-xl border border-gray-100 shadow-sm">
        <h3 className="text-lg font-semibold mb-2 text-blue-600">🎓 Resume & Interview Help</h3>
        <p className="text-sm text-gray-700">
          Get tips on optimizing your resume and preparing for technical interviews in Python, JavaScript, and more.
        </p>
      </div>
      <div className="bg-gray-50 p-6 rounded-xl border border-gray-100 shadow-sm">
        <h3 className="text-lg font-semibold mb-2 text-blue-600">🔗 Git & GitHub Mastery</h3>
        <p className="text-sm text-gray-700">
          Version control made simple — understand Git, branches, pull requests, and contributions.
        </p>
      </div>
      <div className="bg-gray-50 p-6 rounded-xl border border-gray-100 shadow-sm">
        <h3 className="text-lg font-semibold mb-2 text-blue-600">💬 Community Networking</h3>
        <p className="text-sm text-gray-700">
          Collaborate, participate in challenges, and grow with a supportive tech community.
        </p>
      </div>
    </div>
  </div>
</section>

{/* Target Audience Section */}
<section className="px-6 py-20 bg-gray-50 border-t border-gray-200">
  <div className="max-w-6xl mx-auto text-center">
    <h2 className="text-4xl font-bold mb-8 text-transparent bg-clip-text bg-gradient-to-r from-purple-700 to-pink-600">
      Who Our Courses Are For
    </h2>
    <p className="text-gray-600 max-w-3xl mx-auto mb-12">
      No matter where you are in your learning journey, Skill Foundry meets you there. Our platform is built to help all types of learners level up.
    </p>
    <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-3 text-left">
      <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
        <h3 className="text-lg font-semibold mb-2 text-purple-600">🧑‍💻 Coding Beginners</h3>
        <p className="text-sm text-gray-700">
          Start from scratch with no prior coding experience. We guide you step-by-step through real-world projects.
        </p>
      </div>
      <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
        <h3 className="text-lg font-semibold mb-2 text-purple-600">🎓 Students & Freshers</h3>
        <p className="text-sm text-gray-700">
          Build hands-on skills beyond college syllabus to stand out in internships, jobs, or hackathons.
        </p>
      </div>
      <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
        <h3 className="text-lg font-semibold mb-2 text-purple-600">🧠 Self-Learners</h3>
        <p className="text-sm text-gray-700">
          Learn at your own pace with structured content, practice challenges, and community support.
        </p>
      </div>
      <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
        <h3 className="text-lg font-semibold mb-2 text-purple-600">🔁 Career Switchers</h3>
        <p className="text-sm text-gray-700">
          Transitioning to tech? Our beginner-friendly paths and mentorship tools make the switch smoother.
        </p>
      </div>
      <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
        <h3 className="text-lg font-semibold mb-2 text-purple-600">👩‍🏫 Teachers & Mentors</h3>
        <p className="text-sm text-gray-700">
          Use our courses as classroom-ready modules for teaching coding with clarity and depth.
        </p>
      </div>
      <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
        <h3 className="text-lg font-semibold mb-2 text-purple-600">🌐 Freelancers & Side-Hustlers</h3>
        <p className="text-sm text-gray-700">
          Learn practical web and app development skills to build client projects or digital products.
        </p>
      </div>
    </div>
  </div>
</section>

{/* Trusted By Section */}
<section className="px-6 py-20 bg-white border-t border-gray-200">
  <div className="max-w-6xl mx-auto text-center">
    <h2 className="text-4xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-yellow-600 to-orange-600">
      Trusted by Thousands of Learners
    </h2>
    <p className="text-gray-600 mb-12 max-w-3xl mx-auto">
      Developers from all across India and beyond are leveling up with Skill Foundry. We’ve helped 10,000+ learners gain real skills in Python, JavaScript, and more.
    </p>
    <div className="flex flex-wrap justify-center items-center gap-8 opacity-80">
      <Image src="/trusted/google.svg" alt="Google" width={120} height={60} />
      <Image src="/trusted/meta.svg" alt="Meta" width={120} height={60} />
      <Image src="/trusted/microsoft.svg" alt="Microsoft" width={120} height={60} />
      <Image src="/trusted/github.svg" alt="GitHub" width={120} height={60} />
      <Image src="/trusted/ibm.svg" alt="IBM" width={120} height={60} />
    </div>
    {/* <p className="text-xs text-gray-400 mt-4">* Logos are for illustrative purposes. Replace with real affiliations if available.</p> */}
  </div>
</section>

{/* Why Choose Us Section */}
<section className="px-6 py-20 bg-gray-50 border-t border-gray-200">
  <div className="max-w-6xl mx-auto text-center">
    <h2 className="text-4xl font-bold mb-8 text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-fuchsia-600">
      Why Choose Skill Foundry?
    </h2>
    <p className="text-gray-600 max-w-3xl mx-auto mb-12">
      We’re more than just another course platform. Our goal is to make your journey to becoming a developer clear, enjoyable, and result-driven.
    </p>
    <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-3 text-left">
      <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
        <h3 className="text-lg font-semibold mb-2 text-indigo-600">🧭 Structured Roadmaps</h3>
        <p className="text-sm text-gray-700">
          Follow easy-to-understand learning paths designed for beginners, intermediates, and switchers.
        </p>
      </div>
      <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
        <h3 className="text-lg font-semibold mb-2 text-indigo-600">🎯 Real-World Projects</h3>
        <p className="text-sm text-gray-700">
          Apply what you learn by building apps, tools, and scripts you'll actually use.
        </p>
      </div>
      <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
        <h3 className="text-lg font-semibold mb-2 text-indigo-600">🛠 Skill-Based Learning</h3>
        <p className="text-sm text-gray-700">
          Courses built to strengthen problem-solving, logic, and technical thinking — not just theory.
        </p>
      </div>
      <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
        <h3 className="text-lg font-semibold mb-2 text-indigo-600">📚 Downloadable Resources</h3>
        <p className="text-sm text-gray-700">
          Keep lifetime access to all your learning material, notes, and code examples.
        </p>
      </div>
      <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
        <h3 className="text-lg font-semibold mb-2 text-indigo-600">📞 Support When You Need It</h3>
        <p className="text-sm text-gray-700">
          Quick email and community support to help you stay on track and motivated.
        </p>
      </div>
      <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
        <h3 className="text-lg font-semibold mb-2 text-indigo-600">🏆 Certification & Proof of Learning</h3>
        <p className="text-sm text-gray-700">
          Earn certificates that matter and demonstrate your commitment to growth.
        </p>
      </div>
    </div>
  </div>
</section>


{/* FAQ Section */}
<section className="px-6 py-20 bg-white border-t border-gray-200">
  <div className="max-w-4xl mx-auto">
    <h2 className="text-4xl font-bold mb-10 text-center text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-blue-600">
      Frequently Asked Questions
    </h2>
    <div className="space-y-6">
      {/* FAQ Item */}
      <details className="group bg-gray-50 border border-gray-200 rounded-xl p-5 transition-all">
        <summary className="flex justify-between items-center cursor-pointer text-lg font-medium text-gray-800">
          Are your courses beginner-friendly?
          <span className="ml-2 transition-transform duration-300 group-open:rotate-180">▼</span>
        </summary>
        <p className="mt-4 text-gray-600 text-sm">
          Absolutely. All our courses are designed for complete beginners and progressively cover advanced concepts with clear explanations and real-world projects.
        </p>
      </details>

      <details className="group bg-gray-50 border border-gray-200 rounded-xl p-5 transition-all">
        <summary className="flex justify-between items-center cursor-pointer text-lg font-medium text-gray-800">
          Can I access the course content offline?
          <span className="ml-2 transition-transform duration-300 group-open:rotate-180">▼</span>
        </summary>
        <p className="mt-4 text-gray-600 text-sm">
          Yes. Once downloaded, all your course resources, notes, and exercises are available for lifetime offline use.
        </p>
      </details>

      <details className="group bg-gray-50 border border-gray-200 rounded-xl p-5 transition-all">
        <summary className="flex justify-between items-center cursor-pointer text-lg font-medium text-gray-800">
          How do I get help if I’m stuck?
          <span className="ml-2 transition-transform duration-300 group-open:rotate-180">▼</span>
        </summary>
        <p className="mt-4 text-gray-600 text-sm">
          You can always reach out via email or join our learner community to get your questions answered by peers and mentors.
        </p>
      </details>

      <details className="group bg-gray-50 border border-gray-200 rounded-xl p-5 transition-all">
        <summary className="flex justify-between items-center cursor-pointer text-lg font-medium text-gray-800">
          Do you offer refund or trial options?
          <span className="ml-2 transition-transform duration-300 group-open:rotate-180">▼</span>
        </summary>
        <p className="mt-4 text-gray-600 text-sm">
          We don’t currently offer trials, but if you're genuinely unhappy with a purchase, contact us within 7 days and we’ll make it right.
        </p>
      </details>
    </div>
  </div>
</section>

{/* Testimonials Section */}
<section className="px-6 py-20 bg-gray-50 border-t border-gray-200">
  <div className="max-w-6xl mx-auto text-center">
    <h2 className="text-4xl font-bold mb-10 text-transparent bg-clip-text bg-gradient-to-r from-yellow-500 to-pink-500">
      What Learners Are Saying
    </h2>
    <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-3">
      {/* Testimonial Card */}
      <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow">
        <p className="text-sm text-gray-700 italic mb-4">
          “Skill Foundry’s course helped me finally understand Python. The roadmap was clear and easy to follow!”
        </p>
        <div className="text-left">
          <p className="font-semibold text-gray-900">Amit P.</p>
          <p className="text-xs text-gray-500">Student, Mumbai</p>
        </div>
      </div>

      <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow">
        <p className="text-sm text-gray-700 italic mb-4">
          “As a working professional, I needed bite-sized learning I could do on the go. This was perfect.”
        </p>
        <div className="text-left">
          <p className="font-semibold text-gray-900">Nikita R.</p>
          <p className="text-xs text-gray-500">Frontend Developer, Bangalore</p>
        </div>
      </div>

      <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow">
        <p className="text-sm text-gray-700 italic mb-4">
          “After completing the JavaScript track, I built my own portfolio website. The projects were game-changers.”
        </p>
        <div className="text-left">
          <p className="font-semibold text-gray-900">Vikas M.</p>
          <p className="text-xs text-gray-500">BCA Student, Delhi</p>
        </div>
      </div>
    </div>
  </div>
</section>

{/* CTA Section */}
<section className="px-6 py-20 bg-gradient-to-br from-blue-50 to-purple-100 border-t border-gray-200">
  <div className="max-w-4xl mx-auto text-center">
    <h2 className="text-4xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-blue-700 to-purple-700">
      Ready to Start Learning?
    </h2>
    <p className="text-gray-700 mb-8 max-w-xl mx-auto">
      Join thousands of learners upgrading their tech skills with Skill Foundry. Start your journey today — practical, flexible, and beginner-friendly.
    </p>
    <Link
      href="#courses"
      className="inline-block bg-blue-700 text-white px-8 py-3 rounded-xl font-semibold hover:bg-blue-800 transition"
    >
      Explore All Courses
    </Link>
  </div>
</section>

      {/* Footer */}
      <LandingFooter />
    </main>
  );
}

  const courseSchema = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  "name": "Skill Foundry Course List",
  "url": "https://skill-foundry.in",
  "itemListElement": [
    {
      "@type": "Course",
      "name": "30 Days Python Pack",
      "description": "Master Python step by step with practical examples, perfect for beginners and developers.",
      "provider": {
        "@type": "Organization",
        "name": "Skill Foundry",
        "sameAs": "https://skill-foundry.in"
      }
    },
    {
      "@type": "Course",
      "name": "30 Days JavaScript Pack",
      "description": "Learn JavaScript fundamentals with 30 days of structured content and projects.",
      "provider": {
        "@type": "Organization",
        "name": "Skill Foundry",
        "sameAs": "https://skill-foundry.in"
      }
    }
  ]
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "Are your courses beginner-friendly?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes, our courses are structured to be beginner-friendly with step-by-step guidance and real projects."
      }
    },
    {
      "@type": "Question",
      "name": "Will I get a certificate after completing a course?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes, learners receive a digital certificate upon successful course completion."
      }
    },
    {
      "@type": "Question",
      "name": "Do I need any prior experience to start?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "No, our courses start from scratch and are perfect for people with zero coding experience."
      }
    }
  ]
};

const orgSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "Skill Foundry",
  "url": "https://skill-foundry.in",
  "logo": "https://skill-foundry.in/logo.jpg",
  "sameAs": [
    "https://www.facebook.com/company/skillfoundry24"
  ]
};


export default Home;
