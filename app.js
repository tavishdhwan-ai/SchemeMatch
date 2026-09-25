// SchemeMatch — Application Logic

const incomeMap = {
  "Below 1L": 100000,
  "1–2.5L": 250000,
  "2.5–5L": 500000,
  "Above 5L": 600001
};

let allSchemes = [];
let allSkills = [];
let povertySchemes = [];
let filteredScholarships = [];
let filteredSkills = [];
let filteredPoverty = [];
let activeTab = 'scholarships'; // 'scholarships', 'skills', or 'poverty'
let isFiltered = false;

// Fallback JSON data for SDG 4 Scholarships
const fallbackSchemes = [
  {
    "id": 1,
    "name": "PM-USP – Central Sector Scheme of Scholarship for College and University Students (CSSS)",
    "provider": "Department of Higher Education, MoE",
    "amount_per_year": 20000,
    "benefit_label": "₹10,000/yr (UG) or ₹20,000/yr (PG)",
    "eligible_categories": ["General", "OBC", "SC", "ST", "EWS", "Minority"],
    "max_income": 450000,
    "eligible_courses": ["UG", "PG"],
    "gender_specific": null,
    "disability_required": false,
    "state_specific": null,
    "special_eligibility": "Top 20 percentile in Class XII board; excludes professional/technical/medical courses",
    "deadline": "30 Sep 2026",
    "apply_link": "https://scholarships.gov.in",
    "description": "Merit scholarship for top Class XII scorers pursuing regular UG/PG degrees. Not applicable to engineering, medicine, or management."
  },
  {
    "id": 2,
    "name": "National Scholarship for Post Graduate Studies",
    "provider": "UGC",
    "amount_per_year": 90000,
    "benefit_label": "₹5,000–₹7,500/month",
    "eligible_categories": ["General", "OBC", "SC", "ST", "EWS", "Minority"],
    "max_income": null,
    "eligible_courses": ["PG"],
    "gender_specific": null,
    "disability_required": false,
    "state_specific": null,
    "special_eligibility": "Merit-based; selected from top UG graduates",
    "deadline": "31 Oct 2026",
    "apply_link": "https://scholarships.gov.in",
    "description": "UGC scholarship for top UG graduates pursuing master's degrees. Covers science (₹7,500/month) and humanities (₹5,000/month) streams."
  },
  {
    "id": 3,
    "name": "Ishan Uday Special Scholarship Scheme for NER",
    "provider": "UGC",
    "amount_per_year": 93600,
    "benefit_label": "₹5,400–₹7,800/month",
    "eligible_categories": ["General", "OBC", "SC", "ST", "EWS", "Minority"],
    "max_income": null,
    "eligible_courses": ["UG"],
    "gender_specific": null,
    "disability_required": false,
    "state_specific": null,
    "special_eligibility": "Must be domicile of one of 8 NER states (Arunachal Pradesh, Assam, Manipur, Meghalaya, Mizoram, Nagaland, Sikkim, Tripura) studying outside NER",
    "deadline": "31 Oct 2026",
    "apply_link": "https://scholarships.gov.in",
    "description": "For students from North-Eastern states pursuing UG studies outside their home region. ₹7,800/month for technical/medical/management; ₹5,400/month for others."
  },
  {
    "id": 4,
    "name": "PM-USP Special Scholarship Scheme for Jammu, Kashmir and Ladakh",
    "provider": "AICTE",
    "amount_per_year": 125000,
    "benefit_label": "₹30,000–₹1,25,000/year (varies by course)",
    "eligible_categories": ["General", "OBC", "SC", "ST", "EWS", "Minority"],
    "max_income": null,
    "eligible_courses": ["UG", "PG"],
    "gender_specific": null,
    "disability_required": false,
    "state_specific": "Jammu & Kashmir",
    "special_eligibility": "Must be domicile of J&K or Ladakh; pursuing studies in professional colleges outside J&K/Ladakh. Currently open for renewal only.",
    "deadline": "30 Sep 2026",
    "apply_link": "https://scholarships.gov.in",
    "description": "Supports students from J&K and Ladakh to pursue professional/technical education in institutions across India."
  },
  {
    "id": 5,
    "name": "National Means Cum Merit Scholarship (NMMSS)",
    "provider": "Dept. of School Education & Literacy, MoE",
    "amount_per_year": 12000,
    "benefit_label": "₹12,000/year (₹1,000/month)",
    "eligible_categories": ["General", "OBC", "SC", "ST", "EWS", "Minority"],
    "max_income": 350000,
    "eligible_courses": ["Class 9-10", "Class 11-12"],
    "gender_specific": null,
    "disability_required": false,
    "state_specific": null,
    "special_eligibility": "Must clear the NMMS state-level exam in Class 8; renewed annually on passing each class",
    "deadline": "30 Sep 2026",
    "apply_link": "https://scholarships.gov.in",
    "description": "Merit-cum-means scholarship for Class 9–12 students from economically weaker sections. Selected via NMMS exam conducted by states."
  },
  {
    "id": 6,
    "name": "Central Sector Scholarship of Top Class Education for SC Students",
    "provider": "Dept. of Social Justice & Empowerment",
    "amount_per_year": 222000,
    "benefit_label": "Full tuition + ₹2,220/month maintenance",
    "eligible_categories": ["SC"],
    "max_income": 600000,
    "eligible_courses": ["UG", "PG"],
    "gender_specific": null,
    "disability_required": false,
    "state_specific": null,
    "special_eligibility": "Must be admitted to one of the notified top institutions (IITs, IIMs, NITs, NLUs, top medical colleges etc.)",
    "deadline": "31 Oct 2026",
    "apply_link": "https://scholarships.gov.in",
    "description": "Full tuition fee reimbursement plus maintenance allowance for SC students in India's premier institutions."
  },
  {
    "id": 7,
    "name": "National Fellowship and Scholarship for Higher Education of ST Students – Scholarship",
    "provider": "Ministry of Tribal Affairs",
    "amount_per_year": 222000,
    "benefit_label": "Full tuition + maintenance allowances",
    "eligible_categories": ["ST"],
    "max_income": 600000,
    "eligible_courses": ["UG", "PG"],
    "gender_specific": null,
    "disability_required": false,
    "state_specific": null,
    "special_eligibility": "Must secure admission in notified top-class institutions",
    "deadline": "31 Oct 2026",
    "apply_link": "https://scholarships.gov.in",
    "description": "Scholarship component of the NFSHEST scheme for ST students in premier institutions. Covers tuition fees and living expenses."
  },
  {
    "id": 8,
    "name": "PM YASASVI Central Sector Scheme of Top Class Education in College for OBC, EBC and DNT Students",
    "provider": "Dept. of Social Justice & Empowerment (Backward Classes)",
    "amount_per_year": 125000,
    "benefit_label": "Up to ₹1,25,000/year (fees + maintenance)",
    "eligible_categories": ["OBC"],
    "max_income": 250000,
    "eligible_courses": ["UG", "PG"],
    "gender_specific": null,
    "disability_required": false,
    "state_specific": null,
    "special_eligibility": "Must be enrolled in a notified top-class college; OBC/EBC/DNT category",
    "deadline": "31 Oct 2026",
    "apply_link": "https://scholarships.gov.in",
    "description": "For OBC, EBC, and DNT students in premier colleges. Covers tuition fees and maintenance up to ₹1.25 lakh per year."
  },
  {
    "id": 9,
    "name": "PM YASASVI Central Sector Scheme of Top Class Education in Schools for OBC, EBC and DNT Students",
    "provider": "Dept. of Social Justice & Empowerment (Backward Classes)",
    "amount_per_year": 75000,
    "benefit_label": "Up to ₹75,000/year",
    "eligible_categories": ["OBC"],
    "max_income": 250000,
    "eligible_courses": ["Class 9-10", "Class 11-12"],
    "gender_specific": null,
    "disability_required": false,
    "state_specific": null,
    "special_eligibility": "Enrolled in notified residential schools for OBC/EBC/DNT students. Currently open for renewal only.",
    "deadline": "30 Sep 2026",
    "apply_link": "https://scholarships.gov.in",
    "description": "Supports OBC, EBC, and DNT students in Class 9–12 at notified top residential schools across India."
  },
  {
    "id": 10,
    "name": "Pre-Matric Scholarship for Students with Disabilities",
    "provider": "Dept. of Empowerment of Persons with Disabilities",
    "amount_per_year": 12000,
    "benefit_label": "Maintenance + study allowance (varies)",
    "eligible_categories": ["General", "OBC", "SC", "ST", "EWS", "Minority"],
    "max_income": null,
    "eligible_courses": ["Class 9-10"],
    "gender_specific": null,
    "disability_required": true,
    "state_specific": null,
    "special_eligibility": "Minimum 40% disability; studying in Class 9 or 10",
    "deadline": "30 Sep 2026",
    "apply_link": "https://scholarships.gov.in",
    "description": "For Class 9–10 students with 40%+ disability. Provides maintenance allowance and study grant regardless of income."
  },
  {
    "id": 11,
    "name": "Post-Matric Scholarship for Students with Disabilities",
    "provider": "Dept. of Empowerment of Persons with Disabilities",
    "amount_per_year": 24000,
    "benefit_label": "Maintenance + study allowance + reader allowance",
    "eligible_categories": ["General", "OBC", "SC", "ST", "EWS", "Minority"],
    "max_income": null,
    "eligible_courses": ["Class 11-12", "UG", "PG", "PhD"],
    "gender_specific": null,
    "disability_required": true,
    "state_specific": null,
    "special_eligibility": "Minimum 40% disability; Class 11 and above",
    "deadline": "31 Oct 2026",
    "apply_link": "https://scholarships.gov.in",
    "description": "For students with 40%+ disability pursuing Class 11 and above. Covers maintenance, study materials, and reader allowance."
  },
  {
    "id": 12,
    "name": "Scholarship for Top Class Education for Students with Disabilities",
    "provider": "Dept. of Empowerment of Persons with Disabilities",
    "amount_per_year": 200000,
    "benefit_label": "Full tuition + allowances in top institutions",
    "eligible_categories": ["General", "OBC", "SC", "ST", "EWS", "Minority"],
    "max_income": null,
    "eligible_courses": ["UG", "PG"],
    "gender_specific": null,
    "disability_required": true,
    "state_specific": null,
    "special_eligibility": "40%+ disability; must be enrolled in a notified top institution",
    "deadline": "31 Oct 2026",
    "apply_link": "https://scholarships.gov.in",
    "description": "Full fee coverage and allowances for students with disabilities admitted to India's premier institutions."
  },
  {
    "id": 13,
    "name": "AICTE – Pragati Scholarship Scheme for Girl Students (Technical Degree)",
    "provider": "AICTE",
    "amount_per_year": 50000,
    "benefit_label": "₹50,000/year",
    "eligible_categories": ["General", "OBC", "SC", "ST", "EWS", "Minority"],
    "max_income": 800000,
    "eligible_courses": ["UG"],
    "gender_specific": "Female",
    "disability_required": false,
    "state_specific": null,
    "special_eligibility": "Enrolled in first year (or second year via lateral entry) of AICTE-approved technical degree (BE/B.Tech/B.Arch/B.Plan/B.Pharma)",
    "deadline": "31 Oct 2026",
    "apply_link": "https://scholarships.gov.in",
    "description": "Encourages girls in technical degree education. ₹50,000/year for tuition, books, computer, and other study expenses."
  },
  {
    "id": 14,
    "name": "AICTE – Pragati Scholarship Scheme for Girl Students (Technical Diploma)",
    "provider": "AICTE",
    "amount_per_year": 30000,
    "benefit_label": "₹30,000/year",
    "eligible_categories": ["General", "OBC", "SC", "ST", "EWS", "Minority"],
    "max_income": 800000,
    "eligible_courses": ["UG"],
    "gender_specific": "Female",
    "disability_required": false,
    "state_specific": null,
    "special_eligibility": "Enrolled in AICTE-approved technical diploma programme",
    "deadline": "31 Oct 2026",
    "apply_link": "https://scholarships.gov.in",
    "description": "Same as Pragati Degree but for girls in technical diploma courses. ₹30,000/year for educational expenses."
  },
  {
    "id": 15,
    "name": "AICTE – Saksham Scholarship Scheme for Specially Abled Student (Technical Degree)",
    "provider": "AICTE",
    "amount_per_year": 50000,
    "benefit_label": "₹50,000/year",
    "eligible_categories": ["General", "OBC", "SC", "ST", "EWS", "Minority"],
    "max_income": 800000,
    "eligible_courses": ["UG"],
    "gender_specific": null,
    "disability_required": true,
    "state_specific": null,
    "special_eligibility": "40%+ disability; enrolled in AICTE-approved technical degree programme",
    "deadline": "31 Oct 2026",
    "apply_link": "https://scholarships.gov.in",
    "description": "For differently-abled students in technical degree programmes. ₹50,000/year towards education costs."
  },
  {
    "id": 16,
    "name": "AICTE – Saksham Scholarship Scheme for Specially Abled Student (Technical Diploma)",
    "provider": "AICTE",
    "amount_per_year": 30000,
    "benefit_label": "₹30,000/year",
    "eligible_categories": ["General", "OBC", "SC", "ST", "EWS", "Minority"],
    "max_income": 800000,
    "eligible_courses": ["UG"],
    "gender_specific": null,
    "disability_required": true,
    "state_specific": null,
    "special_eligibility": "40%+ disability; enrolled in AICTE-approved technical diploma programme",
    "deadline": "31 Oct 2026",
    "apply_link": "https://scholarships.gov.in",
    "description": "For differently-abled students in technical diploma programmes. ₹30,000/year towards education costs."
  },
  {
    "id": 17,
    "name": "AICTE – Swanath Scholarship Scheme (Technical Degree)",
    "provider": "AICTE",
    "amount_per_year": 50000,
    "benefit_label": "₹50,000/year",
    "eligible_categories": ["General", "OBC", "SC", "ST", "EWS", "Minority"],
    "max_income": null,
    "eligible_courses": ["UG"],
    "gender_specific": null,
    "disability_required": false,
    "state_specific": null,
    "special_eligibility": "Must be an orphan, OR ward of armed forces/CAPF personnel killed in action, OR ward of parents who died due to COVID-19 (PM CARES child)",
    "deadline": "31 Oct 2026",
    "apply_link": "https://scholarships.gov.in",
    "description": "For orphans, wards of armed forces/CAPF martyrs, and COVID-19 orphans in AICTE-approved technical degree programmes."
  },
  {
    "id": 18,
    "name": "AICTE – Swanath Scholarship Scheme (Technical Diploma)",
    "provider": "AICTE",
    "amount_per_year": 30000,
    "benefit_label": "₹30,000/year",
    "eligible_categories": ["General", "OBC", "SC", "ST", "EWS", "Minority"],
    "max_income": null,
    "eligible_courses": ["UG"],
    "gender_specific": null,
    "disability_required": false,
    "state_specific": null,
    "special_eligibility": "Must be an orphan, OR ward of armed forces/CAPF personnel killed in action, OR ward of parents who died due to COVID-19 (PM CARES child)",
    "deadline": "31 Oct 2026",
    "apply_link": "https://scholarships.gov.in",
    "description": "Same as Swanath Degree but for AICTE-approved technical diploma programmes. ₹30,000/year."
  },
  {
    "id": 19,
    "name": "Financial Support to the Students of NER for Higher Professional Courses (NEC Merit Scholarship)",
    "provider": "North Eastern Council (NEC), DoNER",
    "amount_per_year": 52000,
    "benefit_label": "₹3,500/month + ₹10,000/year contingency",
    "eligible_categories": ["General", "OBC", "SC", "ST", "EWS", "Minority"],
    "max_income": null,
    "eligible_courses": ["UG", "PG"],
    "gender_specific": null,
    "disability_required": false,
    "state_specific": null,
    "special_eligibility": "Must be domicile of one of 8 NER states; pursuing professional/technical UG or PG courses. Open for renewal.",
    "deadline": "31 Oct 2026",
    "apply_link": "https://scholarships.gov.in",
    "description": "Financial support for NER students pursuing professional courses (engineering, medicine, management, law) anywhere in India."
  },
  {
    "id": 20,
    "name": "Prime Minister's Scholarship Scheme for Ministry of Railways",
    "provider": "Ministry of Railways (Railway Board)",
    "amount_per_year": 30000,
    "benefit_label": "₹2,500/month (girls), ₹2,250/month (boys)",
    "eligible_categories": ["General", "OBC", "SC", "ST", "EWS", "Minority"],
    "max_income": 600000,
    "eligible_courses": ["UG"],
    "gender_specific": null,
    "disability_required": false,
    "state_specific": null,
    "special_eligibility": "Must be ward of Railway Group C employee who died or was permanently disabled in service",
    "deadline": "31 Oct 2026",
    "apply_link": "https://scholarships.gov.in",
    "description": "For wards of Railway employees (Group C) who died or were disabled on duty. Covers first professional degree (BE, MBBS, BDS, B.Ed, LLB etc.)."
  },
  {
    "id": 21,
    "name": "Prime Minister's Scholarship Scheme for Central Armed Police Forces and Assam Rifles",
    "provider": "Ministry of Home Affairs",
    "amount_per_year": 30000,
    "benefit_label": "₹2,500/month (girls), ₹2,250/month (boys)",
    "eligible_categories": ["General", "OBC", "SC", "ST", "EWS", "Minority"],
    "max_income": 600000,
    "eligible_courses": ["UG"],
    "gender_specific": null,
    "disability_required": false,
    "state_specific": null,
    "special_eligibility": "Must be ward of CAPF or Assam Rifles personnel killed in action or permanently disabled in service",
    "deadline": "31 Oct 2026",
    "apply_link": "https://scholarships.gov.in",
    "description": "For wards of CAPF/Assam Rifles personnel martyred or disabled in duty. Covers first professional degree programmes."
  },
  {
    "id": 22,
    "name": "Prime Minister's Scholarship Scheme for Wards of States/UTs Police Personnel Martyred During Terror/Naxal Attacks",
    "provider": "Ministry of Home Affairs",
    "amount_per_year": 30000,
    "benefit_label": "₹2,500/month (girls), ₹2,250/month (boys)",
    "eligible_categories": ["General", "OBC", "SC", "ST", "EWS", "Minority"],
    "max_income": 600000,
    "eligible_courses": ["UG"],
    "gender_specific": null,
    "disability_required": false,
    "state_specific": null,
    "special_eligibility": "Must be ward of state/UT police personnel who were martyred in terrorist or Naxal attacks",
    "deadline": "31 Oct 2026",
    "apply_link": "https://scholarships.gov.in",
    "description": "Scholarship for wards of state/UT police martyrs (terror/Naxal attacks) pursuing their first professional degree."
  },
  {
    "id": 23,
    "name": "Financial Assistance for Education to the Wards of Beedi/Cine/IOMC/LSDM – Pre-Matric",
    "provider": "Ministry of Labour & Employment",
    "amount_per_year": 14400,
    "benefit_label": "₹700–₹1,200/month (varies by class/hosteller)",
    "eligible_categories": ["General", "OBC", "SC", "ST", "EWS", "Minority"],
    "max_income": null,
    "eligible_courses": ["Class 9-10"],
    "gender_specific": null,
    "disability_required": false,
    "state_specific": null,
    "special_eligibility": "Parent/guardian must be a registered worker in the Beedi, Cine, Iron Ore Manganese Ore Chrome Ore (IOMC), or Limestone & Dolomite Mines (LSDM) industries",
    "deadline": "30 Sep 2026",
    "apply_link": "https://scholarships.gov.in",
    "description": "For Class 9–10 children of workers in specified industries. No income limit — eligibility is based on parent's industry registration."
  },
  {
    "id": 24,
    "name": "Financial Assistance for Education to the Wards of Beedi/Cine/IOMC/LSDM – Post-Matric",
    "provider": "Ministry of Labour & Employment",
    "amount_per_year": 60000,
    "benefit_label": "₹1,500–₹5,000/month (varies by course level)",
    "eligible_categories": ["General", "OBC", "SC", "ST", "EWS", "Minority"],
    "max_income": null,
    "eligible_courses": ["Class 11-12", "UG", "PG", "PhD"],
    "gender_specific": null,
    "disability_required": false,
    "state_specific": null,
    "special_eligibility": "Parent/guardian must be a registered worker in Beedi/Cine/IOMC/LSDM industries",
    "deadline": "31 Oct 2026",
    "apply_link": "https://scholarships.gov.in",
    "description": "For Class 11 and above children of workers in specified industries. Covers studies up to PhD level."
  },
  {
    "id": 25,
    "name": "Free Coaching for SCs, OBCs and Beneficiaries of PM CARES Children Scheme",
    "provider": "Dept. of Social Justice & Empowerment",
    "amount_per_year": 0,
    "benefit_label": "Free coaching (no cash stipend)",
    "eligible_categories": ["SC", "OBC"],
    "max_income": 800000,
    "eligible_courses": ["Class 11-12", "UG", "PG"],
    "gender_specific": null,
    "disability_required": false,
    "state_specific": null,
    "special_eligibility": "SC/OBC or PM CARES child; for competitive exams (UPSC, banking, SSC, JEE, NEET etc.)",
    "deadline": "31 Oct 2026",
    "apply_link": "https://scholarships.gov.in",
    "description": "Free coaching at empanelled coaching centres for competitive exams. Includes UPSC, banking exams, SSC, engineering (JEE), and medical (NEET) entrances."
  },
  {
    "id": 26,
    "name": "Stipend Scheme for Undergraduate and Postgraduate Studies in Indian Statistical Institute-Kolkata",
    "provider": "Ministry of Statistics & Programme Implementation",
    "amount_per_year": 96000,
    "benefit_label": "₹4,000/month (UG), ₹8,000/month (PG)",
    "eligible_categories": ["General", "OBC", "SC", "ST", "EWS", "Minority"],
    "max_income": null,
    "eligible_courses": ["UG", "PG"],
    "gender_specific": null,
    "disability_required": false,
    "state_specific": "West Bengal",
    "special_eligibility": "Must be enrolled at Indian Statistical Institute, Kolkata (ISI Kolkata) only; merit-based",
    "deadline": "31 Oct 2026",
    "apply_link": "https://scholarships.gov.in",
    "description": "Stipend for students studying at ISI Kolkata only. ₹4,000/month for UG and ₹8,000/month for PG students on merit basis."
  },
  {
    "id": 27,
    "name": "ICAR National Talent Scholarship (NTS-UG)",
    "provider": "Dept. of Agricultural Research & Education (ICAR)",
    "amount_per_year": 27000,
    "benefit_label": "₹2,000/month + ₹3,000/year contingency",
    "eligible_categories": ["General", "OBC", "SC", "ST", "EWS", "Minority"],
    "max_income": null,
    "eligible_courses": ["UG"],
    "gender_specific": null,
    "disability_required": false,
    "state_specific": null,
    "special_eligibility": "Pursuing BSc (Agriculture) or related life sciences UG at ICAR/state agricultural universities; selected via ICAR entrance exam",
    "deadline": "31 Oct 2026",
    "apply_link": "https://scholarships.gov.in",
    "description": "Merit scholarship for top students in agricultural sciences at ICAR-affiliated institutions. Selected via ICAR's national talent search exam."
  },
  {
    "id": 28,
    "name": "ICAR Post Graduate Scholarship (PGS)",
    "provider": "Dept. of Agricultural Research & Education (ICAR)",
    "amount_per_year": 103680,
    "benefit_label": "₹8,640/month (Masters); higher for PhD",
    "eligible_categories": ["General", "OBC", "SC", "ST", "EWS", "Minority"],
    "max_income": null,
    "eligible_courses": ["PG", "PhD"],
    "gender_specific": null,
    "disability_required": false,
    "state_specific": null,
    "special_eligibility": "Enrolled in PG/PhD programme at ICAR-funded agricultural universities/institutes; merit-based selection",
    "deadline": "31 Oct 2026",
    "apply_link": "https://scholarships.gov.in",
    "description": "Stipend for postgraduate and doctoral students in agricultural sciences at ICAR-funded institutions."
  },
  {
    "id": 29,
    "name": "Maanki Munda Scholarship for Female Students",
    "provider": "Dept. of Higher & Technical Education, Govt. of Jharkhand",
    "amount_per_year": 30000,
    "benefit_label": "₹30,000/yr (B.Tech), ₹15,000/yr (Diploma)",
    "eligible_categories": ["General", "OBC", "SC", "ST", "EWS", "Minority"],
    "max_income": 800000,
    "eligible_courses": ["UG"],
    "gender_specific": "Female",
    "disability_required": false,
    "state_specific": "Jharkhand",
    "special_eligibility": "Female student enrolled in B.Tech (2nd–4th year) at BIT Sindri only; must have 50% marks in previous year; not availing any other scholarship",
    "deadline": "Check BIT Sindri official portal",
    "apply_link": "https://myscheme.gov.in/schemes/mmsfs",
    "description": "Financial assistance for girls pursuing B.Tech at BIT Sindri, Jharkhand. ₹30,000/year for B.Tech and ₹15,000/year for Diploma. Cannot be combined with other scholarships."
  },
  {
    "id": 30,
    "name": "Delhi Higher & Technical Education Support Scheme",
    "provider": "Govt. of NCT of Delhi",
    "amount_per_year": 150000,
    "benefit_label": "Verify on myscheme.gov.in/schemes/dhtess",
    "eligible_categories": ["General", "OBC", "SC", "ST", "EWS", "Minority"],
    "max_income": 800000,
    "eligible_courses": ["Class 11-12", "UG", "PG"],
    "gender_specific": null,
    "disability_required": false,
    "state_specific": "Delhi",
    "special_eligibility": "⚠️ VERIFY DETAILS: Check myscheme.gov.in/schemes/dhtess before demo. Income limit, exact benefit, and institution restrictions need manual confirmation.",
    "deadline": "Check official portal",
    "apply_link": "https://myscheme.gov.in/schemes/dhtess",
    "description": "Delhi UT scheme supporting students in higher and technical education. Verify full eligibility and benefit details at the official myScheme page before use."
  }
];

// Fallback JSON data for SDG 8 Skills & Employment
const fallbackSkills = [
  {
    "id": "s1",
    "name": "Pradhan Mantri Kaushal Vikas Yojana 4.0 (PMKVY 4.0)",
    "provider": "Ministry of Skill Development & Entrepreneurship (MSDE)",
    "type": "Skilling",
    "sdg8_connection": "Short-term skill training aligned with NSQF; 400+ courses including AI, 5G, green hydrogen and drone technology",
    "target_status": ["All"],
    "target_categories": ["All"],
    "gender_specific": null,
    "location_type": "Both",
    "age_min": 15,
    "age_max": 59,
    "income_limit": null,
    "education_req": null,
    "benefit": "Free skill training (7.5–30 hrs micro-credentials to full short-term courses), NSQF certificate, placement support",
    "benefit_type": "Training",
    "official_url": "https://www.skillindiadigital.gov.in/home",
    "application_method": "Online via Skill India Digital portal or nearest PMKVY training centre",
    "deadline_type": "Rolling",
    "verify_before_use": false,
    "verification_note": null,
    "last_verified": "Sep 2026"
  },
  {
    "id": "s2",
    "name": "Pradhan Mantri National Apprenticeship Promotion Scheme (PM-NAPS)",
    "provider": "Ministry of Skill Development & Entrepreneurship (MSDE)",
    "type": "Apprenticeship",
    "sdg8_connection": "On-the-job apprenticeship training; government pays 25% of stipend (up to ₹1,500/month) to employer via DBT",
    "target_status": ["Job-seeker", "Student", "Employed"],
    "target_categories": ["All"],
    "gender_specific": null,
    "location_type": "Both",
    "age_min": 14,
    "age_max": 35,
    "income_limit": null,
    "education_req": null,
    "benefit": "25% of monthly stipend (up to ₹1,500/month) paid by GoI via DBT; earn-while-you-learn with industry exposure",
    "benefit_type": "Stipend",
    "official_url": "https://www.apprenticeshipindia.gov.in",
    "application_method": "Online via apprenticeshipindia.gov.in; employers register establishments and apprentices",
    "deadline_type": "Rolling",
    "verify_before_use": false,
    "verification_note": null,
    "last_verified": "Sep 2026"
  },
  {
    "id": "s3",
    "name": "Jan Shikshan Sansthan (JSS) Scheme",
    "provider": "Ministry of Skill Development & Entrepreneurship (MSDE)",
    "type": "Skilling",
    "sdg8_connection": "Community-based vocational training for non-literates, neo-literates and rural/urban disadvantaged groups",
    "target_status": ["All"],
    "target_categories": ["All"],
    "gender_specific": null,
    "location_type": "Both",
    "age_min": 15,
    "age_max": 45,
    "income_limit": null,
    "education_req": null,
    "benefit": "Low-cost doorstep vocational training linked with NSQF certification; particular focus on women and rural youth",
    "benefit_type": "Training",
    "official_url": "https://jss.gov.in",
    "application_method": "Apply at nearest Jan Shikshan Sansthan centre (one in each district)",
    "deadline_type": "Rolling",
    "verify_before_use": false,
    "verification_note": null,
    "last_verified": "Sep 2026"
  },
  {
    "id": "s4",
    "name": "PM-DAKSH",
    "provider": "Ministry of Social Justice & Empowerment (MSJE)",
    "type": "Skilling",
    "sdg8_connection": "Targeted skilling and employability for SC, OBC, EBC, DNT and safai karamchari communities",
    "target_status": ["Job-seeker", "All"],
    "target_categories": ["SC", "OBC"],
    "gender_specific": null,
    "location_type": "Both",
    "age_min": 18,
    "age_max": 45,
    "income_limit": null,
    "education_req": null,
    "benefit": "Free skill training, stipend during training, toolkit support, placement assistance; training duration 10–365 days",
    "benefit_type": "Training",
    "official_url": "https://www.myscheme.gov.in/schemes/pm-daksh",
    "application_method": "Online via pmasdaksh.dosje.gov.in; apply through registered training partners",
    "deadline_type": "Rolling",
    "verify_before_use": false,
    "verification_note": "Primarily targets SC, OBC, EBC and DNT communities; income limit varies by component — check official portal",
    "last_verified": "Sep 2026"
  },
  {
    "id": "s5",
    "name": "FutureSkills Prime Incentive Program",
    "provider": "Ministry of Electronics & Information Technology (MeitY)",
    "type": "Skilling",
    "sdg8_connection": "Digital and emerging-tech skilling (AI, ML, Big Data, Cloud, IoT, Cybersecurity, AR/VR) for the IT/ITES workforce",
    "target_status": ["Employed", "Job-seeker"],
    "target_categories": ["All"],
    "gender_specific": null,
    "location_type": "Both",
    "age_min": 18,
    "age_max": null,
    "income_limit": null,
    "education_req": "Graduate or equivalent preferred",
    "benefit": "Subsidised/incentivised training in 10 emerging technologies; certification from industry-recognised bodies",
    "benefit_type": "Training",
    "official_url": "https://www.myscheme.gov.in/schemes/fspip",
    "application_method": "Online via futureskillsprime.in through empanelled training providers",
    "deadline_type": "Programme-based",
    "verify_before_use": true,
    "verification_note": "⚠️ Verify current enrolment windows on futureskillsprime.in — batch openings vary by course",
    "last_verified": "Sep 2026"
  },
  {
    "id": "s6",
    "name": "Deen Dayal Upadhyaya Grameen Kaushalya Yojana 2.0 (DDU-GKY 2.0)",
    "provider": "Ministry of Rural Development (MoRD)",
    "type": "Skilling",
    "sdg8_connection": "Placement-linked rural skill training with guaranteed employment in formal sector",
    "target_status": ["Job-seeker"],
    "target_categories": ["All"],
    "gender_specific": null,
    "location_type": "Rural",
    "age_min": 15,
    "age_max": 35,
    "income_limit": null,
    "education_req": null,
    "benefit": "Free residential/non-residential training (3–12 months), food, accommodation, post-placement support; 100% placement-linked",
    "benefit_type": "Training",
    "official_url": "https://ddugky.gov.in",
    "application_method": "Apply at nearest District Rural Development Agency (DRDA) or Common Service Centre",
    "deadline_type": "Rolling",
    "verify_before_use": false,
    "verification_note": "Updated as DDU-GKY 2.0 per May 2025 PIB announcement; eligibility may include up to age 45 in revised version — verify locally",
    "last_verified": "Sep 2026"
  },
  {
    "id": "s7",
    "name": "DAY-NULM – Employment through Skills Training & Placement (EST&P)",
    "provider": "Ministry of Housing & Urban Affairs (MoHUA)",
    "type": "Skilling",
    "sdg8_connection": "Skill training and placement support for urban poor in cities/towns",
    "target_status": ["Job-seeker"],
    "target_categories": ["All"],
    "gender_specific": null,
    "location_type": "Urban",
    "age_min": 18,
    "age_max": 45,
    "income_limit": null,
    "education_req": null,
    "benefit": "Free market-aligned skill training (3–6 months), placement support, post-placement tracking; implemented via Urban Local Bodies",
    "benefit_type": "Training",
    "official_url": "https://nulm.gov.in",
    "application_method": "Apply at your City Livelihood Centre (CLC) or Urban Local Body office",
    "deadline_type": "Rolling",
    "verify_before_use": false,
    "verification_note": "Implemented by states/ULBs — enrolment depends on local batch availability; contact your city municipality",
    "last_verified": "Sep 2026"
  },
  {
    "id": "s8",
    "name": "DAY-NRLM (Deendayal Antyodaya Yojana – National Rural Livelihoods Mission)",
    "provider": "Ministry of Rural Development (MoRD)",
    "type": "Livelihood",
    "sdg8_connection": "Rural self-employment and livelihood support through SHG networks, skill training and credit linkage",
    "target_status": ["All"],
    "target_categories": ["All"],
    "gender_specific": null,
    "location_type": "Rural",
    "age_min": 18,
    "age_max": null,
    "income_limit": null,
    "education_req": null,
    "benefit": "SHG formation + revolving fund (₹15,000) + Community Investment Fund + bank credit linkage + skill training; interest subvention on loans",
    "benefit_type": "Livelihood Support",
    "official_url": "https://aajeevika.gov.in",
    "application_method": "Join or form a Self Help Group (SHG) in your village; contact Block Mission Management Unit",
    "deadline_type": "Rolling",
    "verify_before_use": false,
    "verification_note": null,
    "last_verified": "Sep 2026"
  },
  {
    "id": "s9",
    "name": "Rural Self Employment Training Institutes (RSETIs)",
    "provider": "Ministry of Rural Development (MoRD) + Sponsor Banks",
    "type": "Skilling",
    "sdg8_connection": "Free short-duration self-employment training for rural youth to start their own businesses",
    "target_status": ["Job-seeker", "Entrepreneur"],
    "target_categories": ["All"],
    "gender_specific": null,
    "location_type": "Rural",
    "age_min": 18,
    "age_max": 45,
    "income_limit": null,
    "education_req": null,
    "benefit": "Free 2–6 week residential training in trades like tailoring, mobile repair, agri-business etc.; credit linkage support post-training",
    "benefit_type": "Training",
    "official_url": "https://www.rseti.in",
    "application_method": "Apply at nearest RSETI centre (one per district) or via lead bank in your district",
    "deadline_type": "Rolling",
    "verify_before_use": false,
    "verification_note": null,
    "last_verified": "Sep 2026"
  },
  {
    "id": "s10",
    "name": "Startup India Seed Fund Scheme (SISFS)",
    "provider": "DPIIT, Ministry of Commerce & Industry",
    "type": "Entrepreneurship",
    "sdg8_connection": "Seed funding for early-stage startups for prototype development and market entry",
    "target_status": ["Entrepreneur"],
    "target_categories": ["All"],
    "gender_specific": null,
    "location_type": "Both",
    "age_min": 18,
    "age_max": null,
    "income_limit": null,
    "education_req": null,
    "benefit": "Up to ₹20 lakh as grant for concept/prototype; up to ₹50 lakh as convertible debenture/debt for product development; disbursed via incubators",
    "benefit_type": "Grant/Investment",
    "official_url": "https://seedfund.startupindia.gov.in",
    "application_method": "Apply to SISFS-empanelled incubators via seedfund.startupindia.gov.in; startup must be DPIIT-recognised",
    "deadline_type": "Rolling",
    "verify_before_use": true,
    "verification_note": "⚠️ Must be a DPIIT-recognised startup registered <5 years ago; apply through an approved incubator, not directly to DPIIT",
    "last_verified": "Sep 2026"
  },
  {
    "id": "s11",
    "name": "Atal Innovation Mission (AIM)",
    "provider": "NITI Aayog",
    "type": "Entrepreneurship",
    "sdg8_connection": "Innovation and entrepreneurship ecosystem via Atal Incubation Centres, Atal Tinkering Labs and challenge programmes",
    "target_status": ["Student", "Entrepreneur"],
    "target_categories": ["All"],
    "gender_specific": null,
    "location_type": "Both",
    "age_min": 14,
    "age_max": null,
    "income_limit": null,
    "education_req": null,
    "benefit": "Access to incubation (₹10 crore seed per AIC), Tinkering Labs in schools, mentoring networks and challenge grants; no direct cash benefit to individuals",
    "benefit_type": "Programme Access",
    "official_url": "https://aim.gov.in",
    "application_method": "Through AIM-empanelled Atal Incubation Centres (AICs) or Atal Tinkering Labs (ATLs) at your institution",
    "deadline_type": "Programme-based",
    "verify_before_use": true,
    "verification_note": "⚠️ This is an ecosystem/programme initiative — individual access is through participating institutions and incubators, not a direct scheme",
    "last_verified": "Sep 2026"
  },
  {
    "id": "s12",
    "name": "NIDHI Programme (National Initiative for Developing and Harnessing Innovations)",
    "provider": "Dept. of Science & Technology (DST)",
    "type": "Entrepreneurship",
    "sdg8_connection": "Technology startup and deep-tech innovation support through incubators and accelerators",
    "target_status": ["Entrepreneur"],
    "target_categories": ["All"],
    "gender_specific": null,
    "location_type": "Both",
    "age_min": 18,
    "age_max": null,
    "income_limit": null,
    "education_req": "Science/Tech background preferred",
    "benefit": "Incubation support, mentoring, seed funding and infrastructure through DST-funded incubators; NIDHI framework includes multiple components (PRAYAS, EIR, SSS)",
    "benefit_type": "Programme Access",
    "official_url": "https://nidhi.dst.gov.in",
    "application_method": "Apply to DST-supported technology business incubators (TBIs) in your region via nidhi.dst.gov.in",
    "deadline_type": "Programme-based",
    "verify_before_use": true,
    "verification_note": "⚠️ Institutional programme — apply through a NIDHI-supported TBI, not directly to DST",
    "last_verified": "Sep 2026"
  },
  {
    "id": "s13",
    "name": "NIDHI-PRAYAS (Promoting and Accelerating Young and Aspiring Innovators & Startups)",
    "provider": "Dept. of Science & Technology (DST)",
    "type": "Entrepreneurship",
    "sdg8_connection": "Prototype and early-stage innovation funding for technology entrepreneurs",
    "target_status": ["Entrepreneur"],
    "target_categories": ["All"],
    "gender_specific": null,
    "location_type": "Both",
    "age_min": 18,
    "age_max": null,
    "income_limit": null,
    "education_req": "Science/Engineering/Technology background",
    "benefit": "Up to ₹10 lakh per innovator for prototype development; supported through host incubator infrastructure",
    "benefit_type": "Grant",
    "official_url": "https://nidhi.dst.gov.in/schemes-programmes/",
    "application_method": "Apply through NIDHI-PRAYAS host incubators listed on the DST NIDHI portal",
    "deadline_type": "Programme-based",
    "verify_before_use": true,
    "verification_note": "⚠️ Application is through host incubators, not directly to DST; check nidhi.dst.gov.in for active PRAYAS centres",
    "last_verified": "Sep 2026"
  },
  {
    "id": "s14",
    "name": "NIDHI-Entrepreneur-in-Residence (EIR)",
    "provider": "Dept. of Science & Technology (DST)",
    "type": "Entrepreneurship",
    "sdg8_connection": "Entrepreneurship support for qualified professionals and PhD scholars to pursue tech startup ideas full-time",
    "target_status": ["Entrepreneur"],
    "target_categories": ["All"],
    "gender_specific": null,
    "location_type": "Both",
    "age_min": 18,
    "age_max": null,
    "income_limit": null,
    "education_req": "PhD or 2+ years professional experience in science/engineering",
    "benefit": "Monthly stipend of ₹30,000–₹60,000 for up to 2 years while pursuing a tech startup idea within a NIDHI incubator",
    "benefit_type": "Stipend",
    "official_url": "https://nidhi.dst.gov.in/schemes-programmes/",
    "application_method": "Apply through NIDHI EIR host incubators; selection is competitive with periodic call for applications",
    "deadline_type": "Programme-based",
    "verify_before_use": true,
    "verification_note": "⚠️ Requires PhD or significant professional experience; application through host TBI with periodic calls — check DST portal for open calls",
    "last_verified": "Sep 2026"
  },
  {
    "id": "s15",
    "name": "TIDE 2.0 (Technology Incubation and Development of Entrepreneurs)",
    "provider": "Ministry of Electronics & Information Technology (MeitY)",
    "type": "Entrepreneurship",
    "sdg8_connection": "ICT and deep-tech entrepreneurship support through technology business incubators",
    "target_status": ["Entrepreneur"],
    "target_categories": ["All"],
    "gender_specific": null,
    "location_type": "Both",
    "age_min": 18,
    "age_max": null,
    "income_limit": null,
    "education_req": "Technical background in ICT/software/electronics",
    "benefit": "Incubation, mentoring, infrastructure and seed funding (up to ₹7 lakh as grant) through 51 TIDE 2.0 Technology Business Incubators",
    "benefit_type": "Grant/Incubation",
    "official_url": "https://tide.meity.gov.in",
    "application_method": "Apply to one of the 51 TIDE 2.0 Technology Business Incubators listed on tide.meity.gov.in",
    "deadline_type": "Programme-based",
    "verify_before_use": true,
    "verification_note": "⚠️ Apply through an empanelled TIDE TBI; availability depends on each incubator's intake cycle",
    "last_verified": "Sep 2026"
  },
  {
    "id": "s16",
    "name": "ASPIRE (A Scheme for Promotion of Innovation, Rural Industry and Entrepreneurship)",
    "provider": "Ministry of MSME",
    "type": "Entrepreneurship",
    "sdg8_connection": "Rural entrepreneurship and agri-based industry incubation through Livelihood Business Incubators (LBIs) and Technology Business Incubators (TBIs)",
    "target_status": ["Entrepreneur"],
    "target_categories": ["All"],
    "gender_specific": null,
    "location_type": "Rural",
    "age_min": 18,
    "age_max": null,
    "income_limit": null,
    "education_req": null,
    "benefit": "Incubation support, mentoring and seed funding through ASPIRE Livelihood Business Incubators (LBIs); focused on agri-tech and rural enterprises",
    "benefit_type": "Incubation",
    "official_url": "https://aspire.msme.gov.in",
    "application_method": "Apply to ASPIRE LBIs or TBIs listed on aspire.msme.gov.in",
    "deadline_type": "Programme-based",
    "verify_before_use": true,
    "verification_note": "⚠️ Programme-level scheme; apply through registered incubators — check aspire.msme.gov.in for active LBIs in your region",
    "last_verified": "Sep 2026"
  },
  {
    "id": "s17",
    "name": "Prime Minister's Employment Generation Programme (PMEGP)",
    "provider": "Ministry of MSME via KVIC/KVIB/DIC",
    "type": "Credit",
    "sdg8_connection": "Credit-linked capital subsidy for setting up new micro-enterprises in manufacturing and service sectors",
    "target_status": ["Entrepreneur", "Job-seeker"],
    "target_categories": ["All"],
    "gender_specific": null,
    "location_type": "Both",
    "age_min": 18,
    "age_max": null,
    "income_limit": null,
    "education_req": "Class 8 pass (for projects above ₹10L manufacturing / ₹5L service)",
    "benefit": "15–35% margin money subsidy on project cost. Max project: ₹50L (manufacturing), ₹20L (service). Beneficiary contribution: 10% General / 5% Special categories (SC/ST/OBC/Women/Disabled/Ex-servicemen/NER/Hill areas/Border areas)",
    "benefit_type": "Subsidy",
    "official_url": "https://www.kviconline.gov.in/pmegpeportal",
    "application_method": "Online application on kviconline.gov.in/pmegpeportal; existing units and those who already availed govt subsidy are NOT eligible",
    "deadline_type": "Rolling",
    "verify_before_use": false,
    "verification_note": "No income ceiling. Cannot have availed benefits under any other GoI/State Govt subsidy scheme previously",
    "last_verified": "Sep 2026"
  },
  {
    "id": "s18",
    "name": "Pradhan Mantri MUDRA Yojana (PMMY)",
    "provider": "MUDRA / Department of Financial Services (DFS)",
    "type": "Credit",
    "sdg8_connection": "Collateral-free micro-enterprise credit for non-farm, non-corporate businesses (trading, manufacturing, services)",
    "target_status": ["Entrepreneur", "Self-employed"],
    "target_categories": ["All"],
    "gender_specific": null,
    "location_type": "Both",
    "age_min": 18,
    "age_max": 65,
    "income_limit": null,
    "education_req": null,
    "benefit": "Collateral-free loans in 4 tiers: Shishu (up to ₹50,000) | Kishore (₹50,001–₹5 lakh) | Tarun (₹5–₹10 lakh) | TarunPlus (₹10–₹20 lakh, for Tarun repayers only). No processing fee for Shishu. Women borrowers get preferential rates.",
    "benefit_type": "Loan",
    "official_url": "https://www.mudra.org.in",
    "application_method": "Apply at any scheduled commercial bank, RRB, NBFC or MFI; or online via udyamimitra.in",
    "deadline_type": "Rolling",
    "verify_before_use": false,
    "verification_note": "Business must be non-farm and non-corporate. TarunPlus category only for those who have successfully repaid a Tarun loan.",
    "last_verified": "Sep 2026"
  },
  {
    "id": "s19",
    "name": "Stand-Up India Scheme",
    "provider": "Department of Financial Services (DFS), Ministry of Finance",
    "type": "Credit",
    "sdg8_connection": "Greenfield enterprise financing for SC/ST and women entrepreneurs through bank loans",
    "target_status": ["Entrepreneur"],
    "target_categories": ["All"],
    "eligible_for_all_women": true,
    "gender_specific": null,
    "location_type": "Both",
    "age_min": 18,
    "age_max": null,
    "income_limit": null,
    "education_req": null,
    "benefit": "Composite bank loan of ₹10 lakh to ₹1 crore (75% of project cost). For SC/ST or women entrepreneurs. First-time venture (greenfield) only. 7-year repayment with 18-month moratorium. No collateral under CGSSI guarantee.",
    "benefit_type": "Loan",
    "official_url": "https://www.standupmitra.in",
    "application_method": "Online via standupmitra.in or at any scheduled commercial bank branch",
    "deadline_type": "Rolling",
    "verify_before_use": false,
    "verification_note": "For SC/ST borrowers AND/OR women (either qualifies). Must be first-time venture. Borrower must not be in default with any bank.",
    "last_verified": "Sep 2026"
  },
  {
    "id": "s20",
    "name": "PM SVANidhi (PM Street Vendor's AtmaNirbhar Nidhi)",
    "provider": "Ministry of Housing & Urban Affairs (MoHUA) + DFS",
    "type": "Credit",
    "sdg8_connection": "Working capital loans for urban street vendors to restart and expand livelihoods",
    "target_status": ["Street Vendor"],
    "target_categories": ["All"],
    "gender_specific": null,
    "location_type": "Urban",
    "age_min": 18,
    "age_max": null,
    "income_limit": null,
    "education_req": null,
    "benefit": "Collateral-free working capital loans in 3 progressive tranches: ₹15,000 (1st) → ₹25,000 (2nd) → ₹50,000 (3rd). 7% interest subsidy on timely repayment. UPI-linked RuPay credit card (₹30,000 limit) after 2nd tranche. Extended to 31 March 2030.",
    "benefit_type": "Loan",
    "official_url": "https://pmsvanidhi.mohua.gov.in",
    "application_method": "Online via pmsvanidhi.mohua.gov.in or nearest Common Service Centre or lending bank",
    "deadline_type": "Rolling",
    "verify_before_use": false,
    "verification_note": "Must be an urban street vendor with a Certificate of Vending or Identity Card issued by ULB, OR identified in the ULB vendor survey",
    "last_verified": "Sep 2026"
  },
  {
    "id": "s21",
    "name": "PM Vishwakarma Scheme",
    "provider": "Ministry of MSME",
    "type": "Credit",
    "sdg8_connection": "End-to-end support for traditional artisans and craftspeople in 18 specified trades",
    "target_status": ["Artisan"],
    "target_categories": ["All"],
    "gender_specific": null,
    "location_type": "Both",
    "age_min": 18,
    "age_max": null,
    "income_limit": null,
    "education_req": null,
    "benefit": "PM Vishwakarma Certificate + ID card | ₹500/day stipend during skill training | ₹15,000 toolkit e-voucher | Collateral-free loan: ₹1 lakh (1st tranche) then ₹2 lakh (2nd tranche) at 5% interest | Digital transaction incentives",
    "benefit_type": "Multiple",
    "official_url": "https://pmvishwakarma.gov.in",
    "application_method": "Online via pmvishwakarma.gov.in or at Common Service Centre (CSC); Aadhaar + mobile number required",
    "deadline_type": "Rolling",
    "verify_before_use": false,
    "verification_note": "Covers 18 trades: Carpenter, Blacksmith, Goldsmith, Potter, Cobbler, Mason, Tailor, Barber, Washerman, and 9 more. Must not have availed PMEGP, PM SVANidhi or MUDRA in the past 5 years. Government employees not eligible.",
    "last_verified": "Sep 2026"
  },
  {
    "id": "s22",
    "name": "PM Formalisation of Micro Food Processing Enterprises (PMFME)",
    "provider": "Ministry of Food Processing Industries (MoFPI)",
    "type": "Credit",
    "sdg8_connection": "Support for existing micro food processing enterprises to formalise, upgrade and scale",
    "target_status": ["Entrepreneur", "Self-employed"],
    "target_categories": ["All"],
    "gender_specific": null,
    "location_type": "Both",
    "age_min": 18,
    "age_max": null,
    "income_limit": null,
    "education_req": null,
    "benefit": "35% credit-linked capital subsidy on project cost up to ₹10 lakh (max subsidy ₹3.5 lakh) for existing micro food enterprises; also supports SHG and FPO-based enterprises with higher grants",
    "benefit_type": "Subsidy",
    "official_url": "https://pmfme.mofpi.gov.in",
    "application_method": "Online via pmfme.mofpi.gov.in; apply through the nodal bank in your state",
    "deadline_type": "Rolling",
    "verify_before_use": false,
    "verification_note": "Only for EXISTING micro food processing enterprises (not new startups). Must be registered under Udyam Assist or equivalent.",
    "last_verified": "Sep 2026"
  },
  {
    "id": "s23",
    "name": "SFURTI (Scheme of Fund for Regeneration of Traditional Industries)",
    "provider": "Ministry of MSME",
    "type": "Industry",
    "sdg8_connection": "Cluster development for traditional industry groups (khadi, coir, jute, handicrafts) to improve competitiveness and employment",
    "target_status": ["Artisan", "Self-employed"],
    "target_categories": ["All"],
    "gender_specific": null,
    "location_type": "Both",
    "age_min": 18,
    "age_max": null,
    "income_limit": null,
    "education_req": null,
    "benefit": "Cluster-level funding of ₹2.5–₹10 crore for soft interventions (training, capacity building) and hard interventions (common facility centres, tools, equipment) for artisan clusters",
    "benefit_type": "Cluster Grant",
    "official_url": "https://sfurti.msme.gov.in",
    "application_method": "Cluster applications submitted by Implementing Agencies (NGOs, institutions, industry associations) — individual artisans benefit by joining a notified cluster",
    "deadline_type": "Programme-based",
    "verify_before_use": true,
    "verification_note": "⚠️ Not a direct individual scheme — benefits flow through industry clusters. Check if your trade/region has an active SFURTI cluster.",
    "last_verified": "Sep 2026"
  },
  {
    "id": "s24",
    "name": "National SC-ST Hub",
    "provider": "Ministry of MSME",
    "type": "Industry",
    "sdg8_connection": "Entrepreneurship support, procurement facilitation and mentoring for SC/ST entrepreneurs in MSME ecosystem",
    "target_status": ["Entrepreneur"],
    "target_categories": ["SC", "ST"],
    "gender_specific": null,
    "location_type": "Both",
    "age_min": 18,
    "age_max": null,
    "income_limit": null,
    "education_req": null,
    "benefit": "Procurement facilitation (25% public procurement reservation for MSMEs includes SC/ST sub-target), mentoring, credit facilitation, vendor development and skill training for SC/ST entrepreneurs",
    "benefit_type": "Programme Access",
    "official_url": "https://scsthub.in",
    "application_method": "Register on scsthub.in; workshops and programmes announced periodically",
    "deadline_type": "Rolling",
    "verify_before_use": false,
    "verification_note": "Must be an SC/ST entrepreneur running an MSME. Provides facilitation support, not direct cash benefit.",
    "last_verified": "Sep 2026"
  },
  {
    "id": "s25",
    "name": "Entrepreneurship and Skill Development Programme (ESDP)",
    "provider": "Ministry of MSME / O/o DC-MSME",
    "type": "Skilling",
    "sdg8_connection": "Short-duration entrepreneurship development and skill training programmes for aspiring entrepreneurs",
    "target_status": ["Job-seeker", "Entrepreneur"],
    "target_categories": ["All"],
    "gender_specific": null,
    "location_type": "Both",
    "age_min": 18,
    "age_max": null,
    "income_limit": null,
    "education_req": null,
    "benefit": "Low-cost/free short-term EDP and skill training programmes (1 week to 3 months) at MSME-DI centres and partner institutions across India",
    "benefit_type": "Training",
    "official_url": "https://msme.gov.in",
    "application_method": "Contact nearest MSME Development & Facilitation Office (MSME-DFO / MSME-DI) or check msme.gov.in for upcoming programmes",
    "deadline_type": "Programme-based",
    "verify_before_use": true,
    "verification_note": "⚠️ Programmes are announced periodically with varying schedules — check the MSME portal or your nearest MSME-DI for upcoming batches",
    "last_verified": "Sep 2026"
  },
  {
    "id": "s26",
    "name": "Coir Udyami Yojana",
    "provider": "Coir Board, Ministry of MSME",
    "type": "Credit",
    "sdg8_connection": "Credit-linked subsidy for setting up coir processing and manufacturing enterprises",
    "target_status": ["Entrepreneur"],
    "target_categories": ["All"],
    "gender_specific": null,
    "location_type": "Both",
    "age_min": 18,
    "age_max": null,
    "income_limit": null,
    "education_req": null,
    "benefit": "40% government subsidy on projects up to ₹10 lakh (max subsidy ₹4 lakh) for setting up coir units; balance financed by bank loan (55%) and beneficiary contribution (5%)",
    "benefit_type": "Subsidy",
    "official_url": "https://coirboard.gov.in",
    "application_method": "Apply via coirboard.gov.in or nearest Coir Board regional office",
    "deadline_type": "Rolling",
    "verify_before_use": false,
    "verification_note": "Specific to coir industry enterprises. Coir Board verifies technical and commercial viability before sanctioning.",
    "last_verified": "Sep 2026"
  },
  {
    "id": "s27",
    "name": "Start-up Village Entrepreneurship Programme (SVEP)",
    "provider": "Ministry of Rural Development (MoRD) under DAY-NRLM",
    "type": "Livelihood",
    "sdg8_connection": "Rural micro-enterprise development through community cadres (Community Resource Persons for Enterprise Promotion — CRPs-EP)",
    "target_status": ["Entrepreneur", "Self-employed"],
    "target_categories": ["All"],
    "gender_specific": null,
    "location_type": "Rural",
    "age_min": 18,
    "age_max": null,
    "income_limit": null,
    "education_req": null,
    "benefit": "Start-up loan (₹50,000–₹1 lakh), enterprise promotion training, handholding support by CRPs-EP and business development services for rural micro-enterprises under NRLM SHG network",
    "benefit_type": "Loan + Support",
    "official_url": "https://aajeevika.gov.in",
    "application_method": "Connect with your Block Mission Management Unit (BMMU) or Cluster Level Federation (CLF) under DAY-NRLM",
    "deadline_type": "Rolling",
    "verify_before_use": false,
    "verification_note": "Implemented via DAY-NRLM SHG ecosystem in specific blocks — availability depends on whether your block is a SVEP block",
    "last_verified": "Sep 2026"
  },
  {
    "id": "s28",
    "name": "NSFDC Skill Development Programmes",
    "provider": "National Scheduled Castes Finance & Development Corporation (NSFDC)",
    "type": "Skilling",
    "sdg8_connection": "Skill training and livelihood development for SC communities through SHG and individual beneficiary models",
    "target_status": ["Job-seeker", "All"],
    "target_categories": ["SC"],
    "gender_specific": null,
    "location_type": "Both",
    "age_min": 18,
    "age_max": null,
    "income_limit": 300000,
    "education_req": null,
    "benefit": "Free/subsidised skill training in market-linked trades; credit linkage for self-employment post-training; implemented through State Channelising Agencies (SCAs)",
    "benefit_type": "Training",
    "official_url": "https://www.nsfdc.nic.in",
    "application_method": "Apply via your State Channelising Agency (SCA) — usually the state SC Development Corporation",
    "deadline_type": "Rolling",
    "verify_before_use": true,
    "verification_note": "⚠️ Income limit typically ₹3 lakh/year (double the poverty line income); apply through your state's SC Development Corporation, not directly to NSFDC",
    "last_verified": "Sep 2026"
  },
  {
    "id": "s29",
    "name": "Craftsmen Training Scheme (CTS) – ITI Training",
    "provider": "Directorate General of Training (DGT) / Ministry of Skill Development & Entrepreneurship",
    "type": "Skilling",
    "sdg8_connection": "Long-duration (1–2 year) vocational training in 130+ trades at Industrial Training Institutes for formal employment and self-employment",
    "target_status": ["Student", "Job-seeker"],
    "target_categories": ["All"],
    "gender_specific": null,
    "location_type": "Both",
    "age_min": 14,
    "age_max": 40,
    "income_limit": null,
    "education_req": "Class 8 pass minimum (Class 10 for certain trades)",
    "benefit": "NSQF-aligned ITI certificate recognised by industry + government; training in engineering and non-engineering trades; SC/ST/Women fee concessions at government ITIs",
    "benefit_type": "Training",
    "official_url": "https://dgt.gov.in",
    "application_method": "Annual admission via state ITI admission portal; check dgt.gov.in for centralised counselling calendar",
    "deadline_type": "Annual",
    "verify_before_use": false,
    "verification_note": "Annual intake typically in July–August. SC/ST/OBC/Women get seat reservations and fee waivers at government ITIs as per state rules.",
    "last_verified": "Sep 2026"
  },
  {
    "id": "s30",
    "name": "Pradhan Mantri Viksit Bharat Rozgar Yojana (PM-VBRY)",
    "provider": "Ministry of Labour & Employment / EPFO",
    "type": "Employment",
    "sdg8_connection": "Employment-linked financial incentive for first-time formal sector employees and employers creating additional jobs",
    "target_status": ["Job-seeker", "Employed"],
    "target_categories": ["All"],
    "gender_specific": null,
    "location_type": "Both",
    "age_min": 18,
    "age_max": null,
    "income_limit": 100000,
    "education_req": null,
    "benefit": "Part A (Employees): One-time incentive = 1 month's EPF wage, capped at ₹15,000, paid in instalments after 6 and 12 months of service. Part B (Employers): Up to ₹3,000/month per additional employee for 2 years (4 years in manufacturing). Total scheme outlay: ₹99,446 crore.",
    "benefit_type": "Incentive",
    "official_url": "https://pmvbry.labour.gov.in",
    "application_method": "Registration via EPFO UAN; Aadhaar-authenticated via Face Authentication on UMANG app; employer registers on Shram Suvidha portal",
    "deadline_type": "Annual",
    "verify_before_use": false,
    "verification_note": "Must be a FIRST-TIME EPFO member (not previously registered). Monthly wage must be ≤₹1 lakh. Registration window: 1 Aug 2025 – 31 Jul 2027. Launched 15 Aug 2025 (formerly ELI Scheme).",
    "last_verified": "Sep 2026"
  }
];

// Fallback JSON data for SDG 1 No Poverty Schemes
const fallbackPoverty = [
  {
    "name": "MGNREGS / MGNREGA",
    "provider": "Ministry of Rural Development",
    "type": "Employment",
    "description": "Guarantees 100 days of unskilled wage employment per financial year to any rural household willing to do manual work. Wage rates range from ~₹230–375/day depending on state.",
    "amount_per_year": 36000,
    "eligible_categories": ["All"],
    "max_income": "1-2.5L",
    "eligible_courses": ["All"],
    "target_status": ["All"],
    "location_type": "Rural",
    "gender_specific": null,
    "eligible_for_all_women": false,
    "disability_required": false,
    "state_specific": null,
    "deadline": "Ongoing",
    "apply_link": "https://nrega.nic.in",
    "verify_before_use": false
  },
  {
    "name": "DAY-NRLM (Aajeevika)",
    "provider": "Ministry of Rural Development",
    "type": "Livelihood",
    "description": "Organises rural women into Self-Help Groups and provides revolving fund (₹15,000 per SHG), skill training, and livelihood support with bank linkage.",
    "amount_per_year": 15000,
    "eligible_categories": ["All"],
    "max_income": "Below 1L",
    "eligible_courses": ["All"],
    "target_status": ["All"],
    "location_type": "Rural",
    "gender_specific": "Female",
    "eligible_for_all_women": false,
    "disability_required": false,
    "state_specific": null,
    "deadline": "Ongoing",
    "apply_link": "https://aajeevika.gov.in",
    "verify_before_use": true
  },
  {
    "name": "DAY-NULM",
    "provider": "Ministry of Housing and Urban Affairs",
    "type": "Livelihood",
    "description": "Supports urban poor through skill training, SHG formation, credit linkage, and shelter for homeless. Specifically covers urban street vendors and job-seekers.",
    "amount_per_year": 0,
    "eligible_categories": ["All"],
    "max_income": "Below 1L",
    "eligible_courses": ["All"],
    "target_status": ["Job-seeker", "Self-employed", "Street Vendor"],
    "location_type": "Urban",
    "gender_specific": null,
    "eligible_for_all_women": false,
    "disability_required": false,
    "state_specific": null,
    "deadline": "Ongoing",
    "apply_link": "https://nulm.gov.in",
    "verify_before_use": true
  },
  {
    "name": "National Social Assistance Programme (NSAP)",
    "provider": "Ministry of Rural Development",
    "type": "Social Protection",
    "description": "Monthly pensions for BPL households: old age pension ₹200–500/month (IGNOAPS), widow pension ₹300–500/month (IGNWPS), disability pension ₹300/month (IGNDPS). States top up.",
    "amount_per_year": 6000,
    "eligible_categories": ["All"],
    "max_income": "Below 1L",
    "eligible_courses": ["All"],
    "target_status": ["All"],
    "location_type": "Both",
    "gender_specific": null,
    "eligible_for_all_women": false,
    "disability_required": false,
    "state_specific": null,
    "deadline": "Ongoing",
    "apply_link": "https://nsap.nic.in",
    "verify_before_use": true
  },
  {
    "name": "PM Awas Yojana – Gramin (PMAY-G)",
    "provider": "Ministry of Rural Development",
    "type": "Housing",
    "description": "Financial assistance of ₹1.2 lakh (plains) or ₹1.3 lakh (hilly/NE areas) for construction of a pucca house. SC/ST, minorities, and women-headed households are prioritised.",
    "amount_per_year": 120000,
    "eligible_categories": ["All"],
    "max_income": "Below 1L",
    "eligible_courses": ["All"],
    "target_status": ["All"],
    "location_type": "Rural",
    "gender_specific": null,
    "eligible_for_all_women": false,
    "disability_required": false,
    "state_specific": null,
    "deadline": "Ongoing",
    "apply_link": "https://pmayg.nic.in",
    "verify_before_use": true
  },
  {
    "name": "PM Awas Yojana – Urban 2.0 (PMAY-U 2.0)",
    "provider": "Ministry of Housing and Urban Affairs",
    "type": "Housing",
    "description": "Housing assistance for urban EWS/LIG/MIG families. EWS (income up to ₹3L) and LIG (₹3–6L) get interest subsidy up to ₹2.5 lakh on home loans.",
    "amount_per_year": 250000,
    "eligible_categories": ["All"],
    "max_income": "2.5-5L",
    "eligible_courses": ["All"],
    "target_status": ["All"],
    "location_type": "Urban",
    "gender_specific": null,
    "eligible_for_all_women": false,
    "disability_required": false,
    "state_specific": null,
    "deadline": "Ongoing",
    "apply_link": "https://pmaymis.gov.in",
    "verify_before_use": true
  },
  {
    "name": "Pradhan Mantri Jan Dhan Yojana (PMJDY)",
    "provider": "Ministry of Finance",
    "type": "Financial Inclusion",
    "description": "Zero-balance bank account with RuPay debit card, ₹10,000 overdraft facility, and ₹2 lakh accidental insurance cover. Gateway to all government DBT benefits.",
    "amount_per_year": 10000,
    "eligible_categories": ["All"],
    "max_income": null,
    "eligible_courses": ["All"],
    "target_status": ["All"],
    "location_type": "Both",
    "gender_specific": null,
    "eligible_for_all_women": false,
    "disability_required": false,
    "state_specific": null,
    "deadline": "Ongoing",
    "apply_link": "https://pmjdy.gov.in",
    "verify_before_use": false
  },
  {
    "name": "Pradhan Mantri Jeevan Jyoti Bima Yojana (PMJJBY)",
    "provider": "Ministry of Finance",
    "type": "Insurance",
    "description": "Life insurance cover of ₹2 lakh at a premium of just ₹436/year for bank account holders aged 18–50. Premium auto-debited annually from bank account.",
    "amount_per_year": 200000,
    "eligible_categories": ["All"],
    "max_income": "2.5-5L",
    "eligible_courses": ["All"],
    "target_status": ["All"],
    "location_type": "Both",
    "gender_specific": null,
    "eligible_for_all_women": false,
    "disability_required": false,
    "state_specific": null,
    "deadline": "Ongoing — enrol by 31 May each year",
    "apply_link": "https://jansuraksha.gov.in",
    "verify_before_use": false
  },
  {
    "name": "Pradhan Mantri Suraksha Bima Yojana (PMSBY)",
    "provider": "Ministry of Finance",
    "type": "Insurance",
    "description": "Accidental death and disability cover of ₹2 lakh at just ₹20/year for bank account holders aged 18–70.",
    "amount_per_year": 200000,
    "eligible_categories": ["All"],
    "max_income": "2.5-5L",
    "eligible_courses": ["All"],
    "target_status": ["All"],
    "location_type": "Both",
    "gender_specific": null,
    "eligible_for_all_women": false,
    "disability_required": false,
    "state_specific": null,
    "deadline": "Ongoing — renew by 31 May each year",
    "apply_link": "https://jansuraksha.gov.in",
    "verify_before_use": false
  },
  {
    "name": "Atal Pension Yojana (APY)",
    "provider": "PFRDA",
    "type": "Pension",
    "description": "Guaranteed pension of ₹1,000–5,000/month after age 60 for unorganised sector workers. Monthly contribution of ₹42–210 depending on age of entry and chosen pension amount.",
    "amount_per_year": 60000,
    "eligible_categories": ["All"],
    "max_income": "2.5-5L",
    "eligible_courses": ["All"],
    "target_status": ["Self-employed", "Job-seeker", "Artisan", "Street Vendor", "Farmer"],
    "location_type": "Both",
    "gender_specific": null,
    "eligible_for_all_women": false,
    "disability_required": false,
    "state_specific": null,
    "deadline": "Ongoing — enrol before age 40",
    "apply_link": "https://www.npscra.nsdl.co.in",
    "verify_before_use": false
  },
  {
    "name": "PM-KISAN",
    "provider": "Ministry of Agriculture and Farmers Welfare",
    "type": "Income Support",
    "description": "Direct income support of ₹6,000/year in three installments of ₹2,000 each to all farmer families with cultivable land, regardless of land size.",
    "amount_per_year": 6000,
    "eligible_categories": ["All"],
    "max_income": null,
    "eligible_courses": ["All"],
    "target_status": ["Farmer"],
    "location_type": "Both",
    "gender_specific": null,
    "eligible_for_all_women": false,
    "disability_required": false,
    "state_specific": null,
    "deadline": "Ongoing",
    "apply_link": "https://pmkisan.gov.in",
    "verify_before_use": true
  },
  {
    "name": "Pradhan Mantri Fasal Bima Yojana (PMFBY)",
    "provider": "Ministry of Agriculture and Farmers Welfare",
    "type": "Insurance",
    "description": "Crop insurance for farmers. Farmer pays just 1.5–5% of sum insured as premium; government pays the rest. Covers pre-sowing, standing crop, and post-harvest losses.",
    "amount_per_year": 0,
    "eligible_categories": ["All"],
    "max_income": null,
    "eligible_courses": ["All"],
    "target_status": ["Farmer"],
    "location_type": "Both",
    "gender_specific": null,
    "eligible_for_all_women": false,
    "disability_required": false,
    "state_specific": null,
    "deadline": "Seasonal — varies by crop and state",
    "apply_link": "https://pmfby.gov.in",
    "verify_before_use": true
  },
  {
    "name": "PM-Kisan Maandhan Yojana (PM-KMY)",
    "provider": "Ministry of Agriculture and Farmers Welfare",
    "type": "Pension",
    "description": "Pension of ₹3,000/month after age 60 for small and marginal farmers. Monthly contribution of ₹55–200 depending on age of entry. Must enrol between ages 18–40.",
    "amount_per_year": 36000,
    "eligible_categories": ["All"],
    "max_income": "1-2.5L",
    "eligible_courses": ["All"],
    "target_status": ["Farmer"],
    "location_type": "Both",
    "gender_specific": null,
    "eligible_for_all_women": false,
    "disability_required": false,
    "state_specific": null,
    "deadline": "Ongoing — enrol between age 18–40",
    "apply_link": "https://maandhan.in",
    "verify_before_use": true
  },
  {
    "name": "PM SVANidhi",
    "provider": "Ministry of Housing and Urban Affairs",
    "type": "Micro Credit",
    "description": "Collateral-free working capital loans for street vendors: ₹10,000 (1st loan) → ₹20,000 (2nd) → ₹50,000 (3rd). 7% interest subsidy on timely repayment.",
    "amount_per_year": 50000,
    "eligible_categories": ["All"],
    "max_income": "Below 1L",
    "eligible_courses": ["All"],
    "target_status": ["Street Vendor"],
    "location_type": "Urban",
    "gender_specific": null,
    "eligible_for_all_women": false,
    "disability_required": false,
    "state_specific": null,
    "deadline": "Ongoing",
    "apply_link": "https://pmsvanidhi.mohua.gov.in",
    "verify_before_use": false
  },
  {
    "name": "PM Vishwakarma",
    "provider": "Ministry of MSME",
    "type": "Livelihood",
    "description": "Support for 18 traditional trades (carpenter, blacksmith, goldsmith, potter, tailor, etc.): free skill training + ₹500/day stipend, ₹15,000 toolkit grant, and collateral-free loans up to ₹3 lakh.",
    "amount_per_year": 300000,
    "eligible_categories": ["All"],
    "max_income": "1-2.5L",
    "eligible_courses": ["All"],
    "target_status": ["Artisan"],
    "location_type": "Both",
    "gender_specific": null,
    "eligible_for_all_women": false,
    "disability_required": false,
    "state_specific": null,
    "deadline": "Ongoing",
    "apply_link": "https://pmvishwakarma.gov.in",
    "verify_before_use": true
  },
  {
    "name": "PM Formalisation of Micro Food Processing (PMFME)",
    "provider": "Ministry of Food Processing Industries",
    "type": "Entrepreneurship",
    "description": "35% capital subsidy (max ₹10 lakh) for existing micro food processing units, SHGs, and FPOs. Covers equipment upgrades, FSSAI certification, and market access support.",
    "amount_per_year": 1000000,
    "eligible_categories": ["All"],
    "max_income": "2.5-5L",
    "eligible_courses": ["All"],
    "target_status": ["Entrepreneur", "Self-employed"],
    "location_type": "Both",
    "gender_specific": null,
    "eligible_for_all_women": false,
    "disability_required": false,
    "state_specific": null,
    "deadline": "Ongoing",
    "apply_link": "https://www.mofpi.gov.in/pmfme",
    "verify_before_use": true
  },
  {
    "name": "Prime Minister's Employment Generation Programme (PMEGP)",
    "provider": "Ministry of MSME / KVIC",
    "type": "Entrepreneurship",
    "description": "Subsidy of 15–35% on project cost to set up micro enterprises. SC/ST/women/rural/PH applicants get 25–35% subsidy. Manufacturing projects up to ₹50L; service projects up to ₹20L.",
    "amount_per_year": 1750000,
    "eligible_categories": ["All"],
    "max_income": null,
    "eligible_courses": ["All"],
    "target_status": ["Entrepreneur", "Job-seeker"],
    "location_type": "Both",
    "gender_specific": null,
    "eligible_for_all_women": false,
    "disability_required": false,
    "state_specific": null,
    "deadline": "Ongoing",
    "apply_link": "https://www.kviconline.gov.in/pmegpeportal",
    "verify_before_use": true
  },
  {
    "name": "Pradhan Mantri MUDRA Yojana (PMMY)",
    "provider": "Ministry of Finance / MUDRA",
    "type": "Micro Credit",
    "description": "Collateral-free business loans for non-farm micro enterprises: Shishu (up to ₹50K), Kishore (₹50K–5L), Tarun (₹5L–10L), Tarun Plus (₹10L–20L).",
    "amount_per_year": 2000000,
    "eligible_categories": ["All"],
    "max_income": null,
    "eligible_courses": ["All"],
    "target_status": ["Entrepreneur", "Self-employed", "Artisan", "Street Vendor"],
    "location_type": "Both",
    "gender_specific": null,
    "eligible_for_all_women": false,
    "disability_required": false,
    "state_specific": null,
    "deadline": "Ongoing",
    "apply_link": "https://www.mudra.org.in",
    "verify_before_use": false
  },
  {
    "name": "Stand-Up India",
    "provider": "Ministry of Finance / SIDBI",
    "type": "Entrepreneurship",
    "description": "Bank loans of ₹10 lakh to ₹1 crore for SC/ST and women entrepreneurs to set up greenfield enterprises. Also listed under SDG 8 (Skills and Employment tab).",
    "amount_per_year": 10000000,
    "eligible_categories": ["SC", "ST"],
    "max_income": null,
    "eligible_courses": ["All"],
    "target_status": ["Entrepreneur"],
    "location_type": "Both",
    "gender_specific": null,
    "eligible_for_all_women": true,
    "disability_required": false,
    "state_specific": null,
    "deadline": "Ongoing",
    "apply_link": "https://www.standupmitra.in",
    "verify_before_use": true
  },
  {
    "name": "Pradhan Mantri Ujjwala Yojana (PMUY)",
    "provider": "Ministry of Petroleum and Natural Gas",
    "type": "Welfare",
    "description": "Free LPG connection including cylinder and stove for BPL households. Targeted at women from SC/ST, PMAY-G beneficiaries, AAY and BPL families.",
    "amount_per_year": 1600,
    "eligible_categories": ["All"],
    "max_income": "Below 1L",
    "eligible_courses": ["All"],
    "target_status": ["All"],
    "location_type": "Both",
    "gender_specific": "Female",
    "eligible_for_all_women": false,
    "disability_required": false,
    "state_specific": null,
    "deadline": "Ongoing",
    "apply_link": "https://www.pmuy.gov.in",
    "verify_before_use": false
  },
  {
    "name": "National Food Security Act (NFSA) / Free Grain",
    "provider": "Ministry of Consumer Affairs, Food and Public Distribution",
    "type": "Food Security",
    "description": "5 kg of free food grains (rice, wheat, or coarse cereals) per person per month through PDS ration card under PM Garib Kalyan Anna Yojana (PMGKAY).",
    "amount_per_year": 6000,
    "eligible_categories": ["All"],
    "max_income": "Below 1L",
    "eligible_courses": ["All"],
    "target_status": ["All"],
    "location_type": "Both",
    "gender_specific": null,
    "eligible_for_all_women": false,
    "disability_required": false,
    "state_specific": null,
    "deadline": "Ongoing",
    "apply_link": "https://dfpd.gov.in/nfsa.htm",
    "verify_before_use": true
  },
  {
    "name": "PM POSHAN (Mid-Day Meal Scheme)",
    "provider": "Ministry of Education",
    "type": "Nutrition",
    "description": "Free hot nutritious meal every school day for children in government schools from Class 1 to Class 8. Note: scheme covers up to Class 8 only — verify current scope.",
    "amount_per_year": 0,
    "eligible_categories": ["All"],
    "max_income": null,
    "eligible_courses": ["Class 9-10"],
    "target_status": ["Student"],
    "location_type": "Both",
    "gender_specific": null,
    "eligible_for_all_women": false,
    "disability_required": false,
    "state_specific": null,
    "deadline": "Ongoing",
    "apply_link": "https://pmposhan.education.gov.in",
    "verify_before_use": true
  },
  {
    "name": "Pradhan Mantri Matru Vandana Yojana (PMMVY)",
    "provider": "Ministry of Women and Child Development",
    "type": "Maternity Benefit",
    "description": "Cash incentive of ₹5,000 in three installments for the first live birth. Requires registration at healthcare provider and minimum two antenatal check-ups. Applicant must be aged 19+.",
    "amount_per_year": 5000,
    "eligible_categories": ["All"],
    "max_income": null,
    "eligible_courses": ["All"],
    "target_status": ["All"],
    "location_type": "Both",
    "gender_specific": "Female",
    "eligible_for_all_women": false,
    "disability_required": false,
    "state_specific": null,
    "deadline": "Ongoing",
    "apply_link": "https://pmmvy.wcd.gov.in",
    "verify_before_use": true
  },
  {
    "name": "Ayushman Bharat – PM-JAY",
    "provider": "National Health Authority",
    "type": "Health Insurance",
    "description": "Cashless health insurance cover of ₹5 lakh per family per year for secondary and tertiary hospitalisation at empanelled hospitals. Covers bottom 40% of population by SECC data.",
    "amount_per_year": 500000,
    "eligible_categories": ["All"],
    "max_income": "Below 1L",
    "eligible_courses": ["All"],
    "target_status": ["All"],
    "location_type": "Both",
    "gender_specific": null,
    "eligible_for_all_women": false,
    "disability_required": false,
    "state_specific": null,
    "deadline": "Ongoing",
    "apply_link": "https://pmjay.gov.in",
    "verify_before_use": true
  },
  {
    "name": "PM-JANMAN",
    "provider": "Ministry of Tribal Affairs",
    "type": "Tribal Development",
    "description": "Comprehensive development package for 75 Particularly Vulnerable Tribal Group (PVTG) communities: housing, clean water, education, health, and livelihood support.",
    "amount_per_year": 0,
    "eligible_categories": ["ST"],
    "max_income": "Below 1L",
    "eligible_courses": ["All"],
    "target_status": ["All"],
    "location_type": "Rural",
    "gender_specific": null,
    "eligible_for_all_women": false,
    "disability_required": false,
    "state_specific": null,
    "deadline": "Ongoing",
    "apply_link": "https://tribal.nic.in",
    "verify_before_use": true
  },
  {
    "name": "PM Adarsh Gram Yojana (PM-AJAY)",
    "provider": "Ministry of Social Justice and Empowerment",
    "type": "Village Development",
    "description": "Integrated development of villages where SC population exceeds 50%: roads, schools, health centres, and convergence of social welfare schemes for SC communities.",
    "amount_per_year": 0,
    "eligible_categories": ["SC"],
    "max_income": "Below 1L",
    "eligible_courses": ["All"],
    "target_status": ["All"],
    "location_type": "Rural",
    "gender_specific": null,
    "eligible_for_all_women": false,
    "disability_required": false,
    "state_specific": null,
    "deadline": "Ongoing",
    "apply_link": "https://socialjustice.gov.in",
    "verify_before_use": true
  },
  {
    "name": "Rural Self Employment Training Institutes (RSETI)",
    "provider": "Ministry of Rural Development / Banks",
    "type": "Skill Training",
    "description": "Free short-term residential skill training (3–26 weeks) for rural youth with bank credit linkage for self-employment. Run by banks at district level across India.",
    "amount_per_year": 0,
    "eligible_categories": ["All"],
    "max_income": "1-2.5L",
    "eligible_courses": ["All"],
    "target_status": ["Job-seeker", "Student"],
    "location_type": "Rural",
    "gender_specific": null,
    "eligible_for_all_women": false,
    "disability_required": false,
    "state_specific": null,
    "deadline": "Batches ongoing throughout the year",
    "apply_link": "https://rseti.in",
    "verify_before_use": false
  },
  {
    "name": "DDU-GKY",
    "provider": "Ministry of Rural Development",
    "type": "Skill Training",
    "description": "Free residential skill training for rural poor youth aged 15–35 with guaranteed placement assistance. Prioritises SC/ST, minorities, women, and BPL households.",
    "amount_per_year": 0,
    "eligible_categories": ["All"],
    "max_income": "Below 1L",
    "eligible_courses": ["Class 9-10", "Class 11-12", "UG", "Graduated/Working"],
    "target_status": ["Job-seeker", "Student"],
    "location_type": "Rural",
    "gender_specific": null,
    "eligible_for_all_women": false,
    "disability_required": false,
    "state_specific": null,
    "deadline": "Ongoing — batch admissions",
    "apply_link": "https://ddugky.gov.in",
    "verify_before_use": false
  },
  {
    "name": "Watershed Development (WDC-PMKSY)",
    "provider": "Department of Land Resources, MoRD",
    "type": "Agricultural Support",
    "description": "Improves water retention, soil health, and land productivity in rainfed/drought-prone areas through water harvesting, afforestation, and livelihood activities for farmer communities.",
    "amount_per_year": 0,
    "eligible_categories": ["All"],
    "max_income": "1-2.5L",
    "eligible_courses": ["All"],
    "target_status": ["Farmer", "Self-employed"],
    "location_type": "Rural",
    "gender_specific": null,
    "eligible_for_all_women": false,
    "disability_required": false,
    "state_specific": null,
    "deadline": "Ongoing — district/area specific",
    "apply_link": "https://dolr.gov.in/pmksy",
    "verify_before_use": true
  },
  {
    "name": "Pradhan Mantri Gram Sadak Yojana (PMGSY)",
    "provider": "Ministry of Rural Development",
    "type": "Infrastructure",
    "description": "All-weather road connectivity to unconnected rural habitations (≥500 population in plains, ≥250 in hilly/tribal areas). Benefits entire rural communities through improved market and service access.",
    "amount_per_year": 0,
    "eligible_categories": ["All"],
    "max_income": null,
    "eligible_courses": ["All"],
    "target_status": ["All"],
    "location_type": "Rural",
    "gender_specific": null,
    "eligible_for_all_women": false,
    "disability_required": false,
    "state_specific": null,
    "deadline": "Ongoing — apply through Gram Panchayat",
    "apply_link": "https://pmgsy.nic.in",
    "verify_before_use": true
  }
];

// Initialize application
document.addEventListener("DOMContentLoaded", () => {
  restoreFormFromLocalStorage();
  loadData();

  // SDG 8 conditional sub-sections listener
  const situationSel = document.getElementById("sdg8-situation");
  const subMap = {
    'Student':       'sub-student',
    'Unemployed':    'sub-unemployed',
    'Employed':      'sub-employed',
    'Self-employed': 'sub-entrepreneur',
    'Entrepreneur':  'sub-entrepreneur',
    'Farmer':        'sub-farmer',
    'Artisan':       'sub-artisan',
    'Street Vendor': 'sub-vendor'
  };

  function updateSubSections(val) {
    document.querySelectorAll('.sdg8-sub').forEach(el => {
      el.style.display = 'none';
    });
    const targetId = subMap[val];
    if (targetId) {
      const target = document.getElementById(targetId);
      if (target) target.style.display = 'block';
    }
  }

  if (situationSel) {
    situationSel.addEventListener("change", function () {
      updateSubSections(this.value);
    });
  }

  // Event listener for SDG 4 Form Submit
  const submitSDG4 = document.getElementById("submit-sdg4");
  if (submitSDG4) {
    submitSDG4.addEventListener("click", () => {
      syncSDG4ToFilter();
      saveFormToLocalStorage();
      filterAndDisplaySchemes();
    });
  }

  // Event listener for SDG 8 Form Submit
  const submitSDG8 = document.getElementById("submit-sdg8");
  if (submitSDG8) {
    submitSDG8.addEventListener("click", () => {
      syncSDG8ToFilter();
      saveFormToLocalStorage();
      filterAndDisplaySchemes();
    });
  }

  // Event listener for SDG 1 Form Submit
  const submitSDG1 = document.getElementById("submit-sdg1");
  if (submitSDG1) {
    submitSDG1.addEventListener("click", () => {
      syncSDG1ToFilter();
      saveFormToLocalStorage();
      filterAndDisplaySchemes();
    });
  }

  // Event listener for "Find My Schemes" button
  const findBtn = document.getElementById("find-btn");
  if (findBtn) {
    findBtn.addEventListener("click", () => {
      saveFormToLocalStorage();
      filterAndDisplaySchemes();
    });
  }

  // Event listener for "Try a Sample Profile" button
  const sampleBtn = document.getElementById("sample-profile-btn");
  if (sampleBtn) {
    sampleBtn.addEventListener("click", applySampleProfile);
  }

  // Event listener for "Clear saved form" link
  const clearBtn = document.getElementById("clear-saved-btn");
  if (clearBtn) {
    clearBtn.addEventListener("click", clearSavedForm);
  }

  // Support form submission
  const form = document.getElementById("eligibility-form");
  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      saveFormToLocalStorage();
      filterAndDisplaySchemes();
    });
  }
});

// Sync helpers to populate filter fields from SDG specific forms
function syncSDG4ToFilter() {
  const gender = document.getElementById("sdg4-gender");
  const cat = document.getElementById("sdg4-category");
  const income = document.getElementById("sdg4-income");
  const eduStatus = document.getElementById("sdg4-edu-status");
  const state = document.getElementById("sdg4-state");
  const dis = document.querySelector('input[name="sdg4-disability"]:checked');

  if (gender && document.getElementById("gender")) document.getElementById("gender").value = gender.value;
  if (cat && document.getElementById("category")) document.getElementById("category").value = cat.value;
  if (income && document.getElementById("income")) document.getElementById("income").value = income.value;
  if (state && document.getElementById("state")) document.getElementById("state").value = state.value;
  if (document.getElementById("current-status")) document.getElementById("current-status").value = "Student";
  if (document.getElementById("location-type")) document.getElementById("location-type").value = "Both";
  if (dis && document.getElementById("disability")) {
    document.getElementById("disability").checked = (dis.value === "Yes");
  }
  if (eduStatus && document.getElementById("course")) {
    const v = eduStatus.value;
    if (v === "School") document.getElementById("course").value = "Class 11-12";
    else if (v === "PG") document.getElementById("course").value = "PG";
    else document.getElementById("course").value = "UG";
  }
}

function syncSDG8ToFilter() {
  const gender = document.getElementById("sdg8-gender");
  const cat = document.getElementById("sdg8-category");
  const income = document.getElementById("sdg8-income");
  const state = document.getElementById("sdg8-state");
  const situation = document.getElementById("sdg8-situation");
  const dis = document.querySelector('input[name="sdg8-disability"]:checked');

  if (gender && document.getElementById("gender")) document.getElementById("gender").value = gender.value;
  if (cat && document.getElementById("category")) document.getElementById("category").value = cat.value;
  if (income && document.getElementById("income")) document.getElementById("income").value = income.value;
  if (state && document.getElementById("state")) document.getElementById("state").value = state.value;
  if (dis && document.getElementById("disability")) {
    document.getElementById("disability").checked = (dis.value === "Yes");
  }
  if (situation && document.getElementById("current-status")) {
    const sitVal = situation.value;
    if (sitVal === "Unemployed") document.getElementById("current-status").value = "Job-seeker";
    else if (sitVal) document.getElementById("current-status").value = sitVal;
    else document.getElementById("current-status").value = "All";
  }
}

function syncSDG1ToFilter() {
  const gender = document.getElementById("sdg1-gender");
  const cat = document.getElementById("sdg1-category");
  const income = document.getElementById("sdg1-income");
  const state = document.getElementById("sdg1-state");
  const loc = document.querySelector('input[name="sdg1-location"]:checked');
  const dis = document.querySelector('input[name="sdg1-disability"]:checked');
  const source = document.getElementById("sdg1-income-source");

  if (gender && document.getElementById("gender")) document.getElementById("gender").value = gender.value;
  if (cat && document.getElementById("category")) document.getElementById("category").value = cat.value;
  if (income && document.getElementById("income")) document.getElementById("income").value = income.value;
  if (state && document.getElementById("state")) document.getElementById("state").value = state.value;
  if (loc && document.getElementById("location-type")) document.getElementById("location-type").value = loc.value;
  if (dis && document.getElementById("disability")) {
    document.getElementById("disability").checked = (dis.value === "Yes");
  }
  if (source && document.getElementById("current-status")) {
    const s = source.value;
    if (s === "Agriculture") document.getElementById("current-status").value = "Farmer";
    else if (s === "Street vending") document.getElementById("current-status").value = "Street Vendor";
    else if (s === "Artisan") document.getElementById("current-status").value = "Artisan";
    else if (s === "Wage labour") document.getElementById("current-status").value = "Job-seeker";
    else if (s === "Self-employment") document.getElementById("current-status").value = "Self-employed";
    else if (s === "Salaried employment") document.getElementById("current-status").value = "Employed";
    else document.getElementById("current-status").value = "All";
  }
}

// Save current form values to localStorage
function saveFormToLocalStorage() {
  try {
    const formData = {
      gender: document.getElementById("gender").value,
      category: document.getElementById("category").value,
      income: document.getElementById("income").value,
      course: document.getElementById("course").value,
      state: document.getElementById("state").value,
      status: document.getElementById("current-status") ? document.getElementById("current-status").value : "All",
      location: document.getElementById("location-type") ? document.getElementById("location-type").value : "Both",
      disability: document.getElementById("disability").checked
    };
    localStorage.setItem("schematch_form", JSON.stringify(formData));

    const clearBtn = document.getElementById("clear-saved-btn");
    if (clearBtn) {
      clearBtn.style.display = "inline-block";
    }
  } catch (e) {
    console.warn("Could not save form to localStorage:", e);
  }
}

// Restore saved form values from localStorage
function restoreFormFromLocalStorage() {
  try {
    const saved = localStorage.getItem("schematch_form");
    if (!saved) return false;

    const data = JSON.parse(saved);
    if (data.gender) document.getElementById("gender").value = data.gender;
    if (data.category) document.getElementById("category").value = data.category;
    if (data.income) document.getElementById("income").value = data.income;
    if (data.course) document.getElementById("course").value = data.course;
    if (data.state) document.getElementById("state").value = data.state;
    if (data.status && document.getElementById("current-status")) {
      document.getElementById("current-status").value = data.status;
    }
    if (data.location && document.getElementById("location-type")) {
      document.getElementById("location-type").value = data.location;
    }
    if (data.disability !== undefined) {
      document.getElementById("disability").checked = !!data.disability;
    }

    const clearBtn = document.getElementById("clear-saved-btn");
    if (clearBtn) {
      clearBtn.style.display = "inline-block";
    }
    return true;
  } catch (e) {
    console.warn("Could not restore form from localStorage:", e);
    return false;
  }
}

// Clear saved form from localStorage and reset form
function clearSavedForm() {
  try {
    localStorage.removeItem("schematch_form");
  } catch (e) {
    console.warn("Could not clear localStorage:", e);
  }

  const form = document.getElementById("eligibility-form");
  if (form) {
    form.reset();
  }

  const clearBtn = document.getElementById("clear-saved-btn");
  if (clearBtn) {
    clearBtn.style.display = "none";
  }

  showDefaultState();
}

// Cycling Sample Profiles
let sampleIndex = 0;

const sampleProfiles = [
  // Profile 1 — SC Female UG Student, Delhi, Low Income
  {
    gender: "Female",
    category: "SC",
    income: "Below 1L",
    course: "UG",
    state: "Delhi",
    status: "Student",
    location: "Both",
    disability: false
  },
  // Profile 2 — OBC Male Class 11-12, Bihar, Low Income
  {
    gender: "Male",
    category: "OBC",
    income: "1–2.5L",
    course: "Class 11-12",
    state: "Bihar",
    status: "Student",
    location: "Rural",
    disability: false
  },
  // Profile 3 — General Female PG, Maharashtra, Mid Income
  {
    gender: "Female",
    category: "General",
    income: "2.5–5L",
    course: "PG",
    state: "Maharashtra",
    status: "Student",
    location: "Urban",
    disability: false
  },
  // Profile 4 — ST Male, Graduated/Working, Jharkhand, Rural
  {
    gender: "Male",
    category: "ST",
    income: "Below 1L",
    course: "Graduated/Working",
    state: "Jharkhand",
    status: "Farmer",
    location: "Rural",
    disability: false
  },
  // Profile 5 — Minority Female UG, Uttar Pradesh, Low Income
  {
    gender: "Female",
    category: "Minority",
    income: "1–2.5L",
    course: "UG",
    state: "Uttar Pradesh",
    status: "Student",
    location: "Urban",
    disability: false
  },
  // Profile 6 — General Male, Entrepreneur, Urban, Mid Income
  {
    gender: "Male",
    category: "General",
    income: "2.5–5L",
    course: "Graduated/Working",
    state: "Karnataka",
    status: "Entrepreneur",
    location: "Urban",
    disability: false
  },
  // Profile 7 — SC Male with Disability, Class 9-10, MP
  {
    gender: "Male",
    category: "SC",
    income: "Below 1L",
    course: "Class 9-10",
    state: "Madhya Pradesh",
    status: "Student",
    location: "Both",
    disability: true
  },
  // Profile 8 — EWS Female, Street Vendor, West Bengal
  {
    gender: "Female",
    category: "EWS",
    income: "Below 1L",
    course: "Graduated/Working",
    state: "West Bengal",
    status: "Street Vendor",
    location: "Urban",
    disability: false
  }
];

// Helper to safely set select option values
function setSelectValue(id, val) {
  const el = document.getElementById(id);
  if (!el) return;

  let valToMatch = val;
  if (valToMatch === "1-2.5L") valToMatch = "1–2.5L";
  if (valToMatch === "2.5-5L") valToMatch = "2.5–5L";

  const hasOpt = Array.from(el.options).some(opt => opt.value === valToMatch);
  if (hasOpt) {
    el.value = valToMatch;
  } else if (id === "course" && valToMatch === "Graduated/Working") {
    el.value = "UG";
  }
}

// Apply Sample Profile sequentially from the 8 profiles
function applySampleProfile() {
  const profile = sampleProfiles[sampleIndex];

  setSelectValue("gender", profile.gender);
  setSelectValue("category", profile.category);
  setSelectValue("income", profile.income);
  setSelectValue("course", profile.course);
  setSelectValue("state", profile.state);
  setSelectValue("current-status", profile.status);
  setSelectValue("location-type", profile.location);

  const disEl = document.getElementById("disability");
  if (disEl) {
    disEl.checked = !!profile.disability;
  }

  // Trigger search directly without saving sample loads to localStorage
  filterAndDisplaySchemes();

  // Update button label dynamically
  const sampleBtn = document.getElementById("sample-profile-btn");
  if (sampleBtn) {
    sampleBtn.textContent = `← Profile ${sampleIndex + 1} of 8 · Try Next →`;
  }

  // Advance index and wrap back to 0 after index 7
  sampleIndex = (sampleIndex + 1) % sampleProfiles.length;
}

// Load schemes.json, skills.json, and poverty.json via fetch with fallbacks
async function loadData() {
  try {
    const response = await fetch("schemes.json");
    if (response.ok) {
      const data = await response.json();
      allSchemes = data.schemes || fallbackSchemes;
    } else {
      allSchemes = fallbackSchemes;
    }
  } catch (error) {
    console.warn("Using fallback schemes data:", error);
    allSchemes = fallbackSchemes;
  }

  try {
    const response = await fetch("skills.json");
    if (response.ok) {
      const data = await response.json();
      allSkills = data.skills || fallbackSkills;
    } else {
      allSkills = fallbackSkills;
    }
  } catch (error) {
    console.warn("Using fallback skills data:", error);
    allSkills = fallbackSkills;
  }

  try {
    const response = await fetch("poverty.json");
    if (response.ok) {
      const data = await response.json();
      povertySchemes = Array.isArray(data) ? data : (data.schemes || data.poverty || fallbackPoverty);
    } else {
      povertySchemes = fallbackPoverty;
    }
  } catch (error) {
    console.warn("Using fallback poverty data:", error);
    povertySchemes = fallbackPoverty;
  }

  showDefaultState();
}

// Default Browse State (show all schemes, no filtering, reset badges)
function showDefaultState() {
  isFiltered = false;

  filteredScholarships = [...allSchemes];
  filteredScholarships.sort((a, b) => (b.amount_per_year || 0) - (a.amount_per_year || 0));

  const typePriority = {
    "Employment": 1,
    "Credit": 2,
    "Skilling": 3,
    "Apprenticeship": 3.5,
    "Livelihood": 4,
    "Entrepreneurship": 5,
    "Industry": 6
  };

  filteredSkills = [...allSkills];
  filteredSkills.sort((a, b) => {
    const aTypeOrder = typePriority[a.type] || 99;
    const bTypeOrder = typePriority[b.type] || 99;
    return aTypeOrder - bTypeOrder;
  });

  filteredPoverty = [...povertySchemes];
  filteredPoverty.sort((a, b) => (b.amount_per_year || 0) - (a.amount_per_year || 0));

  renderResultsView();
}

// Helper function to get income bracket index
function getIncomeIndex(val) {
  if (!val) return -1;
  const normalized = String(val).replace("–", "-");
  const brackets = ["Below 1L", "1-2.5L", "2.5-5L", "Above 5L"];
  return brackets.indexOf(normalized);
}

// Filter datasets for all tabs according to requirements
function filterAndDisplaySchemes() {
  isFiltered = true;

  const gender = document.getElementById("gender").value;
  const category = document.getElementById("category").value;
  const incomeSelected = document.getElementById("income").value;
  const course = document.getElementById("course").value;
  const state = document.getElementById("state").value;
  const disabilityChecked = document.getElementById("disability").checked;

  const currentStatusSelect = document.getElementById("current-status");
  const locationTypeSelect = document.getElementById("location-type");
  const userStatus = currentStatusSelect ? currentStatusSelect.value : "All";
  const userLocation = locationTypeSelect ? locationTypeSelect.value : "Both";

  const userIncome = incomeMap[incomeSelected] !== undefined ? incomeMap[incomeSelected] : 100000;
  const statusUnselected = userStatus === "All";

  // Helper: detect if a scheme has a specific status requirement (not "All", not null/undefined)
  function schemeHasSpecificStatus(scheme) {
    const ts = scheme.target_status;
    if (ts === null || ts === undefined) return false;
    if (Array.isArray(ts)) {
      return ts.length > 0 && !ts.includes("All");
    }
    return ts !== "All";
  }

  // --- 1. FILTER SDG 4 SCHOLARSHIPS ---
  filteredScholarships = allSchemes.filter(scheme => {
    const catMatch = scheme.eligible_categories.includes(category) || scheme.eligible_categories.length === 6;
    if (!catMatch) return false;

    const incomeMatch = scheme.max_income === null || userIncome <= scheme.max_income;
    if (!incomeMatch) return false;

    const courseMatch = scheme.eligible_courses.includes(course);
    if (!courseMatch) return false;

    if (scheme.gender_specific === "Female" && gender !== "Female") {
      return false;
    }

    if (scheme.disability_required === true && !disabilityChecked) {
      return false;
    }

    if (scheme.state_specific !== null && state !== scheme.state_specific) {
      return false;
    }

    // If status is unselected and scheme requires a specific status, do not show as eligible
    if (statusUnselected && schemeHasSpecificStatus(scheme)) {
      return false;
    }

    return true;
  });

  // Sort scholarships by annual amount descending
  filteredScholarships.sort((a, b) => b.amount_per_year - a.amount_per_year);

  // --- 2. FILTER SDG 8 SKILLS & EMPLOYMENT ---
  filteredSkills = allSkills.filter(scheme => {
    // 1. Status check
    const statusMatch = (userStatus === "All") ||
                        scheme.target_status.includes(userStatus) ||
                        scheme.target_status.includes("All");
    if (!statusMatch) return false;

    // 2. Category check
    const isFemale = (gender === "Female");
    const catMatch = (scheme.eligible_for_all_women === true && isFemale) ||
                     scheme.target_categories.includes(category) ||
                     scheme.target_categories.includes("All");
    if (!catMatch) return false;

    // 3. Gender check
    if (scheme.gender_specific === "Female" && gender !== "Female") {
      return false;
    }

    // 4. Location check
    const locMatch = (userLocation === "Both") ||
                     (scheme.location_type === "Both") ||
                     (scheme.location_type === userLocation);
    if (!locMatch) return false;

    // 5. Income limit check
    const incomeMatch = (scheme.income_limit === null) || (userIncome <= scheme.income_limit);
    if (!incomeMatch) return false;

    return true;
  }).map(scheme => {
    const hasSpecificStatus = schemeHasSpecificStatus(scheme);
    const statusGated = statusUnselected && hasSpecificStatus;
    const isPotential = scheme.verify_before_use || statusGated;
    const matchType = isPotential ? "potential" : "eligible";
    const statusReason = statusGated
      ? "Select your current status above to confirm eligibility"
      : null;
    return { ...scheme, matchType, statusReason };
  });

  const typePriority = {
    "Employment": 1,
    "Credit": 2,
    "Skilling": 3,
    "Apprenticeship": 3.5,
    "Livelihood": 4,
    "Entrepreneurship": 5,
    "Industry": 6
  };

  filteredSkills.sort((a, b) => {
    const aVerify = a.matchType === "potential" ? 1 : 0;
    const bVerify = b.matchType === "potential" ? 1 : 0;
    if (aVerify !== bVerify) {
      return aVerify - bVerify;
    }

    const aTypeOrder = typePriority[a.type] || 99;
    const bTypeOrder = typePriority[b.type] || 99;
    return aTypeOrder - bTypeOrder;
  });

  // --- 3. FILTER SDG 1 NO POVERTY SCHEMES ---
  const userIncomeIdx = getIncomeIndex(incomeSelected);

  filteredPoverty = povertySchemes.filter(scheme => {
    // CHECK 1 — Category
    const isFemale = (gender === "Female");
    const catMatch = (scheme.eligible_categories && scheme.eligible_categories.includes("All")) ||
                     (scheme.eligible_categories && scheme.eligible_categories.includes(category)) ||
                     (scheme.eligible_for_all_women === true && isFemale);
    if (!catMatch) return false;

    // CHECK 2 — Income
    if (scheme.max_income !== null && scheme.max_income !== undefined) {
      const schemeIncomeIdx = getIncomeIndex(scheme.max_income);
      if (schemeIncomeIdx !== -1 && userIncomeIdx !== -1) {
        if (userIncomeIdx > schemeIncomeIdx) {
          return false;
        }
      }
    }

    // CHECK 3 — Location
    const locMatch = (userLocation === "Both") ||
                     (scheme.location_type === "Both") ||
                     (scheme.location_type === userLocation);
    if (!locMatch) return false;

    // CHECK 4 — Status (Hard check if status is selected and scheme has specific status)
    const hasSpecificStatus = schemeHasSpecificStatus(scheme);
    if (!statusUnselected && hasSpecificStatus) {
      if (Array.isArray(scheme.target_status)) {
        if (!scheme.target_status.includes(userStatus)) return false;
      } else if (scheme.target_status !== userStatus) {
        return false;
      }
    }

    // CHECK 6 — Disability
    if (scheme.disability_required === true && !disabilityChecked) {
      return false;
    }

    // CHECK 7 — State
    if (scheme.state_specific !== null && scheme.state_specific !== undefined && scheme.state_specific !== state) {
      return false;
    }

    return true;
  }).map(scheme => {
    const hasSpecificStatus = schemeHasSpecificStatus(scheme);
    const statusGated = statusUnselected && hasSpecificStatus;
    const genderMismatched = (scheme.gender_specific !== null && scheme.gender_specific !== undefined && gender !== scheme.gender_specific);
    const isPotential = scheme.verify_before_use || statusGated || genderMismatched;
    const matchType = isPotential ? "potential" : "eligible";

    const reasons = [];
    if (statusGated) {
      reasons.push("Select your current status above to confirm eligibility");
    }
    if (genderMismatched) {
      reasons.push(`This scheme is specifically for ${scheme.gender_specific} applicants`);
    }

    return {
      ...scheme,
      matchType,
      reasons
    };
  });

  filteredPoverty.sort((a, b) => {
    const aVerify = a.matchType === "potential" ? 1 : 0;
    const bVerify = b.matchType === "potential" ? 1 : 0;
    if (aVerify !== bVerify) {
      return aVerify - bVerify;
    }
    return (b.amount_per_year || 0) - (a.amount_per_year || 0);
  });

  // Render current active tab view
  renderResultsView();
}

// Synchronize left eligibility form with active tab
function updateActiveSDGForm() {
  const form4 = document.getElementById("form-sdg4");
  const form8 = document.getElementById("form-sdg8");
  const form1 = document.getElementById("form-sdg1");

  if (form4) form4.style.display = activeTab === 'scholarships' ? 'block' : 'none';
  if (form8) form8.style.display = activeTab === 'skills' ? 'block' : 'none';
  if (form1) form1.style.display = activeTab === 'poverty' ? 'block' : 'none';
}

// Master Render function handling Tab bar and Active Tab content
function renderResultsView() {
  const resultsContainer = document.getElementById("results");
  const povertyPanel = document.getElementById("panel-poverty");
  const povertyResults = document.getElementById("poverty-results");
  const povertyDisclaimer = document.getElementById("poverty-disclaimer");

  // Keep the left eligibility form in sync with activeTab
  updateActiveSDGForm();

  if (!resultsContainer) return;

  resultsContainer.innerHTML = "";

  // Render Tabs Navigation Header (Single source of truth for SDG selection)
  const tabNav = document.createElement("nav");
  tabNav.className = "results-tabs";
  tabNav.setAttribute("aria-label", "Results Tabs");

  // Tab 1: Scholarships (SDG 4)
  const tab1 = document.createElement("button");
  tab1.type = "button";
  tab1.id = "tab-scholarships";
  tab1.className = `tab-btn ${activeTab === 'scholarships' ? 'active' : ''}`;
  tab1.innerHTML = `
    <span>🎓 Scholarships</span>
    <span class="tab-badge">${filteredScholarships.length}</span>
  `;
  tab1.addEventListener("click", () => {
    if (activeTab !== 'scholarships') {
      activeTab = 'scholarships';
      renderResultsView();
    }
  });

  // Tab 2: Skills & Employment (SDG 8)
  const tab2 = document.createElement("button");
  tab2.type = "button";
  tab2.id = "tab-skills";
  tab2.className = `tab-btn ${activeTab === 'skills' ? 'active' : ''}`;
  tab2.innerHTML = `
    <span>💼 Skills & Employment</span>
    <span class="tab-badge">${filteredSkills.length}</span>
  `;
  tab2.addEventListener("click", () => {
    if (activeTab !== 'skills') {
      activeTab = 'skills';
      renderResultsView();
    }
  });

  // Tab 3: No Poverty (SDG 1)
  const tab3 = document.createElement("button");
  tab3.type = "button";
  tab3.id = "tab-poverty";
  tab3.className = `tab-btn ${activeTab === 'poverty' ? 'active' : ''}`;
  tab3.innerHTML = `
    <span>🌱 No Poverty</span>
    <span class="tab-badge">${filteredPoverty.length}</span>
  `;
  tab3.addEventListener("click", () => {
    if (activeTab !== 'poverty') {
      activeTab = 'poverty';
      renderResultsView();
    }
  });

  tabNav.appendChild(tab1);
  tabNav.appendChild(tab2);
  tabNav.appendChild(tab3);
  resultsContainer.appendChild(tabNav);

  // Render poverty cards into #poverty-results regardless of active tab so DOM container is always updated
  if (povertyResults) {
    renderPovertyCardsList(povertyResults);
  }

  // Handle Tab Panels Visibility and Active Content
  if (activeTab === 'scholarships') {
    if (povertyPanel) povertyPanel.style.display = 'none';
    renderScholarshipsTab(resultsContainer);
  } else if (activeTab === 'skills') {
    if (povertyPanel) povertyPanel.style.display = 'none';
    renderSkillsTab(resultsContainer);
  } else if (activeTab === 'poverty') {
    if (povertyPanel) {
      povertyPanel.style.display = 'flex';
      povertyPanel.style.flexDirection = 'column';
      povertyPanel.style.gap = '1.25rem';
    }
    if (povertyDisclaimer) {
      povertyDisclaimer.style.display = 'block';
    }
    renderPovertyTabHeader(resultsContainer);
  }
}

// Render Scholarship Tab Content (SDG 4)
function renderScholarshipsTab(container) {
  // Results Header
  const resultsHeader = document.createElement("div");
  resultsHeader.className = "results-header";
  
  const titleContainer = document.createElement("div");
  titleContainer.style.display = "flex";
  titleContainer.style.alignItems = "baseline";
  titleContainer.style.gap = "0.75rem";
  titleContainer.style.flexWrap = "wrap";

  const countTitle = document.createElement("h2");
  countTitle.className = "results-count-title";
  countTitle.textContent = isFiltered
    ? `${filteredScholarships.length} ${filteredScholarships.length === 1 ? 'scheme' : 'schemes'} matched`
    : `${filteredScholarships.length} ${filteredScholarships.length === 1 ? 'scheme' : 'schemes'}`;

  titleContainer.appendChild(countTitle);

  if (isFiltered) {
    const showAllBtn = document.createElement("button");
    showAllBtn.type = "button";
    showAllBtn.className = "clear-saved-btn";
    showAllBtn.style.fontSize = "0.85rem";
    showAllBtn.textContent = "Show All Schemes";
    showAllBtn.addEventListener("click", showDefaultState);
    titleContainer.appendChild(showAllBtn);
  }

  const sortInfo = document.createElement("span");
  sortInfo.className = "results-sort-info";
  sortInfo.textContent = "Sorted by annual amount (high to low)";

  resultsHeader.appendChild(titleContainer);
  resultsHeader.appendChild(sortInfo);
  container.appendChild(resultsHeader);

  // Empty state
  if (filteredScholarships.length === 0) {
    const emptyState = document.createElement("div");
    emptyState.className = "empty-state";
    emptyState.innerHTML = `
      <div class="empty-icon">🎓</div>
      <h3 class="empty-title">No scholarship schemes matched</h3>
      <p class="empty-subtitle">Try adjusting your category, income range, course level, or state to see more scholarship opportunities.</p>
    `;
    container.appendChild(emptyState);
    return;
  }

  // List of scholarship cards
  const schemesList = document.createElement("div");
  schemesList.className = "schemes-list";

  filteredScholarships.forEach((scheme, index) => {
    const card = document.createElement("article");
    card.className = "scheme-card";

    const amountDisplay = scheme.amount_per_year > 0 
      ? `₹${scheme.amount_per_year.toLocaleString('en-IN')}`
      : "Free Coaching";

    const isVerify = scheme.deadline && scheme.deadline.includes("Check");

    const specialEligibilityHTML = scheme.special_eligibility 
      ? `<div class="special-eligibility-box">
           <strong>Special Eligibility:</strong> ${escapeHTML(scheme.special_eligibility)}
         </div>`
      : "";

    const verifyBadgeHTML = isVerify 
      ? `<span class="verify-badge">⚠️ Verify Details</span>`
      : "";

    const bestMatchBadgeHTML = (isFiltered && index === 0)
      ? `<span class="best-match-badge">⭐ Best Match</span>` 
      : "";

    card.innerHTML = `
      <div class="card-top-row">
        <div>
          <span class="provider-tag">${escapeHTML(scheme.provider)}</span>
          <h3 class="scheme-name">${escapeHTML(scheme.name)}</h3>
        </div>
        <div style="display: flex; flex-direction: column; align-items: flex-end; gap: 0.5rem;">
          ${bestMatchBadgeHTML}
          <div class="amount-badge">
            <span>${amountDisplay}</span>
            <span class="amount-subtext">Est. Max / Year</span>
          </div>
        </div>
      </div>

      <p class="scheme-description">${escapeHTML(scheme.description || '')}</p>

      <div class="scheme-details-meta">
        <p><strong>Benefit:</strong> ${escapeHTML(scheme.benefit_label)}</p>
      </div>

      ${specialEligibilityHTML}

      <div class="card-footer">
        <div class="deadline-info">
          <span>📅 Deadline: <strong>${escapeHTML(scheme.deadline)}</strong></span>
          ${verifyBadgeHTML}
        </div>
        <a href="${escapeHTML(scheme.apply_link)}" target="_blank" rel="noopener noreferrer" class="apply-btn">
          <span>Apply Now</span>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
            <polyline points="15 3 21 3 21 9"></polyline>
            <line x1="10" y1="14" x2="21" y2="3"></line>
          </svg>
        </a>
      </div>
    `;

    schemesList.appendChild(card);
  });

  container.appendChild(schemesList);
}

// Render Skills & Employment Tab Content (SDG 8)
function renderSkillsTab(container) {
  // Results Header
  const resultsHeader = document.createElement("div");
  resultsHeader.className = "results-header";
  
  const titleContainer = document.createElement("div");
  titleContainer.style.display = "flex";
  titleContainer.style.alignItems = "baseline";
  titleContainer.style.gap = "0.75rem";
  titleContainer.style.flexWrap = "wrap";

  const countTitle = document.createElement("h2");
  countTitle.className = "results-count-title";
  countTitle.textContent = isFiltered
    ? `${filteredSkills.length} ${filteredSkills.length === 1 ? 'scheme' : 'schemes'} matched`
    : `${filteredSkills.length} ${filteredSkills.length === 1 ? 'scheme' : 'schemes'}`;

  titleContainer.appendChild(countTitle);

  if (isFiltered) {
    const showAllBtn = document.createElement("button");
    showAllBtn.type = "button";
    showAllBtn.className = "clear-saved-btn";
    showAllBtn.style.fontSize = "0.85rem";
    showAllBtn.textContent = "Show All Schemes";
    showAllBtn.addEventListener("click", showDefaultState);
    titleContainer.appendChild(showAllBtn);
  }

  const sortInfo = document.createElement("span");
  sortInfo.className = "results-sort-info";
  sortInfo.textContent = isFiltered ? "Sorted by eligibility & scheme type" : "Sorted by scheme type";

  resultsHeader.appendChild(titleContainer);
  resultsHeader.appendChild(sortInfo);
  container.appendChild(resultsHeader);

  // Empty state
  if (filteredSkills.length === 0) {
    const emptyState = document.createElement("div");
    emptyState.className = "empty-state";
    emptyState.innerHTML = `
      <div class="empty-icon">💼</div>
      <h3 class="empty-title">No skills & employment schemes matched</h3>
      <p class="empty-subtitle">Try selecting "Select status" or "Urban or Rural" location type to explore all available skill & employment schemes.</p>
    `;
    container.appendChild(emptyState);
    return;
  }

  // List of skill cards
  const schemesList = document.createElement("div");
  schemesList.className = "schemes-list";

  filteredSkills.forEach((scheme, index) => {
    const card = document.createElement("article");
    card.className = "scheme-card";

    // Match status badge: ONLY shown in filtered state
    const matchBadgeHTML = isFiltered
      ? (scheme.matchType === "potential"
          ? `<span class="match-badge match-potential">🔍 Potentially Eligible</span>`
          : `<span class="match-badge match-eligible">✅ Eligible</span>`)
      : "";

    // Best Match Badge: ONLY shown in filtered state on index === 0 if scheme.matchType === "eligible"
    const bestMatchBadgeHTML = (isFiltered && index === 0 && scheme.matchType === "eligible")
      ? `<span class="best-match-badge">⭐ Best Match</span>`
      : "";

    // Type badge class
    const typeClass = `type-${(scheme.type || 'skilling').toLowerCase().replace(/[^a-z0-9]/g, '-')}`;

    // Verification callout: shown in filtered state if verify_before_use is true OR if status is gated
    let verificationCalloutHTML = "";
    if (isFiltered) {
      const parts = [];
      if (scheme.verify_before_use && scheme.verification_note) {
        parts.push(escapeHTML(scheme.verification_note));
      }
      if (scheme.statusReason) {
        parts.push(`<em>${escapeHTML(scheme.statusReason)}</em>`);
      }
      if (parts.length > 0) {
        verificationCalloutHTML = `<div class="verification-callout">${parts.join("<br>")}</div>`;
      }
    }

    card.innerHTML = `
      <div class="card-top-row">
        <div>
          <span class="type-badge ${typeClass}">${escapeHTML(scheme.type)}</span>
          <span class="provider-tag">${escapeHTML(scheme.provider)}</span>
          <h3 class="scheme-name">${escapeHTML(scheme.name)}</h3>
        </div>
        <div style="display: flex; flex-direction: column; align-items: flex-end; gap: 0.5rem;">
          ${bestMatchBadgeHTML}
          ${matchBadgeHTML}
        </div>
      </div>

      <p class="scheme-description">${escapeHTML(scheme.sdg8_connection || '')}</p>

      <div class="scheme-details-meta">
        <p><strong>Benefit:</strong> ${escapeHTML(scheme.benefit)}</p>
        ${scheme.application_method ? `<p style="font-size: 0.85rem; color: var(--text-medium); margin-top: 0.25rem;"><strong>How to Apply:</strong> ${escapeHTML(scheme.application_method)}</p>` : ''}
      </div>

      ${verificationCalloutHTML}

      <div class="card-footer">
        <div class="deadline-info">
          <span>📅 Deadline: <strong>${escapeHTML(scheme.deadline_type)}</strong></span>
        </div>
        <a href="${escapeHTML(scheme.official_url)}" target="_blank" rel="noopener noreferrer" class="apply-btn">
          <span>Apply / Learn More →</span>
        </a>
      </div>
    `;

    schemesList.appendChild(card);
  });

  container.appendChild(schemesList);
}

// Render Results Header for SDG 1 Poverty Tab
function renderPovertyTabHeader(container) {
  const resultsHeader = document.createElement("div");
  resultsHeader.className = "results-header";
  
  const titleContainer = document.createElement("div");
  titleContainer.style.display = "flex";
  titleContainer.style.alignItems = "baseline";
  titleContainer.style.gap = "0.75rem";
  titleContainer.style.flexWrap = "wrap";

  const countTitle = document.createElement("h2");
  countTitle.className = "results-count-title";
  countTitle.textContent = isFiltered
    ? `${filteredPoverty.length} ${filteredPoverty.length === 1 ? 'scheme' : 'schemes'} matched`
    : `${filteredPoverty.length} ${filteredPoverty.length === 1 ? 'scheme' : 'schemes'}`;

  titleContainer.appendChild(countTitle);

  if (isFiltered) {
    const showAllBtn = document.createElement("button");
    showAllBtn.type = "button";
    showAllBtn.className = "clear-saved-btn";
    showAllBtn.style.fontSize = "0.85rem";
    showAllBtn.textContent = "Show All Schemes";
    showAllBtn.addEventListener("click", showDefaultState);
    titleContainer.appendChild(showAllBtn);
  }

  const sortInfo = document.createElement("span");
  sortInfo.className = "results-sort-info";
  sortInfo.textContent = isFiltered ? "Sorted by eligibility & annual amount" : "Sorted by annual amount (high to low)";

  resultsHeader.appendChild(titleContainer);
  resultsHeader.appendChild(sortInfo);
  container.appendChild(resultsHeader);
}

// Render Cards into #poverty-results Container
function renderPovertyCardsList(targetElement) {
  if (!targetElement) return;
  targetElement.innerHTML = "";

  if (filteredPoverty.length === 0) {
    const emptyState = document.createElement("div");
    emptyState.className = "empty-state";
    emptyState.innerHTML = `
      <div class="empty-icon">🌱</div>
      <h3 class="empty-title">No poverty alleviation schemes matched</h3>
      <p class="empty-subtitle">Try adjusting your income range, status, or location to explore available welfare and poverty alleviation programmes.</p>
    `;
    targetElement.appendChild(emptyState);
    return;
  }

  const schemesList = document.createElement("div");
  schemesList.className = "schemes-list";

  filteredPoverty.forEach((scheme, index) => {
    const card = document.createElement("article");
    card.className = "scheme-card";

    // Match status badge: ONLY shown in filtered state
    const matchBadgeHTML = isFiltered
      ? (scheme.matchType === "potential"
          ? `<span class="match-badge match-potential">🔍 Potentially Eligible</span>`
          : `<span class="match-badge match-eligible">✅ Eligible</span>`)
      : "";

    // Best Match Badge: ONLY shown in filtered state on index === 0 if scheme.matchType === "eligible"
    const bestMatchBadgeHTML = (isFiltered && index === 0 && scheme.matchType === "eligible")
      ? `<span class="best-match-badge">⭐ Best Match</span>`
      : "";

    // Amount display formatting
    let amountDisplay = "";
    let subtext = "Est. Max / Year";
    if (scheme.amount_per_year > 0) {
      amountDisplay = `₹${scheme.amount_per_year.toLocaleString('en-IN')}`;
    } else if (scheme.type === "Infrastructure" || scheme.type === "Village Development") {
      amountDisplay = "Community benefit";
      subtext = "Public Support";
    } else {
      amountDisplay = "In-kind / Free";
      subtext = "Direct Support";
    }

    const typeClass = `type-${(scheme.type || 'welfare').toLowerCase().replace(/[^a-z0-9]/g, '-')}`;

    // Verification callout
    let verificationCalloutHTML = "";
    if (isFiltered) {
      const parts = [];
      if (scheme.reasons && scheme.reasons.length > 0) {
        scheme.reasons.forEach(r => parts.push(escapeHTML(r)));
      }
      if (parts.length > 0) {
        verificationCalloutHTML = `<div class="verification-callout">${parts.join("<br>")}</div>`;
      }
    }

    card.innerHTML = `
      <div class="card-top-row">
        <div>
          <span class="type-badge ${typeClass}">${escapeHTML(scheme.type)}</span>
          <span class="provider-tag">${escapeHTML(scheme.provider)}</span>
          <h3 class="scheme-name">${escapeHTML(scheme.name)}</h3>
        </div>
        <div style="display: flex; flex-direction: column; align-items: flex-end; gap: 0.5rem;">
          ${bestMatchBadgeHTML}
          ${matchBadgeHTML}
          <div class="amount-badge">
            <span>${amountDisplay}</span>
            <span class="amount-subtext">${subtext}</span>
          </div>
        </div>
      </div>

      <p class="scheme-description">${escapeHTML(scheme.description || '')}</p>

      ${verificationCalloutHTML}

      <div class="card-footer">
        <div class="deadline-info">
          <span>📅 Deadline: <strong>${escapeHTML(scheme.deadline || 'Ongoing')}</strong></span>
        </div>
        <a href="${escapeHTML(scheme.apply_link)}" target="_blank" rel="noopener noreferrer" class="apply-btn">
          <span>Apply Now</span>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
            <polyline points="15 3 21 3 21 9"></polyline>
            <line x1="10" y1="14" x2="21" y2="3"></line>
          </svg>
        </a>
      </div>
    `;

    schemesList.appendChild(card);
  });

  targetElement.appendChild(schemesList);
}

// Utility to escape HTML strings safely
function escapeHTML(str) {
  if (!str) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}


