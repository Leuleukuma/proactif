/* =====================================================================
   ProActif Pulse — coeur applicatif partagé (studio + plein écran mobile)
   Expose window.Pulse : mountMobile, mountDashboard, icon, wordmark, SCREENS,
   setScreen, getScreen.
   ===================================================================== */
"use strict";
var Pulse = (function(){

/* ----------------------- Icons ----------------------- */
const ICON_PATHS = {
  home:'<path d="M3 10.5 12 3l9 7.5"/><path d="M5 9.5V20h14V9.5"/><path d="M9.5 20v-5h5v5"/>',
  target:'<circle cx="12" cy="12" r="8.4"/><circle cx="12" cy="12" r="4.4"/><circle cx="12" cy="12" r="1" fill="@C" stroke="none"/>',
  pulse:'<path d="M3 12h3.5l2-5 3.5 11 2.5-6 1.5 3H21"/>',
  user:'<circle cx="12" cy="8" r="3.6"/><path d="M5.5 20c.6-3.6 3.3-5.6 6.5-5.6S17.9 16.4 18.5 20"/>',
  check:'<path d="M5 12.5 10 17.5 19.5 7"/>',
  checkCircle:'<circle cx="12" cy="12" r="9"/><path d="M8 12.3l2.7 2.7L16 9.4"/>',
  chevR:'<path d="M9 5l7 7-7 7"/>',
  chevL:'<path d="M15 5l-7 7 7 7"/>',
  arrowR:'<path d="M4 12h15M13 6l6 6-6 6"/>',
  flame:'<path d="M12 3c.5 3-2.5 4-2.5 7A2.5 2.5 0 0012 12.5 2.5 2.5 0 0014.5 10c0-.8-.3-1.4-.6-2 2 1 3.6 3.2 3.6 6a5.5 5.5 0 11-11 0c0-3.7 2.8-5.4 3.5-8 .4-1.4.5-2.3 0-3z"/>',
  lock:'<rect x="5" y="10.5" width="14" height="9.5" rx="2.4"/><path d="M8 10.5V8a4 4 0 018 0v2.5"/>',
  bolt:'<path d="M13 3 5 13h5l-1 8 8-11h-5l1-7z"/>',
  waves:'<path d="M3 8c2-2 4-2 6 0s4 2 6 0 4-2 6 0"/><path d="M3 14c2-2 4-2 6 0s4 2 6 0 4-2 6 0"/>',
  spark:'<path d="M12 3v4M12 17v4M3 12h4M17 12h4M6 6l2.5 2.5M15.5 15.5 18 18M18 6l-2.5 2.5M8.5 15.5 6 18"/>',
  play:'<path d="M8 5.5v13l11-6.5-11-6.5z" fill="@C"/>',
  clock:'<circle cx="12" cy="12" r="8.5"/><path d="M12 7.5V12l3 2"/>',
  qr:'<rect x="4" y="4" width="6" height="6" rx="1.2"/><rect x="14" y="4" width="6" height="6" rx="1.2"/><rect x="4" y="14" width="6" height="6" rx="1.2"/><path d="M14 14h2.5v2.5M20 14v6M14 20h6"/>',
  calendar:'<rect x="4" y="5.5" width="16" height="15" rx="2.5"/><path d="M4 10h16M8.5 3.5v4M15.5 3.5v4"/>',
  pin:'<path d="M12 21s7-5.6 7-11a7 7 0 10-14 0c0 5.4 7 11 7 11z"/><circle cx="12" cy="10" r="2.6"/>',
  book:'<path d="M5 4.5h9a3 3 0 013 3V20a2.5 2.5 0 00-2.5-2.5H5V4.5z"/><path d="M5 4.5v15"/>',
  back:'<path d="M7 4v16M7 8h7a4 4 0 010 8H10"/>',
  lungs:'<path d="M12 3v8"/><path d="M10 7c0 3-3 4-3 8a3 3 0 003 3c1 0 1.5-.6 1.5-1.8V9"/><path d="M14 7c0 3 3 4 3 8a3 3 0 01-3 3c-1 0-1.5-.6-1.5-1.8V9"/>',
  sun:'<circle cx="12" cy="12" r="4"/><path d="M12 2.5v2.5M12 19v2.5M2.5 12H5M19 12h2.5M5 5l1.8 1.8M17.2 17.2 19 19M19 5l-1.8 1.8M6.8 17.2 5 19"/>',
  eye:'<path d="M2.5 12S6 5.5 12 5.5 21.5 12 21.5 12 18 18.5 12 18.5 2.5 12 2.5 12z"/><circle cx="12" cy="12" r="3"/>',
  medal:'<circle cx="12" cy="9" r="5.2"/><path d="M8.5 13.5 7 21l5-2.6L17 21l-1.5-7.5"/>',
  star:'<path d="M12 3.5l2.6 5.3 5.9.9-4.3 4.1 1 5.8L12 17l-5.2 2.7 1-5.8-4.3-4.1 5.9-.9L12 3.5z"/>',
  leaf:'<path d="M20 4C9 4 5 9 5 16c0 1.5.4 2.8 1 4 3-7 7-9 11-10-3 2.5-5.5 5-7 9 7 0 11-5 11-15z"/>',
  plus:'<path d="M12 5v14M5 12h14"/>',
  settings:'<circle cx="12" cy="12" r="3"/><path d="M12 2.5v3M12 18.5v3M2.5 12h3M18.5 12h3M5 5l2 2M17 17l2 2M19 5l-2 2M7 17l-2 2"/>',
  dumbbell:'<path d="M3 9v6M6 7.5v9M18 7.5v9M21 9v6M6 12h12"/>',
};
function icon(name, opts){
  opts = opts || {};
  const size = opts.size || 22, color = opts.color || 'currentColor', stroke = opts.stroke || 1.9;
  const inner = (ICON_PATHS[name] || '').split('@C').join(color);
  return '<svg width="'+size+'" height="'+size+'" viewBox="0 0 24 24" fill="none" stroke="'+color+'" stroke-width="'+stroke+'" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" style="flex-shrink:0">'+inner+'</svg>';
}

/* ----------------------- Data ----------------------- */
const TEAMS = ['Marketing', 'Produit', 'Tech', 'Commercial', 'RH', 'Support'];
const CATEGORIES = [
  { id:'dos',   label:'Anti-mal de dos',      icon:'back',  tint:'#e7ede7' },
  { id:'resp',  label:'Respiration / Stress', icon:'lungs', tint:'#e8eef0' },
  { id:'reveil',label:'Réveil musculaire',    icon:'sun',   tint:'#f1ece1' },
  { id:'ecran', label:'Pause écran / yeux',   icon:'eye',   tint:'#eceae0' },
];
const EXERCISES = [
  { id:'e1', cat:'dos',   title:'Déverrouiller le bas du dos', dur:4,
    intro:'Une séquence douce pour relâcher les lombaires après une matinée assise.',
    steps:['Debout, pieds écartés largeur de bassin, mains sur les hanches.','Inspire en grandissant la colonne, regarde devant toi.','Expire en arrondissant légèrement le dos vers l’arrière, 5 secondes.','Reviens, puis incline le buste à droite, maintiens 15 s.','Répète à gauche. Termine par 3 grandes respirations.'] },
  { id:'e2', cat:'dos',   title:'Étirement chat-vache assis', dur:3,
    intro:'Mobilise toute la colonne sans quitter ta chaise.',
    steps:['Assis au bord de la chaise, pieds à plat, mains sur les genoux.','Inspire, creuse le dos et ouvre la poitrine.','Expire, arrondis le dos et rentre le menton.','Enchaîne lentement 8 fois en suivant ta respiration.'] },
  { id:'e3', cat:'resp', title:'Respiration 4-7-8', dur:2,
    intro:'Deux minutes pour faire redescendre la pression avant une réunion.',
    steps:['Assis confortablement, épaules relâchées.','Inspire par le nez en comptant jusqu’à 4.','Retiens l’air en comptant jusqu’à 7.','Expire lentement par la bouche sur 8 temps.','Recommence 4 cycles.'] },
  { id:'e4', cat:'resp', title:'Cohérence cardiaque guidée', dur:5,
    intro:'Le classique 5-5 pour réguler le stress en profondeur.',
    steps:['Installe-toi, un pied bien ancré au sol.','Inspire 5 secondes en gonflant le ventre.','Expire 5 secondes en relâchant.','Suis le rythme pendant 5 minutes (30 cycles).'] },
  { id:'e5', cat:'reveil',title:'Réveil articulaire express', dur:3,
    intro:'Pour démarrer la journée ou relancer la machine après le déjeuner.',
    steps:['Cercles d’épaules vers l’arrière, 10 fois.','Rotations douces de la nuque, 5 de chaque côté.','Cercles de poignets et de chevilles, 10 fois.','Termine par 3 montées sur la pointe des pieds.'] },
  { id:'e6', cat:'reveil',title:'Activation jambes debout', dur:4,
    intro:'Réveille la circulation sans matériel, à côté de ton bureau.',
    steps:['Debout, talons joints. Monte sur la pointe des pieds 15 fois.','Demi-squats lents, 10 répétitions.','Fentes alternées légères, 6 de chaque côté.','Secoue les jambes et respire.'] },
  { id:'e7', cat:'ecran', title:'Repos visuel 20-20-20', dur:2,
    intro:'Soulage les yeux fatigués par l’écran.',
    steps:['Toutes les 20 minutes, regarde à 20 mètres.','Fixe un point lointain pendant 20 secondes.','Cligne consciemment des yeux 10 fois.','Frotte tes paumes et pose-les sur les yeux fermés, 20 s.'] },
  { id:'e8', cat:'ecran', title:'Détente nuque & trapèzes', dur:3,
    intro:'Dénoue les tensions du haut du dos liées à l’écran.',
    steps:['Assis droit, descends lentement l’oreille vers l’épaule.','Maintiens 15 s, respire dans l’étirement.','Change de côté.','Roule les épaules en arrière 10 fois.'] },
];
const BADGES = [
  { id:'b1', label:'Premier pas',   icon:'leaf',  hint:'1er check-in',         unlocked:true },
  { id:'b2', label:'Série de 7',    icon:'flame', hint:'7 jours d’affilée',    unlocked:true },
  { id:'b3', label:'Matinal',       icon:'sun',   hint:'5 check-ins avant 9h', unlocked:true },
  { id:'b4', label:'Souffle zen',   icon:'lungs', hint:'10 respirations',      unlocked:false },
  { id:'b5', label:'Dos d’acier',   icon:'back',  hint:'15 exos anti-dos',     unlocked:false },
  { id:'b6', label:'Assidu',        icon:'medal', hint:'30 jours actifs',      unlocked:false },
];
const HISTORY = [
  { day:'Aujourd’hui', mood:'😊', energy:7, stress:3, done:true },
  { day:'Hier',        mood:'🙂', energy:6, stress:4, done:true },
  { day:'Mardi',       mood:'😴', energy:4, stress:5, done:true },
  { day:'Lundi',       mood:'😊', energy:8, stress:2, done:true },
  { day:'Vendredi',    mood:'😐', energy:5, stress:6, done:true },
];
const SESSIONS_FOLLOWED = [
  { date:'Jeudi 5 juin',  title:'Mobilité & posture', coach:'avec Léa' },
  { date:'Jeudi 29 mai',  title:'Cardio doux',        coach:'avec Marc' },
  { date:'Jeudi 22 mai',  title:'Renfort & gainage',  coach:'avec Léa' },
];

/* ----------------------- State ----------------------- */
const SCREENS = [
  { id:'onboarding', label:'Onboarding' },
  { id:'home',       label:'Accueil' },
  { id:'checkin',    label:'Check-in express' },
  { id:'challenges', label:'Défis & badges' },
  { id:'library',    label:'Bibliothèque' },
  { id:'exercise',   label:'Fiche exercice' },
  { id:'progress',   label:'Ma progression' },
];
const mob = {
  screen:'home',
  name:'Camille', team:'Marketing', streak:6, checkedInToday:false,
  doneEx:new Set(),
  currentEx:EXERCISES[0],
  challenge:{ title:'Bouge 5 min, 3× par jour', done:12, goal:21 },
  libCat:'all',
  ob:{ name:'', team:null },
  checkin:{ energy:6, stress:4, pain:2, mood:3, done:false },
};
function resetCheckin(){ mob.checkin = { energy:6, stress:4, pain:2, mood:3, done:false }; }

/* ----------------------- Visuels (illustrations on-brand) ----------------------- */
function exVisual(ex, h, r, w){
  const c = CATEGORIES.find(x=>x.id===ex.cat);
  r = (r===undefined) ? 0 : r;
  const width = (w===undefined) ? '100%' : (typeof w==='number' ? w+'px' : w);
  const disc = Math.round(h*0.6), ic = Math.round(h*0.42);
  return '<div style="width:'+width+';height:'+h+'px;border-radius:'+r+'px;position:relative;overflow:hidden;background:linear-gradient(140deg,#ffffff,'+c.tint+')">'
    + '<div style="position:absolute;width:'+Math.round(h*1.3)+'px;height:'+Math.round(h*1.3)+'px;border-radius:50%;background:rgba(74,122,92,.06);right:-'+Math.round(h*0.45)+'px;top:-'+Math.round(h*0.45)+'px"></div>'
    + '<div style="position:absolute;inset:0;display:flex;align-items:center;justify-content:center"><div style="display:flex;align-items:center;justify-content:center;width:'+disc+'px;height:'+disc+'px;border-radius:50%;background:rgba(255,255,255,.6);box-shadow:0 4px 14px rgba(31,36,33,.08)">'+icon(c.icon,{size:ic,color:'var(--green-dark)',stroke:1.7})+'</div></div>'
    + '</div>';
}
function onboardingVisual(h){
  function fig(scale){
    const head=Math.round(20*scale), body=Math.round(46*scale);
    return '<div style="display:flex;flex-direction:column;align-items:center;gap:6px"><div style="width:'+head+'px;height:'+head+'px;border-radius:50%;background:rgba(255,255,255,.92)"></div><div style="width:'+Math.round(head*1.25)+'px;height:'+body+'px;border-radius:14px;background:rgba(255,255,255,.68)"></div></div>';
  }
  return '<div style="height:'+h+'px;border-radius:var(--r-lg);position:relative;overflow:hidden;background:linear-gradient(135deg,var(--green),var(--green-dark))">'
    + '<div style="position:absolute;width:200px;height:200px;border-radius:50%;background:rgba(255,255,255,.08);right:-60px;top:-70px"></div>'
    + '<div style="position:absolute;width:140px;height:140px;border-radius:50%;background:rgba(255,255,255,.06);left:-40px;bottom:-50px"></div>'
    + '<div style="position:absolute;top:14px;left:16px;opacity:.55">'+icon('pulse',{size:26,color:'#fff',stroke:1.7})+'</div>'
    + '<div style="position:absolute;inset:0;display:flex;align-items:flex-end;justify-content:center;gap:16px;padding-bottom:24px">'+fig(1.0)+fig(1.28)+fig(1.0)+'</div>'
    + '</div>';
}

/* ----------------------- Shared pieces ----------------------- */
function wordmark(size, light){
  size = size || 22;
  const ink = light ? '#fff' : 'var(--ink)';
  const markBg = light ? 'rgba(255,255,255,.16)' : 'var(--green)';
  const pulseSt = light ? 'rgba(255,255,255,.85)' : 'var(--green)';
  return '<div class="row" style="gap:9px">'
    + '<div style="width:'+(size+8)+'px;height:'+(size+8)+'px;border-radius:9px;background:'+markBg+';display:flex;align-items:center;justify-content:center;flex-shrink:0">'+icon('pulse',{size:size-3,color:'#fff',stroke:2.2})+'</div>'
    + '<div style="font-family:var(--serif);font-weight:600;font-size:'+size+'px;color:'+ink+';letter-spacing:-.01em">ProActif<span style="font-style:italic;color:'+pulseSt+';font-weight:500"> Pulse</span></div>'
    + '</div>';
}
function statPill(ic, value, label){
  return '<div class="row" style="gap:8px"><div style="width:34px;height:34px;border-radius:10px;background:var(--green-soft);display:flex;align-items:center;justify-content:center">'+icon(ic,{size:18,color:'var(--green-dark)'})+'</div><div class="col"><span class="t-num" style="font-size:17px;line-height:1">'+value+'</span><span class="t-meta" style="font-size:11px">'+label+'</span></div></div>';
}
const MOODS = ['😣','😕','😐','🙂','😄'];
function emojiFor(kind, v){
  if(kind==='energy') return v<=3 ? '😴' : v<=6 ? '🙂' : '⚡';
  if(kind==='stress') return v<=3 ? '😌' : v<=6 ? '😬' : '😰';
  return v<=3 ? '🙂' : v<=6 ? '😕' : '😣';
}

/* ----------------------- Screens ----------------------- */
function onboardingHTML(){
  const name = mob.ob.name, team = mob.ob.team;
  const ready = name.trim() && team;
  const chips = TEAMS.map(t => '<button class="chip'+(team===t?' is-active':'')+'" data-ob-team="'+t+'">'+t+'</button>').join('');
  return ''
  + '<div class="app screen" style="background:var(--cream)">'
  + '<div class="app-main" style="padding:0 22px 28px;display:flex;flex-direction:column">'
  +   '<div style="padding-top:70px">'+wordmark(24)+'</div>'
  +   onboardingVisual(158).replace('height:158px','height:158px;margin-top:28px')
  +   '<div style="margin-top:26px"><div class="t-kicker">Bienvenue</div><h1 class="t-display" style="margin:8px 0 0;font-size:27px">Rejoins le programme<br><span class="t-em">de ton entreprise</span></h1><p class="t-body" style="margin-top:10px">Reste actif·ve entre les séances, en 20 secondes par jour. Pas de mot de passe — juste toi et ton équipe.</p></div>'
  +   '<div style="margin-top:22px"><label class="t-label" style="display:block;margin-bottom:8px">Ton prénom</label><input data-ob-name value="'+name.replace(/"/g,'&quot;')+'" placeholder="Camille" style="width:100%;height:54px;border-radius:var(--r-md);border:1px solid var(--line);background:#fff;padding:0 16px;font-family:var(--sans);font-size:16px;color:var(--ink);outline:none"></div>'
  +   '<div style="margin-top:18px"><label class="t-label" style="display:block;margin-bottom:9px">Ton équipe</label><div style="display:flex;flex-wrap:wrap;gap:8px">'+chips+'</div></div>'
  +   '<div style="flex:1"></div>'
  +   '<button class="btn btn-primary btn-block btn-lg" data-action="join" style="margin-top:26px;opacity:'+(ready?1:.5)+';pointer-events:'+(ready?'auto':'none')+'">C’est parti '+icon('arrowR',{size:20,color:'#fff'})+'</button>'
  +   '<div class="row" style="gap:7px;justify-content:center;margin-top:14px">'+icon('qr',{size:15,color:'var(--ink-2)'})+'<span class="t-meta">Connecté·e via le lien ProActif d’Atelier Nord</span></div>'
  + '</div></div>';
}

function homeHTML(){
  const name = mob.name, team = mob.team, streak = mob.streak, c = mob.challenge;
  const quick = [EXERCISES[2], EXERCISES[4]];
  const pct = Math.round(c.done / c.goal * 100);
  const cta = mob.checkedInToday
    ? '<div class="card rise rise-3" style="margin-top:14px;padding:18px;display:flex;align-items:center;gap:13px;border-color:var(--green-soft);background:var(--green-soft)">'+icon('checkCircle',{size:26,color:'var(--green)'})+'<div style="flex:1"><div class="t-title" style="font-size:16px">Check-in fait ✦</div><div class="t-meta">Reviens demain pour garder ta série.</div></div></div>'
    : '<button class="btn btn-primary btn-block btn-lg rise rise-3" style="margin-top:16px" data-nav="checkin">'+icon('pulse',{size:22,color:'#fff'})+' Mon check-in du jour</button>';
  const quickCards = quick.map(ex =>
    '<button data-open-ex="'+ex.id+'" class="card" style="text-align:left;cursor:pointer;padding:0;overflow:hidden">'+exVisual(ex,78,0)+'<div style="padding:11px 13px 13px"><div class="t-title" style="font-size:14px;line-height:1.2">'+ex.title+'</div><div class="row" style="gap:5px;margin-top:7px">'+icon('clock',{size:13,color:'var(--ink-2)'})+'<span class="t-meta">'+ex.dur+' min</span></div></div></button>'
  ).join('');
  return ''
  + '<div class="app-main noscroll screen">'
  + '<div style="padding-top:56px"><div class="row between" style="align-items:flex-start"><div><div class="t-kicker" style="color:var(--ink-2);letter-spacing:.1em">Mardi 7 juin</div><h1 class="t-display" style="margin:6px 0 0">Bonjour <span class="t-em">'+name+'</span></h1></div><button data-nav="progress" style="border:none;cursor:pointer;background:var(--green);color:#fff;width:46px;height:46px;border-radius:50%;font-family:var(--serif);font-weight:600;font-size:18px;box-shadow:var(--sh-green)">'+name.slice(0,1).toUpperCase()+'</button></div>'
  + '<div class="row" style="gap:18px;margin-top:16px">'+statPill('flame', streak+' j', 'série en cours')+'<div style="width:1px;height:30px;background:var(--line)"></div>'+statPill('user', team, 'ton équipe')+'</div></div>'
  + '<button data-nav="progress" class="card rise rise-1" style="width:100%;text-align:left;cursor:pointer;margin-top:18px;padding:16px;display:flex;align-items:center;gap:14px"><div style="width:46px;height:46px;border-radius:13px;background:var(--green-soft);display:flex;align-items:center;justify-content:center;flex-shrink:0">'+icon('calendar',{size:22,color:'var(--green-dark)'})+'</div><div style="flex:1"><div class="t-kicker">Prochaine séance</div><div class="t-title" style="margin-top:2px">Jeudi 14h00</div><div class="t-meta" style="margin-top:1px">Salle de réunion · avec Léa</div></div>'+icon('chevR',{size:18,color:'var(--ink-2)'})+'</button>'
  + '<div class="card-green rise rise-2" style="margin-top:14px;padding:20px;position:relative;overflow:hidden"><div style="position:absolute;right:-18px;top:-18px;opacity:.16">'+icon('target',{size:120,color:'#fff',stroke:1.2})+'</div><div class="t-kicker" style="color:rgba(255,255,255,.8)">Défi de la semaine</div><h2 class="t-h1" style="color:#fff;margin:8px 0 0;font-size:22px;max-width:230px">'+c.title+'</h2><div class="row between" style="margin-top:18px;margin-bottom:8px"><span style="font-family:var(--sans);font-weight:600;font-size:13px;color:rgba(255,255,255,.92)">'+c.done+' / '+c.goal+' check-ins actifs</span><span style="font-family:var(--serif);font-weight:600;font-size:14px;color:#fff">'+pct+'%</span></div><div class="bar bar-on-green"><i style="width:'+pct+'%"></i></div><button data-nav="challenges" style="margin-top:16px;background:rgba(255,255,255,.16);color:#fff;border:none;border-radius:var(--r-pill);padding:10px 16px;font-family:var(--sans);font-weight:600;font-size:13px;cursor:pointer;display:inline-flex;align-items:center;gap:7px">Voir le défi '+icon('chevR',{size:15,color:'#fff'})+'</button></div>'
  + cta
  + '<div class="row between" style="margin-top:26px;margin-bottom:12px"><h2 class="t-h2">Pour bouger maintenant</h2><button data-nav="library" style="background:none;border:none;cursor:pointer;color:var(--green);font-family:var(--sans);font-weight:600;font-size:13px">Tout voir</button></div>'
  + '<div style="display:grid;grid-template-columns:1fr 1fr;gap:12px">'+quickCards+'</div>'
  + '</div>';
}

function checkinHTML(){
  const ck = mob.checkin;
  if(ck.done){
    return ''
    + '<div class="app-main screen" style="display:flex;flex-direction:column;align-items:center;text-align:center;padding:0 24px 28px">'
    + '<div style="flex:1"></div>'
    + '<div class="pop" style="width:108px;height:108px;border-radius:50%;background:var(--green);display:flex;align-items:center;justify-content:center;box-shadow:var(--sh-green)">'+icon('check',{size:52,color:'#fff',stroke:2.6})+'</div>'
    + '<h1 class="t-display" style="margin-top:26px">Bravo, c’est noté !</h1>'
    + '<p class="t-body" style="margin-top:8px;max-width:260px">Ton ressenti du jour est enregistré. Continue comme ça, tu prends soin de toi.</p>'
    + '<div class="rise rise-2" style="margin-top:22px;display:inline-flex;align-items:center;gap:10px;background:var(--green-soft);border-radius:var(--r-pill);padding:12px 20px">'+icon('flame',{size:22,color:'var(--green)'})+'<span style="font-family:var(--serif);font-weight:600;font-size:20px;color:var(--ink)">'+(mob.streak+1)+' jours</span><span class="t-meta">de série · +1 🔥</span></div>'
    + '<div style="flex:1"></div>'
    + '<button class="btn btn-primary btn-block btn-lg" data-action="checkin-finish">Retour à l’accueil</button>'
    + '</div>';
  }
  function slider(ic, tint, label, kind, value){
    return '<div class="card" style="padding:15px 16px 17px"><div class="row between" style="margin-bottom:12px"><div class="row" style="gap:10px"><div style="width:36px;height:36px;border-radius:11px;background:'+tint+';display:flex;align-items:center;justify-content:center">'+icon(ic,{size:19,color:'var(--green-dark)'})+'</div><div class="t-title" style="font-size:16px">'+label+'</div></div><div class="row" style="gap:8px"><span style="font-size:22px" data-ck-emoji>'+emojiFor(kind,value)+'</span><span class="t-num tabnum" style="font-size:19px;width:22px;text-align:right" data-ck-val>'+value+'</span></div></div><input type="range" class="rng" min="0" max="10" value="'+value+'" data-ck="'+kind+'"></div>';
  }
  const moods = MOODS.map((m,i)=>'<button class="mood'+(ck.mood===i?' is-on':'')+'" data-mood="'+i+'">'+m+'</button>').join('');
  return ''
  + '<div class="app-main screen" style="padding-top:0">'
  + '<div class="row between" style="padding-top:56px;margin-bottom:4px"><button data-nav="home" style="background:#fff;border:1px solid var(--line);width:40px;height:40px;border-radius:50%;display:flex;align-items:center;justify-content:center;cursor:pointer">'+icon('chevL',{size:20,color:'var(--ink)'})+'</button><div class="tag">'+icon('clock',{size:13,color:'var(--green-dark)'})+' 20 secondes</div></div>'
  + '<div style="margin-top:12px;margin-bottom:18px"><div class="t-kicker">Check-in express</div><h1 class="t-display" style="margin:6px 0 0">Comment tu te <span class="t-em">sens</span> ?</h1></div>'
  + '<div class="slider-wrap">'+slider('bolt','#f1ece1','Énergie','energy',ck.energy)+slider('waves','#e8eef0','Stress','stress',ck.stress)+slider('spark','#efe7e3','Douleurs','pain',ck.pain)+'</div>'
  + '<div class="card" style="margin-top:12px;padding:16px 16px 18px"><div class="t-title" style="font-size:16px;margin-bottom:14px">Ton humeur du jour</div><div class="row between">'+moods+'</div></div>'
  + '<button class="btn btn-primary btn-block btn-lg" style="margin-top:18px" data-action="checkin-validate">Valider mon check-in</button>'
  + '</div>';
}

function screenHead(kicker, title, em){
  return '<div style="padding-top:56px;margin-bottom:16px"><div class="t-kicker">'+kicker+'</div><h1 class="t-display" style="margin:6px 0 0">'+title+(em?' <span class="t-em">'+em+'</span>':'')+'</h1></div>';
}

function challengesHTML(){
  const streak = mob.streak, c = mob.challenge, badges = BADGES;
  const nextTier = 30, current = 21 + streak;
  const tierPct = Math.min(100, Math.round(current / nextTier * 100));
  const unlocked = badges.filter(b=>b.unlocked).length;
  const pct = Math.round(c.done / c.goal * 100);
  const week = ['L','M','M','J','V','S','D'].map((d,i)=>'<div style="flex:1;text-align:center"><div style="width:22px;height:22px;margin:0 auto;border-radius:50%;background:'+(i<5?'var(--green)':'var(--green-soft)')+';display:flex;align-items:center;justify-content:center">'+(i<5?icon('check',{size:12,color:'#fff',stroke:2.6}):'')+'</div><div class="t-meta" style="font-size:10px;margin-top:3px">'+d+'</div></div>').join('');
  const badgeGrid = badges.map(b=>'<div class="badge '+(b.unlocked?'on':'off')+'"><div class="badge-disc">'+(b.unlocked?icon(b.icon,{size:26,color:'#fff'}):icon('lock',{size:22,color:'#a7b3a8'}))+'</div><div class="t-label" style="font-size:12px;color:'+(b.unlocked?'var(--ink)':'#9aa39b')+'">'+b.label+'</div><div class="t-meta" style="font-size:10.5px;margin-top:-4px">'+b.hint+'</div></div>').join('');
  return ''
  + '<div class="app-main noscroll screen">'
  + screenHead('Défis & récompenses','Tes','défis')
  + '<div class="card-green" style="padding:20px;position:relative;overflow:hidden"><div style="position:absolute;right:-16px;top:-16px;opacity:.15">'+icon('target',{size:110,color:'#fff',stroke:1.2})+'</div><div class="t-kicker" style="color:rgba(255,255,255,.8)">Défi de la semaine</div><h2 class="t-h1" style="color:#fff;margin:8px 0 0;font-size:22px;max-width:230px">'+c.title+'</h2><div class="row between" style="margin-top:18px;margin-bottom:8px"><span style="font-family:var(--sans);font-weight:600;font-size:13px;color:rgba(255,255,255,.92)">'+c.done+' / '+c.goal+'</span><span style="font-family:var(--serif);font-weight:600;font-size:14px;color:#fff">'+pct+'%</span></div><div class="bar bar-on-green"><i style="width:'+pct+'%"></i></div></div>'
  + '<div class="card rise rise-1" style="margin-top:14px;padding:18px;display:flex;align-items:center;gap:16px"><div style="width:64px;height:64px;border-radius:18px;background:var(--green-soft);display:flex;align-items:center;justify-content:center;flex-shrink:0">'+icon('flame',{size:32,color:'var(--green)'})+'</div><div style="flex:1"><div class="row" style="gap:8px;align-items:baseline"><span style="font-family:var(--serif);font-weight:700;font-size:32px;color:var(--ink)">'+streak+'</span><span class="t-title" style="font-size:16px">jours de série</span></div><div class="row" style="gap:5px;margin-top:8px">'+week+'</div></div></div>'
  + '<div class="card rise rise-2" style="margin-top:14px;padding:18px"><div class="row between" style="margin-bottom:10px"><div class="t-title" style="font-size:16px">Prochain palier · <span class="t-em" style="font-style:normal">Assidu</span></div><div class="tag">'+icon('medal',{size:13,color:'var(--green-dark)'})+' '+current+'/'+nextTier+'</div></div><div class="bar"><i style="width:'+tierPct+'%"></i></div><div class="t-meta" style="margin-top:9px">Plus que <b style="color:var(--ink)">'+(nextTier-current)+' jours actifs</b> pour débloquer le badge “Assidu”.</div></div>'
  + '<div class="row between" style="margin-top:24px;margin-bottom:14px"><h2 class="t-h2">Badges</h2><span class="t-meta">'+unlocked+'/'+badges.length+' débloqués</span></div>'
  + '<div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:14px;row-gap:18px">'+badgeGrid+'</div>'
  + '</div>';
}

function libraryHTML(){
  const cat = mob.libCat;
  const list = cat==='all' ? EXERCISES : EXERCISES.filter(e=>e.cat===cat);
  let chips = '<button class="chip'+(cat==='all'?' is-active':'')+'" data-cat="all">Tout</button>';
  chips += CATEGORIES.map(cc=>'<button class="chip'+(cat===cc.id?' is-active':'')+'" data-cat="'+cc.id+'">'+cc.label+'</button>').join('');
  const items = list.map(ex=>{
    const cc = CATEGORIES.find(x=>x.id===ex.cat);
    return '<button data-open-ex="'+ex.id+'" class="card" style="text-align:left;cursor:pointer;padding:12px;display:flex;gap:13px;align-items:center"><div style="flex-shrink:0">'+exVisual(ex,76,14,76)+'</div><div style="flex:1;min-width:0"><div class="row" style="gap:6px;margin-bottom:6px"><div style="width:22px;height:22px;border-radius:7px;background:'+cc.tint+';display:flex;align-items:center;justify-content:center">'+icon(cc.icon,{size:13,color:'var(--green-dark)'})+'</div><span class="t-meta" style="font-size:11.5px">'+cc.label+'</span></div><div class="t-title" style="font-size:15.5px;line-height:1.2">'+ex.title+'</div><div class="row" style="gap:5px;margin-top:7px">'+icon('clock',{size:13,color:'var(--green)'})+'<span class="t-label" style="color:var(--green-dark)">'+ex.dur+' min</span></div></div>'+icon('chevR',{size:18,color:'var(--ink-2)'})+'</button>';
  }).join('');
  return ''
  + '<div class="app-main noscroll screen">'
  + screenHead('Bibliothèque','Exercices','minute')
  + '<div style="display:flex;gap:8px;overflow-x:auto;margin:0 -18px 14px;padding:2px 18px" class="noscroll">'+chips+'</div>'
  + '<div style="display:flex;flex-direction:column;gap:12px">'+items+'</div>'
  + '</div>';
}

function exerciseHTML(){
  const ex = mob.currentEx, done = mob.doneEx.has(ex.id);
  const cc = CATEGORIES.find(x=>x.id===ex.cat);
  const steps = ex.steps.map((s,i)=>'<div class="row" style="gap:13px;align-items:flex-start"><div style="width:30px;height:30px;border-radius:50%;background:var(--green-soft);color:var(--green-dark);font-family:var(--serif);font-weight:600;font-size:15px;display:flex;align-items:center;justify-content:center;flex-shrink:0">'+(i+1)+'</div><p class="t-body" style="color:var(--ink);padding-top:3px">'+s+'</p></div>').join('');
  const doneBlock = done
    ? '<div class="card" style="margin-top:24px;padding:16px;display:flex;align-items:center;gap:12px;background:var(--green-soft);border-color:var(--green-soft)">'+icon('checkCircle',{size:24,color:'var(--green)'})+'<span class="t-title" style="font-size:15px">Terminé · bien joué !</span></div>'
    : '<button class="btn btn-primary btn-block btn-lg" style="margin-top:24px" data-action="ex-done">'+icon('check',{size:20,color:'#fff',stroke:2.4})+' C’est fait</button>';
  return ''
  + '<div class="app-main noscroll screen" style="padding:0">'
  + '<div style="position:relative">'+exVisual(ex,230,0)+'<button data-action="ex-back" style="position:absolute;top:54px;left:16px;background:rgba(255,255,255,.92);border:none;width:42px;height:42px;border-radius:50%;display:flex;align-items:center;justify-content:center;cursor:pointer;box-shadow:var(--sh-sm)">'+icon('chevL',{size:20,color:'var(--ink)'})+'</button><button data-action="ex-back" style="position:absolute;top:54px;right:16px;background:rgba(255,255,255,.92);border:none;width:42px;height:42px;border-radius:50%;display:flex;align-items:center;justify-content:center;cursor:pointer;box-shadow:var(--sh-sm)">'+icon('play',{size:18,color:'var(--green)'})+'</button></div>'
  + '<div style="padding:20px 18px 24px"><div class="row" style="gap:8px"><div class="tag">'+cc.label+'</div><div class="tag" style="background:#fff;border:1px solid var(--line);color:var(--ink-2)">'+icon('clock',{size:12,color:'var(--ink-2)'})+' '+ex.dur+' min</div></div><h1 class="t-display" style="margin:14px 0 0;font-size:26px">'+ex.title+'</h1><p class="t-body" style="margin-top:8px">'+ex.intro+'</p><div class="divider" style="margin:20px 0"></div><h2 class="t-h2" style="margin-bottom:14px">Les étapes</h2><div style="display:flex;flex-direction:column;gap:14px">'+steps+'</div>'+doneBlock+'</div>'
  + '</div>';
}

function progressHTML(){
  const name = mob.name, team = mob.team, streak = mob.streak, badges = BADGES;
  const doneCount = 12 + mob.doneEx.size;
  const unlocked = badges.filter(b=>b.unlocked);
  const trio = [{n:streak,l:'jours de série',i:'flame'},{n:doneCount,l:'exos réalisés',i:'dumbbell'},{n:unlocked.length,l:'badges',i:'medal'}]
    .map(s=>'<div class="card" style="padding:15px 10px;text-align:center"><div style="display:flex;justify-content:center">'+icon(s.i,{size:22,color:'var(--green)'})+'</div><div style="font-family:var(--serif);font-weight:700;font-size:26px;color:var(--ink);margin-top:6px">'+s.n+'</div><div class="t-meta" style="font-size:10.5px;line-height:1.2">'+s.l+'</div></div>').join('');
  const badgesRow = badges.map(b=>'<div class="badge '+(b.unlocked?'on':'off')+'" style="flex-shrink:0;width:64px"><div class="badge-disc">'+(b.unlocked?icon(b.icon,{size:25,color:'#fff'}):icon('lock',{size:20,color:'#a7b3a8'}))+'</div><div class="t-meta" style="font-size:10px;color:'+(b.unlocked?'var(--ink)':'#9aa39b')+'">'+b.label+'</div></div>').join('');
  const hist = HISTORY.map((h,i)=>'<div><div class="row between" style="padding:13px 0"><div class="row" style="gap:12px"><span style="font-size:22px">'+h.mood+'</span><span class="t-label" style="font-size:14px">'+h.day+'</span></div><div class="row" style="gap:14px"><span class="t-meta">'+icon('bolt',{size:13,color:'var(--green)'})+' '+h.energy+'</span><span class="t-meta">'+icon('waves',{size:13,color:'var(--sky)'})+' '+h.stress+'</span></div></div>'+(i<HISTORY.length-1?'<div class="divider"></div>':'')+'</div>').join('');
  const sess = SESSIONS_FOLLOWED.map(s=>'<div class="card" style="padding:14px;display:flex;align-items:center;gap:12px"><div style="width:42px;height:42px;border-radius:12px;background:var(--green-soft);display:flex;align-items:center;justify-content:center;flex-shrink:0">'+icon('check',{size:20,color:'var(--green)',stroke:2.4})+'</div><div style="flex:1"><div class="t-title" style="font-size:15px">'+s.title+'</div><div class="t-meta">'+s.date+' · '+s.coach+'</div></div></div>').join('');
  return ''
  + '<div class="app-main noscroll screen">'
  + '<div style="padding-top:56px;display:flex;align-items:center;gap:14px"><div style="width:60px;height:60px;border-radius:50%;background:var(--green);color:#fff;font-family:var(--serif);font-weight:600;font-size:26px;display:flex;align-items:center;justify-content:center;box-shadow:var(--sh-green)">'+name.slice(0,1).toUpperCase()+'</div><div style="flex:1"><h1 class="t-h1">'+name+'</h1><div class="t-meta" style="margin-top:2px">Équipe '+team+' · Atelier Nord</div></div><button style="background:#fff;border:1px solid var(--line);width:42px;height:42px;border-radius:50%;display:flex;align-items:center;justify-content:center;cursor:pointer">'+icon('settings',{size:19,color:'var(--ink-2)'})+'</button></div>'
  + '<div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:10px;margin-top:18px">'+trio+'</div>'
  + '<div class="row between" style="margin-top:24px;margin-bottom:12px"><h2 class="t-h2">Tes badges</h2></div>'
  + '<div style="display:flex;gap:16px;overflow-x:auto;margin:0 -18px;padding:2px 18px 4px" class="noscroll">'+badgesRow+'</div>'
  + '<h2 class="t-h2" style="margin-top:24px;margin-bottom:12px">Tes derniers check-ins</h2>'
  + '<div class="card" style="padding:4px 16px">'+hist+'</div>'
  + '<h2 class="t-h2" style="margin-top:24px;margin-bottom:12px">Séances suivies</h2>'
  + '<div style="display:flex;flex-direction:column;gap:10px">'+sess+'</div>'
  + '</div>';
}

function tabbarHTML(){
  const items = [
    { id:'home', label:'Accueil', icon:'home' },
    { id:'challenges', label:'Défis', icon:'target' },
    { id:'library', label:'Exercices', icon:'dumbbell', alias:['exercise'] },
    { id:'progress', label:'Profil', icon:'user' },
  ];
  return '<div class="tabbar">'+items.map(it=>{
    const active = mob.screen===it.id || (it.alias && it.alias.includes(mob.screen));
    return '<button class="tab'+(active?' is-active':'')+'" data-nav="'+it.id+'">'+icon(it.icon,{size:23,color:active?'var(--green)':'var(--ink-2)',stroke:active?2.1:1.9})+'<span>'+it.label+'</span><span class="dot"></span></button>';
  }).join('')+'</div>';
}

function screenView(){
  switch(mob.screen){
    case 'onboarding': return onboardingHTML();
    case 'checkin':    return checkinHTML();
    case 'challenges': return challengesHTML();
    case 'library':    return libraryHTML();
    case 'exercise':   return exerciseHTML();
    case 'progress':   return progressHTML();
    case 'home':
    default:           return homeHTML();
  }
}
function mobileShellHTML(){
  const view = screenView();
  const showTabs = ['home','challenges','library','progress'].includes(mob.screen);
  const wrapped = (mob.screen==='onboarding') ? view : '<div style="flex:1;min-height:0;display:flex;flex-direction:column">'+view+'</div>';
  return '<div class="app">'+wrapped+(showTabs?tabbarHTML():'')+'</div>';
}

/* ----------------------- Dashboard ----------------------- */
function smoothPath(pts){
  if(pts.length<2) return '';
  let d = 'M '+pts[0][0]+' '+pts[0][1];
  for(let i=0;i<pts.length-1;i++){
    const x0=pts[i][0], y0=pts[i][1], x1=pts[i+1][0], y1=pts[i+1][1];
    const mx=(x0+x1)/2;
    d += ' C '+mx+' '+y0+', '+mx+' '+y1+', '+x1+' '+y1;
  }
  return d;
}
function lineChart(data, labels){
  const width=720, height=230, max=100, min=40, accent='var(--green)';
  const padL=8, padR=14, padT=16, padB=28;
  const w=width-padL-padR, h=height-padT-padB;
  const x=i=>padL+(i/(data.length-1))*w;
  const y=v=>padT+h-((v-min)/(max-min))*h;
  const pts=data.map((v,i)=>[x(i),y(v)]);
  const line=smoothPath(pts);
  const area=line+' L '+x(data.length-1)+' '+(padT+h)+' L '+x(0)+' '+(padT+h)+' Z';
  const grid=[0,0.25,0.5,0.75,1];
  const last=pts[pts.length-1];
  let s='<svg viewBox="0 0 '+width+' '+height+'" style="width:100%;height:auto;display:block">';
  s+='<defs><linearGradient id="lcArea" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#4a7a5c" stop-opacity="0.22"/><stop offset="1" stop-color="#4a7a5c" stop-opacity="0"/></linearGradient></defs>';
  grid.forEach((g,i)=>{ s+='<line x1="'+padL+'" x2="'+(width-padR)+'" y1="'+(padT+g*h)+'" y2="'+(padT+g*h)+'" stroke="#e8e6dc" stroke-width="1" stroke-dasharray="'+(i===grid.length-1?'0':'3 4')+'"/>'; });
  s+='<path d="'+area+'" fill="url(#lcArea)"/>';
  s+='<path d="'+line+'" fill="none" stroke="'+accent+'" stroke-width="2.6" stroke-linecap="round"/>';
  pts.forEach((p,i)=>{ s+='<circle cx="'+p[0]+'" cy="'+p[1]+'" r="'+(i===pts.length-1?5:3)+'" fill="#fff" stroke="'+accent+'" stroke-width="2.4"/>'; });
  s+='<g transform="translate('+last[0]+', '+last[1]+')"><rect x="-22" y="-34" width="44" height="23" rx="6" fill="var(--ink)"/><text x="0" y="-18" text-anchor="middle" font-family="Spectral, serif" font-weight="600" font-size="13" fill="#fff">'+data[data.length-1]+'</text></g>';
  labels.forEach((l,i)=>{ s+='<text x="'+x(i)+'" y="'+(height-8)+'" text-anchor="middle" font-family="Libre Franklin, sans-serif" font-size="11" font-weight="500" fill="#8a9089">'+l+'</text>'; });
  s+='</svg>';
  return s;
}
function spark(data){
  const width=110, height=34, color='var(--green)';
  const min=Math.min.apply(null,data), max=Math.max.apply(null,data);
  const x=i=>(i/(data.length-1))*(width-4)+2;
  const y=v=>height-3-((v-min)/((max-min)||1))*(height-6);
  const pts=data.map((v,i)=>[x(i),y(v)]);
  return '<svg viewBox="0 0 '+width+' '+height+'" width="'+width+'" height="'+height+'" style="display:block"><path d="'+smoothPath(pts)+'" fill="none" stroke="'+color+'" stroke-width="2.2" stroke-linecap="round"/><circle cx="'+pts[pts.length-1][0]+'" cy="'+pts[pts.length-1][1]+'" r="3" fill="'+color+'"/></svg>';
}
function teamBars(rows){
  const maxV=100;
  return '<div style="display:flex;flex-direction:column;gap:15px">'+rows.map((r,i)=>{
    const opacity = i===0 ? 1 : 0.5 + (rows.length - i)/(rows.length*2);
    const bg = i===0 ? 'var(--green)' : 'var(--green-dark)';
    return '<div class="row" style="gap:14px"><div style="width:92px;text-align:right" class="t-label">'+r.team+'</div><div style="flex:1;height:22px;background:var(--green-soft);border-radius:999px;overflow:hidden;position:relative"><div style="width:'+(r.v/maxV*100)+'%;height:100%;border-radius:999px;background:'+bg+';opacity:'+opacity+';transition:width .7s cubic-bezier(.4,0,.2,1)"></div></div><div style="width:42px;text-align:right" class="t-num">'+r.v+'%</div></div>';
  }).join('')+'</div>';
}
function gauge(label, value, sub, color, trend){
  const num = parseFloat(String(value).replace(',','.'));
  const pct = Math.max(0, Math.min(100, num/10*100));
  return '<div><div class="row between" style="margin-bottom:9px"><span class="t-label" style="font-size:14px">'+label+'</span><span><span class="t-num" style="font-size:20px">'+value+'</span><span class="t-meta"> / 10</span></span></div><div style="height:12px;background:var(--green-soft);border-radius:999px;overflow:hidden"><div style="width:'+pct+'%;height:100%;border-radius:999px;background:'+color+';transition:width .7s cubic-bezier(.4,0,.2,1)"></div></div><div class="row between" style="margin-top:8px"><span class="t-meta">'+sub+'</span><span class="t-meta" style="color:var(--green);font-weight:600">'+trend+'</span></div></div>';
}
function delta(v, unit, up){
  unit = unit===undefined ? 'pts' : unit;
  up = up===undefined ? true : up;
  return '<span style="display:inline-flex;align-items:center;gap:4px;background:var(--green-soft);color:var(--green-dark);font-family:var(--sans);font-weight:700;font-size:12px;padding:3px 9px;border-radius:999px"><span style="font-size:10px">'+(up?'▲':'▼')+'</span>'+v+' '+unit+'</span>';
}
function kpi(label, value, suffix, deltaHTML, sparkData){
  return '<div class="card" style="padding:20px"><div class="t-kicker" style="color:var(--ink-2);letter-spacing:.1em">'+label+'</div><div class="row between" style="align-items:flex-end;margin-top:12px"><div class="row" style="align-items:baseline;gap:4px"><span style="font-family:var(--serif);font-weight:700;font-size:38px;color:var(--ink);line-height:1">'+value+'</span>'+(suffix?'<span class="t-meta" style="font-size:14px">'+suffix+'</span>':'')+'</div>'+spark(sparkData)+'</div><div style="margin-top:14px">'+deltaHTML+'</div></div>';
}
function cardHead(kicker, title, rightHTML){
  return '<div class="row between" style="margin-bottom:18px"><div><div class="t-kicker">'+kicker+'</div><h2 class="t-h1" style="margin-top:5px">'+title+'</h2></div>'+(rightHTML||'')+'</div>';
}
const dash = { period:'8 semaines' };
function dashboardHTML(){
  const period = dash.period;
  const fullData=[62,65,64,70,69,74,78,81];
  const fullLabels=['14/4','21/4','28/4','5/5','12/5','19/5','26/5','2/6'];
  const slice = period==='4 semaines' ? 4 : 0;
  const data = fullData.slice(slice), labels = fullLabels.slice(slice);
  const teams=[{team:'Marketing',v:86},{team:'Produit',v:81},{team:'Tech',v:74},{team:'Commercial',v:69},{team:'Support',v:63},{team:'RH',v:58}];
  const past=[
    {date:'Jeu. 5 juin',title:'Mobilité & posture',coach:'Léa',rate:82,n:'49/60'},
    {date:'Jeu. 29 mai',title:'Cardio doux',coach:'Marc',rate:75,n:'45/60'},
    {date:'Jeu. 22 mai',title:'Renfort & gainage',coach:'Léa',rate:71,n:'43/60'},
    {date:'Jeu. 15 mai',title:'Respiration active',coach:'Marc',rate:68,n:'41/60'},
  ];
  const periodBtns = ['8 semaines','4 semaines'].map(p=>'<button data-period="'+p+'" style="border:none;cursor:pointer;border-radius:999px;padding:7px 14px;font-family:var(--sans);font-weight:600;font-size:13px;background:'+(period===p?'var(--ink)':'transparent')+';color:'+(period===p?'#fff':'var(--ink-2)')+'">'+p+'</button>').join('');
  const pastRows = past.map((s,i)=>'<div><div class="row between" style="padding:14px 0"><div class="row" style="gap:14px"><div style="width:40px;height:40px;border-radius:11px;background:var(--green-soft);display:flex;align-items:center;justify-content:center;flex-shrink:0">'+icon('check',{size:19,color:'var(--green)',stroke:2.4})+'</div><div><div class="t-title" style="font-size:15px">'+s.title+'</div><div class="t-meta">'+s.date+' · Coach '+s.coach+'</div></div></div><div class="row" style="gap:16px;width:230px;justify-content:flex-end"><div style="width:96px;height:8px;background:var(--green-soft);border-radius:999px;overflow:hidden"><div style="width:'+s.rate+'%;height:100%;background:var(--green);border-radius:999px"></div></div><span class="t-num" style="font-size:16px;width:42px;text-align:right">'+s.rate+'%</span><span class="t-meta" style="width:44px;text-align:right">'+s.n+'</span></div></div>'+(i<past.length-1?'<div class="divider"></div>':'')+'</div>').join('');
  const nextRows = [['calendar','Jeudi 12 juin · 14h00'],['pin','Salle de réunion · Atelier Nord'],['user','Coach Léa · 38 inscrits']]
    .map(r=>'<div class="row" style="gap:11px">'+icon(r[0],{size:18,color:'rgba(255,255,255,.85)'})+'<span style="font-family:var(--sans);font-size:14px;color:#fff;font-weight:500">'+r[1]+'</span></div>').join('');
  const logo = '<div style="width:30px;height:30px;border-radius:8px;background:var(--green-soft);display:flex;align-items:center;justify-content:center;font-family:var(--serif);font-weight:600;font-size:12px;color:var(--green-dark)">AN</div>';

  return ''
  + '<div style="background:var(--cream);min-height:100%;font-family:var(--sans);color:var(--ink)">'
  + '<div style="position:relative;z-index:10;background:var(--white);border-bottom:1px solid var(--line);padding:0 32px;height:64px;display:flex;align-items:center;justify-content:space-between"><div class="row" style="gap:16px">'+wordmark(19)+'<div style="width:1px;height:26px;background:var(--line)"></div><div class="row" style="gap:9px">'+logo+'<div class="col"><span class="t-label" style="font-size:13px">Atelier Nord</span><span class="t-meta" style="font-size:11px">60 salariés · Lyon</span></div></div></div><div class="row" style="gap:16px"><div class="row" style="gap:5px;background:#fff;border:1px solid var(--line);border-radius:999px;padding:4px">'+periodBtns+'</div><div class="row" style="gap:9px"><div style="width:38px;height:38px;border-radius:50%;background:var(--green);color:#fff;font-family:var(--serif);font-weight:600;font-size:15px;display:flex;align-items:center;justify-content:center">S</div><div class="col"><span class="t-label" style="font-size:13px">Sophie Reynaud</span><span class="t-meta" style="font-size:11px">Responsable RH</span></div></div></div></div>'
  + '<div style="padding:32px;max-width:1280px;margin:0 auto">'
  + '<div class="row between" style="align-items:flex-end;margin-bottom:24px"><div><h1 class="t-display" style="font-size:32px">Tableau de bord <span class="t-em">équipe</span></h1><p class="t-body" style="margin-top:6px">Votre programme ProActif sur les '+(period==='4 semaines'?'4':'8')+' dernières semaines. Les indicateurs progressent — le suivi porte ses fruits.</p></div><button class="btn btn-ghost">'+icon('calendar',{size:17,color:'var(--ink)'})+' Exporter le rapport</button></div>'
  + '<div style="display:grid;grid-template-columns:repeat(4,1fr);gap:18px;margin-bottom:20px">'
  +   kpi('Taux de participation','78%','',delta('+6','pts'),[64,66,68,70,72,75,76,78])
  +   kpi('Salariés actifs','47','/ 60',delta('+4',''),[39,41,42,43,44,45,46,47])
  +   kpi('Séances réalisées','14','séances',delta('100%','tenues'),[8,9,10,11,12,13,13,14])
  +   kpi('Indice d’engagement','81','/ 100',delta('+7','pts'),[62,65,64,70,69,74,78,81])
  + '</div>'
  + '<div style="display:grid;grid-template-columns:1.62fr 1fr;gap:20px;align-items:start">'
  +   '<div style="display:flex;flex-direction:column;gap:20px">'
  +     '<div class="card" style="padding:24px">'+cardHead('Engagement','Indice d’engagement, 8 dernières semaines','<div class="row" style="gap:7px"><span style="width:11px;height:11px;border-radius:3px;background:var(--green)"></span><span class="t-meta">Indice /100</span></div>')+lineChart(data,labels)+'</div>'
  +     '<div class="card" style="padding:24px">'+cardHead('Défis','Participation aux défis par équipe','<span class="t-meta">Cette semaine</span>')+teamBars(teams)+'</div>'
  +     '<div class="card" style="padding:24px">'+cardHead('Séances','Séances passées','<span class="t-meta">Taux de participation</span>')+'<div>'+pastRows+'</div></div>'
  +   '</div>'
  +   '<div style="display:flex;flex-direction:column;gap:20px">'
  +     '<div class="card-green" style="padding:24px;position:relative;overflow:hidden"><div style="position:absolute;right:-14px;top:-14px;opacity:.16">'+icon('calendar',{size:96,color:'#fff',stroke:1.3})+'</div><div class="t-kicker" style="color:rgba(255,255,255,.8)">Prochaine séance</div><h2 class="t-h1" style="color:#fff;margin-top:8px;font-size:23px">Mobilité & posture</h2><div style="display:flex;flex-direction:column;gap:11px;margin-top:18px">'+nextRows+'</div><button style="margin-top:20px;width:100%;background:#fff;color:var(--green-dark);border:none;border-radius:var(--r-md);padding:13px;font-family:var(--sans);font-weight:600;font-size:14px;cursor:pointer">Gérer la séance</button></div>'
  +     '<div class="card" style="padding:24px">'+cardHead('Ressenti','Tendance bien-être','')+'<div style="display:flex;flex-direction:column;gap:22px">'+gauge('Énergie ressentie','6,8','Moyenne équipe','var(--amber)','▲ +0,5 ce mois')+gauge('Niveau de stress','3,9','Moyenne équipe','var(--sky)','▼ −0,6 ce mois')+'</div><div class="row" style="gap:10px;margin-top:22px;padding:13px 14px;background:var(--green-soft);border-radius:var(--r-md)">'+icon('lock',{size:18,color:'var(--green-dark)'})+'<span class="t-meta" style="font-size:12px;line-height:1.4;color:var(--green-dark)">Données <b>anonymisées et agrégées</b>. Aucune donnée individuelle n’est accessible.</span></div></div>'
  +   '</div>'
  + '</div></div></div>';
}

/* ----------------------- Events & mount ----------------------- */
let phoneEl = null, onScreenCb = null, dashEl = null;
function renderMobile(){ if(phoneEl) phoneEl.innerHTML = mobileShellHTML(); }
function setScreen(s){
  if(s==='checkin') resetCheckin();
  mob.screen = s;
  renderMobile();
  if(onScreenCb) onScreenCb(s);
}
function doAction(a){
  if(a==='join'){ mob.name = (mob.ob.name||'').trim() || 'Camille'; mob.team = mob.ob.team || 'Marketing'; setScreen('home'); }
  else if(a==='checkin-validate'){ mob.checkin.done = true; renderMobile(); }
  else if(a==='checkin-finish'){
    if(!mob.checkedInToday){ mob.checkedInToday = true; mob.streak++; mob.challenge.done = Math.min(mob.challenge.goal, mob.challenge.done+1); }
    resetCheckin(); mob.screen='home'; renderMobile(); if(onScreenCb) onScreenCb('home');
  }
  else if(a==='ex-back'){ setScreen('library'); }
  else if(a==='ex-done'){ mob.doneEx.add(mob.currentEx.id); renderMobile(); }
}
function onPhoneClick(e){
  let el;
  if((el = e.target.closest('[data-nav]'))){ setScreen(el.dataset.nav); return; }
  if((el = e.target.closest('[data-open-ex]'))){ const f = EXERCISES.find(x=>x.id===el.dataset.openEx); if(f){ mob.currentEx = f; setScreen('exercise'); } return; }
  if((el = e.target.closest('[data-cat]'))){ mob.libCat = el.dataset.cat; renderMobile(); return; }
  if((el = e.target.closest('[data-ob-team]'))){ mob.ob.team = el.dataset.obTeam; renderMobile(); return; }
  if((el = e.target.closest('[data-mood]'))){ mob.checkin.mood = +el.dataset.mood; const wrap = el.parentElement; wrap.querySelectorAll('.mood').forEach(m=>m.classList.remove('is-on')); el.classList.add('is-on'); return; }
  if((el = e.target.closest('[data-action]'))){ doAction(el.dataset.action); return; }
}
function onPhoneInput(e){
  const t = e.target;
  if(t.dataset && t.dataset.ck){
    const k = t.dataset.ck, v = +t.value; mob.checkin[k] = v;
    const card = t.closest('.card');
    if(card){ const em = card.querySelector('[data-ck-emoji]'), val = card.querySelector('[data-ck-val]'); if(em) em.textContent = emojiFor(k,v); if(val) val.textContent = v; }
    return;
  }
  if(t.dataset && t.dataset.obName !== undefined){
    mob.ob.name = t.value;
    const btn = phoneEl ? phoneEl.querySelector('[data-action="join"]') : null;
    if(btn){ const ready = t.value.trim() && mob.ob.team; btn.style.opacity = ready ? 1 : .5; btn.style.pointerEvents = ready ? 'auto' : 'none'; }
    return;
  }
}
function mountMobile(el, opts){
  opts = opts || {};
  phoneEl = el;
  onScreenCb = opts.onScreen || null;
  if(opts.start){ mob.screen = opts.start; }
  el.addEventListener('click', onPhoneClick);
  el.addEventListener('input', onPhoneInput);
  renderMobile();
}
function renderDashboard(){ if(dashEl) dashEl.innerHTML = dashboardHTML(); }
function mountDashboard(el){
  dashEl = el;
  el.addEventListener('click', function(e){ const b = e.target.closest('[data-period]'); if(b){ dash.period = b.dataset.period; renderDashboard(); } });
  renderDashboard();
}

return {
  mountMobile: mountMobile,
  mountDashboard: mountDashboard,
  icon: icon,
  wordmark: wordmark,
  SCREENS: SCREENS,
  setScreen: setScreen,
  getScreen: function(){ return mob.screen; },
};
})();
