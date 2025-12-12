import { TYPOGRAPHY } from "../../constants/designSystem";

export default function Privacy() {
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-sm p-8">
        <h1 className={`${TYPOGRAPHY.h1} mb-6`}>Privacy Policy</h1>
        <p className="text-gray-600 mb-8">
          <strong>Effective Date:</strong> December 4, 2025
        </p>

        <div className="space-y-6 text-gray-700">
          <section>
            <h2 className={`${TYPOGRAPHY.h3} mb-3`}>1. Introduction</h2>
            <p>
              Welcome to StudySphere ("we," "our," or "us"). We are committed to protecting your privacy and ensuring the security of your personal information. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our platform.
            </p>
          </section>

          <section>
            <h2 className={`${TYPOGRAPHY.h3} mb-3`}>2. Information We Collect</h2>
            <h3 className={`${TYPOGRAPHY.h4} mb-2 mt-4`}>2.1 Personal Information</h3>
            <p className="mb-3">When you create an account, we collect:</p>
            <ul className="list-disc list-inside space-y-1 ml-4">
              <li>Name and email address (via Google OAuth)</li>
              <li>Profile picture (if provided by Google)</li>
              <li>Account preferences and settings</li>
            </ul>

            <h3 className={`${TYPOGRAPHY.h4} mb-2 mt-4`}>2.2 Usage Data</h3>
            <p className="mb-3">We automatically collect information about your interactions with our platform:</p>
            <ul className="list-disc list-inside space-y-1 ml-4">
              <li>Videos watched and learning progress</li>
              <li>Playlists created and saved</li>
              <li>Quiz attempts and scores</li>
              <li>Study streaks and activity logs</li>
              <li>Device information and IP address</li>
            </ul>
          </section>

          <section>
            <h2 className={`${TYPOGRAPHY.h3} mb-3`}>3. How We Use Your Information</h2>
            <p className="mb-3">We use the collected information to:</p>
            <ul className="list-disc list-inside space-y-1 ml-4">
              <li>Provide and maintain our educational services</li>
              <li>Track your learning progress and generate insights</li>
              <li>Generate AI-powered summaries and quizzes</li>
              <li>Improve and personalize your learning experience</li>
              <li>Send important notifications about your account</li>
              <li>Analyze platform usage and improve our services</li>
            </ul>
          </section>

          <section>
            <h2 className={`${TYPOGRAPHY.h3} mb-3`}>4. Data Storage and Security</h2>
            <p>
              Your data is stored securely in MongoDB databases with industry-standard encryption. We implement appropriate security measures to protect against unauthorized access, alteration, disclosure, or destruction of your personal information.
            </p>
          </section>

          <section>
            <h2 className={`${TYPOGRAPHY.h3} mb-3`}>5. Third-Party Services</h2>
            <p className="mb-3">We use the following third-party services:</p>
            <ul className="list-disc list-inside space-y-1 ml-4">
              <li><strong>Google OAuth:</strong> For secure authentication</li>
              <li><strong>YouTube API:</strong> To fetch video content and transcripts</li>
              <li><strong>Google Gemini AI:</strong> To generate summaries and quizzes</li>
            </ul>
            <p className="mt-3">
              These services have their own privacy policies, and we encourage you to review them.
            </p>
          </section>

          <section>
            <h2 className={`${TYPOGRAPHY.h3} mb-3`}>6. Your Rights</h2>
            <p className="mb-3">You have the right to:</p>
            <ul className="list-disc list-inside space-y-1 ml-4">
              <li>Access and review your personal information</li>
              <li>Update or correct your information</li>
              <li>Delete your account and associated data</li>
              <li>Export your learning data</li>
              <li>Opt-out of non-essential communications</li>
            </ul>
          </section>

          <section>
            <h2 className={`${TYPOGRAPHY.h3} mb-3`}>7. Cookies and Tracking</h2>
            <p>
              We use cookies and similar tracking technologies to maintain your session, remember your preferences, and analyze platform usage. You can control cookie settings through your browser preferences.
            </p>
          </section>

          <section>
            <h2 className={`${TYPOGRAPHY.h3} mb-3`}>8. Children's Privacy</h2>
            <p>
              Our platform is not intended for users under the age of 13. We do not knowingly collect personal information from children. If you believe we have collected information from a child, please contact us immediately.
            </p>
          </section>

          <section>
            <h2 className={`${TYPOGRAPHY.h3} mb-3`}>9. Changes to This Policy</h2>
            <p>
              We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new policy on this page and updating the "Effective Date" at the top.
            </p>
          </section>

          <section>
            <h2 className={`${TYPOGRAPHY.h3} mb-3`}>10. Contact Us</h2>
            <p className="mb-3">
              If you have any questions about this Privacy Policy or your personal information, please contact us:
            </p>
            <ul className="space-y-1 ml-4">
              <li><strong>Email:</strong> support@studysphere.com</li>
              <li><strong>Contact Form:</strong> <a href="/contact" className="text-indigo-600 hover:text-indigo-700 underline">Contact Page</a></li>
            </ul>
          </section>
        </div>
      </div>
    </div>
  );
}
