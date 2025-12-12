import { TYPOGRAPHY } from "../../constants/designSystem";

export default function Terms() {
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-sm p-8">
        <h1 className={`${TYPOGRAPHY.h1} mb-6`}>Terms of Service</h1>
        <p className="text-gray-600 mb-8">
          <strong>Effective Date:</strong> December 4, 2025
        </p>

        <div className="space-y-6 text-gray-700">
          <section>
            <h2 className={`${TYPOGRAPHY.h3} mb-3`}>1. Acceptance of Terms</h2>
            <p>
              By accessing and using StudySphere ("the Platform"), you accept and agree to be bound by the terms and provisions of this agreement. If you do not agree to these Terms of Service, please do not use the Platform.
            </p>
          </section>

          <section>
            <h2 className={`${TYPOGRAPHY.h3} mb-3`}>2. Description of Service</h2>
            <p className="mb-3">
              StudySphere provides an AI-powered educational platform that enables users to:
            </p>
            <ul className="list-disc list-inside space-y-1 ml-4">
              <li>Access and organize YouTube video content for learning</li>
              <li>Generate AI-powered summaries and transcripts</li>
              <li>Take interactive quizzes based on video content</li>
              <li>Track learning progress and maintain study streaks</li>
              <li>Create and manage custom playlists</li>
            </ul>
          </section>

          <section>
            <h2 className={`${TYPOGRAPHY.h3} mb-3`}>3. User Accounts</h2>
            <h3 className={`${TYPOGRAPHY.h4} mb-2 mt-4`}>3.1 Account Creation</h3>
            <p className="mb-3">
              To use certain features of the Platform, you must create an account using Google OAuth. You agree to provide accurate and complete information during registration.
            </p>

            <h3 className={`${TYPOGRAPHY.h4} mb-2 mt-4`}>3.2 Account Security</h3>
            <p>
              You are responsible for maintaining the confidentiality of your account credentials. You agree to notify us immediately of any unauthorized access to your account.
            </p>
          </section>

          <section>
            <h2 className={`${TYPOGRAPHY.h3} mb-3`}>4. User Conduct</h2>
            <p className="mb-3">You agree NOT to:</p>
            <ul className="list-disc list-inside space-y-1 ml-4">
              <li>Use the Platform for any illegal or unauthorized purpose</li>
              <li>Attempt to gain unauthorized access to any portion of the Platform</li>
              <li>Interfere with or disrupt the Platform's functionality</li>
              <li>Upload or transmit viruses, malware, or harmful code</li>
              <li>Collect or harvest personal information of other users</li>
              <li>Impersonate any person or entity</li>
              <li>Share copyrighted content without permission</li>
              <li>Abuse or overload our AI services</li>
            </ul>
          </section>

          <section>
            <h2 className={`${TYPOGRAPHY.h3} mb-3`}>5. Intellectual Property</h2>
            <h3 className={`${TYPOGRAPHY.h4} mb-2 mt-4`}>5.1 Platform Content</h3>
            <p className="mb-3">
              The Platform and its original content, features, and functionality are owned by StudySphere and are protected by international copyright, trademark, and other intellectual property laws.
            </p>

            <h3 className={`${TYPOGRAPHY.h4} mb-2 mt-4`}>5.2 User Content</h3>
            <p className="mb-3">
              You retain ownership of content you create on the Platform (playlists, notes, etc.). By using the Platform, you grant us a license to use, display, and process this content to provide our services.
            </p>

            <h3 className={`${TYPOGRAPHY.h4} mb-2 mt-4`}>5.3 YouTube Content</h3>
            <p>
              All YouTube videos accessed through the Platform remain the property of their respective copyright holders. We do not claim ownership of any YouTube content.
            </p>
          </section>

          <section>
            <h2 className={`${TYPOGRAPHY.h3} mb-3`}>6. AI-Generated Content</h2>
            <p>
              Our Platform uses AI (Google Gemini) to generate summaries, transcripts, and quizzes. While we strive for accuracy, AI-generated content may contain errors or inaccuracies. You should verify important information independently.
            </p>
          </section>

          <section>
            <h2 className={`${TYPOGRAPHY.h3} mb-3`}>7. Third-Party Services</h2>
            <p className="mb-3">
              The Platform integrates with third-party services including:
            </p>
            <ul className="list-disc list-inside space-y-1 ml-4">
              <li>Google OAuth for authentication</li>
              <li>YouTube API for video content</li>
              <li>Google Gemini AI for content generation</li>
            </ul>
            <p className="mt-3">
              Your use of these services is subject to their respective terms and policies.
            </p>
          </section>

          <section>
            <h2 className={`${TYPOGRAPHY.h3} mb-3`}>8. Limitation of Liability</h2>
            <p>
              StudySphere and its affiliates shall not be liable for any indirect, incidental, special, consequential, or punitive damages resulting from your use of or inability to use the Platform.
            </p>
          </section>

          <section>
            <h2 className={`${TYPOGRAPHY.h3} mb-3`}>9. Service Availability</h2>
            <p>
              We do not guarantee that the Platform will be available at all times. We may experience hardware, software, or maintenance issues that result in service interruptions, delays, or errors.
            </p>
          </section>

          <section>
            <h2 className={`${TYPOGRAPHY.h3} mb-3`}>10. Termination</h2>
            <p>
              We reserve the right to suspend or terminate your account and access to the Platform at our sole discretion, without notice, for conduct that we believe violates these Terms or is harmful to other users, us, or third parties.
            </p>
          </section>

          <section>
            <h2 className={`${TYPOGRAPHY.h3} mb-3`}>11. Modifications to Terms</h2>
            <p>
              We reserve the right to modify these Terms at any time. We will notify users of any material changes by posting the updated Terms on this page. Your continued use of the Platform after such changes constitutes acceptance of the new Terms.
            </p>
          </section>

          <section>
            <h2 className={`${TYPOGRAPHY.h3} mb-3`}>12. Governing Law</h2>
            <p>
              These Terms shall be governed by and construed in accordance with applicable laws, without regard to conflict of law provisions.
            </p>
          </section>

          <section>
            <h2 className={`${TYPOGRAPHY.h3} mb-3`}>13. Contact Information</h2>
            <p className="mb-3">
              If you have any questions about these Terms of Service, please contact us:
            </p>
            <ul className="space-y-1 ml-4">
              <li><strong>Email:</strong> support@studysphere.com</li>
              <li><strong>Contact Form:</strong> <a href="/contact" className="text-indigo-600 hover:text-indigo-700 underline">Contact Page</a></li>
            </ul>
          </section>

          <section className="pt-4 border-t mt-8">
            <p className="text-sm text-gray-500">
              By using StudySphere, you acknowledge that you have read, understood, and agree to be bound by these Terms of Service.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
