import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Github, 
  Linkedin, 
  Mail, 
  ChevronRight, 
  X, 
  ExternalLink,
  Database,
  BarChart,
  BrainCircuit,
  Table,
  MessageSquare,
  Lightbulb,
  Presentation,
  Users,
  ArrowUp,
  FileText,
  Award,
  Sun,
  Moon
} from 'lucide-react';

// --- Data ---
const projects = [
  {
    id: 1,
    title: "Market Basket Analysis",
    summary: "Association rule analysis on bakery transactions to uncover cross-selling opportunities and increase basket size.",
    image: "/project1.jpg",
    tags: ["Python", "Tableau", "Market Basket Analysis"],
    githubUrl: "https://github.com/pravadipta/market-basket-analysis",
    deckUrl: "https://drive.google.com/file/d/1ggkw9-iwKb1TvtoEZiLg41t6mMec6720/view?usp=drive_link",
    tableauUrl: 'https://public.tableau.com/views/TheBreadBasketMBADashboard/BasketGrowthOpportunityDashboard?:language=en-US&:sid=&:redirect=auth&:display_count=n&:origin=viz_share_link',
    details: {
      businessContext: "A retail bakery recorded high transaction volume but low basket depth, with an average of ~2 items per purchase and 41.7% single-item transactions, limiting average order value.",
      objective: "Identify product combinations that can increase basket size and reduce single-item purchases.",
      data: "9,465 retail bakery transactions across 94 bakery products.",
      approach: "Exploratory data analysis and market basket analysis (Apriori) using Python to identify product associations based on support, confidence, and lift.",
      keyInsights: "Food items such as toast and medialuna frequently trigger coffee add-ons, while beverage-and-dessert combinations appear more often during weekend visits.",
      businessRecommendations: "Promote weekday food-to-coffee add-ons and introduce optional beverage-and-dessert bundles on weekends to increase basket depth."
    }
  },
  {
    id: 2,
    title: "Personal Expense Dashboard",
    summary: "Interactive dashboard analyzing personal spending patterns, budget utilization, and transaction behavior to support better financial decision-making.",
    image: "/project2.jpg",
    tags: ["Tableau", "Data Visualization", "Dashboard Design"],
    githubUrl: "https://github.com/pravadipta/personal-expense-dashboard",
    deckUrl: "https://drive.google.com/file/d/10vU7vlpPu4BpFoJT2GONuNoFShSPQ0Dn/view?usp=drive_link",
    tableauUrl: "https://public.tableau.com/shared/MJNPBCDYY?:display_count=n&:origin=viz_share_link",
    details: {
      businessContext: "RevoFinance is a fintech platform that helps users track personal expenses across online and offline merchants. However, raw transaction data alone does not clearly reveal spending patterns or budget performance.",
      objective: "Design an interactive dashboard that helps users understand spending behavior, monitor budget utilization, and identify opportunities to improve financial management.",
      data: "Transaction-level expense data, merchant metadata, and category-level annual budgets.",
      approach: "Built an interactive Tableau dashboard combining spending metrics, category breakdowns, budget comparisons, and time-based trend analysis.",
      keyInsights: "Several non-essential categories such as travel, subscriptions, and entertainment exceed their allocated budgets (~111% utilization), indicating recurring overspending risks.",
      businessRecommendations: "Introduce category-based alerts and forward-looking spending projections to help users detect overspending early and adjust financial behavior."
    }
  },
  {
    id: 3,
    title: "Customer Segmentation Analysis",
    summary: "K-means clustering analysis on credit card customer data to identify high-value user segments and guide revenue growth strategies.",
    image: "/project3.jpg",
    tags: ["Python", "K-Means Clustering", "Customer Segmentation", "Financial Analysis"],
    githubUrl: "https://github.com/pravadipta/customer-segmentation-analysis",
    deckUrl: "https://drive.google.com/file/d/1Gnv0nDU-_aGQssHfCjVPv77IWCyrEF3W/view?usp=drive_link",
    details: {
      businessContext: "RevoBank earns revenue from credit card transactions through a 1.5% merchant discount rate, while fraudulent transactions create direct financial losses. Understanding customer spending behavior and risk profiles is essential to increase card usage while maintaining profitability.",
      objective: "Analyze credit card performance and segment customers to identify high-value users and guide targeted growth strategies.",
      data: "Credit card transaction data and customer demographic information including income, credit score, and debt levels.",
      approach: "Data was cleaned and aggregated at the user level, followed by K-means clustering using behavioral and financial features such as transaction amount, transaction count, recency, credit limit, and debt-to-income ratio.",
      keyInsights: "Customer segmentation revealed three distinct groups: dormant users with no recent activity, active mainstream users generating stable transactions, and high-value power users responsible for a large share of transaction volume.",
      businessRecommendations: "Prioritize high-value power users for premium rewards and credit limit expansion, scale engagement among active users, and selectively reactivate dormant users through targeted campaigns."
    }
  },
  {
    id: 4,
    title: "Grocery Sales Performance Analysis",
    summary: "Analyzing grocery sales transactions to identify top-performing product categories and understand key revenue drivers.",
    image: "/project4.jpg",
    tags: ["SQL", "Google BigQuery", "Sales Analytics", "Retail Analytics"],
    githubUrl: "",
    deckUrl: "https://drive.google.com/file/d/1N4g2M0rDZfkGobS8uB5fN9T2DDL4-zZ7/view?usp=drive_link",
    details: {
      businessContext: "RevoGrocers is a grocery retail business operating across multiple locations and selling a wide range of products. The company collects detailed transactional sales data across products, categories, and customers, which can be analyzed to identify patterns in revenue generation and customer purchasing behavior.",
      objective: "Analyze grocery sales transactions to identify top-performing product categories, understand key revenue drivers, and evaluate pricing and purchasing patterns.",
      data: "Simulated grocery sales dataset containing transactional records, product information, and category data from January 2018 to May 2018.",
      approach: "SQL queries were written in Google BigQuery to join relational tables (sales, products, and categories), calculate revenue after discounts, analyze category-level performance, and extract business insights from the data.",
      keyInsights: "Revenue differences between product categories were driven more by customer spending levels than by the number of customers purchasing the products.",
      businessRecommendations: "Strengthen high-performing categories such as Confections and Meat through cross-selling bundles, while reviewing pricing and product positioning for weaker categories like Grain to improve sales performance."
    }
  }
];

const technicalSkills = [
  { name: "Python", desc: "Data cleaning, analysis, and statistical modeling using libraries such as Pandas and Scikit-learn.", icon: <BrainCircuit className="w-5 h-5 text-accent-700 dark:text-accent-500" /> },
  { name: "SQL", desc: "Querying relational databases and extracting business insights, with experience in Google BigQuery.", icon: <Database className="w-5 h-5 text-accent-700 dark:text-accent-500" /> },
  { name: "Spreadsheets", desc: "Data manipulation, pivot tables, and reporting in Microsoft Excel and Google Sheets.", icon: <Table className="w-5 h-5 text-accent-700 dark:text-accent-500" /> },
  { name: "Tableau", desc: "Building interactive dashboards and communicating insights visually.", icon: <BarChart className="w-5 h-5 text-accent-700 dark:text-accent-500" /> },
];

const softSkills = [
  { name: "Analytical Thinking", desc: "Breaking down complex problems into structured analysis.", icon: <Lightbulb className="w-5 h-5 text-base-600" /> },
  { name: "Insight Communication", desc: "Translating analytical findings into clear, actionable insights for business decisions.", icon: <MessageSquare className="w-5 h-5 text-base-600" /> },
  { name: "Data Storytelling", desc: "Presenting findings in a clear, accessible way for technical and non-technical audiences.", icon: <Presentation className="w-5 h-5 text-base-600" /> },
  { name: "Collaborative Communication", desc: "Communicating effectively across diverse cultural and professional environments.", icon: <Users className="w-5 h-5 text-base-600" /> },
];

const testimonials = [
  {
    text: "...Pravadipta brings clarity, practicality, and thoughtful analysis to the table—and that combination is valuable in any data-driven organization.",
    name: "Ahmad Hani Mustafa",
    role: "Course Instructor, RevoU"
  }
];

const certifications = [
  {
    name: "Full-Stack Data Analytics",
    issuer: "RevoU",
    date: "March 2026",
    link: "https://certificates.revou.tech/?id=FSDA-2026-03-173646304974&name=Pravadipta%20Riksadyani%20Pambudi"
  }
];

// --- Components ---

function ProjectModal({ project, onClose }: { project: typeof projects[0], onClose: () => void }) {
  // Prevent scrolling on body when modal is open
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = 'unset'; };
  }, []);

  return (
    <AnimatePresence>
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm overflow-y-auto"
      >
        <motion.div 
          initial={{ y: 50, opacity: 0, scale: 0.95 }}
          animate={{ y: 0, opacity: 1, scale: 1 }}
          exit={{ y: 20, opacity: 0, scale: 0.95 }}
          transition={{ type: "spring", damping: 25, stiffness: 300 }}
          onClick={(e) => e.stopPropagation()}
          className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto bg-white rounded-2xl shadow-2xl"
        >
          <button 
            onClick={onClose}
            className="absolute top-4 right-4 p-2 bg-white/80 backdrop-blur-md rounded-full text-gray-600 hover:text-gray-900 hover:bg-gray-100 transition-colors z-10"
          >
            <X className="w-5 h-5" />
          </button>
          
          <div className="w-full aspect-video relative">
            <img 
              src={project.image} 
              alt={project.title} 
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-6 sm:p-8">
              <h2 className="text-2xl sm:text-3xl font-bold text-white">{project.title}</h2>
            </div>
          </div>

          <div className="p-6 sm:p-8 space-y-8">
            <div className="space-y-6">
              <div className="flex flex-wrap gap-2">
                {project.tags.map(tag => (
                  <span key={tag} className="px-3 py-1 text-xs font-medium text-accent-800 dark:text-accent-400 bg-accent-50 dark:bg-accent-500/10 border border-accent-100 dark:border-accent-500/20 rounded-full">
                    {tag}
                  </span>
                ))}
              </div>

              {(project.githubUrl || project.deckUrl || project.tableauUrl) && (
                <div className="flex flex-wrap gap-3">
                  {project.githubUrl && (
                    <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-4 py-2 bg-base-800 text-white text-sm font-medium rounded-lg hover:bg-base-700 transition-colors">
                      <Github className="w-4 h-4" />
                      View Repository
                    </a>
                  )}
                  {project.deckUrl && (
                    <a href={project.deckUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-4 py-2 bg-slate-200 dark:bg-slate-500/30 text-slate-700 dark:text-slate-300 text-sm font-medium rounded-lg hover:bg-slate-300 dark:hover:bg-slate-500/40 transition-colors">
                      <Presentation className="w-4 h-4" />
                      View Deck
                    </a>
                  )}
                  {project.tableauUrl && (
                    <a href={project.tableauUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-4 py-2 bg-blue-200 dark:bg-blue-500/20 text-blue-900 dark:text-blue-300 text-sm font-medium rounded-lg hover:bg-blue-100 transition-colors">
                      <BarChart className="w-4 h-4" />
                      View Tableau
                    </a>
                  )}
                </div>
              )}
            </div>

            <div className="grid gap-6 sm:grid-cols-2">
              <div>
                <h3 className="text-sm font-semibold text-base-400 uppercase tracking-wider mb-2">Business Context</h3>
                <p className="text-base-700 leading-relaxed">{project.details.businessContext}</p>
              </div>
              <div>
                <h3 className="text-sm font-semibold text-base-400 uppercase tracking-wider mb-2">Objective</h3>
                <p className="text-base-700 leading-relaxed">{project.details.objective}</p>
              </div>
            </div>

            <div>
              <h3 className="text-sm font-semibold text-base-400 uppercase tracking-wider mb-2">Data & Approach</h3>
              <div className="bg-base-50 rounded-xl p-5 space-y-4 border border-base-200">
                <div>
                  <span className="font-medium text-base-900 block mb-1">Data Sources:</span>
                  <p className="text-base-700 text-sm">{project.details.data}</p>
                </div>
                <div>
                  <span className="font-medium text-base-900 block mb-1">Methodology:</span>
                  <p className="text-base-700 text-sm">{project.details.approach}</p>
                </div>
              </div>
            </div>

            <div className="grid gap-6 sm:grid-cols-2">
              <div className="bg-accent-50/50 dark:bg-accent-500/5 rounded-xl p-5 border border-accent-100 dark:border-accent-500/20">
                <h3 className="text-sm font-semibold text-accent-800 dark:text-accent-400 uppercase tracking-wider mb-2 flex items-center gap-2">
                  <Lightbulb className="w-4 h-4" /> Key Insights
                </h3>
                <p className="text-base-800">{project.details.keyInsights}</p>
              </div>
              <div className="bg-accent-50/50 dark:bg-accent-500/5 rounded-xl p-5 border border-accent-100 dark:border-accent-500/20">
                <h3 className="text-sm font-semibold text-accent-800 dark:text-accent-400 uppercase tracking-wider mb-2 flex items-center gap-2">
                  <BarChart className="w-4 h-4" /> Recommendations
                </h3>
                <p className="text-base-800">{project.details.businessRecommendations}</p>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.5 }}
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 z-40 p-3 bg-accent-700 dark:bg-accent-500 text-white rounded-full shadow-lg hover:bg-accent-800 dark:hover:bg-accent-400 transition-colors"
          aria-label="Scroll to top"
        >
          <ArrowUp className="w-6 h-6" />
        </motion.button>
      )}
    </AnimatePresence>
  );
}

export default function App() {
  const [selectedProject, setSelectedProject] = useState<typeof projects[0] | null>(null);
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDark]);

  return (
    <div className="min-h-screen bg-base-50 font-sans text-base-800 selection:bg-accent-100 dark:selection:bg-accent-500/30 selection:text-accent-900 dark:selection:text-accent-200 transition-colors duration-300">
      
      {/* Navigation */}
      <nav className="sticky top-0 z-40 bg-base-50/80 backdrop-blur-md border-b border-base-200 transition-colors duration-300">
        <div className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
          <span className="font-serif font-bold text-xl tracking-tight text-base-900">Pravadipta Riksadyani Pambudi</span>
          <div className="hidden sm:flex items-center gap-6 text-sm font-medium text-base-600">
            <a href="#about" className="hover:text-accent-700 dark:hover:text-accent-500">About</a>
            <a href="#skills" className="hover:text-accent-700 dark:hover:text-accent-500">Skills</a>
            <a href="#projects" className="hover:text-accent-700 dark:hover:text-accent-500">Projects</a>
            <a href="#contact" className="hover:text-accent-700 dark:hover:text-accent-500">Contact</a>
            <div className="w-px h-4 bg-base-300"></div>
            <a href="https://drive.google.com/file/d/18EsJadoAUDUIL8Fj8XaNI9uTdcT-7d8U/view?usp=sharing" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 text-accent-700 dark:text-accent-500 hover:text-accent-800 dark:hover:text-accent-400 transition-colors">
              <FileText className="w-4 h-4" />
              Resume
            </a>
            <button 
              onClick={() => setIsDark(!isDark)} 
              className="p-2 rounded-full hover:bg-base-200 text-base-600 transition-colors"
              aria-label="Toggle Dark Mode"
            >
              {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>
          </div>
        </div>
      </nav>

      <main className="max-w-5xl mx-auto px-6 py-12 sm:py-24 space-y-32">
        
        {/* Hero Section */}
        <section className="pt-10 sm:pt-20">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-3xl"
          >
            <h1 className="text-4xl sm:text-5xl font-serif font-bold tracking-tight text-base-900 mb-6">
              Hi, I'm Pravadipta! <br/>
              <span className="text-accent-700 dark:text-accent-500 font-serif italic">I'm a data analyst.</span>
            </h1>
            <p className="text-lg sm:text-xl text-base-600 leading-relaxed mb-10 font-light max-w-2xl">
              I bridge the gap between data and decisions, turning complex analysis into something clear and actionable.
            </p>
            <div className="flex flex-wrap items-center gap-4">
              <a href="#projects" className="px-6 py-3 bg-base-800 text-white font-medium rounded-full border border-base-200 hover:bg-base-700 transition-colors shadow-sm">
                View My Work
              </a>
              <a href="#contact" className="px-6 py-3 bg-white text-base-700 font-medium rounded-full border border-base-200 hover:bg-base-100 transition-colors shadow-sm">
                Get in Touch
              </a>
              <a href="https://drive.google.com/file/d/18EsJadoAUDUIL8Fj8XaNI9uTdcT-7d8U/view?usp=sharing" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-4 py-3 text-base-600 font-medium hover:text-accent-700 dark:hover:text-accent-500 transition-colors">
                <FileText className="w-4 h-4" />
                View Resume
              </a>
            </div>
          </motion.div>
        </section>

        {/* About Me */}
        <section id="about" className="scroll-mt-24">
          <div className="mb-6">
            <h2 className="text-sm font-bold text-base-400 uppercase tracking-widest">About Me</h2>
          </div>          
          <div className="grid md:grid-cols-12 gap-12">
            <div className="md:col-span-4">
              <div className="group relative aspect-square rounded-2xl overflow-hidden bg-base-200 mb-6 max-w-[240px] shadow-sm border border-base-200">
                <img 
                  src="/pfp1.jpg" 
                  alt="Pravadipta" 
                  className="w-full h-full object-cover sepia-[.3] group-hover:sepia-0 group-hover:scale-105 transition-all duration-500"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute bottom-4 right-4 bg-white/90 backdrop-blur-sm text-base-900 px-3 py-1.5 rounded-full text-sm font-medium shadow-lg opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 flex items-center gap-1.5 pointer-events-none">
                  <span>Hi there! :)</span>
                </div>
              </div>
            </div>
            <div className="md:col-span-8 space-y-12">
              <div className="space-y-6">
                <p className="text-xl font-serif text-base-900 leading-snug">
                  I'm a decision-focused data analyst with a background in Information Systems.
                </p>
                <div className="space-y-4">
                  <p className="text-base text-base-600 leading-relaxed">
                    I work through problems end-to-end, from data preparation to visualization and recommendations, always with the goal of turning complexity into something clear and actionable.
                  </p>
                  <p className="text-base text-base-600 leading-relaxed">
                    Beyond the technical work, I care a lot about communicating ideas clearly and working well with the people around me.
                  </p>
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-10">
                {/* Education */}
                <div>
                  <h3 className="text-lg font-serif font-semibold text-base-900 mb-6 flex items-center gap-2">
                    Education
                  </h3>
                  <div className="space-y-6">
                    <div className="relative pl-4 border-l-2 border-base-200">
                      <div className="absolute w-2 h-2 bg-base-300 rounded-full -left-[5px] top-2"></div>
                      <h4 className="font-medium text-base-900">Full-Stack Data Analytics</h4>
                      <p className="text-base-600 text-sm">RevoU &bull; Oct 2025 - Feb 2026</p>
                    </div>
                    <div className="relative pl-4 border-l-2 border-base-200">
                      <div className="absolute w-2 h-2 bg-base-300 rounded-full -left-[5px] top-2"></div>
                      <h4 className="font-medium text-base-900">Bachelor of Computer Science</h4>
                      <p className="text-base-600 text-sm">Universitas Airlangga &bull; 2018 - 2025</p>
                    </div>
                  </div>
                </div>

                {/* Experience */}
                <div>
                  <h3 className="text-lg font-serif font-semibold text-base-900 mb-6 flex items-center gap-2">
                    Experience
                  </h3>
                  <div className="space-y-6">
                    <div className="relative pl-4 border-l-2 border-base-200">
                      <div className="absolute w-2 h-2 bg-base-300 rounded-full -left-[5px] top-2"></div>
                      <h4 className="font-medium text-base-900">Android Developer Intern</h4>
                      <p className="text-base-600 text-sm">PT Alvonse Innovations &bull; Jan - Mar 2021</p>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          </div>
        </section>

        {/* Skills */}
        <section id="skills" className="scroll-mt-24">
          <div className="space-y-16">
            <div className="mb-12">
              <h2 className="text-sm font-bold text-base-400 uppercase tracking-widest mb-4">Skills & Tools</h2>
              <p className="text-xl text-base-600 max-w-2xl">A summary of the technical tools and professional competencies I bring to every project.</p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-12">
              <div>
                <h3 className="text-xl font-serif font-semibold text-base-900 mb-6">Technical Skills</h3>
                <div className="grid sm:grid-cols-2 gap-4">
                  {technicalSkills.map(skill => (
                    <div key={skill.name} className="bg-white p-5 rounded-2xl border border-base-200 shadow-sm hover:shadow-md transition-shadow">
                      <div className="flex items-center gap-3 mb-2">
                        <div className="p-2 bg-accent-50 dark:bg-accent-500/10 rounded-lg">
                          {skill.icon}
                        </div>
                        <h4 className="font-medium text-base-900">{skill.name}</h4>
                      </div>
                      <p className="text-[13px] text-base-600 leading-relaxed">{skill.desc}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-xl font-serif font-semibold text-base-900 mb-6">Soft Skills</h3>
                <div className="grid sm:grid-cols-2 gap-4">
                  {softSkills.map(skill => (
                    <div key={skill.name} className="bg-white p-5 rounded-2xl border border-base-200 shadow-sm hover:shadow-md transition-shadow">
                      <div className="flex items-center gap-3 mb-2">
                        <div className="p-2 bg-base-50 rounded-lg">
                          {skill.icon}
                        </div>
                        <h4 className="font-medium text-base-900">{skill.name}</h4>
                      </div>
                      <p className="text-[13px] text-base-600 leading-relaxed">{skill.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Certifications */}
        <section className="scroll-mt-24">
          <div className="mb-12">
            <h2 className="text-sm font-bold text-base-400 uppercase tracking-widest mb-4">Certifications</h2>
            <p className="text-xl text-base-600 max-w-2xl">Certifications I've earned while continuing to grow and develop as a data analyst.</p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-6">
            {certifications.map((cert, idx) => (
              <div key={idx} className="bg-white p-6 rounded-2xl border border-base-200 shadow-sm flex flex-col h-full hover:shadow-md transition-shadow">
                <div className="flex items-start gap-4 mb-4">
                  <div className="p-3 bg-accent-50 dark:bg-accent-500/10 text-accent-700 dark:text-accent-500 rounded-xl">
                    <Award className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-lg font-serif font-semibold text-base-900 leading-tight mb-1">{cert.name}</h3>
                    <p className="text-base-600">{cert.issuer}</p>
                    <p className="text-sm text-base-400 mt-1">Issued: {cert.date}</p>
                  </div>
                </div>
                <div className="mt-auto pt-4 border-t border-base-200">
                  <a 
                    href={cert.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-sm font-medium text-accent-700 dark:text-accent-500 hover:text-accent-800 dark:hover:text-accent-400 transition-colors"
                  >
                    See credentials <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Projects */}
        <section id="projects" className="scroll-mt-24">
          <div className="mb-12">
            <h2 className="text-sm font-bold text-base-400 uppercase tracking-widest mb-4">Selected Work</h2>
            <p className="text-xl text-base-600 max-w-2xl">A collection of my recent data analysis projects, highlighting my approach to solving business problems.</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project) => (
              <motion.div 
                key={project.id}
                whileHover={{ y: -8 }}
                onClick={() => setSelectedProject(project)}
                className="group cursor-pointer bg-white rounded-2xl overflow-hidden border border-base-200 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col h-full"
              >
                <div className="aspect-video overflow-hidden relative">
                  <div className="absolute inset-0 bg-[#000]/10 group-hover:bg-transparent transition-colors z-10"></div>
                  <img 
                    src={project.image} 
                    alt={project.title} 
                    className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div className="p-6 flex flex-col flex-grow">
                  <h3 className="text-xl font-serif font-semibold text-base-900 mb-3 group-hover:text-accent-700 dark:group-hover:text-accent-500 transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-base-600 text-sm mb-6 flex-grow">
                    {project.summary}
                  </p>
                  <div className="flex flex-wrap gap-2 mt-auto">
                    {project.tags.slice(0, 3).map(tag => (
                      <span key={tag} className="px-2.5 py-1 text-[11px] font-medium text-base-600 bg-base-100 rounded-md">
                        {tag}
                      </span>
                    ))}
                    {project.tags.length > 3 && (
                      <span className="px-2.5 py-1 text-[11px] font-medium text-base-500 bg-base-50 rounded-md border border-base-100">
                        +{project.tags.length - 3}
                      </span>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Testimonials */}
        <section className="scroll-mt-24">
          <div className="mb-12">
            <h2 className="text-sm font-bold text-base-400 uppercase tracking-widest mb-4">What people say</h2>
            <p className="text-xl text-base-600 max-w-2xl">From people I've worked with and learned from along the way.</p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-6">
            {testimonials.map((testimonial, idx) => (
              <div key={idx} className="bg-white p-6 rounded-2xl border border-base-200 shadow-sm flex flex-col h-full">
                <div className="text-accent-700 dark:text-accent-500 mb-4">
                  <svg className="w-6 h-6 opacity-50" fill="currentColor" viewBox="0 0 32 32" aria-hidden="true">
                    <path d="M9.352 4C4.456 7.456 1 13.12 1 19.36c0 5.088 3.072 8.064 6.624 8.064 3.36 0 5.856-2.688 5.856-5.856 0-3.168-2.208-5.472-5.088-5.472-.576 0-1.344.096-1.536.192.48-3.264 3.552-7.104 6.624-9.024L9.352 4zm16.512 0c-4.8 3.456-8.256 9.12-8.256 15.36 0 5.088 3.072 8.064 6.624 8.064 3.264 0 5.856-2.688 5.856-5.856 0-3.168-2.304-5.472-5.184-5.472-.576 0-1.248.096-1.44.192.48-3.264 3.456-7.104 6.528-9.024L25.864 4z" />
                  </svg>
                </div>
                <p className="text-lg text-base-700 leading-relaxed flex-grow mb-5 italic">"{testimonial.text}"</p>
                <div>
                  <p className="text-lg font-serif font-semibold text-base-900">{testimonial.name}</p>
                  <p className="text-base text-base-500">{testimonial.role}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Contact */}
        <section id="contact" className="scroll-mt-24 pb-24">
          <div className="bg-base-900 rounded-3xl p-8 sm:p-16 text-center">
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-white mb-6">Let's work together.</h2>
            <p className="text-base-400 max-w-xl mx-auto mb-10 text-lg">
              I'm currently open to new opportunities. Feel free to reach out whether it's about work, a question, or just to say hi!
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <a 
                href="mailto:pravadipta@gmail.com" 
                className="flex items-center gap-2 px-6 py-3 bg-accent-700 dark:bg-accent-500 text-white font-medium rounded-full hover:bg-accent-800 dark:hover:bg-accent-400 transition-colors"
              >
                <Mail className="w-5 h-5" />
                Email
              </a>
              <a 
                href="https://linkedin.com/in/pravadipta" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-6 py-3 bg-base-800 text-white font-medium rounded-full hover:bg-base-700 transition-colors border border-base-700"
              >
                <Linkedin className="w-5 h-5" />
                LinkedIn
              </a>
              <a 
                href="https://github.com/pravadipta" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-6 py-3 bg-base-800 text-white font-medium rounded-full hover:bg-base-700 transition-colors border border-base-700"
              >
                <Github className="w-5 h-5" />
                GitHub
              </a>
            </div>
          </div>
        </section>

      </main>
      
      <ScrollToTop />
      <footer className="border-t border-base-200 bg-base-100 dark:bg-base-100 py-8 text-center text-base-500 text-sm">
        <p>&copy; {new Date().getFullYear()} Pravadipta</p>
      </footer>

      {/* Project Modal */}
      {selectedProject && (
        <ProjectModal 
          project={selectedProject} 
          onClose={() => setSelectedProject(null)} 
        />
      )}
    </div>
  );
}