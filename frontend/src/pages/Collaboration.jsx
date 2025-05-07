import Navbar from "../components/Navbar"
import Footer from "../components/Footer"

export default function Collaboration() {
  return (
    <>
      <Navbar/>
      <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4 sm:p-6 md:p-8">
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-4 sm:mb-6">
              Collaboration
            </h1>
            <div className="space-y-4 sm:space-y-6">
              {/* Collaboration content will go here */}
              <p className="text-gray-600 dark:text-gray-300 text-base sm:text-lg">
                Collaboration features coming soon...
              </p>
            </div>
          </div>
        </div>
      </div>
      <Footer/>
    </>
  )
}