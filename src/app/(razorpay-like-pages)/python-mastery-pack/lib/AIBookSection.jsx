// 'use client';

// import { useState } from 'react';
// import { ChevronDown, ChevronUp } from 'lucide-react';
// import Image from 'next/image';
// import { motion, AnimatePresence } from 'framer-motion';

// export default function AIBookSection() {
//   const [showIndex, setShowIndex] = useState(false);

//   const indexData = [
//     ['01', 'Introduction'],
//     ['02', 'Setting Up AI Development Environment with Python'],
//     ['03', 'Understanding Machine Learning — The Heart of AI'],
//     ['04', 'Supervised Learning — Regression and Classification Models'],
//     ['05', 'Unsupervised Learning — Discovering Hidden Patterns'],
//     ['06', 'Neural Networks — Building Brains for AI'],
//     ['07', 'Project: Build a Neural Network to Classify Handwritten Digits'],
//     ['08', 'CNNs — Deep Learning for Image Classification'],
//     ['09', 'Advanced Image Classification — Transfer Learning'],
//     ['10', 'NLP Basics with Python'],
//     ['11', 'Spam Detection Using Machine Learning'],
//     ['12', 'Text Classification with Deep Learning (NLP)'],
//     ['13', 'Computer Vision & Image Classification Basics'],
//     ['14', 'AI for Automation: Files, Web, and Emails'],
//     ['15', 'AI Chatbots and Virtual Assistants'],
//   ];

//   return (
//     <section className="mt-12 bg-white rounded-2xl shadow-xl p-6 md:p-8 border">
//       {/* Heading and Image */}
//       <div className="flex flex-col items-center gap-4 text-center md:text-left">
//        <h3 className="text-xl md:text-2xl font-semibold text-gray-800">
//   🤖 Master <span className="text-indigo-600">AI</span> with Python
// </h3>

//         <div className="w-full md:w-92 flex-shrink-0">
//           <Image
//             src="/ai-python.webp"
//             alt="AI with Python"
//             width={300}
//             height={400}
//             className="w-[88%] mx-auto md:w-full h-auto"
//           />
//         </div>
//         <div className="max-w-xl">
//           <p className="text-gray-700 mt-2 mb-4">
//             This hands-on guide introduces you to core AI techniques using Python —
//             from <strong>machine learning</strong>, <strong>neural networks</strong>, and <strong>deep learning</strong> to 
//             <strong> NLP</strong>, <strong>computer vision</strong>, and real-world automation.
//           </p>
//           <ul className="list-disc ml-5 space-y-1 text-gray-700 text-sm text-left">
//             <li>Get started with AI concepts and Python-based ML workflows</li>
//             <li>Work on image recognition, spam detection & text classification</li>
//             <li>Build your own neural network project from scratch</li>
//             <li>Explore AI-powered automation: emails, web scraping, chatbots</li>
//           </ul>
//         </div>
//       </div>

//       {/* Toggle Button */}
//       <div className="flex justify-center mt-6">
//         <motion.button
//           onClick={() => setShowIndex(!showIndex)}
//           whileHover={{ scale: 1.05 }}
//           whileTap={{ scale: 0.97 }}
//           className="inline-flex items-center gap-2 px-4 py-2 rounded-md bg-gradient-to-r from-indigo-400 to-indigo-500 text-white font-semibold shadow-md hover:from-indigo-500 hover:to-indigo-600 transition"
//         >
//           {showIndex ? (
//             <>
//               Hide Book Content <ChevronUp className="w-4 h-4" />
//             </>
//           ) : (
//             <>
//               Show Content of Book <ChevronDown className="w-4 h-4" />
//             </>
//           )}
//         </motion.button>
//       </div>

//       {/* Index Table */}
//       <AnimatePresence>
//         {showIndex && (
//           <motion.div
//             initial={{ opacity: 0, height: 0 }}
//             animate={{ opacity: 1, height: 'auto' }}
//             exit={{ opacity: 0, height: 0 }}
//             transition={{ duration: 0.4 }}
//             className="overflow-hidden mt-4"
//           >
//             <div className="border rounded-lg overflow-hidden shadow-md">
//               <table className="w-full border-collapse">
//                 <thead>
//                   <tr className="bg-gray-800 text-white">
//                     <th className="p-3 border">#</th>
//                     <th className="p-3 border text-left">Topics</th>
//                   </tr>
//                 </thead>
//                 <tbody className="text-gray-900 bg-white">
//                   {indexData.map(([day, topic], i) => (
//                     <tr key={i} className="border-b hover:bg-gray-50">
//                       <td className="p-3 border text-center">{day}</td>
//                       <td className="p-3 border">{topic}</td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             </div>
//           </motion.div>
//         )}
//       </AnimatePresence>
//     </section>
//   );
// }



'use client';

import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import BookIndexModal from './BookIndexModal'; // import modal
 import { FaEye } from 'react-icons/fa'; // import eye icon

 
export default function AIBookSection() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const indexData = [
  ['01', 'Introduction', [
    "What is Artificial Intelligence (AI)?",
    "Applications of AI in real life",
    "AI vs Machine Learning vs Deep Learning",
    "How Python powers AI development"
  ]],
  ['02', 'Setting Up AI Development Environment with Python', [
    "Installing Python and pip",
    "Setting up Virtual Environments",
    "Installing essential libraries (NumPy, Pandas, Matplotlib)",
    "Installing ML/AI libraries (scikit-learn, TensorFlow, PyTorch)"
  ]],
  ['03', 'Understanding Machine Learning — The Heart of AI', [
    "What is Machine Learning?",
    "Types of learning (Supervised, Unsupervised, Reinforcement)",
    "Basic workflow of ML projects",
    "Real-world use cases of ML"
  ]],
  ['04', 'Supervised Learning — Regression and Classification Models', [
    "What is supervised learning?",
    "Regression models (Linear, Polynomial)",
    "Classification models (Logistic Regression, Decision Trees, KNN)",
    "Evaluating model accuracy"
  ]],
  ['05', 'Unsupervised Learning — Discovering Hidden Patterns', [
    "What is unsupervised learning?",
    "Clustering algorithms (K-Means, Hierarchical)",
    "Dimensionality reduction (PCA)",
    "Applications of unsupervised learning"
  ]],
  ['06', 'Neural Networks — Building Brains for AI', [
    "What is a neural network?",
    "Perceptrons and activation functions",
    "Forward and backward propagation",
    "Training a simple neural network"
  ]],
  ['07', 'Project: Build a Neural Network to Classify Handwritten Digits', [
    "Using MNIST dataset",
    "Preprocessing image data",
    "Building a simple neural network model",
    "Training, testing, and evaluating accuracy"
  ]],
  ['08', 'CNNs — Deep Learning for Image Classification', [
    "What are Convolutional Neural Networks?",
    "Convolution, pooling, and fully connected layers",
    "Building a CNN with Keras/TensorFlow",
    "Image classification examples"
  ]],
  ['09', 'Advanced Image Classification — Transfer Learning', [
    "What is transfer learning?",
    "Using pre-trained models (VGG, ResNet, MobileNet)",
    "Fine-tuning models for custom datasets",
    "Improving accuracy with transfer learning"
  ]],
  ['10', 'NLP Basics with Python', [
    "What is Natural Language Processing (NLP)?",
    "Text preprocessing (tokenization, stemming, lemmatization)",
    "Bag of Words and TF-IDF",
    "Introduction to NLP libraries (NLTK, spaCy)"
  ]],
  ['11', 'Spam Detection Using Machine Learning', [
    "Understanding spam vs ham datasets",
    "Feature extraction from text",
    "Training a classification model",
    "Evaluating accuracy with real-world examples"
  ]],
  ['12', 'Text Classification with Deep Learning (NLP)', [
    "Word embeddings (Word2Vec, GloVe, fastText)",
    "Using Recurrent Neural Networks (RNNs, LSTMs)",
    "Building a deep learning text classifier",
    "Case study: sentiment analysis"
  ]],
  ['13', 'Computer Vision & Image Classification Basics', [
    "What is computer vision?",
    "Image preprocessing and augmentation",
    "Basic image classification pipeline",
    "Real-world applications (face detection, object recognition)"
  ]],
  ['14', 'AI for Automation: Files, Web, and Emails', [
    "Using Python for file automation",
    "Web scraping and automated browsing",
    "Automating email sending and responses",
    "Real-world productivity automation with AI"
  ]],
  ['15', 'AI Chatbots and Virtual Assistants', [
    "What are chatbots and virtual assistants?",
    "Building a rule-based chatbot",
    "Using NLP for conversational AI",
    "Integrating chatbot into real-world applications"
  ]],
];


  return (
    <section className="mt-12 bg-white rounded-2xl shadow-xl p-6 md:p-8 border">
      {/* Heading and Image */}
      <div className="flex flex-col items-center gap-4 text-center md:text-left">
        <h3 className="text-xl md:text-2xl font-semibold text-gray-800">
          🤖 Master <span className="text-indigo-600">AI</span> with Python
        </h3>

        <div className="w-full md:w-92 flex-shrink-0">
          <Image
            src="/ai-python.webp"
            alt="AI with Python"
            width={300}
            height={400}
            className="w-[88%] mx-auto md:w-full h-auto"
          />
        </div>
        <div className="max-w-xl">
          <p className="text-gray-700 mt-2 mb-4">
            This hands-on guide introduces you to core AI techniques using Python — 
            from <strong>machine learning</strong>, <strong>neural networks</strong>, and 
            <strong> deep learning</strong> to <strong> NLP</strong>, <strong>computer vision</strong>, 
            and real-world automation.
          </p>
          <ul className="list-disc ml-5 space-y-1 text-gray-700 text-sm text-left">
            <li>Get started with AI concepts and Python-based ML workflows</li>
            <li>Work on image recognition, spam detection & text classification</li>
            <li>Build your own neural network project from scratch</li>
            <li>Explore AI-powered automation: emails, web scraping, chatbots</li>
          </ul>
        </div>
      </div>

      {/* Show Modal Button */}
      <div className="flex justify-center mt-6">
        <motion.button
          onClick={() => setIsModalOpen(true)}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.97 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-md bg-gradient-to-r from-indigo-400 to-indigo-500 text-white font-semibold shadow-md hover:from-indigo-500 hover:to-indigo-600 transition"
        >

View Book Content <FaEye className="w-4 h-4" />        </motion.button>
      </div>

      {/* Reusable Modal */}
      <BookIndexModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        indexData={indexData}
        title="AI with Python"
      />
    </section>
  );
}
