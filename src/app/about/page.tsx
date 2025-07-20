import Link from 'next/link'
import Image from 'next/image'

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">About Caker Simple</h1>
          <p className="text-xl text-gray-600">AI-powered job and CV matching platform</p>
        </div>

        {/* Developer Profile */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
          <div className="flex flex-col lg:flex-row items-start gap-8">
            {/* Profile Image */}
            <div className="flex-shrink-0">
              <div className="w-48 h-48 rounded-full overflow-hidden shadow-lg">
                <Image
                  src="/profile-photo.jpg"
                  alt="Fauzi Fadhlurrohman"
                  width={192}
                  height={192}
                  className="w-full h-full object-cover"
                  priority
                />
              </div>
            </div>

            {/* Profile Info */}
            <div className="flex-1">
              <h2 className="text-3xl font-bold text-gray-900 mb-2">Fauzi Fadhlurrohman</h2>
              <p className="text-lg text-gray-600 mb-4">Full Stack Developer & Software Engineer</p>
              
              <div className="flex items-center gap-4 mb-6">
                <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
                  West Java, Indonesia
                </span>
                <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
                  2K+ followers
                </span>
                <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-purple-100 text-purple-800">
                  500+ connections
                </span>
              </div>

              <p className="text-gray-700 mb-6 leading-relaxed">
                As an experienced software developer with a strong background in full-stack and backend development, 
                I specialize in creating innovative solutions that bridge technology and user experience. 
                With expertise in modern web technologies and a passion for clean, efficient code, 
                I've contributed to various projects that demonstrate both technical excellence and creative problem-solving.
              </p>

              {/* LinkedIn Link */}
              <Link 
                href="https://www.linkedin.com/in/fauzi-fadhlurrohman/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors duration-200"
              >
                <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.338 16.338H13.67V12.16c0-.995-.017-2.277-1.387-2.277-1.39 0-1.601 1.086-1.601 2.207v4.248H8.014v-8.59h2.559v1.174h.037c.356-.675 1.227-1.387 2.526-1.387 2.703 0 3.203 1.778 3.203 4.092v4.711zM5.005 6.575a1.548 1.548 0 11-.003-3.096 1.548 1.548 0 01.003 3.096zm-1.337 9.763H6.34v-8.59H3.667v8.59zM17.668 1H2.328C1.595 1 1 1.581 1 2.298v15.403C1 18.418 1.595 19 2.328 19h15.34c.734 0 1.332-.582 1.332-1.299V2.298C19 1.581 18.402 1 17.668 1z" clipRule="evenodd" />
                </svg>
                View LinkedIn Profile
              </Link>
            </div>
          </div>
        </div>

        {/* Experience & Education */}
        <div className="grid md:grid-cols-2 gap-8 mb-8">
          {/* Experience */}
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Experience</h3>
            <div className="space-y-6">
              <div className="border-l-4 border-blue-500 pl-4">
                <h4 className="font-semibold text-gray-900">MEMBER.ID</h4>
                <p className="text-gray-600">Software Engineer</p>
                <p className="text-sm text-gray-500">Current</p>
              </div>
              <div className="border-l-4 border-green-500 pl-4">
                <h4 className="font-semibold text-gray-900">Previous Companies</h4>
                <p className="text-gray-600">Full Stack Developer</p>
                <p className="text-sm text-gray-500">2022 - 2024</p>
              </div>
            </div>
          </div>

          {/* Education */}
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Education</h3>
            <div className="space-y-6">
              <div className="border-l-4 border-purple-500 pl-4">
                <h4 className="font-semibold text-gray-900">BINUS University</h4>
                <p className="text-gray-600">Computer Science</p>
                <p className="text-sm text-gray-500">2017 - 2020</p>
              </div>
            </div>
          </div>
        </div>

        {/* Certifications */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
          <h3 className="text-2xl font-bold text-gray-900 mb-6">Certifications & Skills</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-blue-50 rounded-lg p-4">
              <h4 className="font-semibold text-gray-900 mb-2">Microsoft Technology Associate</h4>
              <p className="text-sm text-gray-600">Database Administration Fundamentals</p>
              <p className="text-xs text-gray-500 mt-1">Issued Feb 2020</p>
            </div>
            <div className="bg-green-50 rounded-lg p-4">
              <h4 className="font-semibold text-gray-900 mb-2">Back-End Developer Expert</h4>
              <p className="text-sm text-gray-600">Dicoding Indonesia</p>
              <p className="text-xs text-gray-500 mt-1">Issued Nov 2021</p>
            </div>
            <div className="bg-purple-50 rounded-lg p-4">
              <h4 className="font-semibold text-gray-900 mb-2">Front-End Web Developer Expert</h4>
              <p className="text-sm text-gray-600">Dicoding Indonesia</p>
              <p className="text-xs text-gray-500 mt-1">Issued Feb 2021</p>
            </div>
            <div className="bg-yellow-50 rounded-lg p-4">
              <h4 className="font-semibold text-gray-900 mb-2">Machine Learning</h4>
              <p className="text-sm text-gray-600">Belajar Machine Learning untuk Pemula</p>
              <p className="text-xs text-gray-500 mt-1">Issued Jan 2021</p>
            </div>
          </div>
        </div>

        {/* Project Description */}
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <h3 className="text-2xl font-bold text-gray-900 mb-6">About Caker Simple</h3>
          <div className="prose prose-lg max-w-none text-gray-700">
            <p className="mb-4">
              Caker Simple is an innovative AI-powered platform designed to revolutionize the job matching process. 
              Our mission is to bridge the gap between talented professionals and their ideal career opportunities 
              through intelligent, data-driven matching algorithms.
            </p>
            <p className="mb-4">
              Built with modern web technologies and cutting-edge AI, Caker Simple provides:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Advanced CV analysis and optimization</li>
              <li>Intelligent job matching based on skills and experience</li>
              <li>Real-time career insights and recommendations</li>
              <li>Seamless integration with popular job platforms</li>
              <li>Personalized career development guidance</li>
            </ul>
            <p className="mt-6">
              This platform represents the culmination of years of experience in software development, 
              user experience design, and artificial intelligence, all focused on creating meaningful 
              connections in the professional world.
            </p>
          </div>
        </div>

        {/* Back to Home */}
        <div className="text-center mt-12">
          <Link 
            href="/"
            className="inline-flex items-center px-6 py-3 bg-gray-800 text-white font-medium rounded-lg hover:bg-gray-900 transition-colors duration-200"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  )
} 