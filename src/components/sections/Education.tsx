"use client";

import { motion } from "framer-motion";
import { education, languages } from "@/content/site";
import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { fadeIn, textVariant } from "@/lib/motion";
import { styles } from "@/lib/styles";

function Education() {
  return (
    <>
      <motion.div variants={textVariant()}>
        <p className={styles.sectionSubText}>Background</p>
        <h2 className={styles.sectionHeadText}>Education &amp; Languages.</h2>
      </motion.div>
      <div className="mt-12 grid gap-6 lg:grid-cols-2">
        <motion.div variants={fadeIn("up", "tween", 0.1, 0.6)} className="space-y-6 rounded-3xl border border-white/10 bg-black-100/55 p-7 sm:p-9">
          <h3 className="font-mono text-[12px] uppercase tracking-widest text-[#7de3cf]">Education</h3>
          {education.map((entry) => (
            <div key={entry.institution} className="border-l-2 border-[#915EFF]/50 pl-5">
              <h4 className="text-[17px] font-semibold text-white">{entry.qualification}</h4>
              <p className="mt-1 text-[14px] text-secondary">{entry.institution}</p>
              <p className="mt-2 font-mono text-[12px] text-secondary">{entry.date}</p>
              {entry.certificateUrl && (
                <a href={entry.certificateUrl} target="_blank" rel="noopener noreferrer" className="mt-3 inline-block text-[13px] font-medium text-[#b49ef5] hover:text-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#915EFF]">View degree certificate ↗</a>
              )}
            </div>
          ))}
        </motion.div>
        <motion.div variants={fadeIn("up", "tween", 0.2, 0.6)} className="rounded-3xl border border-white/10 bg-black-100/55 p-7 sm:p-9">
          <h3 className="font-mono text-[12px] uppercase tracking-widest text-[#7de3cf]">Languages</h3>
          <dl className="mt-5 divide-y divide-white/10">
            {languages.map((language) => (
              <div key={language.name} className="flex items-baseline justify-between gap-4 py-3">
                <dt className="text-[15px] font-medium text-white">{language.name}</dt>
                <dd className="text-[13px] text-secondary">{language.proficiency}</dd>
              </div>
            ))}
          </dl>
        </motion.div>
      </div>
    </>
  );
}

export default SectionWrapper(Education, "education");
