import { CaseStudiesLibrary } from "@/components/sections/case-studies-library";
import { getCaseStudies } from "@/lib/content-engine";

export default async function CaseStudiesPage() {
  const studies = await getCaseStudies();
  return (
    <div className="pt-24 min-h-screen bg-white dark:bg-midnight-950">
      <div className="py-20 bg-gray-50 dark:bg-midnight-900 border-b border-gray-100 dark:border-midnight-800">
        <div className="container mx-auto px-4 text-center space-y-6">
          <h1 className="text-5xl md:text-7xl font-black text-gray-900 dark:text-white tracking-tighter">
            INDUSTRIAL <span className="text-electric">PROOF</span>
          </h1>
          <p className="text-xl text-gray-500 dark:text-gray-400 font-medium max-w-2xl mx-auto">
            Deep dives into our engineering repository. Explore how we solve complex logic challenges at scale.
          </p>
        </div>
      </div>
      <CaseStudiesLibrary studies={studies} />
    </div>
  );
}
