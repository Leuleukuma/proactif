// pulse-backend.js — connexion Supabase pour la bêta privée (test entre amis)
// Dépend de : supabase-config.js (URL + clé anon) et de la lib @supabase/supabase-js.
// La clé anon est publique ; l'accès est limité par les règles RLS côté base.
(function(){
  "use strict";
  const MOODS = ['😣','😕','😐','🙂','😄'];

  function todayStr(){
    const d = new Date();
    return d.getFullYear() + '-' + String(d.getMonth()+1).padStart(2,'0') + '-' + String(d.getDate()).padStart(2,'0');
  }
  function dayLabel(dStr){
    const d = new Date(dStr + 'T00:00:00');
    const today = new Date(); today.setHours(0,0,0,0);
    const diff = Math.round((today - d) / 86400000);
    if(diff === 0) return 'Aujourd’hui';
    if(diff === 1) return 'Hier';
    const lbl = d.toLocaleDateString('fr-FR', { weekday:'long' });
    return lbl.charAt(0).toUpperCase() + lbl.slice(1);
  }
  function computeStreak(daySet){
    let streak = 0;
    const cur = new Date(); cur.setHours(0,0,0,0);
    const fmt = x => x.getFullYear() + '-' + String(x.getMonth()+1).padStart(2,'0') + '-' + String(x.getDate()).padStart(2,'0');
    // si pas de check-in aujourd'hui, on démarre le décompte à hier
    if(!daySet.has(todayStr())) cur.setDate(cur.getDate() - 1);
    while(daySet.has(fmt(cur))){ streak++; cur.setDate(cur.getDate() - 1); }
    return streak;
  }

  function createBackend(){
    if(!window.supabase || !window.SUPABASE_URL || !window.SUPABASE_ANON_KEY){
      console.warn('Pulse: Supabase non configuré (supabase-config.js ou lib manquante).');
      return null;
    }
    const sb = window.supabase.createClient(window.SUPABASE_URL, window.SUPABASE_ANON_KEY);
    const LS = 'pulse_member_id';

    // Session anonyme : chaque appareil obtient un utilisateur, ses donnees sont cloisonnees par RLS.
    async function ensureAuth(){
      try{
        const { data } = await sb.auth.getSession();
        if(!data || !data.session){ await sb.auth.signInAnonymously(); }
      }catch(e){ console.error('Pulse auth:', e.message || e); }
    }
    async function myMemberId(){
      let id = localStorage.getItem(LS);
      if(id) return id;
      const { data } = await sb.from('members').select('id').limit(1);
      id = data && data[0] && data[0].id;
      if(id) localStorage.setItem(LS, id);
      return id || null;
    }

    async function join(name, team){
      await ensureAuth();
      try{
        const { data, error } = await sb.from('members').insert({ name: name, team: team }).select().single();
        if(error) throw error;
        localStorage.setItem(LS, data.id);
      }catch(e){ console.error('Pulse join:', e.message || e); }
    }

    async function saveCheckin(v){
      await ensureAuth();
      const id = await myMemberId();
      if(!id) return;
      try{
        const { error } = await sb.from('checkins').insert({
          member_id: id, energy: v.energy, stress: v.stress, pain: v.pain, mood: v.mood, day: todayStr()
        });
        if(error) throw error;
      }catch(e){ console.error('Pulse saveCheckin:', e.message || e); }
    }

    async function loadMe(){
      await ensureAuth();
      try{
        const { data: ms } = await sb.from('members').select('*').limit(1);
        const m = ms && ms[0];
        if(!m) return null;
        localStorage.setItem(LS, m.id);
        const { data: cks } = await sb.from('checkins').select('*').order('created_at', { ascending: false });
        const list = cks || [];
        const daySet = new Set(list.map(c => c.day));
        return {
          name: m.name,
          team: m.team,
          streak: computeStreak(daySet),
          checkedInToday: daySet.has(todayStr()),
          history: list.slice(0, 5).map(c => ({
            day: dayLabel(c.day), mood: MOODS[c.mood] || '🙂', energy: c.energy, stress: c.stress, done: true
          }))
        };
      }catch(e){ console.error('Pulse loadMe:', e.message || e); return null; }
    }

    function reset(){ localStorage.removeItem(LS); }

    return { join: join, saveCheckin: saveCheckin, loadMe: loadMe, reset: reset };
  }

  window.createPulseBackend = createBackend;
})();
