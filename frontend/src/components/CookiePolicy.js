import React from 'react';
import { Helmet } from 'react-helmet'; // For SEO4
import '../styles/CookiePolicy.css';

const CookiePolicy = () => {
  return (
    <div className="bg-gray-50 min-h-screen">
      <Helmet>
        <title>Cookie Policy | Matrimony Connect</title>
        <meta name="description" content="Learn about how Matrimony Connect uses cookies to improve your experience." />
      </Helmet>

      {/* Header Banner */}
      <div className="bg-gradient-to-r from-purple-800 to-rose-600 text-white py-12">
        <div className="container mx-auto px-6">
          <h1 className="text-3xl md:text-4xl font-bold mb-2">Cookie Policy</h1>
          <p className="text-lg opacity-90">Learn how we use cookies to improve your experience</p>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-6 py-12">
        <div className="bg-white rounded-lg shadow-md p-6 md:p-8 max-w-4xl mx-auto">
          <div className="prose lg:prose-lg max-w-none">
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">Introduction</h2>
              <p className="text-gray-600 mb-4">
                Matrimony Connect ("we," "our," or "us") uses cookies and similar technologies on our website. This Cookie Policy explains how we use cookies, how they help us provide you with a better experience, and your choices regarding cookies.
              </p>
              <p className="text-gray-600">
                By using our website, you consent to the use of cookies as described in this policy. This policy should be read alongside our Privacy Policy and Terms of Service.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">What Are Cookies?</h2>
              <p className="text-gray-600 mb-4">
                Cookies are small text files that are placed on your device when you visit a website. They are widely used to make websites work more efficiently and provide information to the website owners.
              </p>
              <p className="text-gray-600">
                Cookies can be "session cookies" or "persistent cookies." Session cookies are temporary and are deleted when you close your browser, while persistent cookies remain on your device until they expire or you delete them.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">How We Use Cookies</h2>
              <p className="text-gray-600 mb-4">
                We use cookies for various purposes, including:
              </p>
              <ul className="list-disc pl-6 text-gray-600 space-y-2">
                <li>
                  <strong>Essential Cookies:</strong> These cookies are necessary for the website to function properly. They enable core functions such as security, account management, and network management.
                </li>
                <li>
                  <strong>Performance Cookies:</strong> These cookies help us understand how visitors interact with our website by collecting and reporting information anonymously. This helps us improve our website's structure, content, and user experience.
                </li>
                <li>
                  <strong>Functionality Cookies:</strong> These cookies remember choices you make and provide enhanced, personalized features. For example, they may remember your language preferences or login information.
                </li>
                <li>
                  <strong>Targeting/Advertising Cookies:</strong> These cookies track your browsing habits and are used to show you relevant advertisements on other websites. They are usually placed by third-party advertising networks with our permission.
                </li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">Specific Cookies We Use</h2>
              <div className="overflow-x-auto">
                <table className="min-w-full border border-gray-300 mt-4">
                  <thead>
                    <tr className="bg-gray-100">
                      <th className="px-4 py-2 border">Name</th>
                      <th className="px-4 py-2 border">Purpose</th>
                      <th className="px-4 py-2 border">Duration</th>
                      <th className="px-4 py-2 border">Type</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="px-4 py-2 border">session_id</td>
                      <td className="px-4 py-2 border">Manages user sessions and security</td>
                      <td className="px-4 py-2 border">Session</td>
                      <td className="px-4 py-2 border">Essential</td>
                    </tr>
                    <tr className="bg-gray-50">
                      <td className="px-4 py-2 border">_ga, _gid</td>
                      <td className="px-4 py-2 border">Used by Google Analytics to distinguish users</td>
                      <td className="px-4 py-2 border">2 years, 24 hours</td>
                      <td className="px-4 py-2 border">Performance</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-2 border">user_preferences</td>
                      <td className="px-4 py-2 border">Stores user preferences such as language and display settings</td>
                      <td className="px-4 py-2 border">1 year</td>
                      <td className="px-4 py-2 border">Functionality</td>
                    </tr>
                    <tr className="bg-gray-50">
                      <td className="px-4 py-2 border">_fbp</td>
                      <td className="px-4 py-2 border">Used by Facebook to deliver advertisements</td>
                      <td className="px-4 py-2 border">3 months</td>
                      <td className="px-4 py-2 border">Advertising</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">Third-Party Cookies</h2>
              <p className="text-gray-600 mb-4">
                Some cookies are placed by third parties on our website. These include:
              </p>
              <ul className="list-disc pl-6 text-gray-600 space-y-2">
                <li><strong>Google Analytics:</strong> Web analytics service provided by Google.</li>
                <li><strong>Facebook Pixel:</strong> Used to measure the effectiveness of our advertising and understand user behaviors.</li>
                <li><strong>Payment Processors:</strong> To secure and process your transactions.</li>
              </ul>
              <p className="text-gray-600 mt-4">
                Third-party cookies are subject to the privacy policies of the respective third parties. We recommend reviewing these policies for more information.
              </p>
            </section>
            
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">Your Cookie Choices</h2>
              <p className="text-gray-600 mb-4">
                You have several options for managing cookies:
              </p>
              <ul className="list-disc pl-6 text-gray-600 space-y-2">
                <li>
                  <strong>Cookie Preferences:</strong> You can set your cookie preferences through our cookie banner when you first visit our site, or by using the "Cookie Settings" link in the footer of our website.
                </li>
                <li>
                  <strong>Browser Settings:</strong> Most web browsers allow you to manage cookies through their settings. You can usually find these settings in the "Options," "Preferences," or "Settings" menu of your browser.
                </li>
                <li>
                  <strong>Opt-Out Tools:</strong> You can opt out of third-party advertising cookies through tools provided by the Network Advertising Initiative or the Digital Advertising Alliance.
                </li>
              </ul>
              <p className="text-gray-600 mt-4 italic">
                Please note that blocking or deleting cookies may affect your experience on our website, and some features may not function properly.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">Cookie Consent</h2>
              <p className="text-gray-600">
                When you first visit our website, you will be shown a cookie banner asking for your consent to place non-essential cookies on your device. You can change your preferences at any time by clicking on the "Cookie Settings" link in the footer of our website.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">Changes to This Policy</h2>
              <p className="text-gray-600 mb-4">
                We may update this Cookie Policy from time to time to reflect changes in technology, regulation, or our business practices. Any changes will be posted on this page, and if the changes are significant, we will provide a more prominent notice.
              </p>
              <p className="text-gray-600">
                This Cookie Policy was last updated on March 9, 2025.
              </p>
            </section>

            <section className="mt-12 pt-8 border-t border-gray-200">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">Contact Us</h2>
              <p className="text-gray-600 mb-4">
                If you have any questions about our Cookie Policy, please contact us:
              </p>
              <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 text-gray-700">
                <p><strong>Email:</strong> sarang2452@gmail.com</p>
                <p><strong>Address:</strong> 123 Wedding Lane, Suite 100, Love City, Indore</p>
                <p><strong>Phone:</strong> 7999862117</p>
              </div>
            </section>
          </div>
        </div>
        
        {/* Cookie Settings Button */}
        <div className="text-center mt-8">
          <button className="bg-purple-600 hover:bg-purple-700 text-white font-medium py-2 px-6 rounded-md transition duration-200">
            Manage Cookie Settings
          </button>
        </div>
      </div>
    </div>
  );
};

export default CookiePolicy;