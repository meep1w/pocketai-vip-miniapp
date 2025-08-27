/* ================= i18n ================= */
const I18N = {
    en: {
        "menu.title":"Menu","menu.stats":"Your Statistics","menu.language":"Choose Language","menu.theme":"Theme",
        "btn.close":"Close","btn.generate":"Generate signal","btn.reset":"Reset",
        "label.select_instrument":"Select instrument","ph.select_instrument":"Select instrument",
        "label.select_model":"Model","label.expiration_time":"Expiration time","ph.expiration_time":"Select the time of the transaction",
        "instr.title":"Select instrument","instr.categories":"CATEGORIES","instr.currencies":"Currencies","instr.crypto":"Cryptocurrencies","instr.stocks":"Stocks","instr.commodities":"Commodities","instr.indices":"Indices",
        "expire.title":"Expiration time","signal.title":"Signal",
        "vip.idle":"Tap “Generate signal”",
        "vip.ta":"Technical analysis","vip.ta_sub":"Indicators & S/R",
        "vip.patterns":"Patterns recognition","vip.patterns_sub":"Trends & figures",
        "vip.math":"Mathematical calculations","vip.math_sub":"Probabilities & risks",
        "vip.generation":"Signal generation","vip.generation_sub":"Final assembling",
        "welcome.title": "Welcome, Platinum!",
        "welcome.text": "You are now a Platinum client. Thanks for being with us! Enjoy higher accuracy, trade wisely and use your status benefits.",
        "welcome.cta": "Continue",
        "vip.market":"Market:","vip.time":"Time:","vip.pair":"Pair:","vip.confidence":"Confidence:","vip.strength":"Strength:","vip.valid_until":"Valid until:","vip.accuracy":"accuracy","vip.volume":"volume","vip.risk":"risk",
        "stats.title":"Your Statistics","stats.tariff":"Your tariff:","stats.received":"Signals received:","stats.accuracy":"Signal accuracy:"
    },
    ru: {
        "menu.title":"Меню","menu.stats":"Ваша статистика","menu.language":"Выбор языка","menu.theme":"Тема",
        "btn.close":"Закрыть","btn.generate":"Сгенерировать сигнал","btn.reset":"Сбросить",
        "label.select_instrument":"Выберите инструмент","ph.select_instrument":"Выберите инструмент",
        "label.select_model":"Модель","label.expiration_time":"Время экспирации","ph.expiration_time":"Выберите время сделки",
        "instr.title":"Выберите инструмент","instr.categories":"КАТЕГОРИИ","instr.currencies":"Валюты","instr.crypto":"Криптовалюты","instr.stocks":"Акции","instr.commodities":"Сырьё","instr.indices":"Индексы",
        "expire.title":"Время экспирации","signal.title":"Сигнал",
        "vip.idle":"Нажмите «Сгенерировать сигнал»",
        "vip.ta":"Технический анализ","vip.ta_sub":"Индикаторы и уровни S/R",
        "vip.patterns":"Распознавание паттернов","vip.patterns_sub":"Тренды и фигуры",
        "vip.math":"Математические расчёты","vip.math_sub":"Вероятности и риски",
        "vip.generation":"Генерация сигнала","vip.generation_sub":"Финальная сборка",
        "welcome.title": "Добро пожаловать, Platinum!",
        "welcome.text": "Вы теперь Platinum-клиент. Спасибо, что с нами! Получайте более точные сигналы, торгуйте аккуратно и используйте преимущества вашего статуса.",
        "welcome.cta": "Продолжить",
        "vip.market":"Рынок:","vip.time":"Время:","vip.pair":"Пара:","vip.confidence":"Уверенность:","vip.strength":"Сила:","vip.valid_until":"Действует до:","vip.accuracy":"точность","vip.volume":"объём","vip.risk":"риск",
        "stats.title":"Ваша статистика","stats.tariff":"Ваш тариф:","stats.received":"Сигналов получено:","stats.accuracy":"Средняя точность:"
    }
};
const KEYS = { THEME:"vip_theme", LANG:"vip_lang", FIELDS:"vip_fields", SIGNAL:"vip_signal", WELCOME_SHOWN: "vip_welcome_shown", STATS:"vip_stats" };

function getLang(){ return localStorage.getItem(KEYS.LANG) || 'ru'; }
function t(){ return I18N[getLang()] || I18N.ru; }
function applyI18n(lang){
    const d=I18N[lang]||I18N.en;
    document.querySelectorAll('[data-i18n]').forEach(el=>{
        const k=el.getAttribute('data-i18n');
        if(!k||d[k]==null) return;
        if(/^(INPUT|TEXTAREA)$/.test(el.tagName)) el.setAttribute('placeholder', d[k]);
        else el.textContent = d[k];
    });
}
function getPreferredTheme(){
    try{ if(window.Telegram?.WebApp?.colorScheme) return window.Telegram.WebApp.colorScheme; }catch(e){}
    return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}
function setHtmlTheme(mode){
    const eff = (mode==='default') ? getPreferredTheme() : mode;
    document.documentElement.setAttribute('data-theme', eff);
    const logo = document.getElementById('logoImg');
    if (logo){
        logo.src = eff==='light' ? logo.getAttribute('data-src-light') : logo.getAttribute('data-src-dark');
    }
}

/* ============== sidebar & modals ============== */
const burger=document.getElementById('burgerBtn');
const sidebar=document.getElementById('sidebar');
document.getElementById('closeSidebar')?.addEventListener('click',()=>sidebar.classList.remove('open'));
burger?.addEventListener('click',()=>sidebar.classList.add('open'));
document.addEventListener('click',e=>{
    if(sidebar.classList.contains('open') && !sidebar.contains(e.target) && !burger.contains(e.target)){
        sidebar.classList.remove('open');
    }
});
function openModal(id){ document.getElementById(id)?.classList.add('open'); }
function closeModal(id){ document.getElementById(id)?.classList.remove('open'); }
document.querySelectorAll('.modal [data-close-modal]').forEach(el=>{
    el.addEventListener('click',()=> closeModal(el.closest('.modal').id));
});
document.getElementById('nav-theme')?.addEventListener('click',()=>openModal('themeModal'));
document.querySelectorAll('#themeModal .option-item').forEach(b=>{
    b.addEventListener('click',()=>{
        localStorage.setItem(KEYS.THEME, b.getAttribute('data-theme'));
        setHtmlTheme(localStorage.getItem(KEYS.THEME)||'default');
        closeModal('themeModal');
    });
});
document.getElementById('nav-lang')?.addEventListener('click',()=>{
    const cur=getLang();
    document.querySelectorAll('#langModal .lang-opt').forEach(x=>x.classList.toggle('is-active', x.getAttribute('data-lang')===cur));
    openModal('langModal');
});
document.querySelectorAll('#langModal .lang-opt').forEach(b=>{
    b.addEventListener('click',()=>{
        localStorage.setItem(KEYS.LANG, b.getAttribute('data-lang'));
        applyI18n(getLang());
        const f=getFields();
        if(!f.instrument) document.querySelector('#field-instrument .ui-field__placeholder').textContent=t()['ph.select_instrument'];
        if(!f.expiration) document.querySelector('#field-expiration .ui-field__placeholder').textContent=t()['ph.expiration_time'];
        closeModal('langModal');
    });
});

/* ============== Instruments ============== */
const INSTRUMENTS = {
    currencies: ["AED/CNY OTC","AUD/CAD OTC","AUD/USD OTC","BHD/CNY OTC","EUR/CHF OTC","EUR/NZD OTC","EUR/USD OTC","GBP/AUD OTC","LBP/USD OTC","NZD/JPY OTC","SAR/CNY OTC","UAH/USD OTC","USD/ARS OTC","USD/CAD OTC","USD/CLP OTC","USD/CNH OTC","USD/EGP OTC","USD/RUB OTC","ZAR/USD OTC","CHF/NOK OTC","EUR/HUF OTC","EUR/JPY OTC","EUR/RUB OTC","AUD/NZD OTC","AUD/BRL OTC","USD/COP OTC","USD/INR OTC","USD/SGD OTC","CAD/CHF OTC","QAR/CNY OTC","AUD/JPY OTC","OMR/CNY OTC","EUR/GBP OTC","USD/VND OTC","AUD/CHF OTC","USD/THB OTC","USD/DZD OTC","NGN/USD OTC","CAD/JPY OTC","TND/USD OTC","USD/BDT OTC","NZD/USD OTC","USD/MYR OTC","USD/PKR OTC","USD/MXN OTC","GBP/USD OTC","USD/PHP OTC","MAD/USD OTC","JOD/CNY OTC","GBP/JPY OTC","USD/CHF OTC","KES/USD OTC","USD/IDR OTC","CHF/JPY OTC","USD/JPY OTC"],
    crypto: ["Cardano OTC","Bitcoin ETF OTC","BNB OTC","Bitcoin OTC","Polkadot OTC","Ethereum OTC","Litecoin OTC","Polygon OTC","Avalanche OTC","TRON OTC","Toncoin OTC","Solana OTC","Chainlink OTC","Dogecoin OTC","Bitcoin"],
    stocks: ["Apple OTC","Boeing Company OTC","Intel OTC","Johnson & Johnson OTC","Microsoft OTC","Coinbase Global OTC","Marathon Digital Holdings OTC","FedEx OTC","Amazon OTC","VISA OTC","McDonald's OTC","Alibaba OTC","Advanced Micro Devices OTC","American Express OTC","ExxonMobil OTC","Palantir Technologies OTC","VIX OTC","Cisco OTC","Netflix OTC","FACEBOOK INC OTC","Pfizer Inc OTC","Citigroup Inc OTC","Tesla OTC","GameStop Corp OTC"],
    commodities: ["Brent Oil OTC","WTI Crude Oil OTC","Silver OTC","Gold OTC","Natural Gas OTC","Palladium spot OTC","Platinum spot OTC"],
    indices: ["AUS 200 OTC","100GBP OTC","D30EUR OTC","DJI30 OTC","E35EUR OTC","E50EUR OTC","F40EUR OTC","JPN225 OTC","US100 OTC","SP500 OTC"]
};
const catOrder = ["currencies","crypto","stocks","commodities","indices"];

function renderInstrumentsList(items){
    const list = document.getElementById('instrList');
    list.innerHTML = "";
    items.forEach(name=>{
        const b=document.createElement('button');
        b.className='instr-item'; b.type='button'; b.textContent=name;
        b.addEventListener('click',()=>{ setFieldValue('instrument', name); closeModal('instrumentsModal'); });
        list.appendChild(b);
    });
}
function activateCategory(cat){
    document.querySelectorAll('.instr-cat').forEach(btn=>btn.classList.toggle('is-active', btn.getAttribute('data-cat')===cat));
    renderInstrumentsList(INSTRUMENTS[cat]||[]);
}
function searchInstruments(q){
    const query=q.trim().toLowerCase();
    if(!query){
        const active=document.querySelector('.instr-cat.is-active')?.getAttribute('data-cat') || 'currencies';
        renderInstrumentsList(INSTRUMENTS[active]||[]);
        return;
    }
    const all = catOrder.flatMap(c=>INSTRUMENTS[c]);
    renderInstrumentsList(all.filter(x=>x.toLowerCase().includes(query)));
}
(function initInstrumentsModal(){
    const field=document.getElementById('field-instrument');
    field?.addEventListener('click',()=>openModal('instrumentsModal'));
    field?.addEventListener('keydown',e=>{ if(e.key==='Enter'||e.key===' '){ e.preventDefault(); openModal('instrumentsModal'); }});
    document.querySelectorAll('.instr-cat').forEach(btn=>btn.addEventListener('click',()=>{
        activateCategory(btn.getAttribute('data-cat'));
        document.getElementById('instrSearch').value="";
    }));
    document.getElementById('instrSearch')?.addEventListener('input',e=>searchInstruments(e.target.value));
    activateCategory('currencies');
})();

/* ============== Expiration ============== */
const EXPIRES = ['S5','S15','S30','M1','M3','M5','M30','H1','H4'];
(function initExpire(){
    const field=document.getElementById('field-expiration');
    const list=document.getElementById('expList');
    function draw(selected){
        list.innerHTML="";
        EXPIRES.forEach(v=>{
            const b=document.createElement('button');
            b.className='exp-item'+(v===selected?' is-active':''); b.type='button'; b.textContent=v;
            b.addEventListener('click',()=>{ setFieldValue('expiration', v); closeModal('expireModal'); });
            list.appendChild(b);
        });
    }
    function open(){ draw(getField('expiration')); openModal('expireModal'); }
    field?.addEventListener('click', open);
    field?.addEventListener('keydown', e=>{ if(e.key==='Enter'||e.key===' '){ e.preventDefault(); open(); }});
})();

/* ============== Fields & persistence ============== */
function getFields(){ try{ return JSON.parse(localStorage.getItem(KEYS.FIELDS)||'{}'); }catch(e){ return {}; } }
function saveFields(o){ localStorage.setItem(KEYS.FIELDS, JSON.stringify(o||{})); }
function setFieldValue(kind, value){
    const map={ instrument:['#field-instrument','ph.select_instrument'], expiration:['#field-expiration','ph.expiration_time'] };
    const el=document.querySelector(map[kind]?.[0]); if(!el) return;
    el.setAttribute('data-value', value);
    el.querySelector('.ui-field__placeholder').textContent = value;
    const f=getFields(); f[kind]=value; saveFields(f);
    updateStartState();
}
function getField(kind){ return getFields()[kind]||''; }
function clearFields(){
    saveFields({});
    const d=t();
    document.querySelector('#field-instrument .ui-field__placeholder').textContent=d['ph.select_instrument'];
    document.querySelector('#field-expiration .ui-field__placeholder').textContent=d['ph.expiration_time'];
    document.querySelector('#field-instrument').removeAttribute('data-value');
    document.querySelector('#field-expiration').removeAttribute('data-value');
}

/* ============== Stats (VIP) ============== */
function loadStats(){ try{ return JSON.parse(localStorage.getItem(KEYS.STATS)||'{}'); }catch(e){ return {}; } }
function saveStats(s){ localStorage.setItem(KEYS.STATS, JSON.stringify(s||{})); }
function addSignalToStats(acc){
    const s=loadStats(); s.count=(s.count||0)+1; s.sumAcc=(s.sumAcc||0)+(+acc||0); saveStats(s);
}
function openStatsModal(){
    const s=loadStats(); const count=s.count||0; const avg=count?(s.sumAcc/count):0;
    document.getElementById('stTariff').textContent='Platinum';
    document.getElementById('stCount').textContent=count;
    document.getElementById('stAvg').textContent=`${Math.round(avg)}%`;
    openModal('statsModal');
}
document.getElementById('nav-stats')?.addEventListener('click', openStatsModal);

/* ============== States ============== */
let stepTimers=[];
function clearAllTimers(){ stepTimers.forEach(id=>clearTimeout(id)); stepTimers=[]; }
function scrollToSignal(){
    const card=document.getElementById('vipSignal'); if(!card) return;
    const y=card.getBoundingClientRect().top + window.scrollY - 8;
    window.scrollTo({ top:y, behavior:'smooth' });
}
function showState(state){
    const controls=document.getElementById('controls');
    const idle   =document.getElementById('idleView');
    const steps  =document.getElementById('analysisSteps');
    const res    =document.getElementById('resultView');
    const reset  =document.getElementById('resetWrap');

    if(state==='start'){
        controls.classList.remove('collapsed'); idle.hidden=false; steps.hidden=true; res.hidden=true; reset.hidden=true;
    }else if(state==='analyzing'){
        controls.classList.add('collapsed'); idle.hidden=true; steps.hidden=false; res.hidden=true; reset.hidden=true;
        scrollToSignal();
    }else if(state==='result'){
        controls.classList.add('collapsed'); idle.hidden=true; steps.hidden=true; res.hidden=false; reset.hidden=false;
        res.classList.remove('result-enter'); requestAnimationFrame(()=>res.classList.add('result-enter'));
    }
}

/* ============== Analysis flow ============== */
const startBtn=document.getElementById('vipStartBtn');
function updateStartState(){ startBtn.disabled = !(getField('instrument') && getField('expiration')); }
function msToMoscowTimeString(date){ return date.toLocaleTimeString([], {hour:'2-digit',minute:'2-digit', timeZone:'Europe/Moscow'}); }
function randomDir(){ return Math.random()<0.5 ? 'UP' : 'DOWN'; }

function runAnalysis(){
    // reset progress
    document.querySelectorAll('.step').forEach(s=>s.classList.remove('done'));
    document.getElementById('progressBar').style.width='0%';
    document.getElementById('progressText').textContent='0%';
    clearAllTimers();
    showState('analyzing');

    const delays=[900,900,900,900];
    delays.reduce((acc,dur,i)=>{
        const at=acc+dur;
        stepTimers.push(setTimeout(()=>{
            document.querySelector(`.step[data-step="${i+1}"]`)?.classList.add('done');
            const pct=(i+1)*25;
            document.getElementById('progressBar').style.width=pct+'%';
            document.getElementById('progressText').textContent=pct+'%';
            if(pct===100) stepTimers.push(setTimeout(showResult, 500));
        }, at));
        return at;
    }, 0);
}

function showResult(){
    const pair=getField('instrument');
    const exp=getField('expiration');
    const dir=randomDir();
    const conf=Math.floor(75+Math.random()*21);       // 75..96
    const strength=Math.random()<0.55?'Medium':'High';
    const acc=(87+Math.random()*11).toFixed(0);       // 87..98
    const plusMin=Math.random()<0.5?1:2;
    const valid=msToMoscowTimeString(new Date(Date.now()+plusMin*60000));

    const arrow=document.getElementById('dirArrow'); const dirTxt=document.getElementById('dirText');
    arrow.classList.remove('up','down'); dirTxt.classList.remove('up','down');
    if(dir==='UP'){arrow.classList.add('up'); dirTxt.classList.add('up');} else {arrow.classList.add('down'); dirTxt.classList.add('down');}
    dirTxt.textContent=dir;

    document.getElementById('resTime').textContent=exp;
    document.getElementById('resPair').textContent=pair;
    document.getElementById('resConf').textContent=conf+'%';
    document.getElementById('resStrength').textContent=strength;
    document.getElementById('resValid').textContent=valid;
    document.getElementById('resAcc').textContent=acc+'%';

    addSignalToStats(+acc);
    saveSignal({pair,exp,dir,conf,strength,valid,acc});
    showState('result');
}

function saveSignal(o){ localStorage.setItem(KEYS.SIGNAL, JSON.stringify(o||{})); }
function loadSignal(){ try{ return JSON.parse(localStorage.getItem(KEYS.SIGNAL)||'{}'); }catch(e){ return {}; } }

startBtn?.addEventListener('click', ()=>{
    if(!(getField('instrument') && getField('expiration'))) return;
    runAnalysis();
});

/* ============== Reset ============== */
function resetAll(){
    clearAllTimers();
    localStorage.removeItem(KEYS.SIGNAL);
    document.querySelectorAll('.step').forEach(s=>s.classList.remove('done'));
    document.getElementById('progressBar').style.width='0%';
    document.getElementById('progressText').textContent='0%';
    clearFields();
    updateStartState();
    showState('start');
}
document.getElementById('resetBtn')?.addEventListener('click', resetAll);

function openSheet(id){ document.getElementById(id)?.classList.add('open'); }
function closeSheet(id){ document.getElementById(id)?.classList.remove('open'); }

// VIP Welcome: события
(function initVipWelcome(){
    const sheet = document.getElementById('vipWelcome');
    if (!sheet) return;

    // Кнопка
    document.getElementById('vipWelcomeBtn')?.addEventListener('click', ()=>{
        localStorage.setItem(KEYS.WELCOME_SHOWN, '1');
        closeSheet('vipWelcome');
    });

    // Клик по фону
    sheet.querySelector('[data-sheet-close]')?.addEventListener('click', ()=>{
        localStorage.setItem(KEYS.WELCOME_SHOWN, '1');
        closeSheet('vipWelcome');
    });

    // Escape
    document.addEventListener('keydown', (e)=>{
        if (e.key === 'Escape' && sheet.classList.contains('open')){
            localStorage.setItem(KEYS.WELCOME_SHOWN, '1');
            closeSheet('vipWelcome');
        }
    });
})();



/* ============== Restore ============== */
function restore(){
    setHtmlTheme(localStorage.getItem(KEYS.THEME)||'default');
    applyI18n(getLang());

    // показать welcome при первом открытии
    if (!localStorage.getItem(KEYS.WELCOME_SHOWN)) {
        // короткая задержка, чтобы всё применилось
        setTimeout(()=> openSheet('vipWelcome'), 250);
    }


    showState('start');

    const f=getFields();
    if(f.instrument) setFieldValue('instrument', f.instrument);
    if(f.expiration) setFieldValue('expiration', f.expiration);
    updateStartState();

    const s=loadSignal();
    if(s?.pair){
        document.getElementById('resTime').textContent = s.exp||'—';
        document.getElementById('resPair').textContent = s.pair||'—';
        document.getElementById('resConf').textContent = (s.conf||'—') + (s.conf?'%':'');
        document.getElementById('resStrength').textContent = s.strength||'—';
        document.getElementById('resValid').textContent = s.valid||'—';
        document.getElementById('resAcc').textContent = (s.acc||'—') + (s.acc?'%':'');
        const arrow=document.getElementById('dirArrow'); const dirTxt=document.getElementById('dirText');
        const dir=s.dir||'UP'; arrow.classList.remove('up','down'); dirTxt.classList.remove('up','down');
        if(dir==='UP'){arrow.classList.add('up'); dirTxt.classList.add('up');} else {arrow.classList.add('down'); dirTxt.classList.add('down');}
        dirTxt.textContent=dir;
        showState('result');
    }
}

/* ============== Init ============== */
restore();
