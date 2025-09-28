'use client';

import { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import BookIndexModal from './BookIndexModal';
    import { FaEye } from 'react-icons/fa'; // import eye icon
export default function DataScience() {

    const [isModalOpen, setIsModalOpen] = useState(false);


const indexData = [
  ['01', 'Introduction to Data Science', [
    "What is Data Science?",
    "Applications of Data Science in real-world",
    "Data Science workflow: Collect → Clean → Analyze → Model → Deploy",
    "Role of Python in Data Science"
  ]],
  ['02', 'Setting Up the Python Environment', [
    "Installing Python & Jupyter Notebook",
    "Setting up Anaconda / virtual environments",
    "Installing essential libraries (NumPy, Pandas, Matplotlib, Scikit-learn)",
    "Using notebooks for interactive coding"
  ]],
  ['03', 'Python Programming Essentials for Data Science', [
    "Python basics (variables, functions, loops)",
    "Working with data structures (lists, dictionaries, sets)",
    "Numpy arrays and vectorized operations",
    "Pandas basics for handling tabular data"
  ]],
  ['04', 'Data Cleaning and Preprocessing', [
    "Handling missing values",
    "Dealing with duplicates",
    "Outlier detection and treatment",
    "Data normalization and standardization"
  ]],
  ['05', 'Exploratory Data Analysis (EDA)', [
    "Understanding your dataset",
    "Descriptive statistics (mean, median, variance)",
    "Visualizations with Matplotlib & Seaborn",
    "Finding patterns and relationships"
  ]],
  ['06', 'Feature Engineering', [
    "Feature extraction and transformation",
    "Encoding categorical variables",
    "Scaling numerical features",
    "Creating new features from existing data"
  ]],
  ['07', 'Model Evaluation and Validation', [
    "Train-test split",
    "Cross-validation techniques",
    "Avoiding overfitting & underfitting",
    "Bias-variance tradeoff"
  ]],
  ['08', 'Model Deployment and Pipelines', [
    "Introduction to pipelines",
    "Automating preprocessing + modeling",
    "Exporting models (Pickle/Joblib)",
    "Deployment basics (Flask/FastAPI, Streamlit)"
  ]],
  ['09', 'Model Evaluation and Metrics', [
    "Classification metrics (accuracy, precision, recall, F1-score)",
    "Regression metrics (MSE, RMSE, R²)",
    "ROC curve and AUC",
    "Confusion matrix interpretation"
  ]],
  ['10', 'Time Series Analysis', [
    "Introduction to time series data",
    "Resampling and frequency conversion",
    "Decomposition of time series (trend, seasonality)",
    "Forecasting basics with ARIMA"
  ]],
  ['11', 'Natural Language Processing (NLP) in Data Science', [
    "Text preprocessing (tokenization, stopwords, stemming)",
    "Vectorization (Bag of Words, TF-IDF)",
    "Sentiment analysis basics",
    "Applications of NLP in data science"
  ]],
  ['12', 'Advanced Time Series Analysis in Python', [
    "Stationarity and differencing",
    "Autocorrelation and PACF plots",
    "ARIMA, SARIMA, and Prophet models",
    "Practical forecasting examples"
  ]],
  ['13', 'Advanced NLP in Python', [
    "Word embeddings (Word2Vec, GloVe)",
    "Deep learning for NLP (RNN, LSTM)",
    "Transformers and BERT basics",
    "Real-world text classification"
  ]],
  ['14', 'Advanced Topics and Real-World Applications in Data Science', [
    "Ensemble methods (Random Forest, XGBoost)",
    "Unsupervised learning (clustering, PCA)",
    "Big data & cloud integration",
    "End-to-end case study project"
  ]],
];


  return (
    <section className="mt-12 bg-white rounded-2xl shadow-xl p-6 md:p-8 border">
      {/* Heading and Image */}
      <div className="flex flex-col items-center gap-6 text-center md:text-left">
        <h3 className="text-xl md:text-2xl font-semibold text-gray-800">
          📘 Data Science in Python
        </h3>
        <div className="w-full md:w-92 flex-shrink-0">
          <Image
            src="/polished/datascience-poli.webp"
            alt="Data Science with Python"
            width={300}
            height={400}
            className="w-[88%] mx-auto md:w-full h-auto"
          />
        </div>
        <div className="max-w-xl">
          <p className="text-gray-700 mt-2 mb-4">
            A complete guide to mastering Data Science using Python — covering everything from
            environment setup and EDA to advanced machine learning, NLP, and deployment workflows.
          </p>
          <ul className="list-disc ml-5 space-y-1 text-gray-700 text-sm text-left">
            <li>Master Python for real-world data science tasks</li>
            <li>Perform in-depth data cleaning and feature engineering</li>
            <li>Build, validate, and deploy machine learning models</li>
            <li>Dive into NLP, time series, and practical automation</li>
          </ul>
        </div>
      </div>

      {/* Toggle Button */}
       <div className="flex justify-center mt-6">
        <motion.button
          onClick={() => setIsModalOpen(true)}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.97 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-md bg-gradient-to-r from-teal-400 to-teal-500 text-white font-semibold shadow-md hover:from-teal-500 hover:to-teal-600 transition"
        >
View Book Content <FaEye className="w-4 h-4" />        </motion.button>
      </div>

    {/* Reusable Modal */}
         <BookIndexModal
           isOpen={isModalOpen}
           onClose={() => setIsModalOpen(false)}
           indexData={indexData}
           title="Data Science with Python"
         />
    </section>
  );
}
