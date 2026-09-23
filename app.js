// SchemeMatch — Application Logic

const incomeMap = {
  "Below 1L": 100000,
  "1–2.5L": 250000,
  "2.5–5L": 500000,
  "Above 5L": 600001
};

let allSchemes = [];

// Fallback JSON data to ensure 100% reliability even if opened directly via file:// protocol
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

// Initialize application
document.addEventListener("DOMContentLoaded", () => {
  loadSchemesData();

  // Attach event listener to "Find My Schemes" button
  const findBtn = document.getElementById("find-btn");
  if (findBtn) {
    findBtn.addEventListener("click", filterAndDisplaySchemes);
  }

  // Also support form submission
  const form = document.getElementById("eligibility-form");
  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      filterAndDisplaySchemes();
    });
  }
});

// Load schemes.json via fetch or fallback
async function loadSchemesData() {
  try {
    const response = await fetch("schemes.json");
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    allSchemes = data.schemes || fallbackSchemes;
  } catch (error) {
    console.warn("Could not fetch schemes.json directly (possibly file:// CORS), using loaded dataset fallback.", error);
    allSchemes = fallbackSchemes;
  }

  // Run initial match on page load
  filterAndDisplaySchemes();
}

// Filtering logic implementation according to Part 3 requirements
function filterAndDisplaySchemes() {
  const gender = document.getElementById("gender").value;
  const category = document.getElementById("category").value;
  const incomeSelected = document.getElementById("income").value;
  const course = document.getElementById("course").value;
  const state = document.getElementById("state").value;
  const disabilityChecked = document.getElementById("disability").checked;

  const userIncome = incomeMap[incomeSelected] !== undefined ? incomeMap[incomeSelected] : 100000;

  // Filter schemes
  const filtered = allSchemes.filter(scheme => {
    // 1. Category check: eligible_categories includes category OR length === 6
    const catMatch = scheme.eligible_categories.includes(category) || scheme.eligible_categories.length === 6;
    if (!catMatch) return false;

    // 2. Max income check: max_income is null OR userIncome <= max_income
    const incomeMatch = scheme.max_income === null || userIncome <= scheme.max_income;
    if (!incomeMatch) return false;

    // 3. Course check: eligible_courses includes user course
    const courseMatch = scheme.eligible_courses.includes(course);
    if (!courseMatch) return false;

    // 4. Gender check: if gender_specific === "Female" -> user gender must be "Female"
    if (scheme.gender_specific === "Female" && gender !== "Female") {
      return false;
    }

    // 5. Disability check: if disability_required === true -> user disability must be checked
    if (scheme.disability_required === true && !disabilityChecked) {
      return false;
    }

    // 6. State check: if state_specific is not null -> user state must match scheme.state_specific
    if (scheme.state_specific !== null && state !== scheme.state_specific) {
      return false;
    }

    return true;
  });

  // Sort by amount_per_year descending
  filtered.sort((a, b) => b.amount_per_year - a.amount_per_year);

  // Render results
  renderResults(filtered);
}

// Render Results Section
function renderResults(schemes) {
  const resultsContainer = document.getElementById("results");
  if (!resultsContainer) return;

  resultsContainer.innerHTML = "";

  // 1. Header with count
  const resultsHeader = document.createElement("div");
  resultsHeader.className = "results-header";
  
  const countTitle = document.createElement("h2");
  countTitle.className = "results-count-title";
  countTitle.textContent = `${schemes.length} ${schemes.length === 1 ? 'scheme' : 'schemes'} matched`;
  
  const sortInfo = document.createElement("span");
  sortInfo.className = "results-sort-info";
  sortInfo.textContent = "Sorted by annual amount (high to low)";

  resultsHeader.appendChild(countTitle);
  resultsHeader.appendChild(sortInfo);
  resultsContainer.appendChild(resultsHeader);

  // 2. Check for empty state
  if (schemes.length === 0) {
    const emptyState = document.createElement("div");
    emptyState.className = "empty-state";
    emptyState.innerHTML = `
      <div class="empty-icon">📁</div>
      <h3 class="empty-title">No schemes found</h3>
      <p class="empty-subtitle">Try broadening your search criteria (e.g. adjust course level, income range, or state selection) to find eligible scholarships.</p>
    `;
    resultsContainer.appendChild(emptyState);
    return;
  }

  // 3. Scheme cards container
  const schemesList = document.createElement("div");
  schemesList.className = "schemes-list";

  schemes.forEach(scheme => {
    const card = document.createElement("article");
    card.className = "scheme-card";

    // Format annual amount label
    let amountDisplay = scheme.amount_per_year > 0 
      ? `₹${scheme.amount_per_year.toLocaleString('en-IN')}`
      : "Free Coaching";

    // Badge "⚠️ Verify Details" on any scheme where deadline contains "Check"
    const isVerify = scheme.deadline && scheme.deadline.includes("Check");

    // Special eligibility block
    const specialEligibilityHTML = scheme.special_eligibility 
      ? `<div class="special-eligibility-box">
           <strong>Special Eligibility:</strong> ${escapeHTML(scheme.special_eligibility)}
         </div>`
      : "";

    // Verify badge HTML
    const verifyBadgeHTML = isVerify 
      ? `<span class="verify-badge">⚠️ Verify Details</span>`
      : "";

    card.innerHTML = `
      <div class="card-top-row">
        <div>
          <span class="provider-tag">${escapeHTML(scheme.provider)}</span>
          <h3 class="scheme-name">${escapeHTML(scheme.name)}</h3>
        </div>
        <div class="amount-badge">
          <span>${amountDisplay}</span>
          <span class="amount-subtext">Est. Max / Year</span>
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

  resultsContainer.appendChild(schemesList);
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
