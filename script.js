/* ── theme ── */
const themeBtn = document.getElementById('themeBtn');
const flTheme = document.getElementById('flTheme');
const html = document.documentElement;
const savedTheme = localStorage.getItem('spTheme') || 'light';

const applyTheme = theme => {
  html.setAttribute('data-theme', theme);
  localStorage.setItem('spTheme', theme);
  if (themeBtn) themeBtn.textContent = theme === 'dark' ? '☀️' : '🌙';
  if (flTheme) {
    flTheme.innerHTML = `${theme === 'dark' ? '☀️' : '🌙'}<span class="fl-tip">Toggle Theme</span>`;
  }
};

const toggleTheme = () => {
  const current = html.getAttribute('data-theme') === 'dark' ? 'dark' : 'light';
  applyTheme(current === 'dark' ? 'light' : 'dark');
};

applyTheme(savedTheme);
if (themeBtn) themeBtn.addEventListener('click', toggleTheme);
if (flTheme) flTheme.addEventListener('click', toggleTheme);

/* ── hamburger ── */
const hamBtn = document.getElementById('hamBtn');
const mobileNav = document.getElementById('mobileNav');
hamBtn.addEventListener('click', () => mobileNav.classList.toggle('open'));
mobileNav.querySelectorAll('a').forEach(a => a.addEventListener('click', () => mobileNav.classList.remove('open')));

/* ── dropdown close ── */
const closeDrop = () => document.querySelectorAll('.nav-drop').forEach(d => d.classList.remove('active'));

/* ── floating bar ── */
let chatOpen = false;
const chatbox = document.getElementById('chatbox');

document.getElementById('flWa').addEventListener('click', () =>
  window.open('https://wa.me/8429312937', '_blank', 'noopener'));
document.getElementById('flYt').addEventListener('click', () =>
  window.open('https://www.youtube.com/@KhanSirOfficial', '_blank', 'noopener'));
// chat button listener handled later to initialize AI assistant messages

document.getElementById('chatX').addEventListener('click', () => {
  chatOpen = false; chatbox.classList.remove('open');
});
document.addEventListener('click', e => {
  if (chatOpen && !chatbox.contains(e.target) && !document.getElementById('flChat').contains(e.target)) {
    chatOpen = false; chatbox.classList.remove('open');
  }
});

/* chat submit */
const chatMessages = document.getElementById('chatMessages');
const chatInput = document.getElementById('chatInput');
const chatSendBtn = document.getElementById('chatSend');

const addChatMessage = (text, sender) => {
  const msg = document.createElement('div');
  msg.className = `chat-msg ${sender}`;
  msg.textContent = text;
  chatMessages.appendChild(msg);
  chatMessages.scrollTop = chatMessages.scrollHeight;
};

const generateChatReply = query => {
  const text = query.toLowerCase();
  if (text.includes('price') || text.includes('plan') || text.includes('payment') || text.includes('razorpay')) {
    return 'Our plans start from ₹10/month for Basic and ₹12/month for Premium. You can pay securely through Razorpay using the payment buttons on the page.';
  }
  if (text.includes('ssc') || text.includes('banking') || text.includes('railway') || text.includes('upsc')) {
    return 'We provide focused preparation for SSC, Banking, Railway and UPSC with notes, mock tests, and current affairs support. Ask me about a specific exam and I can share more details.';
  }
  if (text.includes('notes') || text.includes('pdf') || text.includes('material') || text.includes('mock')) {
    return 'You can access downloadable PDFs, topic notes, and mock tests from the Study Material and Test Series sections. Use the side panel buttons to open them.';
  }
  if (text.includes('result') || text.includes('score') || text.includes('progress')) {
    return 'Our dashboard section shows results, scores, and study progress. Keep practicing mock tests to improve your ranking and accuracy.';
  }
  if (text.includes('contact') || text.includes('phone') || text.includes('address')) {
    return 'The library is in Indore, open daily from 6 AM to 10 PM. You can contact us at +91 84293 12937 or email snehamiahra163@gmail.com.';
  }
  if (text.includes('hello') || text.includes('hi') || text.includes('hey')) {
    return 'Hello! I am your AI Study Assistant. Ask me anything about library plans, study material, exam prep, or payments.';
  }
  return 'I can help with library plans, exam guidance, notes, mock tests, and payments. Please ask a specific question about SSC, Banking, Railway, UPSC, or membership.';
};

const handleChatSubmit = () => {
  const message = chatInput.value.trim();
  if (!message) {
    shake(chatInput);
    return;
  }
  addChatMessage(message, 'user');
  chatInput.value = '';
  setTimeout(() => addChatMessage(generateChatReply(message), 'bot'), 700);
};

chatSendBtn.addEventListener('click', handleChatSubmit);
chatInput.addEventListener('keydown', e => {
  if (e.key === 'Enter') {
    e.preventDefault();
    handleChatSubmit();
  }
});

document.getElementById('flChat').addEventListener('click', () => {
  chatOpen = !chatOpen;
  chatbox.classList.toggle('open', chatOpen);
  if (chatOpen && chatMessages.children.length === 0) {
    setTimeout(() => addChatMessage('Hello! I am your AI Study Assistant. Ask me anything about Selection Point Library, exams, or membership.', 'bot'), 300);
  }
});

const loginModal = document.getElementById('loginModal');
const authHeading = document.getElementById('authHeading');
const authLoginBtn = document.getElementById('authLoginBtn');
const authRegisterBtn = document.getElementById('authRegisterBtn');
const loginScreen = document.getElementById('loginScreen');
const registerScreen = document.getElementById('registerScreen');
const dashboardInfo = document.getElementById('dashboardInfo');

const openLoginModal = () => {
  setAuthScreen('login');
  loginModal.classList.add('show');
  mobileNav.classList.remove('open');
};
const closeLoginModal = () => loginModal.classList.remove('show');

const setAuthScreen = screen => {
  const isLogin = screen === 'login';
  authHeading.textContent = isLogin ? 'Login' : 'Register';
  authLoginBtn.classList.toggle('active', isLogin);
  authRegisterBtn.classList.toggle('active', !isLogin);
  loginScreen.style.display = isLogin ? 'block' : 'none';
  registerScreen.style.display = isLogin ? 'none' : 'block';
  dashboardInfo.style.display = 'none';
};

const submitLogin = () => {
  const username = document.getElementById('loginUsername').value.trim();
  const email = document.getElementById('loginEmail').value.trim();
  const password = document.getElementById('loginPassword').value.trim();
  if (!username || !email || !password) {
    if (!username) shake(document.getElementById('loginUsername'));
    if (!email) shake(document.getElementById('loginEmail'));
    if (!password) shake(document.getElementById('loginPassword'));
    return;
  }
  showDashboard(`Welcome back, ${username}`);
};

const submitRegister = () => {
  const username = document.getElementById('registerUsername').value.trim();
  const email = document.getElementById('registerEmail').value.trim();
  const password = document.getElementById('registerPassword').value.trim();
  const examType = document.getElementById('registerExamType').value;
  const contact = document.getElementById('registerContact').value.trim();
  if (!username || !email || !password || !examType || !contact) {
    if (!username) shake(document.getElementById('registerUsername'));
    if (!email) shake(document.getElementById('registerEmail'));
    if (!password) shake(document.getElementById('registerPassword'));
    if (!examType) shake(document.getElementById('registerExamType'));
    if (!contact) shake(document.getElementById('registerContact'));
    return;
  }
  showDashboard(`Welcome ${username}! Your account is ready.`);
};

const forgotPassword = () => {
  const email = document.getElementById('loginEmail').value.trim() || document.getElementById('registerEmail').value.trim();
  if (!email) {
    shake(document.getElementById('loginEmail'));
    return;
  }
  alert(`Password reset link sent to ${email}. Please check your inbox.`);
};

const showDashboard = message => {
  authHeading.textContent = 'Student Dashboard';
  loginScreen.style.display = 'none';
  registerScreen.style.display = 'none';
  dashboardInfo.style.display = 'block';
  dashboardInfo.querySelector('h3').textContent = message;
};

/* shake field */
const shake = el => {
  el.style.borderColor = '#e02020';
  el.animate([{transform:'translateX(0)'},{transform:'translateX(-5px)'},{transform:'translateX(5px)'},{transform:'translateX(-4px)'},{transform:'translateX(4px)'},{transform:'translateX(0)'}],{duration:280,easing:'ease-out'});
  setTimeout(() => el.style.borderColor = '', 1400);
};

/* ── razorpay ── */
const RAZORPAY_KEY = 'rzp_test_Sg5BlrYYBFEpCg';

const handlePayment = (plan, amount) => {
  if (!window.Razorpay) {
    alert('Razorpay SDK failed to load. Please check your internet connection and try again.');
    return;
  }

  const options = {
    key: RAZORPAY_KEY,
    amount: amount * 100,
    currency: 'INR',
    name: 'Selection Point Library',
    description: `${plan} Plan Payment`,
    image: 'Image/Selection Point Logo.png',
    prefill: {
      name: '',
      email: '',
      contact: ''
    },
    notes: {
      plan,
      product: `${plan} Plan`
    },
    theme: {
      color: '#0f6efd'
    },
    handler: function (response) {
      if (response && response.razorpay_payment_id) {
        alert(`Payment successful!\nPayment ID: ${response.razorpay_payment_id}\nThank you for joining the ${plan} Plan.`);
      } else {
        alert('Payment completed, but no confirmation was received from Razorpay. Please check the Razorpay dashboard.');
      }
    },
    modal: {
      ondismiss: function () {
        console.log('Razorpay payment popup closed.');
      }
    }
  };

  const rzp = new Razorpay(options);
  rzp.open();
};

/* ═══════════════════════════
   SIDE PANEL SYSTEM
═══════════════════════════ */
const overlay = document.getElementById('overlay');
const sidePanel = document.getElementById('sidePanel');
const panelTitle = document.getElementById('panelTitle');
const panelSub = document.getElementById('panelSub');
const panelBody = document.getElementById('panelBody');

/* panel content database */
const panelData = {

  /* ── exam panels ── */
  ssc: {
    title: '📋 SSC Preparation',
    sub: 'CGL · CHSL · MTS · CPO · GD',
    html: `
      <div class="panel-first">
        <div class="panel-section-title">📚 Syllabus Topics</div>
        ${topicRow('🔢','Quantitative Aptitude','Chapter-wise notes + Practice','→')}
        ${topicRow('🧠','Reasoning','Verbal & Non-verbal complete','→')}
        ${topicRow('📖','English Language','Grammar + Vocabulary + RC','→')}
        ${topicRow('🌍','General Awareness','Static GK + Current Affairs','→')}
        <div class="panel-section-title">📄 Download Free PDFs</div>
        ${pdfRow('📕','SSC CGL Previous Papers (2019–24)','12 MB')}
        ${pdfRow('📗','SSC CHSL Full Syllabus Notes','8 MB')}
        ${pdfRow('📘','SSC Maths Shortcut Tricks','5 MB')}
        ${pdfRow('📙','SSC English 500 Questions','4 MB')}
        <div class="panel-section-title">🔗 Official Links</div>
        ${srLink('SSC CGL 2024 Notification','https://sarkariresult.com','new')}
        ${srLink('SarkariResult.com – SSC','https://sarkariresult.com','result')}
        <div class="panel-section-title">🚀 Quick Actions</div>
        <button class="sp-btn primary" style="width:100%;justify-content:center;margin-bottom:10px;" onclick="closePanel();document.getElementById('test-series').scrollIntoView()">📝 Start Mock Test</button>
        <button class="sp-btn" style="width:100%;justify-content:center;" onclick="handlePayment('Premium',12)">💳 Join Premium for SSC</button>
      </div>`
  },

  bank: {
    title: '🏦 Banking Preparation',
    sub: 'IBPS PO · SBI PO · Clerk · RRB PO',
    html: `
      <div class="panel-first">
        <div class="panel-section-title">📚 Syllabus Topics</div>
        ${topicRow('🔢','Quantitative Aptitude & DI','Data Interpretation focus','→')}
        ${topicRow('🧠','Reasoning Ability','Puzzles, Seating, Syllogism','→')}
        ${topicRow('📖','English Language','RC, Cloze, Para jumbles','→')}
        ${topicRow('💻','Computer Awareness','Basic computer & banking IT','→')}
        ${topicRow('🏦','Banking Awareness','Current banking news & terms','→')}
        <div class="panel-section-title">📄 Download Free PDFs</div>
        ${pdfRow('📕','IBPS PO Previous Papers (2018–24)','14 MB')}
        ${pdfRow('📗','SBI Clerk Exam Notes','9 MB')}
        ${pdfRow('📘','Banking Awareness 2024 PDF','6 MB')}
        ${pdfRow('📙','DI Practice Set 200 Questions','5 MB')}
        <div class="panel-section-title">🔗 Official Links</div>
        ${srLink('IBPS Official Website','https://ibps.in','live')}
        ${srLink('SBI Careers','https://sbi.co.in/careers','live')}
        ${srLink('SarkariResult – Banking','https://sarkariresult.com','result')}
        <div class="panel-section-title">🚀 Quick Actions</div>
        <button class="sp-btn primary" style="width:100%;justify-content:center;margin-bottom:10px;" onclick="closePanel();document.getElementById('test-series').scrollIntoView()">📝 Start Banking Mock Test</button>
        <button class="sp-btn" style="width:100%;justify-content:center;" onclick="handlePayment('Premium',12)">💳 Join Premium for Banking</button>
      </div>`
  },

  rail: {
    title: '🚂 Railway Preparation',
    sub: 'RRB NTPC · Group D · ALP · JE',
    html: `
      <div class="panel-first">
        <div class="panel-section-title">📚 Syllabus Topics</div>
        ${topicRow('🔢','Mathematics','Arithmetic, Algebra, Geometry','→')}
        ${topicRow('🧠','General Intelligence','Reasoning & Analogy','→')}
        ${topicRow('🔬','General Science','Physics, Chemistry, Biology','→')}
        ${topicRow('🌍','General Awareness','Current affairs + Railway GK','→')}
        <div class="panel-section-title">📄 Download Free PDFs</div>
        ${pdfRow('📕','RRB NTPC Previous Papers (2016–22)','11 MB')}
        ${pdfRow('📗','Railway Group D Complete Notes','8 MB')}
        ${pdfRow('📘','General Science 1000 MCQs','6 MB')}
        ${pdfRow('📙','Railway GK Special 2024','4 MB')}
        <div class="panel-section-title">🔗 Official Links</div>
        ${srLink('RRB Official Portal','https://indianrailways.gov.in','live')}
        ${srLink('Railway NTPC Notification','https://sarkariresult.com','new')}
        ${srLink('SarkariResult – Railway','https://sarkariresult.com','result')}
        <div class="panel-section-title">🚀 Quick Actions</div>
        <button class="sp-btn primary" style="width:100%;justify-content:center;margin-bottom:10px;" onclick="closePanel();document.getElementById('test-series').scrollIntoView()">📝 Start Railway Mock Test</button>
        <button class="sp-btn" style="width:100%;justify-content:center;" onclick="handlePayment('Premium',12)">💳 Join Premium for Railway</button>
      </div>`
  },

  upsc: {
    title: '🏛️ UPSC Preparation',
    sub: 'Prelims · Mains · State PCS',
    html: `
      <div class="panel-first">
        <div class="panel-section-title">📚 Prelims Syllabus</div>
        ${topicRow('🏛️','Indian Polity','Constitution, Governance, Rights','→')}
        ${topicRow('📜','History','Ancient, Medieval, Modern India','→')}
        ${topicRow('🗺️','Geography','Physical, Human, Economic','→')}
        ${topicRow('🌱','Environment','Ecology, Climate, Biodiversity','→')}
        ${topicRow('💰','Economy','Macro, Micro, Budget, Planning','→')}
        ${topicRow('🔬','General Science','Physics, Chem, Biology basics','→')}
        <div class="panel-section-title">📄 Download Free PDFs</div>
        ${pdfRow('📕','UPSC Prelims PYQ (2014–24)','18 MB')}
        ${pdfRow('📗','NCERT Summary Notes (6–12)','15 MB')}
        ${pdfRow('📘','Indian Polity Mind Maps','7 MB')}
        ${pdfRow('📙','Economy Handwritten Notes','10 MB')}
        <div class="panel-section-title">🔗 Official Links</div>
        ${srLink('UPSC Official Website','https://upsc.gov.in','live')}
        ${srLink('MPPSC Official','https://mppsc.mp.gov.in','live')}
        ${srLink('SarkariResult – UPSC','https://sarkariresult.com','result')}
        <div class="panel-section-title">🚀 Quick Actions</div>
        <button class="sp-btn primary" style="width:100%;justify-content:center;margin-bottom:10px;" onclick="closePanel()">📝 Start UPSC Practice</button>
        <button class="sp-btn" style="width:100%;justify-content:center;" onclick="handlePayment('Premium',12)">💳 Join Premium for UPSC</button>
      </div>`
  },

  /* ── PDF panels ── */
  'pdf-maths': {
    title: '🔢 Mathematics PDFs',
    sub: 'Free download — all exams',
    html: `<div class="panel-first"><div class="panel-section-title">📥 Download Free PDFs</div>
      ${pdfRow('📕','Maths Shortcut Tricks — All Exams','6 MB')}
      ${pdfRow('📗','Arithmetic Complete Notes','5 MB')}
      ${pdfRow('📘','Algebra & Geometry Notes','4 MB')}
      ${pdfRow('📙','1000 Maths Practice Questions','8 MB')}
      ${pdfRow('📕','SSC CGL Tier-I Maths PYQs','5 MB')}
      ${pdfRow('📗','Banking Quant DI Tricks','7 MB')}
      ${pdfRow('📘','Railway Maths Chapter-wise','4 MB')}
      <div class="panel-section-title">🌐 Free Online Resources</div>
      ${srLink('SarkariResult – Maths Material','https://sarkariresult.com','live')}
      ${srLink('SSC Adda – Quant Notes','https://sscadda.com','live')}</div>`
  },

  'pdf-reasoning': {
    title: '🧠 Reasoning PDFs',
    sub: 'Verbal & Non-verbal — free download',
    html: `<div class="panel-first"><div class="panel-section-title">📥 Download Free PDFs</div>
      ${pdfRow('📕','Verbal Reasoning Complete Notes','5 MB')}
      ${pdfRow('📗','Non-Verbal Reasoning with Figures','6 MB')}
      ${pdfRow('📘','Seating Arrangement 200 Sets','4 MB')}
      ${pdfRow('📙','Puzzle Practice Sets — Banking','7 MB')}
      ${pdfRow('📕','SSC Reasoning PYQs (2019–24)','5 MB')}
      <div class="panel-section-title">🌐 Online Resources</div>
      ${srLink('SarkariResult – Reasoning','https://sarkariresult.com','live')}</div>`
  },

  'pdf-english': {
    title: '📖 English PDFs',
    sub: 'Grammar · Vocabulary · RC — free',
    html: `<div class="panel-first"><div class="panel-section-title">📥 Download Free PDFs</div>
      ${pdfRow('📕','English Grammar Complete Notes','5 MB')}
      ${pdfRow('📗','1000 Vocabulary Words with Usage','6 MB')}
      ${pdfRow('📘','Reading Comprehension 50 Passages','7 MB')}
      ${pdfRow('📙','Error Detection 500 Questions','4 MB')}
      ${pdfRow('📕','SSC English PYQ (2018–24)','6 MB')}
      <div class="panel-section-title">🌐 Online Resources</div>
      ${srLink('SarkariResult – English','https://sarkariresult.com','live')}</div>`
  },

  'pdf-gk': {
    title: '🌍 GK / GS PDFs',
    sub: 'Static GK + Current GS — free',
    html: `<div class="panel-first"><div class="panel-section-title">📥 Download Free PDFs</div>
      ${pdfRow('📕','Indian Polity Notes (Laxmikant Summary)','10 MB')}
      ${pdfRow('📗','History Timeline PDF — Ancient to Modern','8 MB')}
      ${pdfRow('📘','Geography Atlas Notes','7 MB')}
      ${pdfRow('📙','General Science 1500 MCQs','9 MB')}
      ${pdfRow('📕','Static GK Capsule 2024','5 MB')}
      <div class="panel-section-title">🌐 Online Resources</div>
      ${srLink('SarkariResult – GK Updates','https://sarkariresult.com','live')}</div>`
  },

  'pdf-pyq': {
    title: '📄 Previous Year Papers',
    sub: 'Last 10 years — all exams free',
    html: `<div class="panel-first"><div class="panel-section-title">📥 Download Free PDFs</div>
      ${pdfRow('📕','SSC CGL PYQ 2014–2024','18 MB')}
      ${pdfRow('📗','IBPS PO PYQ 2015–2024','16 MB')}
      ${pdfRow('📘','RRB NTPC PYQ 2016–2022','12 MB')}
      ${pdfRow('📙','UPSC Prelims PYQ 2013–2024','20 MB')}
      ${pdfRow('📕','SBI Clerk PYQ 2016–2024','14 MB')}
      ${pdfRow('📗','MPPSC PYQ 2015–2024','11 MB')}
      <div class="panel-section-title">🌐 Online Resources</div>
      ${srLink('SarkariResult – All PYQs','https://sarkariresult.com','live')}</div>`
  },

  'pdf-ca': {
    title: '📰 Current Affairs PDFs',
    sub: 'Monthly compiled — free download',
    html: `<div class="panel-first"><div class="panel-section-title">📥 Download Free PDFs</div>
      ${pdfRow('📕','April 2025 Current Affairs PDF','4 MB')}
      ${pdfRow('📗','March 2025 Current Affairs PDF','4 MB')}
      ${pdfRow('📘','February 2025 Current Affairs PDF','3 MB')}
      ${pdfRow('📙','January 2025 Current Affairs PDF','4 MB')}
      ${pdfRow('📕','2024 Annual Current Affairs','22 MB')}
      <div class="panel-section-title">🌐 Online Resources</div>
      ${srLink('SarkariResult – Current Affairs','https://sarkariresult.com','live')}</div>`
  },

  /* ── test series panels ── */
  'test-weekly': {
    title: '📝 Weekly Mock Tests',
    sub: 'Free — every Sunday',
    html: `<div class="panel-first">
      <div class="panel-section-title">📅 Upcoming Tests</div>
      ${topicRow('📋','SSC CGL Mock Test #18','Sunday 10 AM | 100 Q | 60 min','Register')}
      ${topicRow('🏦','Banking Aptitude Test #12','Sunday 2 PM | 100 Q | 60 min','Register')}
      ${topicRow('🚂','Railway NTPC Mock #8','Sunday 5 PM | 100 Q | 60 min','Register')}
      <div class="panel-section-title">ℹ️ Test Details</div>
      <div style="background:var(--sp-sky);border-radius:10px;padding:14px;font-size:.83rem;color:var(--sp-muted);line-height:1.8;">
        ✅ Free for all members<br>
        ✅ Instant result after submission<br>
        ✅ Solution PDF emailed after test<br>
        ✅ All India rank displayed<br>
        ✅ Topic-wise analysis provided
      </div>
      <button class="sp-btn primary" style="width:100%;justify-content:center;margin-top:16px;" onclick="handlePayment('Basic',10)">💳 Join to Access Tests</button>
    </div>`
  },

  'test-full': {
    title: '🏆 Full Length Test Series',
    sub: 'Premium — exact exam pattern',
    html: `<div class="panel-first">
      <div class="panel-section-title">📋 Available Series</div>
      ${topicRow('📋','SSC CGL Complete Series','30 Full Tests + 60 Sectional','Start')}
      ${topicRow('🏦','IBPS PO Series 2025','25 Full Tests + 50 Sectional','Start')}
      ${topicRow('🚂','RRB NTPC Series','20 Full Tests + 40 Sectional','Start')}
      ${topicRow('🏛️','UPSC Prelims Series','15 Full Tests + 30 Topic','Start')}
      <div class="panel-section-title">📊 What You Get</div>
      <div style="background:var(--sp-sky);border-radius:10px;padding:14px;font-size:.83rem;color:var(--sp-muted);line-height:1.9;">
        ✅ 200 questions, exact exam timing<br>
        ✅ All India rank comparison<br>
        ✅ Detailed solution with explanation<br>
        ✅ Speed & accuracy analytics<br>
        ✅ Topic-wise weak area report
      </div>
      <button class="sp-btn primary" style="width:100%;justify-content:center;margin-top:16px;" onclick="handlePayment('Premium',12)">💳 Get Premium Access</button>
    </div>`
  },

  'test-analysis': {
    title: '📊 Result Analysis',
    sub: 'Track your improvement',
    html: `<div class="panel-first">
      <div class="panel-section-title">📈 Your Dashboard Shows</div>
      ${topicRow('📊','Subject-wise Score','See where you score vs average','View')}
      ${topicRow('⚡','Speed & Accuracy','Questions/min + correct %','View')}
      ${topicRow('📅','Monthly Progress','Graph of all tests taken','View')}
      ${topicRow('❗','Weak Areas','Auto-identified weak topics','View')}
      <div class="panel-section-title">💡 How It Helps</div>
      <div style="background:var(--sp-sky);border-radius:10px;padding:14px;font-size:.83rem;color:var(--sp-muted);line-height:1.9;">
        ✅ Know exactly what to study next<br>
        ✅ Compare with toppers' patterns<br>
        ✅ Mentor reviews your reports monthly<br>
        ✅ Adaptive practice sets for weak topics
      </div>
      <button class="sp-btn primary" style="width:100%;justify-content:center;margin-top:16px;" onclick="handlePayment('Premium',12)">💳 Get Premium Access</button>
    </div>`
  },

  /* ── current affairs panels ── */
  'ca-daily': {
    title: '📅 Daily Current Affairs',
    sub: 'Today\'s top 15 exam-relevant news',
    html: `<div class="panel-first">
      <div class="panel-section-title">📰 Today's Updates — May 2025</div>
      ${caItem('🏛️','India signed trade agreement with 3 ASEAN nations')}
      ${caItem('🔬','ISRO successfully launched RISAT-3 satellite')}
      ${caItem('🏆','Neeraj Chopra wins gold at Diamond League 2025')}
      ${caItem('💰','RBI keeps repo rate unchanged at 6.5%')}
      ${caItem('📚','NEP 2025 new guidelines released by Education Ministry')}
      ${caItem('🌱','India ranked 4th in Renewable Energy capacity globally')}
      ${caItem('🏅','Manu Bhaker awarded Rajiv Gandhi Khel Ratna 2025')}
      <div class="panel-section-title">📥 Download Today's PDF</div>
      ${pdfRow('📕','Daily CA — May 3, 2025','1.2 MB')}
      <button class="sp-btn green-btn" style="width:100%;justify-content:center;margin-top:8px;" onclick="openPanel('pdf-ca')">📆 Download Monthly PDF</button>
    </div>`
  },

  'ca-monthly': {
    title: '📆 Monthly Current Affairs PDFs',
    sub: 'Download compiled monthly PDFs free',
    html: `<div class="panel-first"><div class="panel-section-title">📥 Monthly PDFs — 2025</div>
      ${pdfRow('📕','April 2025 – Full Month CA','4.2 MB')}
      ${pdfRow('📗','March 2025 – Full Month CA','4.0 MB')}
      ${pdfRow('📘','February 2025 – Full Month CA','3.8 MB')}
      ${pdfRow('📙','January 2025 – Full Month CA','4.1 MB')}
      ${pdfRow('📕','December 2024 – Full Month CA','4.5 MB')}
      ${pdfRow('📗','2024 Annual Capsule – All Months','22 MB')}
    </div>`
  },

  'ca-economy': {
    title: '💰 Budget & Economy',
    sub: 'Exam-oriented economic updates',
    html: `<div class="panel-first">
      <div class="panel-section-title">📊 Key Budget 2025 Highlights</div>
      ${caItem('💰','GDP growth target: 7.2% for FY 2025–26')}
      ${caItem('🏗️','PM Infrastructure Fund: ₹11 lakh crore allocation')}
      ${caItem('🌱','Green Energy subsidy doubled in Union Budget 2025')}
      ${caItem('📚','Education budget increased by 14% — NEP focus')}
      ${caItem('🏥','Ayushman Bharat extended to 70+ age group')}
      <div class="panel-section-title">📥 Economy PDFs</div>
      ${pdfRow('📕','Union Budget 2025 Key Points','3 MB')}
      ${pdfRow('📗','Economic Survey 2024–25 Summary','5 MB')}
      ${pdfRow('📘','RBI Annual Report Highlights','4 MB')}
    </div>`
  },

  'ca-awards': {
    title: '🏆 Awards & Honours 2025',
    sub: 'Complete updated list',
    html: `<div class="panel-first">
      <div class="panel-section-title">🏅 National Awards 2025</div>
      ${caItem('🏆','Bharat Ratna 2025 — (check SarkariResult for latest)')}
      ${caItem('🎖️','Padma Vibhushan — 5 recipients announced')}
      ${caItem('🎗️','Padma Bhushan — 17 recipients')}
      ${caItem('🏅','Padma Shri — 110 recipients')}
      <div class="panel-section-title">🌍 International Awards</div>
      ${caItem('📖','Nobel Prize 2024 — Literature: Han Kang (South Korea)')}
      ${caItem('🕊️','Nobel Peace Prize 2024 — Nihon Hidankyo (Japan)')}
      ${caItem('💊','Nobel Medicine 2024 — MicroRNA discovery')}
      <div class="panel-section-title">📥 Awards PDF</div>
      ${pdfRow('📕','Complete Awards List 2024–25','2.5 MB')}
    </div>`
  },

  'ca-sports': {
    title: '🏏 Sports Updates 2025',
    sub: 'Tournaments, records, winners',
    html: `<div class="panel-first">
      <div class="panel-section-title">🏏 Cricket</div>
      ${caItem('🏆','India won ICC Champions Trophy 2025')}
      ${caItem('🎯','Rohit Sharma: 12,000 ODI runs milestone')}
      ${caItem('🌍','IPL 2025 — Season underway')}
      <div class="panel-section-title">⚽ Other Sports</div>
      ${caItem('🏅','India won 6 medals at Asian Athletics 2025')}
      ${caItem('🎾','Sumit Nagal reaches ATP top-60 ranking')}
      ${caItem('🏸','PV Sindhu wins All England 2025')}
      <div class="panel-section-title">📥 Sports PDF</div>
      ${pdfRow('📕','Sports GK Complete 2024–25','3 MB')}
    </div>`
  },

  'ca-schemes': {
    title: '🏛️ Government Schemes 2025',
    sub: 'PM Yojana, State schemes — exam focus',
    html: `<div class="panel-first">
      <div class="panel-section-title">🇮🇳 Central Government Schemes</div>
      ${caItem('🏠','PM Awas Yojana 2.0 — 3 crore homes target')}
      ${caItem('💊','Ayushman Bharat — 70+ age group added')}
      ${caItem('👩‍🌾','PM Kisan — ₹6000/year to 11+ crore farmers')}
      ${caItem('⚡','PM Surya Ghar — free solar for 1 crore homes')}
      ${caItem('💼','Rozgar Mela — 10 lakh government jobs initiative')}
      <div class="panel-section-title">🗺️ MP State Schemes</div>
      ${caItem('👧','Ladli Behna Yojana — monthly financial aid')}
      ${caItem('📚','Medhavi Scholarship — free education')}
      <div class="panel-section-title">📥 Schemes PDF</div>
      ${pdfRow('📕','All Govt Schemes Complete PDF 2025','6 MB')}
    </div>`
  },

  /* ── sarkari result panels ── */
  'sr-ssc': {
    title: '📋 SSC – Sarkari Result',
    sub: 'Latest notifications & results',
    html: `<div class="panel-first">
      <div class="panel-section-title">🔴 Live Notifications</div>
      ${srLink('SSC CGL 2024 – Apply Online','https://ssc.nic.in','new')}
      ${srLink('SSC CHSL 2025 Notification','https://ssc.nic.in','new')}
      ${srLink('SSC MTS 2025 Registration','https://ssc.nic.in','live')}
      <div class="panel-section-title">📋 Admit Cards</div>
      ${srLink('SSC CGL Tier-I Admit Card','https://sarkariresult.com','live')}
      ${srLink('SSC CHSL Admit Card 2024','https://sarkariresult.com','live')}
      <div class="panel-section-title">🏆 Results</div>
      ${srLink('SSC GD Constable Result 2025','https://sarkariresult.com','result')}
      ${srLink('SSC CPO Paper-II Result','https://sarkariresult.com','result')}
      <a href="https://sarkariresult.com" target="_blank" rel="noopener" class="sp-btn red-btn" style="width:100%;justify-content:center;margin-top:16px;">🔴 Go to SarkariResult.com</a>
    </div>`
  },

  'sr-bank': {
    title: '🏦 Banking – Sarkari Result',
    sub: 'IBPS, SBI, RBI latest',
    html: `<div class="panel-first">
      <div class="panel-section-title">🔴 Apply Now</div>
      ${srLink('IBPS PO 2025 Registration Open','https://ibps.in','new')}
      ${srLink('SBI Clerk 2025 – Apply Now','https://sbi.co.in','new')}
      ${srLink('RBI Grade B Officer 2025','https://rbi.org.in','live')}
      <div class="panel-section-title">📋 Admit Cards</div>
      ${srLink('IBPS RRB PO Admit Card 2025','https://sarkariresult.com','live')}
      <div class="panel-section-title">🏆 Results</div>
      ${srLink('SBI PO Final Result 2024','https://sarkariresult.com','result')}
      ${srLink('IBPS Clerk Final Result 2024','https://sarkariresult.com','result')}
      <a href="https://sarkariresult.com" target="_blank" rel="noopener" class="sp-btn red-btn" style="width:100%;justify-content:center;margin-top:16px;">🔴 Go to SarkariResult.com</a>
    </div>`
  },

  'sr-rail': {
    title: '🚂 Railway – Sarkari Result',
    sub: 'RRB latest notifications',
    html: `<div class="panel-first">
      <div class="panel-section-title">🔴 Apply Now</div>
      ${srLink('RRB NTPC 2025 Notification','https://indianrailways.gov.in','new')}
      ${srLink('RRB Group D 2025 Registration','https://rrbapply.gov.in','new')}
      ${srLink('RRB ALP Technician 2025','https://sarkariresult.com','live')}
      <div class="panel-section-title">📋 Admit Cards</div>
      ${srLink('RRB NTPC CBT-2 Admit Card','https://sarkariresult.com','live')}
      <div class="panel-section-title">🏆 Results</div>
      ${srLink('RRB Group D Result 2025','https://sarkariresult.com','result')}
      ${srLink('RRB NTPC Final Merit List','https://sarkariresult.com','result')}
      <a href="https://sarkariresult.com" target="_blank" rel="noopener" class="sp-btn red-btn" style="width:100%;justify-content:center;margin-top:16px;">🔴 Go to SarkariResult.com</a>
    </div>`
  },

  'sr-state': {
    title: '🗺️ State Jobs – MP & Others',
    sub: 'MPPSC, Police, Patwari, Vyapam',
    html: `<div class="panel-first">
      <div class="panel-section-title">🔴 MP Government Jobs</div>
      ${srLink('MPPSC State Services 2025','https://mppsc.mp.gov.in','new')}
      ${srLink('MP Police Constable 2025','https://sarkariresult.com','new')}
      ${srLink('MP Patwari Recruitment 2025','https://sarkariresult.com','live')}
      ${srLink('MP Vyapam MPPEB 2025','https://peb.mp.gov.in','live')}
      <div class="panel-section-title">📋 Admit Cards & Results</div>
      ${srLink('MP Police SI Admit Card','https://sarkariresult.com','live')}
      ${srLink('MPPSC Prelims Result 2024','https://sarkariresult.com','result')}
      <a href="https://sarkariresult.com" target="_blank" rel="noopener" class="sp-btn red-btn" style="width:100%;justify-content:center;margin-top:16px;">🔴 Go to SarkariResult.com</a>
    </div>`
  }
};

/* helper: topic row */
function topicRow(emoji, name, count, arrow) {
  return `<div class="topic-row"><div class="topic-left"><span class="topic-emoji">${emoji}</span><div><div class="topic-name">${name}</div><div class="topic-count">${count}</div></div></div><span class="topic-arrow">${arrow}</span></div>`;
}

/* helper: pdf row — opens sarkariresult for free download */
function pdfRow(icon, name, size) {
  return `<div class="pdf-item"><div class="pdf-left"><span class="pdf-icon">${icon}</span><div><div class="pdf-name">${name} <span class="pdf-free-tag">FREE</span></div><div class="pdf-size">${size}</div></div></div><button class="sp-btn green-btn sm" onclick="window.open('https://sarkariresult.com','_blank','noopener')">⬇ Download</button></div>`;
}

/* helper: sarkari result link */
function srLink(text, url, status) {
  const labels = {live:'🟢 Live', new:'🔴 New', result:'🔵 Result'};
  return `<div class="sr-link-item"><a href="${url}" target="_blank" rel="noopener">${text}</a><span class="sr-status ${status}">${labels[status]||status}</span></div>`;
}

/* helper: current affairs item */
function caItem(icon, text) {
  return `<div style="display:flex;gap:10px;align-items:flex-start;padding:8px 0;border-bottom:1px dashed var(--sp-border);font-size:.83rem;color:var(--sp-text);"><span style="flex-shrink:0;">${icon}</span><span>${text}</span></div>`;
}

/* open panel */
function openPanel(key) {
  const data = panelData[key];
  if (!data) return;
  panelTitle.textContent = data.title;
  panelSub.textContent   = data.sub;
  panelBody.innerHTML    = data.html;
  overlay.classList.add('show');
  sidePanel.classList.add('open');
  document.body.style.overflow = 'hidden';
}

/* close panel */
function closePanel() {
  overlay.classList.remove('show');
  sidePanel.classList.remove('open');
  document.body.style.overflow = '';
}

/* escape closes panel */
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') { closePanel(); chatOpen = false; chatbox.classList.remove('open'); }
});
