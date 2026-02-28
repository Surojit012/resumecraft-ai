import { Shield, FileText, Settings, CreditCard } from 'lucide-react';

export const helpCategories = [
    {
        slug: 'getting-started',
        title: "Getting Started",
        icon: Shield,
        desc: "Account setup and basics",
        content: `
            <h2>1. Creating Your Account</h2>
            <p>Welcome to BuildMyResume! To get started, you'll need to create an account. Click the <strong>Login/Sign Up</strong> button in the top right corner of the homepage. We support secure authentication via email, Google, and GitHub.</p>
            <p>Once your account is created, you'll be directed to your personalized dashboard where you can manage your resumes.</p>

            <h2>2. Navigating the Dashboard</h2>
            <p>Your dashboard is your central hub. Here you can:</p>
            <ul>
                <li>View and edit your existing resumes.</li>
                <li>Create a new resume from scratch.</li>
                <li>Access our template library.</li>
                <li>Manage your account settings.</li>
            </ul>

            <h2>3. Security & Privacy</h2>
            <p>We take your data security seriously. Your personal information, work history, and generated documents are encrypted and stored securely. We never sell your personal data to third-party recruiters without your explicit permission.</p>
        `
    },
    {
        slug: 'resume-builder',
        title: "Resume Builder",
        icon: FileText,
        desc: "Creating and editing resumes",
        content: `
            <h2>Starting a New Resume</h2>
            <p>From your dashboard, click the <strong>Create New Resume</strong> button. You'll be prompted to provide a title (e.g., "Software Engineer - Google App") to help you organize your documents.</p>

            <h2>Using the Editor</h2>
            <p>Our editor is split into several logical sections:</p>
            <ul>
                <li><strong>Personal Info:</strong> Your contact details and location.</li>
                <li><strong>Professional Summary:</strong> A brief overview of your career. Use our AI assistant here for maximum impact!</li>
                <li><strong>Experience:</strong> Your work history. Add roles, dates, and bullet points.</li>
                <li><strong>Education:</strong> Your academic background.</li>
                <li><strong>Skills:</strong> Both hard and soft skills.</li>
            </ul>

            <h2>Leveraging AI Assistance</h2>
            <p>Whenever you see the <strong>Sparkle Icon</strong>, our AI assistant is ready to help. Click it to rewrite a bullet point, generate a summary based on your experience, or suggest skills tailored to your target job title.</p>

            <h2>Exporting</h2>
            <p>Once you are satisfied with your resume, click the <strong>Download PDF</strong> button in the top navigation bar of the editor. Your formatting will be perfectly preserved in a print-ready document.</p>
        `
    },
    {
        slug: 'managing-account',
        title: "Managing Account",
        icon: Settings,
        desc: "Settings and preferences",
        content: `
            <h2>Updating Your Profile</h2>
            <p>To update your name, email address, or profile picture, navigate to the <strong>Settings</strong> page from your user dropdown menu. Changes made here will be reflected across your account.</p>

            <h2>Password & Security</h2>
            <p>If you signed up using an email and password, you can change your password in the Security tab of your Settings. If you use a social login (Google/GitHub), authentication is handled securely by those providers.</p>

            <h2>Data Export & Deletion</h2>
            <p>You own your data. You can download an archive of all your resumes from the Settings page. If you wish to delete your account, you can do so at the bottom of the Settings page. <strong>Please note:</strong> Account deletion is permanent and cannot be undone. All documents will be permanently erased.</p>
        `
    },
    {
        slug: 'billing-plans',
        title: "Billing & Plans",
        icon: CreditCard,
        desc: "Payments and subscriptions",
        content: `
            <h2>Understanding Our Plans</h2>
            <p>We currently offer two tiers:</p>
            <ul>
                <li><strong>Free:</strong> Access to basic templates, PDF export with a watermark, and limited AI assistance.</li>
                <li><strong>Premium (Coming Soon!):</strong> Access to all professional templates, unlimited AI assistance, high-quality un-watermarked PDF exports, and real-time previews.</li>
            </ul>

            <h2>Upgrading to Premium</h2>
            <p>Our Premium tier is currently under development. Once released, you will be able to upgrade directly from the Pricing page or from within the editor.</p>

            <h2>Refunds & Cancellations</h2>
            <p>Once Premium is active, subscriptions will be manageable from your Settings page. You will be able to cancel at any time, and your premium features will remain active until the end of your current billing cycle.</p>
        `
    }
];
