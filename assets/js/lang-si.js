
(function(){
  document.documentElement.lang = 'si';

  const fixes = {
  "We’ll suggest the best website type that fits your business.": "ඔබගේ ව්‍යාපාරයට ගැලපෙන හොඳම වෙබ් අඩවි වර්ගය අපි යෝජනා කරන්නෙමු.",
  "We'll suggest the best website type that fits your business.": "ඔබගේ ව්‍යාපාරයට ගැලපෙන හොඳම වෙබ් අඩවි වර්ගය අපි යෝජනා කරන්නෙමු.",
  "වෙබ් අඩවියs that look perfect on all devices.": "සියලුම උපාංගවල ලස්සනට පෙනෙන වෙබ් අඩවි.",
  "Websites that look perfect on all devices.": "සියලුම උපාංගවල ලස්සනට පෙනෙන වෙබ් අඩවි.",
  "A clear and easy process to get your website.": "ඔබගේ වෙබ් අඩවිය ලබාගැනීමට පැහැදිලි සහ පහසු ක්‍රියාවලියක්.",
  "Get your prන්essional website within just 3 days.": "ඔබගේ වෘත්තීය වෙබ් අඩවිය දින 3ක් තුළ ලබාගන්න.",
  "Get your professional website within just 3 days.": "ඔබගේ වෘත්තීය වෙබ් අඩවිය දින 3ක් තුළ ලබාගන්න.",
  "Help us understand your website requirement so we can recommend the right website path.": "ඔබගේ වෙබ් අඩවි අවශ්‍යතාවය තේරුම් ගැනීමට අපට උදව් කරන්න. එවිට අපට සුදුසු වෙබ් අඩවි මාර්ගය යෝජනා කළ හැක.",
  "Tell Us About Your වෙබ් අඩවිය": "ඔබගේ වෙබ් අඩවිය ගැන අපට කියන්න",
  "2. Main services / products": "2. ප්‍රධාන සේවා / නිෂ්පාදන",
  "Standard website, perfect for most businesses": "බොහෝ ව්‍යාපාර සඳහා ගැලපෙන සම්මත වෙබ් අඩවිය",
  "More pages for growing businesses": "වර්ධනය වන ව්‍යාපාර සඳහා වැඩි පිටු",
  "Unlimited product pages": "අසීමිත නිෂ්පාදන පිටු",
  "Not Sure": "නිශ්චිත නොවේ",
  "We will recommend the best option": "අපි හොඳම විකල්පය යෝජනා කරන්නෙමු",
  "4. What best describes your business?": "4. ඔබගේ ව්‍යාපාරයට වඩාත් ගැලපෙන්නේ කුමක්ද?",
  "5. නිර්දේශිත website path": "5. නිර්දේශිත වෙබ් අඩවි මාර්ගය",
  "තෝරන්න one path. No technical platform selection needed here. We will handle the best setup for your website.": "එක් මාර්ගයක් තෝරන්න. මෙහි තාක්ෂණික වේදිකාවක් තෝරා ගැනීම අවශ්‍ය නැත. ඔබගේ වෙබ් අඩවිය සඳහා හොඳම සැකසුම අපි හසුරුවන්නෙමු.",
  "For services, companies, and local businesses": "සේවා, සමාගම් සහ දේශීය ව්‍යාපාර සඳහා",
  "Professional company profile website": "වෘත්තීය සමාගම් පැතිකඩ වෙබ් අඩවිය",
  "නිෂ්පාදන catalogue and inquiry website": "නිෂ්පාදන ලැයිස්තුව සහ විමසීම් වෙබ් අඩවිය",
  "Online selling website with products": "නිෂ්පාදන සමඟ මාර්ගගත විකුණුම් වෙබ් අඩවිය",
  "වෙනත් / Not Sure": "වෙනත් / නිශ්චිත නොවේ",
  "Let Webdeveloper.lk recommend": "Webdeveloper.lk යෝජනා කිරීමට ඉඩ දෙන්න",
  "Every website we build is responsive on mobile, tablet, and desktop.": "අපි සාදන සෑම වෙබ් අඩවියක්ම ජංගම, ටැබ්ලට් සහ ඩෙස්ක්ටොප් උපාංගවල responsive වේ.",
  "6. Any additional information?": "6. අමතර තොරතුරු තිබේද?",
  "Your ව්‍යාපෘතිය Summary": "ඔබගේ ව්‍යාපෘති සාරාංශය",
  "Not added": "තවම එක් කර නැත",
  "ව්‍යාපාරය Category": "ව්‍යාපාර කාණ්ඩය",
  "Summary & ගෙවීම": "සාරාංශය සහ ගෙවීම",
  "ඊළඟ Step": "ඊළඟ පියවර",
  "ඊළඟ, choose a website theme that matches your business style.": "ඊළඟට, ඔබගේ ව්‍යාපාරික ශෛලියට ගැලපෙන වෙබ් අඩවි තේමාවක් තෝරන්න.",
  "Every website is responsive on all devices.": "සෑම වෙබ් අඩවියක්ම සියලුම උපාංගවල responsive වේ.",
  "Clean guided steps without confusion.": "අවුල් නැති පිරිසිදු මඟපෙන්වූ පියවර.",
  "වෙබ් අඩවිය delivery within 3 days after payment.": "ගෙවීමෙන් පසු දින 3ක් තුළ වෙබ් අඩවි බෙදාහැරීම.",
  "Drag & drop or": "ගොනු ඇද දමන්න හෝ තෝරන්න",
  "browse files": "ගොනු තෝරන්න",
  "PNG, JPG, SVG or WEBP. Max 5MB": "PNG, JPG, SVG හෝ WEBP. උපරිම 5MB",
  "✉ Setup Email": "✉ ඊමේල් සැකසීම",
  "✎ Request Change": "✎ වෙනසක් ඉල්ලන්න",
  "▤ Invoices & ගෙවීම්": "▤ ඉන්වොයිසි සහ ගෙවීම්",
  "♡ පැතිකඩ Settings": "♡ පැතිකඩ සැකසුම්",
  "ව්‍යාපෘතිය Confirmed": "ව්‍යාපෘතිය තහවුරු කර ඇත",
  "Your website project is now active. We will contact you during the progress.": "ඔබගේ වෙබ් අඩවි ව්‍යාපෘතිය දැන් සක්‍රීයයි. ප්‍රගතිය අතරතුර අපි ඔබව සම්බන්ධ කරගන්නෙමු.",
  "View Status": "තත්ත්වය බලන්න",
  "Webdeveloper.lk Client Area": "Webdeveloper.lk පාරිභෝගික ප්‍රදේශය",
  "Secure project dashboard": "ආරක්ෂිත ව්‍යාපෘති ඩෑෂ්බෝඩ්",
  "Welcome,": "ආයුබෝවන්,",
  "Your website project for": "ඔබගේ වෙබ් අඩවි ව්‍යාපෘතිය",
  "Your ව්‍යාපාරය": "ඔබගේ ව්‍යාපාරය",
  "is in progress. We will contact you during the progress.": "දැන් ක්‍රියාත්මක වේ. ප්‍රගතිය අතරතුර අපි ඔබව සම්බන්ධ කරගන්නෙමු.",
  "Current Stage: Planning & First Design": "වත්මන් අදියර: සැලසුම් කිරීම සහ පළමු නිර්මාණය",
  "View ව්‍යාපෘති ප්‍රගතිය →": "ව්‍යාපෘති ප්‍රගතිය බලන්න →",
  "website has been launched successfully. Your live website link and ownership details are now available below.": "වෙබ් අඩවිය සාර්ථකව දියත් කර ඇත. ඔබගේ සජීවී වෙබ් අඩවි සබැඳිය සහ හිමිකාරීත්ව විස්තර පහතින් ලබාගත හැක.",
  "ඊළඟ Year": "ඊළඟ වසර",
  "LKR 12,000 annually": "වාර්ෂිකව LKR 12,000",
  "Client ඩෑෂ්බෝඩ්": "පාරිභෝගික ඩෑෂ්බෝඩ්",
  "Requirements": "අවශ්‍යතා",
  "Design & Planning": "නිර්මාණය සහ සැලසුම් කිරීම",
  "Great! Your website project is in progress.": "හොඳයි! ඔබගේ වෙබ් අඩවි ව්‍යාපෘතිය ක්‍රියාත්මක වෙමින් පවතී.",
  "Our team is preparing the website structure and design based on your selected theme and business details.": "ඔබ තෝරාගත් තේමාව සහ ව්‍යාපාර විස්තර අනුව අපගේ කණ්ඩායම වෙබ් අඩවි ව්‍යුහය සහ නිර්මාණය සකස් කරමින් සිටී.",
  "විවෘත කරන්න full progress page →": "සම්පූර්ණ ප්‍රගති පිටුව විවෘත කරන්න →",
  "ව්‍යාපෘතිය Timeline": "ව්‍යාපෘති කාලරේඛාව",
  "Requirements Submitted": "අවශ්‍යතා යොමු කර ඇත",
  "You have submitted the project details and selected a theme.": "ඔබ ව්‍යාපෘති විස්තර යොමු කර තේමාවක් තෝරාගෙන ඇත.",
  "We are creating the first website layout and project structure.": "අපි පළමු වෙබ් අඩවි layout සහ ව්‍යාපෘති ව්‍යුහය සකස් කරමින් සිටිමු.",
  "Our developers will start building your website pages.": "අපගේ සංවර්ධකයින් ඔබගේ වෙබ් අඩවි පිටු සාදීම ආරම්භ කරනු ඇත.",
  "Review & Feedback": "සමාලෝචනය සහ ප්‍රතිචාර",
  "You will review the demo website and share feedback.": "ඔබ demo වෙබ් අඩවිය සමාලෝචනය කර ප්‍රතිචාර ලබාදෙනු ඇත.",
  "Final බෙදාහැරීම": "අවසාන බෙදාහැරීම",
  "After approval and final payment, your website will go live.": "අනුමැතිය සහ අවසාන ගෙවීමෙන් පසු ඔබගේ වෙබ් අඩවිය සජීවී වේ.",
  "View පණිවිඩ": "පණිවිඩ බලන්න",
  "Started:": "ආරම්භ වූ වේලාව:",
  "Target බෙදාහැරීම:": "ඉලක්ක බෙදාහැරීම:",
  "බෙදාහැරීම time reached. Please check latest project status.": "බෙදාහැරීමේ කාලය ළඟා වී ඇත. කරුණාකර නවතම ව්‍යාපෘති තත්ත්වය පරීක්ෂා කරන්න.",
  "ව්‍යාපෘතිය Name": "ව්‍යාපෘති නාමය",
  "Selected තේමාව": "තෝරාගත් තේමාව",
  "Modern ව්‍යාපාරය": "නවීන ව්‍යාපාරය",
  "Pages": "පිටු",
  "Pending From You": "ඔබගෙන් බලාපොරොත්තුවෙන්",
  "Extra business images": "අමතර ව්‍යාපාරික පින්තූර",
  "Upload if available": "ඇත්නම් උඩුගත කරන්න",
  "Additional notes": "අමතර සටහන්",
  "Share special requirements": "විශේෂ අවශ්‍යතා බෙදාගන්න",
  "Advance payment": "අත්තිකාරම් ගෙවීම",
  "Received successfully": "සාර්ථකව ලැබී ඇත",
  "Upload extra files": "අමතර ගොනු උඩුගත කරන්න",
  "Images, PDF, DOC or logo files": "පින්තූර, PDF, DOC හෝ ලාංඡන ගොනු",
  "Your වෙබ් අඩවිය ව්‍යාපෘතිය": "ඔබගේ වෙබ් අඩවි ව්‍යාපෘතිය",
  "Select change type": "වෙනස් කිරීමේ වර්ගය තෝරන්න",
  "Text change": "පෙළ වෙනස් කිරීම",
  "Image change": "පින්තූර වෙනස් කිරීම",
  "සම්බන්ධ වන්න details update": "සම්බන්ධතා විස්තර යාවත්කාලීන කිරීම",
  "Add new section": "නව කොටසක් එක් කරන්න",
  "Page / Section": "පිටුව / කොටස",
  "Change විස්තර": "වෙනස් කිරීමේ විස්තර",
  "Submit Change Request": "වෙනස් කිරීමේ ඉල්ලීම යවන්න",
  "Change Request තත්ත්වය": "වෙනස් කිරීමේ ඉල්ලීමේ තත්ත්වය",
  "No request submitted": "ඉල්ලීමක් යොමු කර නැත",
  "පැතිකඩ Settings": "පැතිකඩ සැකසුම්",
  "Save පැතිකඩ": "පැතිකඩ සුරකින්න",
  "Send Receipt": "රිසිට්පත යවන්න",
  "ගෙවීම් රිසිට්පත Submitted": "ගෙවීම් රිසිට්පත යොමු කර ඇත",
  "Your bank payment slip has been sent to පරිපාලක for verification. You can also upload another receipt image below if needed.": "ඔබගේ බැංකු ගෙවීම් slip එක තහවුරු කිරීම සඳහා පරිපාලක වෙත යවා ඇත. අවශ්‍ය නම් පහතින් තවත් රිසිට්පත් රූපයක් උඩුගත කළ හැක.",
  "Upload / Replace Receipt": "රිසිට්පත උඩුගත / වෙනස් කරන්න",
  "Close": "වසන්න",
  "ආපසු to Progress": "ප්‍රගතියට ආපසු",
  "Your වෙබ් අඩවිය": "ඔබගේ වෙබ් අඩවිය",
  "Demo is සූදානම්": "Demo සූදානම්",
  "Please review the demo preview. You can approve it to continue development or request changes.": "Demo පෙරදසුන සමාලෝචනය කරන්න. සංවර්ධනය ඉදිරියට ගෙන යාමට අනුමත කළ හැක හෝ වෙනස්කම් ඉල්ලා සිටිය හැක.",
  "Professional වෙබ් අඩවිය for": "වෘත්තීය වෙබ් අඩවිය",
  "A modern, mobile-friendly website demo prepared using your selected theme and business details.": "ඔබ තෝරාගත් තේමාව සහ ව්‍යාපාර විස්තර භාවිතා කර සකස් කළ නවීන, ජංගම හිතකාමී demo වෙබ් අඩවියක්.",
  "Clean presentation of your business details.": "ඔබගේ ව්‍යාපාර විස්තර පිරිසිදු ලෙස ඉදිරිපත් කිරීම.",
  "Simple service sections for customer inquiries.": "පාරිභෝගික විමසීම් සඳහා සරල සේවා කොටස්.",
  "Easy contact details and inquiry direction.": "පහසු සම්බන්ධතා විස්තර සහ විමසීම් මඟපෙන්වීම.",
  "Review Checklist": "සමාලෝචන පරීක්ෂණ ලැයිස්තුව",
  "ව්‍යාපාර විස්තර Added": "ව්‍යාපාර විස්තර එක් කර ඇත",
  "Your business name and basic details are applied.": "ඔබගේ ව්‍යාපාර නාමය සහ මූලික විස්තර යොදා ඇත.",
  "Selected තේමාව Applied": "තෝරාගත් තේමාව යොදා ඇත",
  "The selected visual direction has been used.": "තෝරාගත් දෘශ්‍ය දිශාව භාවිතා කර ඇත.",
  "Mobile-Friendly පෙරදසුන": "ජංගම හිතකාමී පෙරදසුන",
  "Desktop and mobile views are available.": "Desktop සහ mobile views ලබාගත හැක.",
  "සූදානම් for Development": "සංවර්ධනය සඳහා සූදානම්",
  "Approve to continue the website development stage.": "වෙබ් අඩවි සංවර්ධන අදියර ඉදිරියට ගෙන යාමට අනුමත කරන්න.",
  "Feedback or Change Request": "ප්‍රතිචාර හෝ වෙනස්කම් ඉල්ලීම",
  "Save Feedback Draft": "ප්‍රතිචාර කෙටුම්පත සුරකින්න",
  "ඩෙමෝව අනුමත කරන්න & ඉදිරියට Development": "ඩෙමෝව අනුමත කර සංවර්ධනයට ඉදිරියට යන්න",
  "Current Stage": "වත්මන් අදියර",
  "ඊළඟ After Approval": "අනුමැතියෙන් පසු ඊළඟ පියවර",
  "වෙබ් අඩවිය Development": "වෙබ් අඩවි සංවර්ධනය",
  "Our team will start developing inner pages and content sections.": "අපගේ කණ්ඩායම අභ්‍යන්තර පිටු සහ අන්තර්ගත කොටස් සංවර්ධනය ආරම්භ කරනු ඇත.",
  "Final Testing": "අවසාන පරීක්ෂාව",
  "Mobile view, layout, and basic functions will be checked.": "ජංගම දර්ශනය, layout සහ මූලික functions පරීක්ෂා කරනු ඇත.",
  "You will review the completed website before launch.": "දියත් කිරීමට පෙර ඔබ සම්පූර්ණ කළ වෙබ් අඩවිය සමාලෝචනය කරනු ඇත.",
  "Final Balance": "අවසාන ඉතිරි මුදල",
  "Your final website has been accepted. Pay the remaining balance to prepare your website launch.": "ඔබගේ අවසාන වෙබ් අඩවිය අනුමත කර ඇත. වෙබ් අඩවිය දියත් කිරීමට සූදානම් කිරීම සඳහා ඉතිරි මුදල ගෙවන්න.",
  "Final website accepted successfully.": "අවසාන වෙබ් අඩවිය සාර්ථකව අනුමත කර ඇත.",
  "Accepted on": "අනුමත කළ දිනය",
  ". The next step is balance payment before launch.": ". ඊළඟ පියවර දියත් කිරීමට පෙර ඉතිරි ගෙවීමයි.",
  "ව්‍යාපෘතිය ගෙවීම Summary": "ව්‍යාපෘති ගෙවීම් සාරාංශය",
  "Total ව්‍යාපෘතිය Price": "මුළු ව්‍යාපෘති මිල",
  "Advance Paid": "අත්තිකාරම් ගෙවා ඇත",
  "ප්‍රධාන විකල්පය බැංකු මාරු කිරීම / manual deposit වේ. කාඩ් ගෙවීම දෙවන විකල්පය ලෙස ඇත.": "ප්‍රධාන විකල්පය බැංකු මාරු කිරීම / බැංකු තැන්පතුව වේ. කාඩ් ගෙවීම දෙවන විකල්පය ලෙස ඇත.",
  "Secure & Trusted": "ආරක්ෂිත සහ විශ්වාසදායක",
  "ඔබගේ අවශ්‍යතාවයට අනුව layout, වර්ණ, අකුරු සහ branding වෙනස් කිරීම": "ඔබගේ අවශ්‍යතාවයට අනුව සැකැස්ම, වර්ණ, අකුරු සහ වෙළඳනාමකරණය වෙනස් කිරීම",
  "Online banking හෝ manual bank deposit මඟින් ගෙවා, ඉන්පසු මෙහි රිසිට්පත් රූපය උඩුගත කරන්න. Admin විසින් පරීක්ෂා කර ගෙවීම ලැබී ඇති බව සලකුණු කරනු ඇත.": "මාර්ගගත බැංකු ගෙවීම හෝ බැංකු තැන්පතුව මඟින් ගෙවා, ඉන්පසු මෙහි රිසිට්පත් රූපය උඩුගත කරන්න. පරිපාලක විසින් පරීක්ෂා කර ගෙවීම ලැබී ඇති බව සලකුණු කරනු ඇත.",
  "Slip එක උඩුගත කරන්න හෝ කාඩ්පතෙන් ගෙවන්න": "ගෙවීම් slip එක උඩුගත කරන්න හෝ කාඩ්පතෙන් ගෙවන්න",
  "Credit / Debit කාඩ්": "Credit / Debit කාඩ්",
  "Responsive Layout": "Responsive Layout",
  "සජීවී link and renewal details will be active.": "සජීවී සබැඳිය සහ නවීකරණ විස්තර සක්‍රීය වනු ඇත.",
  "ඔබගේ live website dashboard සක්‍රීය කරන අතර කරුණාකර රැඳී සිටින්න.": "ඔබගේ සජීවී වෙබ් අඩවි ඩෑෂ්බෝඩ් සක්‍රීය කරන අතර කරුණාකර රැඳී සිටින්න.",
  "Your completed website is ready to be published live.": "සම්පූර්ණ කළ වෙබ් අඩවිය සජීවීව ප්‍රකාශ කිරීමට සූදානම්.",
  "production server": "production server"
};
  const skipTags = new Set(['SCRIPT','STYLE','NOSCRIPT','TEMPLATE','CODE','SVG']);

  function fixText(t){
    if(!t) return t;
    Object.keys(fixes).sort((a,b)=>b.length-a.length).forEach(k => {
      t = t.split(k).join(fixes[k]);
    });
    return t;
  }

  function applySinhalaFixes(){
    if(!document.body) return;
    const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, {
      acceptNode(node){
        if(!node.parentElement || skipTags.has(node.parentElement.tagName) || !node.nodeValue.trim()){
          return NodeFilter.FILTER_REJECT;
        }
        return NodeFilter.FILTER_ACCEPT;
      }
    });
    const nodes = [];
    while(walker.nextNode()) nodes.push(walker.currentNode);
    nodes.forEach(node => {
      const t = fixText(node.nodeValue);
      if(t !== node.nodeValue) node.nodeValue = t;
    });

    document.querySelectorAll('input[placeholder], textarea[placeholder], [title], [aria-label], img[alt]').forEach(el => {
      ['placeholder','title','aria-label','alt'].forEach(attr => {
        if(el.hasAttribute(attr)) el.setAttribute(attr, fixText(el.getAttribute(attr)));
      });
    });
  }

  if(document.readyState === 'loading') document.addEventListener('DOMContentLoaded', applySinhalaFixes);
  else applySinhalaFixes();

  setTimeout(applySinhalaFixes, 500);
  setTimeout(applySinhalaFixes, 1500);
  setTimeout(applySinhalaFixes, 3000);
})();

// V37 Sinhala complete customer cleanup
(function(){const fixes={"Let’s Start Your": "ඔබගේ වෙබ් අඩවිය ආරම්භ කරමු", "Let's Start Your": "ඔබගේ වෙබ් අඩවිය ආරම්භ කරමු", "Tell us a few details about your business and we’ll guide you to the right website path.": "ඔබගේ ව්‍යාපාරය පිළිබඳ විස්තර කිහිපයක් ලබා දෙන්න. අපි ඔබට සුදුසු වෙබ් අඩවි මාර්ගය පෙන්වන්නෙමු.", "Tell us a few details about your business and we'll guide you to the right website path.": "ඔබගේ ව්‍යාපාරය පිළිබඳ විස්තර කිහිපයක් ලබා දෙන්න. අපි ඔබට සුදුසු වෙබ් අඩවි මාර්ගය පෙන්වන්නෙමු.", "Enterprise": "මහා ව්‍යාපාර", "E-commerce": "ඊ-කොමර්ස්", "Included": "ඇතුළත්", "Feature": "විශේෂාංගය", "Progress": "ප්‍රගතිය", "Completed": "සම්පූර්ණයි", "Upcoming": "ඉදිරියේදී", "Modern Business තෝරාගෙන ඇත": "නවීන ව්‍යාපාරික තේමාව තෝරාගෙන ඇත", "ව්‍යාපාරය Type": "ව්‍යාපාර වර්ගය", "Within 3 දින": "දින 3ක් තුළ", "No receipt selected": "රිසිට්පතක් තෝරාගෙන නොමැත", "Advance ගෙවීම": "අත්තිකාරම් ගෙවීම", "Slip උඩුගත කරන්න හෝ කාඩ්පතෙන් ගෙවන්න": "ගෙවීම් slip එක උඩුගත කරන්න හෝ කාඩ්පතෙන් ගෙවන්න", "ගෙවීම Successful": "ගෙවීම සාර්ථකයි", "We have received your payment and your project is now confirmed.": "අපි ඔබගේ ගෙවීම ලබාගෙන ඇති අතර ඔබගේ ව්‍යාපෘතිය දැන් තහවුරු කර ඇත.", "Done": "සම්පූර්ණයි", "Customer": "පාරිභෝගිකයා", "Hosting": "හෝස්ටිං", "Development": "සංවර්ධනය", "Pending": "බලාපොරොත්තුවෙන්", "Review": "සමාලෝචනය", "Planning": "සැලසුම් කිරීම", "Design": "නිර්මාණය", "Final": "අවසාන", "Desktop": "ඩෙස්ක්ටොප්", "Mobile": "ජංගම", "About": "අප ගැන", "Services": "සේවා", "Get Started": "ආරම්භ කරන්න", "Saved": "සුරකින ලදී", "Status": "තත්ත්වය", "Accepted": "අනුමතයි", "✓ Admin තහවුරු කිරීම": "✓ පරිපාලක තහවුරු කිරීම", "Admin": "පරිපාලක", "Launch": "දියත් කිරීම", "Responsive view": "Responsive දර්ශනය", "සූදානම් Launch": "දියත් කිරීමට සූදානම්", "වෙබ් අඩවිය සජීවී ලෙස සලකුණු කර පාරිභෝගික live dashboard සක්‍රීය කිරීමට පහත බොත්තම ක්ලික් කරන්න.": "වෙබ් අඩවිය සජීවී ලෙස සලකුණු කර පාරිභෝගික සජීවී ඩෑෂ්බෝඩ් සක්‍රීය කිරීමට පහත බොත්තම ක්ලික් කරන්න.", "තත්ත්වය ප්‍රකාශ කිරීමට Launch ක්ලික් කරන්න.": "තත්ත්වය ප්‍රකාශ කිරීමට දියත් කිරීම ක්ලික් කරන්න.", "Hosting සූදානම්": "හෝස්ටිං සූදානම්", "Hosting සහ නවීකරණය": "හෝස්ටිං සහ නවීකරණය", "පළමු වසර Hosting": "පළමු වසර හෝස්ටිං", "ව්‍යාපෘතිය Summary": "ව්‍යාපෘති සාරාංශය", "Summary & ගෙවීම": "සාරාංශය සහ ගෙවීම", "Your ව්‍යාපාරය": "ඔබගේ ව්‍යාපාරය", "Selected තේමාව": "තෝරාගත් තේමාව", "Modern ව්‍යාපාරය": "නවීන ව්‍යාපාරය", "Demo": "ඩෙමෝ", "demo": "ඩෙමෝ", "Desktop සහ mobile views ලබාගත හැක.": "ඩෙස්ක්ටොප් සහ ජංගම දර්ශන ලබාගත හැක.", "Desktop සහ mobile views සූදානම්.": "ඩෙස්ක්ටොප් සහ ජංගම දර්ශන සූදානම්.", "ජංගම දර්ශනය, layout සහ මූලික functions පරීක්ෂා කරනු ඇත.": "ජංගම දර්ශනය, සැකැස්ම සහ මූලික ක්‍රියාකාරකම් පරීක්ෂා කරනු ඇත.", "ඔබ තෝරාගත් තේමාව සහ ව්‍යාපාර විස්තර භාවිතා කර සකස් කළ නවීන, ජංගම හිතකාමී demo වෙබ් අඩවියක්.": "ඔබ තෝරාගත් තේමාව සහ ව්‍යාපාර විස්තර භාවිතා කර සකස් කළ නවීන, ජංගම හිතකාමී ඩෙමෝ වෙබ් අඩවියක්.", "ව්‍යාපෘති දත්ත, ගිණුම් ප්‍රවේශය, උඩුගත කළ ගොනු, ගෙවීම් රිසිට්පත් හැසිරවීම, admin තහවුරු කිරීම සහ production server ආරක්ෂාව සඳහා මූලික ආරක්ෂණ ක්‍රමය මෙම ප්‍රතිපත්තියෙන් විස්තර කරයි.": "ව්‍යාපෘති දත්ත, ගිණුම් ප්‍රවේශය, උඩුගත කළ ගොනු, ගෙවීම් රිසිට්පත් හැසිරවීම, පරිපාලක තහවුරු කිරීම සහ සජීවී සර්වර් ආරක්ෂාව සඳහා මූලික ආරක්ෂණ ක්‍රමය මෙම ප්‍රතිපත්තියෙන් විස්තර කරයි.", "ව්‍යාපෘතිය ආරම්භ කිරීමට අත්තිකාරම් ගෙවීම අවශ්‍යයි. වැඩ ආරම්භ කිරීමට පෙර Admin විසින් බැංකු ගෙවීම් රිසිට්පත් තහවුරු කරයි. දියත් කිරීමට පෙර අවසාන ගෙවීම අවශ්‍යයි.": "ව්‍යාපෘතිය ආරම්භ කිරීමට අත්තිකාරම් ගෙවීම අවශ්‍යයි. වැඩ ආරම්භ කිරීමට පෙර පරිපාලක විසින් බැංකු ගෙවීම් රිසිට්පත් තහවුරු කරයි. දියත් කිරීමට පෙර අවසාන ගෙවීම අවශ්‍යයි.", "Webdeveloper.lk සේවාව වර්ධනය වන විට සහ production backend systems සක්‍රීය වන විට මෙම පිටු යාවත්කාලීන කළ හැක.": "Webdeveloper.lk සේවාව වර්ධනය වන විට සහ පසුපස පද්ධති සක්‍රීය වන විට මෙම පිටු යාවත්කාලීන කළ හැක."};function f(t){if(!t)return t;Object.keys(fixes).sort((a,b)=>b.length-a.length).forEach(k=>{t=t.split(k).join(fixes[k]);});return t;}function a(){if(!document.body)return;const w=document.createTreeWalker(document.body,NodeFilter.SHOW_TEXT,{acceptNode(n){return(!n.parentElement||['SCRIPT','STYLE','NOSCRIPT','TEMPLATE','CODE','SVG'].includes(n.parentElement.tagName)||!n.nodeValue.trim())?NodeFilter.FILTER_REJECT:NodeFilter.FILTER_ACCEPT;}});const ns=[];while(w.nextNode())ns.push(w.currentNode);ns.forEach(n=>{const t=f(n.nodeValue);if(t!==n.nodeValue)n.nodeValue=t;});document.querySelectorAll('input[placeholder],textarea[placeholder],[title],[aria-label],img[alt]').forEach(el=>{['placeholder','title','aria-label','alt'].forEach(attr=>{if(el.hasAttribute(attr))el.setAttribute(attr,f(el.getAttribute(attr)));});});}if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',a);else a();setTimeout(a,600);setTimeout(a,1800);setTimeout(a,3500);})();

// V38 final visible text cleanup
(function(){const fixes={"layout": "සැකැස්ම", "Layout": "සැකැස්ම", "Responsive සැකැස්ම": "Responsive සැකැස්ම", "ව්‍යාපාරය Info": "ව්‍යාපාර තොරතුරු", "Loading...": "පූරණය වෙමින්...", "බෙදාහැරීම Target": "ඉලක්ක බෙදාහැරීම", "Preparing...": "සූදානම් කරමින්...", "ව්‍යාපෘතිය updates from the admin panel will appear here instantly.": "පරිපාලක පැනලයෙන් එන ව්‍යාපෘති යාවත්කාලීන මෙහි වහාම පෙන්වයි.", "Webdeveloper.lk Team": "Webdeveloper.lk කණ්ඩායම", "Your payment is confirmed. We have started your website planning.": "ඔබගේ ගෙවීම තහවුරු කර ඇත. අපි ඔබගේ වෙබ් අඩවි සැලසුම් කිරීම ආරම්භ කර ඇත.", "Just now": "දැන්ම", "System Update": "පද්ධති යාවත්කාලීන කිරීම", "We will contact you during the progress and update the dashboard at key stages.": "ප්‍රගතිය අතරතුර අපි ඔබව සම්බන්ධ කරගෙන ප්‍රධාන අදියරවලදී ඩෑෂ්බෝඩ් යාවත්කාලීන කරන්නෙමු.", "Today": "අද", "Invoices & ගෙවීම්": "ඉන්වොයිසි සහ ගෙවීම්", "Invoice Number": "ඉන්වොයිසි අංකය", "Paid": "ගෙවා ඇත", "Balance ගෙවීම 50%": "ඉතිරි ගෙවීම 50%", "Due before launch": "දියත් කිරීමට පෙර ගෙවිය යුතුයි", "Request professional email accounts for your live website domain.": "ඔබගේ සජීවී වෙබ් අඩවි ඩොමේනය සඳහා වෘත්තීය ඊමේල් ගිණුම් ඉල්ලන්න.", "Preferred ඊමේල් ලිපිනය": "කැමති ඊමේල් ලිපිනය", "Alternative ඊමේල් ලිපිනය": "විකල්ප ඊමේල් ලිපිනය", "Forward Emails To": "ඊමේල් යොමු කළ යුතු ලිපිනය", "Submit Email Setup Request": "ඊමේල් සැකසුම් ඉල්ලීම යවන්න", "Email Setup Summary": "ඊමේල් සැකසුම් සාරාංශය", "Suggested Email": "යෝජිත ඊමේල් ලිපිනය", "Request Available": "ඉල්ලීම ලබාගත හැක", "Submit a website change request after launch.": "දියත් කිරීමෙන් පසු වෙබ් අඩවි වෙනස්කම් ඉල්ලීමක් යවන්න.", "Change Type": "වෙනස් කිරීමේ වර්ගය", "Change Request තත්ත්වය": "වෙනස් කිරීමේ ඉල්ලීමේ තත්ත්වය", "Your bank payment slip has been sent to admin for verification. You can also upload another receipt image below if needed.": "ඔබගේ බැංකු ගෙවීම් slip එක තහවුරු කිරීම සඳහා පරිපාලක වෙත යවා ඇත. අවශ්‍ය නම් පහතින් තවත් රිසිට්පත් රූපයක් උඩුගත කළ හැක.", "https://yourbusiness.lk/ඩෙමෝ-preview": "https://yourbusiness.lk/demo-preview"};function f(t){if(!t)return t;Object.keys(fixes).sort((a,b)=>b.length-a.length).forEach(k=>{t=t.split(k).join(fixes[k]);});return t;}function a(){if(!document.body)return;const w=document.createTreeWalker(document.body,NodeFilter.SHOW_TEXT,{acceptNode(n){return(!n.parentElement||['SCRIPT','STYLE','NOSCRIPT','TEMPLATE','CODE','SVG'].includes(n.parentElement.tagName)||!n.nodeValue.trim())?NodeFilter.FILTER_REJECT:NodeFilter.FILTER_ACCEPT;}});const ns=[];while(w.nextNode())ns.push(w.currentNode);ns.forEach(n=>{const t=f(n.nodeValue);if(t!==n.nodeValue)n.nodeValue=t;});document.querySelectorAll('input[placeholder],textarea[placeholder],[title],[aria-label],img[alt]').forEach(el=>{['placeholder','title','aria-label','alt'].forEach(attr=>{if(el.hasAttribute(attr))el.setAttribute(attr,f(el.getAttribute(attr)));});});}if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',a);else a();setTimeout(a,600);setTimeout(a,1800);setTimeout(a,3500);})();

// V41 theme selected cleanup
(function(){const fixes={"Selected Theme": "තෝරාගත් තේමාව", "Choose": "තෝරන්න"};function f(t){if(!t)return t;Object.keys(fixes).forEach(k=>{t=t.split(k).join(fixes[k]);});return t;}function a(){if(!document.body)return;const w=document.createTreeWalker(document.body,NodeFilter.SHOW_TEXT,{acceptNode(n){return(!n.parentElement||['SCRIPT','STYLE','NOSCRIPT','TEMPLATE','CODE','SVG'].includes(n.parentElement.tagName)||!n.nodeValue.trim())?NodeFilter.FILTER_REJECT:NodeFilter.FILTER_ACCEPT;}});const ns=[];while(w.nextNode())ns.push(w.currentNode);ns.forEach(n=>{const t=f(n.nodeValue);if(t!==n.nodeValue)n.nodeValue=t;});}if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',a);else a();setTimeout(a,500);setTimeout(a,1600);})();
