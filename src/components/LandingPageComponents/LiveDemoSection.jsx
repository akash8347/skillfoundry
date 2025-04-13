'use client';

export default function LiveDemoSection() {
  return (
    <section className="bg-white py-16 px-4">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
          Experience Live Coding in Action
        </h2>
        <p className="text-gray-700 text-lg mb-10 max-w-2xl mx-auto">
          Watch a live coding session in real time. This is how you'll learn — through hands-on practice, just like this.
        </p>
        <div className=" overflow-hidden shadow-xl border border-gray-500 max-w-4xl mx-auto">
          <video
            autoPlay
            muted
            loop
            playsInline
            className="w-full h-auto"
          >
            <source src="/vid-demo.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
      </div>
    </section>
  );
}
