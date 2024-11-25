import { Link } from 'react-router-dom';
import { FaTasks, FaLayerGroup, FaChartLine } from 'react-icons/fa';
import {
  Twitter,
  Github,
  Mail,
  Phone,
  MapPin,
} from "lucide-react";
import Illus from '../assets/hedImg.png'
import Bout from '../assets/about.png'

export function Home() {
  return (
   <>
    <div className=" bg-gradient-to-b from-indigo-50 to-white">
   
   <div className="py-8 bg-blue-200">
     <div className="max-w-6xl mx-auto min-h-[70vh] flex flex-col md:flex-row items-center px-4 md:px-8">
       {/* Hero Content */}
       <div className="w-full md:w-1/2 text-center md:text-left mb-8 md:mb-0">
         <h1 className="text-3xl md:text-4xl font-bold text-blue-600 capitalize mb-2">
           Increase your productivity with the best task management software
         </h1>
         <p className="text-lg text-gray-600 mb-6">
           Streamline your workflow, prioritize with ease, and achieve more
           every day with{' '}
           <strong className="text-blue-600 underline">Task Master</strong>.
         </p>
         <Link to="">
           <button className="px-6 py-3 text-white bg-blue-600 rounded-full hover:bg-blue-800 transition-colors">
             Get Started
           </button>
         </Link>
       </div>

       {/* Hero Image */}
       <div className="w-full md:w-1/2 flex justify-center">
         <img
           src={Illus}
           alt="Task management illustration"
           className="max-w-full h-auto"
         />
       </div>
     </div>
   </div>

   </div>
   <section className="py-12" id="features">
   <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
     {/* Feature 1 */}
     <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl hover:-translate-y-1 transform transition-all duration-300">
       <FaTasks className="text-4xl text-blue-300 mb-4" />
       <h3 className="text-xl font-semibold text-blue-900 mb-2">Organized Task Management</h3>
       <p className="text-gray-600">Easily organize and track your tasks to stay on top of your goals.</p>
     </div>

     {/* Feature 2 */}
     <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl hover:-translate-y-1 transform transition-all duration-300">
       <FaLayerGroup className="text-4xl text-blue-300 mb-4" />
       <h3 className="text-xl font-semibold text-blue-900 mb-2">Prioritization Tools</h3>
       <p className="text-gray-600">Focus on what matters most with our smart prioritization features.</p>
     </div>

     {/* Feature 3 */}
     <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl hover:-translate-y-1 transform transition-all duration-300">
       <FaChartLine className="text-4xl text-blue-300 mb-4" />
       <h3 className="text-xl font-semibold text-blue-900 mb-2">Insightful Analytics</h3>
       <p className="text-gray-600">Monitor your productivity and improve over time with detailed insights.</p>
     </div>
   </div>
 </section>

 <section id="about-us" className="py-12  shadow-md">
      <div className="flex flex-wrap items-center justify-between max-w-6xl mx-auto">
        {/* Image */}
        <img
          src={Bout}
          alt="TaskMaster"
          className="w-full md:w-1/2 max-w-md rounded-lg shadow-lg mb-8 md:mb-0"
        />

        {/* Text */}
        <div className="w-full md:w-1/2 px-4">
          <h2 className="text-3xl font-bold text-blue-600 mb-4">About Us</h2>
          <h5 className="text-xl font-semibold text-blue-300 mb-4">TaskMaster</h5>
          <p className="text-gray-600 leading-relaxed">
            At TaskMaster, we believe in empowering individuals and teams to achieve their goals
            efficiently. Our mission is to provide innovative tools that help you stay organized,
            prioritize tasks, and collaborate seamlessly. Whether you’re managing daily to-dos or
            large projects, TaskMaster is your trusted companion for maximizing productivity and
            reaching success with confidence.
          </p>
        </div>
      </div>
    </section>
    <section id="contact-us" className="bg-gray-100 py-8">
      <div className="flex flex-wrap gap-8 justify-between items-start max-w-6xl mx-auto px-4">
        {/* Contact Info */}
        <div className="flex-1 min-w-[300px]">
          <h2 className="text-2xl font-bold text-blue-600 mb-4">Contact Us</h2>
          <p className="text-gray-700 mb-4">
            Have questions or need support? We’d love to hear from you! Reach
            out to us, and we’ll get back to you as soon as possible.
          </p>
          <ul className="space-y-3">
            <li className="flex items-center">
            <Twitter size={20} color="#007bff" className=' mr-2' />
              usman_alfaki
            </li>
            <li className="flex items-center">
            <Github size={20} color="#007bff" className=' mr-2'  />
              ussyalfaks
            </li>
            <li className="flex items-center">
            <Mail size={20} color="#007bff" className=' mr-2'  />
              support@taskmaster.com
            </li>
            <li className="flex items-center">
            <Phone size={20} color="#007bff" className=' mr-2'  />
              +234 8166280639
            </li>
            <li className="flex items-center">
            <MapPin size={20} color="#007bff" className=' mr-2' /> 
              123 TaskMaster Lane, Productivity City
            </li>
          </ul>
        </div>

        {/* Contact Form */}
        <form className="flex-1 min-w-[300px] flex flex-col gap-4">
          <input
            type="text"
            placeholder="Your Name"
            required
            className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-600"
          />
          <input
            type="email"
            placeholder="Your Email"
            required
            className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-600"
          />
          <textarea
            placeholder="Your Message"
            rows="5"
            required
            className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-600"
          ></textarea>
          <button
            type="submit"
            className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 w-1/3"
          >
            Send
          </button>
        </form>
      </div>
    </section>
    <footer className="bg-blue-100 py-8 font-sans">
      <div className="flex flex-wrap justify-between gap-6 max-w-6xl mx-auto px-4">
        {/* Footer About */}
        <div className="flex-1 max-w-[300px]">
          <h3 className="text-lg font-bold text-blue-600 mb-2">TaskMaster</h3>
          <p className="text-gray-700">
            TaskMaster helps you stay organized, prioritize effectively, and
            collaborate seamlessly. Maximize your productivity with ease.
          </p>
        </div>

        {/* Footer Links */}
        <div className="flex-1">
          <h4 className="text-md font-bold text-gray-900 mb-3">Quick Links</h4>
          <ul className="space-y-2">
            <li>
              <a href="#features" className="text-gray-700 hover:text-blue-600">
                Features
              </a>
            </li>
            <li>
              <a href="#pricing" className="text-gray-700 hover:text-blue-600">
                Pricing
              </a>
            </li>
            <li>
              <a href="#about" className="text-gray-700 hover:text-blue-600">
                About Us
              </a>
            </li>
            <li>
              <a href="#contact" className="text-gray-700 hover:text-blue-600">
                Contact Us
              </a>
            </li>
          </ul>
        </div>

        {/* Footer Social */}
        <div className="flex-1">
          <h4 className="text-md font-bold text-gray-900 mb-3">Follow Us</h4>
          <div className="flex space-x-4">
            <a
              href="https://github.com/ussyalfaks"
              target="_blank"
              aria-label="GitHub"
              className="text-gray-700 text-xl hover:text-blue-600"
            >
              <i className="fab fa-github"></i>
            </a>
            <a
              href="https://twitter.com/usman_alfaki"
              target="_blank"
              aria-label="Twitter"
              className="text-gray-700 text-xl hover:text-blue-600"
            >
              <i className="fab fa-twitter"></i>
            </a>
            <a
              href="https://facebook.com"
              target="_blank"
              aria-label="Facebook"
              className="text-gray-700 text-xl hover:text-blue-600"
            >
              <i className="fab fa-facebook"></i>
            </a>
            <a
              href="https://www.linkedin.com/in/usman-abdulkadir-079344299/"
              target="_blank"
              aria-label="LinkedIn"
              className="text-gray-700 text-xl hover:text-blue-600"
            >
              <i className="fab fa-linkedin"></i>
            </a>
          </div>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="text-center mt-8 border-t border-gray-600 pt-4 text-sm">
        <p>&copy; 2024 TaskMaster. All Rights Reserved.</p>
      </div>
    </footer>
   </>
  );
}