import { FaCaretRight } from "react-icons/fa"


const WebPlains = () => {
  return (
    <div className="bg-linear-to-br from-gray-50 to-gray-100 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl shadow-xl p-8 mb-12">
            <h2 className="text-4xl md:text-5xl font-extrabold text-center bg-linear-to-r from-green-600 to-blue-600 bg-clip-text text-transparent mb-6">
                Web Plans
            </h2>
            <p className="text-gray-600 text-center text-lg mx-auto max-w-2xl">
                Lorem ipsum dolor, sit amet consectetur adipisicing elit. Optio eius placeat enim culpa, id iusto.
            </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 p-8">
                <h3 className="text-2xl font-bold text-gray-800 mb-4">
                    First Plan
                </h3>
                <ul className="space-y-3 mb-6">
                    <li className="flex items-center text-gray-600">
                        <FaCaretRight className="w-5 h-5 text-green-500 mr-2"/>
                        <span>Futre 1</span>
                    </li>
                         <li className="flex items-center text-gray-600">
                        <FaCaretRight className="w-5 h-5 text-green-500 mr-2"/>
                        <span>Futre 2</span>
                    </li>
                    <li className="flex items-center text-gray-600">
                        <FaCaretRight className="w-5 h-5 text-green-500 mr-2"/>
                        <span>Futre 3</span>
                    </li>
                </ul>
            </div>
                <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 p-8">
                <h3 className="text-2xl font-bold text-gray-800 mb-4">
                    Second Plan
                </h3>
                <ul className="space-y-3 mb-6">
                    <li className="flex items-center text-gray-600">
                        <FaCaretRight className="w-5 h-5 text-green-500 mr-2"/>
                        <span>Futre 1</span>
                    </li>
                         <li className="flex items-center text-gray-600">
                        <FaCaretRight className="w-5 h-5 text-green-500 mr-2"/>
                        <span>Futre 2</span>
                    </li>
                    <li className="flex items-center text-gray-600">
                        <FaCaretRight className="w-5 h-5 text-green-500 mr-2"/>
                        <span>Futre 3</span>
                    </li>
                </ul>
            </div>
                <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 p-8">
                <h3 className="text-2xl font-bold text-gray-800 mb-4">
                    Last Plan
                </h3>
                <ul className="space-y-3 mb-6">
                    <li className="flex items-center text-gray-600">
                        <FaCaretRight className="w-5 h-5 text-green-500 mr-2"/>
                        <span>Futre 1</span>
                    </li>
                    <li className="flex items-center text-gray-600">
                        <FaCaretRight className="w-5 h-5 text-green-500 mr-2"/>
                        <span>Futre 2</span>
                    </li>
                    <li className="flex items-center text-gray-600">
                        <FaCaretRight className="w-5 h-5 text-green-500 mr-2"/>
                        <span>Futre 3</span>
                    </li>
                </ul>
            </div>
        </div>
      </div>
    </div>
  )
}

export default WebPlains
