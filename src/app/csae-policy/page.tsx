export default function CSAEPolicyPage() {
    const appName = "Zuva Network";
    const companyName = "Zuva Network";
    const email = "support@zuva.network";
    const reportEmail = "abuse.zuvanetwork@gmail.com";
    const effectiveDate = "February 22, 2026";

    return (
        <div className="min-h-screen">
            <div className="mx-auto max-w-7xl px-8 py-16 md:px-16">
                {/* Header Section */}
                <div className="flex flex-col items-center justify-center text-center">
                    <h1 className="mb-6 text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">
                        Child Sexual Abuse and Exploitation Policy
                    </h1>

                    <div className="mb-12 flex flex-col items-center gap-3 text-sm text-zinc-400 sm:flex-row sm:gap-6">
                        <div className="flex items-center gap-2 rounded-full border border-zinc-700 bg-zinc-900/50 px-4 py-1.5">
                            <span className="font-medium">Effective Date:</span>
                            <span className="text-zinc-200">{effectiveDate}</span>
                        </div>
                        <div className="flex items-center gap-2 rounded-full border border-zinc-700 bg-zinc-900/50 px-4 py-1.5">
                            <span className="font-medium">Last Updated:</span>
                            <span className="text-zinc-200">{effectiveDate}</span>
                        </div>
                    </div>
                </div>

                {/* Content Section */}
                <div className="prose prose-lg prose-invert mx-auto max-w-none">
                    <p className="lead text-xl text-zinc-300">
                        <span className="font-semibold text-yellow-500">{companyName}</span> operates the {appName} mobile application (the &quot;App&quot;). 
                        We have a zero-tolerance policy for Child Sexual Abuse and Exploitation (CSAE) content and activities. 
                        This policy outlines our commitment to protecting children and preventing the distribution of harmful content.
                    </p>

                    <p className="text-zinc-400">
                        We are committed to maintaining a safe environment for all users, especially children. 
                        Any content or behavior that exploits, endangers, or sexualizes minors is strictly prohibited 
                        and will result in immediate action, including account termination and reporting to relevant authorities.
                    </p>

                    {/* Critical Notice */}
                    <div className="mt-8 rounded-xl border-2 border-red-600 bg-red-950/20 p-6">
                        <h2 className="mb-4 text-2xl font-bold text-red-400">⚠️ Zero Tolerance Policy</h2>
                        <p className="text-zinc-300">
                            {companyName} has a zero-tolerance policy for Child Sexual Abuse and Exploitation (CSAE) content. 
                            Any violation of this policy will result in immediate account termination, removal of content, 
                            and reporting to law enforcement authorities, including the National Center for Missing & Exploited Children (NCMEC) 
                            and other relevant agencies worldwide.
                        </p>
                    </div>

                    <div className="mt-12 space-y-12">
                        <section>
                            <h2 className="mb-4 text-2xl font-bold text-white">1. Prohibited Content and Activities</h2>
                            <p className="mb-4 text-zinc-400">
                                The following content and activities are strictly prohibited on {appName}:
                            </p>

                            <div className="mb-6 rounded-xl border border-zinc-800 bg-zinc-900/30 p-6">
                                <h3 className="mb-4 text-lg font-semibold text-yellow-500">Prohibited Content Types:</h3>
                                <ul className="list-inside list-disc space-y-3 text-zinc-400 marker:text-red-500">
                                    <li>
                                        <strong className="text-white">Child Sexual Abuse Material (CSAM):</strong> Any visual, 
                                        written, or audio content depicting or promoting child sexual abuse, including but not 
                                        limited to photographs, videos, illustrations, cartoons, or written descriptions
                                    </li>
                                    <li>
                                        <strong className="text-white">Sexualization of Minors:</strong> Content that sexualizes 
                                        minors through imagery, text, or any other medium, including suggestive or inappropriate 
                                        depictions of children
                                    </li>
                                    <li>
                                        <strong className="text-white">Trafficking Content:</strong> Any content that promotes, 
                                        facilitates, or advertises the trafficking of children for commercial sexual exploitation
                                    </li>
                                    <li>
                                        <strong className="text-white">Sextortion:</strong> Content or activities that use intimate 
                                        images or information to threaten, blackmail, or coerce children
                                    </li>
                                    <li>
                                        <strong className="text-white">Child Grooming:</strong> Any communication or behavior 
                                        intended to establish trust with a child for the purpose of sexual abuse, exploitation, 
                                        or trafficking
                                    </li>
                                    <li>
                                        <strong className="text-white">Online Sexual Contact Facilitation:</strong> Content or 
                                        activities that facilitate inappropriate sexual contact between adults and minors
                                    </li>
                                    <li>
                                        <strong className="text-white">Solicitation or Advertisement:</strong> Any content that 
                                        solicits, advertises, or promotes CSAM or child exploitation services
                                    </li>
                                    <li>
                                        <strong className="text-white">Instructional Content:</strong> Content that provides 
                                        instructions on how to carry out child sexual abuse or exploitation
                                    </li>
                                </ul>
                            </div>
                        </section>

                        <section>
                            <h2 className="mb-4 text-2xl font-bold text-white">2. Detection and Monitoring</h2>
                            <p className="mb-4 text-zinc-400">
                                We employ multiple methods to detect and prevent CSAE content and activities:
                            </p>

                            <ul className="list-inside list-disc space-y-2 text-zinc-400 marker:text-yellow-500">
                                <li>
                                    <strong className="text-white">Automated Detection:</strong> We use artificial intelligence 
                                    and automated technology to scan and identify potentially harmful content
                                </li>
                                {/* <li>
                                    <strong className="text-white">Hash-Matching Technology:</strong> We utilize hash-matching 
                                    technology to identify known CSAM using industry-standard databases
                                </li> */}
                                <li>
                                    <strong className="text-white">Human Review:</strong> Specialist teams conduct manual reviews 
                                    of flagged content and user reports to ensure accuracy
                                </li>
                                <li>
                                    <strong className="text-white">User Reporting:</strong> We encourage and rely on user reports 
                                    to identify violations (see Reporting section below)
                                </li>
                                <li>
                                    <strong className="text-white">Behavioral Analysis:</strong> We monitor user behavior patterns 
                                    that may indicate grooming, exploitation, or other harmful activities
                                </li>
                                <li>
                                    <strong className="text-white">Quality Control:</strong> Regular quality control processes 
                                    ensure the accuracy and effectiveness of our detection systems
                                </li>
                            </ul>
                        </section>

                        <section>
                            <h2 className="mb-4 text-2xl font-bold text-white">3. Reporting Violations</h2>
                            <p className="mb-4 text-zinc-400">
                                If you encounter any content or behavior that violates this policy, please report it immediately. 
                                Your report will be treated with the utmost seriousness and confidentiality.
                            </p>

                            <div className="mb-6 rounded-xl border border-zinc-800 bg-zinc-900/30 p-6">
                                <h3 className="mb-4 text-lg font-semibold text-yellow-500">How to Report:</h3>
                                <ol className="list-inside list-decimal space-y-3 text-zinc-400 marker:text-yellow-500">
                                    {/* <li>
                                        <strong className="text-white">In-App Reporting:</strong> Use the reporting feature within 
                                        the {appName} app to flag content or users
                                    </li> */}
                                    <li>
                                        <strong className="text-white">Email Reporting:</strong> Send detailed reports to{" "}
                                        <a href={`mailto:${reportEmail}?subject=CSAE%20Violation%20Report`} 
                                           className="text-yellow-500 hover:text-yellow-400 hover:underline">
                                            {reportEmail}
                                        </a>
                                    </li>
                                    <li>
                                        <strong className="text-white">Emergency Situations:</strong> If you believe a child is 
                                        in immediate danger, contact your local law enforcement immediately
                                    </li>
                                </ol>
                            </div>

                            <div className="rounded-xl border border-blue-600 bg-blue-950/20 p-6">
                                <h3 className="mb-3 text-lg font-semibold text-blue-400">What to Include in Your Report:</h3>
                                <ul className="list-inside list-disc space-y-2 text-zinc-400 marker:text-blue-500">
                                    <li>Description of the violation</li>
                                    <li>Username or account information of the violator (if known)</li>
                                    <li>Screenshots or evidence of the violation</li>
                                    <li>Date and time of the incident</li>
                                    <li>Any additional context that may be helpful</li>
                                </ul>
                            </div>
                        </section>

                        <section>
                            <h2 className="mb-4 text-2xl font-bold text-white">4. Enforcement Actions</h2>
                            <p className="mb-4 text-zinc-400">
                                When CSAE content or activities are detected or reported, we take immediate and decisive action:
                            </p>

                            <div className="mb-6 rounded-xl border border-red-600 bg-red-950/20 p-6">
                                <h3 className="mb-4 text-lg font-semibold text-red-400">Immediate Actions:</h3>
                                <ul className="list-inside list-disc space-y-2 text-zinc-400 marker:text-red-500">
                                    <li>
                                        <strong className="text-white">Content Removal:</strong> All violating content is immediately 
                                        removed from our platform
                                    </li>
                                    <li>
                                        <strong className="text-white">Account Termination:</strong> Accounts associated with violations 
                                        are permanently banned without warning
                                    </li>
                                    <li>
                                        <strong className="text-white">IP and Device Blocking:</strong> We may block IP addresses and 
                                        device identifiers to prevent repeat violations
                                    </li>
                                    <li>
                                        <strong className="text-white">Law Enforcement Reporting:</strong> All confirmed CSAM and 
                                        serious violations are reported to:
                                        <ul className="ml-6 mt-2 list-inside list-disc space-y-1 marker:text-red-400">
                                            <li>National Center for Missing & Exploited Children (NCMEC) in the United States</li>
                                            <li>Relevant law enforcement agencies in other jurisdictions</li>
                                            <li>International organizations as appropriate</li>
                                        </ul>
                                    </li>
                                    <li>
                                        <strong className="text-white">Data Preservation:</strong> We preserve relevant data as required 
                                        by law for law enforcement investigations
                                    </li>
                                </ul>
                            </div>

                            <p className="text-zinc-400">
                                We cooperate fully with law enforcement investigations and provide all necessary information 
                                and evidence to support prosecutions.
                            </p>
                        </section>

                        <section>
                            <h2 className="mb-4 text-2xl font-bold text-white">5. Age Verification and Protection</h2>
                            <p className="mb-4 text-zinc-400">
                                We take measures to protect minors and verify user ages:
                            </p>

                            <ul className="list-inside list-disc space-y-2 text-zinc-400 marker:text-yellow-500">
                                <li>
                                    <strong className="text-white">Age Requirements:</strong> Users must be at least 13 years old 
                                    to use {appName}. Users under 18 require parental consent in certain jurisdictions
                                </li>
                                <li>
                                    <strong className="text-white">Age Verification:</strong> We may require age verification for 
                                    certain features or activities
                                </li>
                                <li>
                                    <strong className="text-white">Parental Controls:</strong> We provide information and tools 
                                    to help parents monitor and control their children&apos;s use of the App
                                </li>
                                <li>
                                    <strong className="text-white">Restricted Features:</strong> Certain features may be restricted 
                                    for users under 18 to prevent exploitation
                                </li>
                            </ul>
                        </section>

                        <section>
                            <h2 className="mb-4 text-2xl font-bold text-white">6. Compliance with Laws and Regulations</h2>
                            <p className="mb-4 text-zinc-400">
                                This policy is designed to comply with:
                            </p>

                            <ul className="list-inside list-disc space-y-2 text-zinc-400 marker:text-yellow-500">
                                <li>Google Play Store Child Safety Standards Policy</li>
                                <li>U.S. federal laws, including the PROTECT Act and related legislation</li>
                                <li>International laws and conventions on child protection</li>
                                <li>European Union regulations on child safety online</li>
                                <li>Other applicable local, national, and international laws</li>
                            </ul>
                        </section>

                        <section>
                            <h2 className="mb-4 text-2xl font-bold text-white">7. Training and Awareness</h2>
                            <p className="mb-4 text-zinc-400">
                                We are committed to ongoing education and awareness:
                            </p>

                            <ul className="list-inside list-disc space-y-2 text-zinc-400 marker:text-yellow-500">
                                <li>Our team receives regular training on CSAE detection and prevention</li>
                                <li>We stay updated on emerging threats and best practices</li>
                                <li>We collaborate with industry partners and organizations dedicated to child safety</li>
                                <li>We continuously improve our detection and prevention systems</li>
                            </ul>
                        </section>

                        <section>
                            <h2 className="mb-4 text-2xl font-bold text-white">8. User Responsibilities</h2>
                            <p className="mb-4 text-zinc-400">
                                All users of {appName} are responsible for:
                            </p>

                            <ul className="list-inside list-disc space-y-2 text-zinc-400 marker:text-yellow-500">
                                <li>Complying with this policy and all applicable laws</li>
                                <li>Reporting any suspected violations immediately</li>
                                <li>Not sharing, creating, or distributing CSAE content</li>
                                <li>Protecting children in their care and reporting concerns</li>
                                <li>Cooperating with investigations when requested</li>
                            </ul>
                        </section>

                        <section>
                            <h2 className="mb-4 text-2xl font-bold text-white">9. Policy Updates</h2>
                            <p className="text-zinc-400">
                                We may update this policy periodically to reflect changes in laws, regulations, or best practices. 
                                Continued use of {appName} after policy updates constitutes acceptance of the revised policy. 
                                We will notify users of significant changes through the App or via email.
                            </p>
                        </section>

                        <section className="rounded-2xl border border-zinc-800 bg-zinc-900/50 p-8">
                            <h2 className="mb-4 text-2xl font-bold text-white">10. Contact Information</h2>
                            <p className="mb-6 text-zinc-400">
                                For questions about this policy, to report violations, or for general inquiries:
                            </p>
                            
                            <div className="space-y-4">
                                <div>
                                    <h3 className="mb-2 text-lg font-semibold text-yellow-500">General Inquiries:</h3>
                                    <div className="text-lg font-semibold text-white">{companyName}</div>
                                    <a href={`mailto:${email}`} className="mt-2 block text-yellow-500 hover:text-yellow-400 hover:underline">
                                        {email}
                                    </a>
                                </div>

                                <div className="rounded-xl border border-red-600 bg-red-950/20 p-4">
                                    <h3 className="mb-2 text-lg font-semibold text-red-400">Report CSAE Violations:</h3>
                                    <a href={`mailto:${reportEmail}?subject=CSAE%20Violation%20Report`} 
                                       className="block text-lg font-semibold text-red-300 hover:text-red-200 hover:underline">
                                        {reportEmail}
                                    </a>
                                    <p className="mt-2 text-sm text-zinc-400">
                                        For immediate danger to a child, contact local law enforcement first.
                                    </p>
                                </div>
                            </div>
                        </section>

                        {/* Additional Resources */}
                        <section className="rounded-xl border border-blue-600 bg-blue-950/20 p-6">
                            <h2 className="mb-4 text-2xl font-bold text-blue-400">Additional Resources</h2>
                            <p className="mb-4 text-zinc-400">
                                If you or someone you know needs help or support:
                            </p>
                            <ul className="list-inside list-disc space-y-2 text-zinc-400 marker:text-blue-500">
                                <li>
                                    <strong className="text-white">National Center for Missing & Exploited Children (NCMEC):</strong>{" "}
                                    <a href="https://www.missingkids.org" target="_blank" rel="noopener noreferrer" 
                                       className="text-blue-400 hover:text-blue-300 hover:underline">
                                        www.missingkids.org
                                    </a> | Hotline: 1-800-THE-LOST
                                </li>
                                <li>
                                    <strong className="text-white">CyberTipline:</strong>{" "}
                                    <a href="https://www.missingkids.org/gethelpnow/cybertipline" target="_blank" rel="noopener noreferrer"
                                       className="text-blue-400 hover:text-blue-300 hover:underline">
                                        Report online exploitation
                                    </a>
                                </li>
                                <li>
                                    <strong className="text-white">Childhelp National Child Abuse Hotline:</strong> 1-800-4-A-CHILD (1-800-422-4453)
                                </li>
                            </ul>
                        </section>
                    </div>

                    <p className="mt-16 text-center text-sm text-zinc-500">
                        By using {appName}, you acknowledge and agree to comply with this Child Sexual Abuse and Exploitation Policy. 
                        Violations may result in legal action and prosecution to the fullest extent of the law.
                    </p>
                </div>
            </div>
        </div>
    );
}
