import { Film } from 'lucide-react'
import { Link } from 'react-router-dom'

const Section = ({ title, children }) => (
  <div className="mb-8">
    <h2 className="text-white text-lg font-semibold mb-3">{title}</h2>
    <div className="text-gray-400 text-sm leading-relaxed space-y-2">{children}</div>
  </div>
)

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-brand-dark">
      {/* Header */}
      <div className="border-b border-gray-800 px-6 py-4 flex items-center gap-3">
        <Link to="/" className="flex items-center gap-2 text-brand-red font-bold text-lg tracking-widest uppercase">
          <Film size={20} />
          StreamApp
        </Link>
      </div>

      <div className="max-w-3xl mx-auto px-6 py-12">
        <h1 className="text-white text-3xl font-bold mb-2">Privacy Policy</h1>
        <p className="text-gray-500 text-sm mb-10">Last updated: July 24, 2026</p>

        <Section title="1. Overview">
          <p>
            StreamApp ("we", "our", or "us") is a personal video streaming application that allows
            users to access and stream their own video content from Google Photos. This Privacy
            Policy explains what information we collect, how we use it, and how we protect it.
          </p>
          <p>
            By using StreamApp, you agree to the collection and use of information in accordance
            with this policy.
          </p>
        </Section>

        <Section title="2. Information We Collect">
          <p>We collect the following information when you sign in with Google:</p>
          <ul className="list-disc list-inside space-y-1 mt-2 ml-2">
            <li>Your Google account name and email address</li>
            <li>Your Google account profile picture</li>
            <li>A unique Google account identifier (used to identify your account)</li>
            <li>OAuth access and refresh tokens (used to access your Google Photos on your behalf)</li>
          </ul>
          <p className="mt-2">
            We do <strong className="text-gray-300">not</strong> collect passwords, payment
            information, or any data beyond what is necessary to provide the service.
          </p>
        </Section>

        <Section title="3. Google Photos Access">
          <p>
            StreamApp requests read-only access to your Google Photos library
            (<code className="text-gray-300 bg-gray-800 px-1 rounded text-xs">photoslibrary.readonly</code> scope).
            This access is used solely to retrieve and display your personal video files within
            the app.
          </p>
          <ul className="list-disc list-inside space-y-1 mt-2 ml-2">
            <li>We only read your videos — we never upload, modify, or delete content</li>
            <li>Your media is streamed directly from Google's servers</li>
            <li>We do not store, copy, or cache your video content on our servers</li>
            <li>Access tokens are stored securely and used only to serve your requests</li>
          </ul>
        </Section>

        <Section title="4. How We Use Your Information">
          <p>The information we collect is used exclusively to:</p>
          <ul className="list-disc list-inside space-y-1 mt-2 ml-2">
            <li>Authenticate your identity via Google Sign-In</li>
            <li>Display your name, email, and profile picture within the app</li>
            <li>Fetch and stream videos from your Google Photos library</li>
            <li>Maintain your session so you remain signed in</li>
            <li>Save your watchlist and playback progress locally on your device</li>
          </ul>
          <p className="mt-2">
            We do <strong className="text-gray-300">not</strong> sell, rent, share, or disclose
            your personal information to any third parties for marketing or advertising purposes.
          </p>
        </Section>

        <Section title="5. Data Storage & Security">
          <p>
            Your profile information and OAuth tokens are stored in a secure database (MongoDB).
            Watchlist and playback progress are stored locally in your browser's localStorage and
            never sent to our servers.
          </p>
          <p>
            We implement industry-standard security measures including encrypted connections (HTTPS),
            JWT-based session tokens, and restricted database access to protect your data.
          </p>
          <p>
            OAuth tokens are never exposed to the frontend and are only used server-side to
            communicate with Google APIs on your behalf.
          </p>
        </Section>

        <Section title="6. Data Retention">
          <p>
            Your account data (name, email, profile picture, and tokens) is retained for as long
            as you use the application. You may request deletion of your data at any time by
            contacting us at the email below. Upon deletion, all your stored tokens and profile
            data will be permanently removed from our database.
          </p>
          <p>
            You can also revoke StreamApp's access to your Google account at any time by visiting{' '}
            <a
              href="https://myaccount.google.com/permissions"
              target="_blank"
              rel="noopener noreferrer"
              className="text-brand-red hover:underline"
            >
              Google Account Permissions
            </a>.
          </p>
        </Section>

        <Section title="7. Third-Party Services">
          <p>StreamApp integrates with the following Google services:</p>
          <ul className="list-disc list-inside space-y-1 mt-2 ml-2">
            <li>
              <strong className="text-gray-300">Google Sign-In</strong> — for authentication
            </li>
            <li>
              <strong className="text-gray-300">Google Photos Library API</strong> — for accessing
              your video library (read-only)
            </li>
          </ul>
          <p className="mt-2">
            Use of these services is governed by{' '}
            <a
              href="https://policies.google.com/privacy"
              target="_blank"
              rel="noopener noreferrer"
              className="text-brand-red hover:underline"
            >
              Google's Privacy Policy
            </a>.
          </p>
        </Section>

        <Section title="8. Children's Privacy">
          <p>
            StreamApp is not directed at children under the age of 13. We do not knowingly collect
            personal information from children. If you believe a child has provided us with personal
            information, please contact us and we will promptly delete it.
          </p>
        </Section>

        <Section title="9. Changes to This Policy">
          <p>
            We may update this Privacy Policy from time to time. Any changes will be posted on
            this page with an updated revision date. We encourage you to review this policy
            periodically.
          </p>
        </Section>

        <Section title="10. Contact Us">
          <p>
            If you have any questions about this Privacy Policy or wish to request deletion of
            your data, please contact us at:
          </p>
          <p className="mt-2">
            <strong className="text-gray-300">Email:</strong>{' '}
            <a href="mailto:saran.trs@gmail.com" className="text-brand-red hover:underline">
              saran[dot]trs[at]gmail[dot]com
            </a>
          </p>
        </Section>

        <div className="border-t border-gray-800 pt-8 text-gray-600 text-xs">
          <p>© 2026 StreamApp. All rights reserved.</p>
        </div>
      </div>
    </div>
  )
}
