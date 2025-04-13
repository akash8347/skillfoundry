import React from 'react'

const WhoCanTakeThisCourse = () => {
  return (
    <>
     
      <section className="p-6 lg:m-6 ">
        <h2 className="text-2xl font-bold text-center mb-6">Who Can Take This Course?</h2>

        <div className="grid md:grid-cols-2 gap-5 md:px-48 md:gap-8">
          {/* Students Section */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-3">🎓 Students</h3>
            <p className="text-gray-700">
              Are you new to programming? This course is designed for absolute beginners
              who want to start their journey in web development. You'll learn step-by-step
              with hands-on projects and practical examples.
            </p>
            <ul className="mt-3 list-disc pl-5 text-gray-600">
              <li>No prior experience needed</li>
              <li>Perfect for school & college students</li>
              <li>Interactive learning with real-world examples</li>
            </ul>
          </div>

          {/* Professionals Section */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-3">💼 Working Professionals</h3>
            <p className="text-gray-700">
              Looking to switch careers or level up your skills? This course helps professionals
              master web development efficiently, with a structured learning path that fits into
              a busy schedule.
            </p>
            <ul className="mt-3 list-disc pl-5 text-gray-600">
              <li>Upgrade your skillset</li>
              <li>Boost your career in tech</li>
              <li>Work on real-world projects</li>
            </ul>
          </div>
        </div>
      </section>
    
    </>
  )
}

export default WhoCanTakeThisCourse