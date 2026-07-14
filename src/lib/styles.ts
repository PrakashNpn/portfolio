/**
 * Shared Tailwind class strings, ported from the original `styles.js`.
 * Keeps section typography and spacing consistent across the site.
 */
export const styles = {
  paddingX: "sm:px-16 px-6",
  paddingY: "sm:py-16 py-6",
  padding: "sm:px-16 px-6 sm:py-16 py-10",

  heroHeadText:
    "font-black text-white text-[32px] xs:text-[38px] sm:text-[42px] lg:text-[46px] xl:text-[52px] leading-[1.1]",
  heroSubText:
    "text-[#dfd9ff] font-medium text-[16px] xs:text-[20px] sm:text-[24px] lg:text-[28px]",

  sectionHeadText:
    "text-white font-black md:text-[60px] sm:text-[50px] xs:text-[40px] text-[30px]",
  sectionSubText:
    "sm:text-[18px] text-[14px] text-secondary uppercase tracking-wider",
} as const;
