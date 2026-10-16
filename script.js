(() => {
  'use strict';
  const $ = (selector, root = document) => root.querySelector(selector);
  const $$ = (selector, root = document) => Array.from(root.querySelectorAll(selector));
  const state = { model: 1, finish: 'silver', view: 'store', currency: 'AUD' };
  const FX = { AUD: 1, USD: 0.6948, EUR: 0.6183, GBP: 0.5219, NZD: 1.2297, CAD: 0.9847 };
  const CURRENCY_INFO = { AUD: { locale:'en-AU', symbol:'A$', name:'Australian dollar' }, USD:{locale:'en-US',symbol:'US$',name:'US dollar'}, EUR:{locale:'de-DE',symbol:'€',name:'euro'}, GBP:{locale:'en-GB',symbol:'£',name:'pound sterling'}, NZD:{locale:'en-NZ',symbol:'NZ$',name:'New Zealand dollar'}, CAD:{locale:'en-CA',symbol:'CA$',name:'Canadian dollar'} };
  const models = [
    {id:1,name:'ArchBook One',tag:'Everyday essential',price:599,display:'14-inch · FHD IPS · 60 Hz',processor:'ArchBook Core · 4-core',memory:'8 GB',storage:'256 GB SSD',colors:[['silver','Silver','#e7e9ed','#bfc4cd'],['graphite','Graphite','#777b84','#41454d'],['ocean','Ocean blue','#8aa5c7','#3d5d85']]},
    {id:2,name:'ArchBook Two',tag:'More room to move',price:899,display:'14-inch · 2.5K IPS · 90 Hz',processor:'ArchBook Core · 8-core',memory:'16 GB',storage:'512 GB SSD',colors:[['silver','Silver','#e7e9ed','#bfc4cd'],['graphite','Graphite','#777b84','#41454d'],['ocean','Ocean blue','#8aa5c7','#3d5d85'],['forest','Forest green','#7e9d8b','#365f4c'],['sand','Champagne sand','#dfc9a6','#9c7d54']]},
    {id:3,name:'ArchBook Three',tag:'A sharper everyday',price:1299,display:'14-inch · 2.8K OLED · 120 Hz',processor:'ArchBook Core · 8-core',memory:'16 GB',storage:'512 GB SSD',colors:[['silver','Silver','#e7e9ed','#bfc4cd'],['graphite','Graphite','#777b84','#41454d'],['ocean','Ocean blue','#8aa5c7','#3d5d85'],['forest','Forest green','#7e9d8b','#365f4c'],['violet','Violet mist','#b1a4d3','#665583'],['rose','Rose copper','#d8a7a0','#925d5b']]},
    {id:4,name:'ArchBook Four',tag:'Built for bigger days',price:1799,display:'16-inch · 3.2K OLED · 120 Hz',processor:'ArchBook Core Pro · 12-core',memory:'32 GB',storage:'1 TB SSD',colors:[['silver','Silver','#e7e9ed','#bfc4cd'],['graphite','Graphite','#777b84','#41454d'],['ocean','Ocean blue','#8aa5c7','#3d5d85'],['forest','Forest green','#7e9d8b','#365f4c'],['violet','Violet mist','#b1a4d3','#665583'],['rose','Rose copper','#d8a7a0','#925d5b'],['red','Ember red','#c96e68','#773b3c'],['ice','Glacier','#dcebf2','#91b5c7']]},
    {id:5,name:'ArchBook Five',tag:'Studio-level freedom',price:2399,display:'16-inch · 3.2K OLED · 120 Hz',processor:'ArchBook Core Pro · 12-core',memory:'32 GB',storage:'1 TB SSD',colors:[['silver','Silver','#e7e9ed','#bfc4cd'],['graphite','Graphite','#777b84','#41454d'],['ocean','Ocean blue','#8aa5c7','#3d5d85'],['forest','Forest green','#7e9d8b','#365f4c'],['violet','Violet mist','#b1a4d3','#665583'],['rose','Rose copper','#d8a7a0','#925d5b'],['red','Ember red','#c96e68','#773b3c'],['ice','Glacier','#dcebf2','#91b5c7'],['gold','Solar gold','#e5c76d','#947334'],['teal','Deep teal','#6aa7a4','#2f6564']]},
    {id:6,name:'ArchBook Six',tag:'The most configurable',price:3299,display:'16-inch · 3.2K OLED · 165 Hz',processor:'ArchBook Core Max · 16-core',memory:'64 GB',storage:'2 TB SSD',colors:[['silver','Silver','#e7e9ed','#bfc4cd'],['graphite','Graphite','#777b84','#41454d'],['ocean','Ocean blue','#8aa5c7','#3d5d85'],['forest','Forest green','#7e9d8b','#365f4c'],['violet','Violet mist','#b1a4d3','#665583'],['rose','Rose copper','#d8a7a0','#925d5b'],['red','Ember red','#c96e68','#773b3c'],['ice','Glacier','#dcebf2','#91b5c7'],['gold','Solar gold','#e5c76d','#947334'],['teal','Deep teal','#6aa7a4','#2f6564'],['black','Obsidian black','#55565a','#202125'],['lilac','Lilac dusk','#c8b9dc','#79648f']]}
  ];
  const specOptions = {
    display: [
      [{value:'fhd',label:'14-inch · FHD IPS · 60 Hz',cost:0},{value:'qhd14',label:'14-inch · 2.5K IPS · 90 Hz',cost:100}],
      [{value:'qhd14',label:'14-inch · 2.5K IPS · 90 Hz',cost:0},{value:'fhd',label:'14-inch · FHD IPS · 60 Hz',cost:-80},{value:'qhd16',label:'16-inch · 2.5K IPS · 90 Hz',cost:80}],
      [{value:'oled14',label:'14-inch · 2.8K OLED · 120 Hz',cost:0},{value:'oled16',label:'16-inch · 3.0K OLED · 120 Hz',cost:180}],
      [{value:'oled16',label:'16-inch · 3.2K OLED · 120 Hz',cost:0},{value:'oled14',label:'14-inch · 2.8K OLED · 120 Hz',cost:-180}],
      [{value:'oled16',label:'16-inch · 3.2K OLED · 120 Hz',cost:0},{value:'oled165',label:'16-inch · 3.2K OLED · 165 Hz',cost:200}],
      [{value:'oled165',label:'16-inch · 3.2K OLED · 165 Hz',cost:0},{value:'oled16',label:'16-inch · 3.2K OLED · 120 Hz',cost:-200},{value:'oled14',label:'14-inch · 2.8K OLED · 120 Hz',cost:-180},{value:'touch',label:'16-inch · 3.2K OLED touch · 165 Hz',cost:350}]
    ],
    processor: [
      [{value:'core4',label:'ArchBook Core · 4-core',cost:0}],
      [{value:'core8',label:'ArchBook Core · 8-core',cost:0},{value:'core4',label:'ArchBook Core · 4-core',cost:-130}],
      [{value:'core8',label:'ArchBook Core · 8-core',cost:0},{value:'core12',label:'ArchBook Core Pro · 12-core',cost:220}],
      [{value:'core12',label:'ArchBook Core Pro · 12-core',cost:0},{value:'core8',label:'ArchBook Core · 8-core',cost:-220}],
      [{value:'core12',label:'ArchBook Core Pro · 12-core',cost:0},{value:'core16',label:'ArchBook Core Max · 16-core',cost:300}],
      [{value:'core16',label:'ArchBook Core Max · 16-core',cost:0},{value:'core12',label:'ArchBook Core Pro · 12-core',cost:-300},{value:'core24',label:'ArchBook Core Ultra · 24-core',cost:450}]
    ],
    memory: [
      [{value:'8',label:'8 GB',cost:0},{value:'16',label:'16 GB',cost:80}],
      [{value:'16',label:'16 GB',cost:0},{value:'32',label:'32 GB',cost:140}],
      [{value:'16',label:'16 GB',cost:0},{value:'32',label:'32 GB',cost:140}],
      [{value:'32',label:'32 GB',cost:0},{value:'16',label:'16 GB',cost:-120},{value:'64',label:'64 GB',cost:260}],
      [{value:'32',label:'32 GB',cost:0},{value:'64',label:'64 GB',cost:260}],
      [{value:'64',label:'64 GB',cost:0},{value:'32',label:'32 GB',cost:-260},{value:'96',label:'96 GB',cost:420}]
    ],
    storage: [
      [{value:'256',label:'256 GB SSD',cost:0},{value:'512',label:'512 GB SSD',cost:70}],
      [{value:'512',label:'512 GB SSD',cost:0},{value:'1024',label:'1 TB SSD',cost:100}],
      [{value:'512',label:'512 GB SSD',cost:0},{value:'1024',label:'1 TB SSD',cost:100},{value:'2048',label:'2 TB SSD',cost:240}],
      [{value:'1024',label:'1 TB SSD',cost:0},{value:'2048',label:'2 TB SSD',cost:140},{value:'4096',label:'4 TB SSD',cost:400}],
      [{value:'1024',label:'1 TB SSD',cost:0},{value:'2048',label:'2 TB SSD',cost:140},{value:'4096',label:'4 TB SSD',cost:400}],
      [{value:'2048',label:'2 TB SSD',cost:0},{value:'1024',label:'1 TB SSD',cost:-140},{value:'4096',label:'4 TB SSD',cost:250},{value:'8192',label:'8 TB SSD',cost:700}]
    ]
  };
  const distros = [{"name": "Arch Linux", "status": "Current / upstream"}, {"name": "Ryoku", "status": "Current project"}, {"name": "Nyarch Linux", "status": "Current project"}, {"name": "EndeavourOS", "status": "Current project"}, {"name": "Garuda Linux", "status": "Current project"}, {"name": "CachyOS", "status": "Current project"}, {"name": "Manjaro Linux", "status": "Current project"}, {"name": "Artix Linux", "status": "Current project"}, {"name": "Archcraft", "status": "Current project"}, {"name": "RebornOS", "status": "Current project"}, {"name": "ArchBang", "status": "ArchWiki listed"}, {"name": "ArchEX", "status": "ArchWiki listed"}, {"name": "Archman", "status": "ArchWiki listed"}, {"name": "Arch Linux 32", "status": "Specialist / architecture-specific"}, {"name": "Arch Linux ARM", "status": "Specialist / ARM devices"}, {"name": "BlackArch Linux", "status": "Specialist / security-focused"}, {"name": "Bluestar Linux", "status": "ArchWiki listed"}, {"name": "ChimeraOS", "status": "Specialist / gaming"}, {"name": "Ctlos Linux", "status": "ArchWiki listed"}, {"name": "Crystal Linux", "status": "ArchWiki listed"}, {"name": "Hyperbola GNU/Linux-libre", "status": "Specialist / libre"}, {"name": "instantOS", "status": "ArchWiki listed"}, {"name": "Obarun", "status": "Arch-based / alternative init"}, {"name": "Parabola GNU/Linux-libre", "status": "Arch-based / libre"}, {"name": "Parch Linux", "status": "ArchWiki listed"}, {"name": "Snal Linux", "status": "ArchWiki listed"}, {"name": "SteamOS 3", "status": "Specialist / gaming hardware"}, {"name": "SystemRescue", "status": "Specialist / rescue"}, {"name": "TeArch Linux", "status": "ArchWiki listed"}, {"name": "UBOS Linux", "status": "ArchWiki listed"}, {"name": "Zenned", "status": "ArchWiki listed"}, {"name": "ArcoLinux", "status": "Historical / inactive"}, {"name": "ArchStrike", "status": "Historical / inactive"}, {"name": "ArchLabs", "status": "Historical / inactive"}, {"name": "Anarchy Linux", "status": "Historical / inactive"}, {"name": "Ninja OS", "status": "Historical / inactive"}, {"name": "PuppyRus-A", "status": "Historical / inactive"}, {"name": "Chakra Linux", "status": "Historical / inactive"}, {"name": "CyberOS", "status": "Historical / inactive"}, {"name": "TalkingArch", "status": "Historical / deprecated"}, {"name": "Arch XFerience", "status": "Historical / inactive"}, {"name": "RaspArch", "status": "Specialist / ARM devices"}, {"name": "Antergos", "status": "Historical / inactive"}, {"name": "BlueLight Linux", "status": "Historical / inactive"}, {"name": "BBQLinux", "status": "Historical / inactive"}, {"name": "LinHES", "status": "Historical / inactive"}, {"name": "MagpieOS", "status": "Historical / inactive"}, {"name": "Netrunner Rolling", "status": "Historical / inactive"}, {"name": "SwagArch", "status": "Historical / inactive"}, {"name": "Alfheim Linux", "status": "Historical / inactive"}, {"name": "Archphile", "status": "Historical / inactive"}, {"name": "MorpheusArch", "status": "Historical / inactive"}, {"name": "TeLiSc OS", "status": "Historical / inactive"}, {"name": "ALOBE", "status": "Historical / inactive"}, {"name": "ArchBox", "status": "Historical / inactive"}, {"name": "Arch Linux WSL Edition", "status": "Specialist / WSL"}, {"name": "Aseman OS", "status": "Historical / inactive"}, {"name": "Astian OS", "status": "Historical / inactive"}, {"name": "Audiophile Linux", "status": "Specialist / audio"}, {"name": "Feliz Linux", "status": "Historical / inactive"}, {"name": "Nurunner Linux", "status": "Historical / inactive"}, {"name": "Sonar Linux", "status": "Historical / inactive"}, {"name": "alphaOS", "status": "Historical / inactive"}, {"name": "Apricity OS", "status": "Historical / inactive"}, {"name": "Arch i3Nemesis", "status": "Historical / inactive"}, {"name": "Architect Linux", "status": "Historical / inactive"}, {"name": "archodi", "status": "Historical / inactive"}, {"name": "arkOS", "status": "Historical / inactive"}, {"name": "Arquetype CRT", "status": "Historical / inactive"}, {"name": "DidJiX", "status": "Historical / inactive"}, {"name": "niixarch", "status": "Historical / inactive"}, {"name": "PacBang", "status": "Historical / inactive"}, {"name": "VeltOS", "status": "Historical / inactive"}, {"name": "ArBer Linux", "status": "Historical / inactive"}, {"name": "Bridge Linux", "status": "Historical / inactive"}, {"name": "justbrowsing", "status": "Historical / inactive"}, {"name": "Kademar", "status": "Historical / inactive"}, {"name": "mooOS", "status": "Historical / inactive"}, {"name": "PoliArch", "status": "Specialist / rescue"}, {"name": "Tux Hat Linux", "status": "Historical / inactive"}, {"name": "Arch Linux MIPS", "status": "Specialist / MIPS"}, {"name": "Arch Linux PPC", "status": "Specialist / PowerPC"}, {"name": "ArchServer", "status": "Historical / inactive"}, {"name": "CDN Linux", "status": "Historical / inactive"}, {"name": "ConnochaetOS", "status": "Historical / inactive"}, {"name": "Kahel OS", "status": "Historical / inactive"}, {"name": "LDR Linux", "status": "Historical / inactive"}, {"name": "Nosonja", "status": "Historical / inactive"}, {"name": "SadOS", "status": "Historical / inactive"}, {"name": "San Francisco Linux", "status": "Historical / inactive"}, {"name": "Archlive", "status": "Historical / inactive"}, {"name": "CTKArch", "status": "Historical / inactive"}, {"name": "LinuX-gamers", "status": "Historical / inactive"}, {"name": "AmeOS", "status": "Historical / inactive"}, {"name": "ArchOne", "status": "Historical / inactive"}, {"name": "ArchPwn", "status": "Historical / inactive"}, {"name": "Elegance Linux", "status": "Historical / inactive"}, {"name": "UKnow4Kids", "status": "Historical / inactive"}, {"name": "Uzume Linux", "status": "Historical / inactive"}, {"name": "archlive-i586", "status": "Historical / inactive"}, {"name": "Chaox", "status": "Historical / inactive"}, {"name": "Enlisy", "status": "Historical / inactive"}, {"name": "Firefly Linux", "status": "Historical / inactive"}, {"name": "Maryan Linux 2", "status": "Historical / inactive"}, {"name": "Arch Linux Modified", "status": "Historical / inactive"}, {"name": "FaunOS", "status": "Historical / inactive"}, {"name": "Shift Linux", "status": "Historical / inactive"}, {"name": "uArch", "status": "Historical / inactive"}, {"name": "Archie Linux", "status": "Historical / inactive"}, {"name": "Underground Desktop", "status": "Historical / inactive"}, {"name": "Aegis Linux", "status": "Historical / inactive"}, {"name": "Lowarch", "status": "Historical / inactive"}, {"name": "Minimax", "status": "Historical / inactive"}, {"name": "Arch Linux Embedded", "status": "Specialist / embedded"}, {"name": "Arch Linux GUI (ALG)", "status": "Community installer / verify current status"}, {"name": "Kiro Linux", "status": "Arch-based project / verify current status"}, {"name": "Archboot", "status": "Installer/rescue environment, not a standard desktop distro"}, {"name": "Mabox Linux", "status": "Related rolling distro; verify base"}, {"name": "Arch Linux GUI KDE edition", "status": "Community spin / verify current status"}, {"name": "Arch Linux GUI GNOME edition", "status": "Community spin / verify current status"}, {"name": "Arch Linux GUI Xfce edition", "status": "Community spin / verify current status"}, {"name": "Arch Linux GUI Cinnamon edition", "status": "Community spin / verify current status"}, {"name": "Arch Linux GUI Budgie edition", "status": "Community spin / verify current status"}, {"name": "Arch Linux GUI MATE edition", "status": "Community spin / verify current status"}, {"name": "Arch Linux GUI LXQt edition", "status": "Community spin / verify current status"}, {"name": "Arch Linux GUI Deepin edition", "status": "Community spin / verify current status"}, {"name": "Arch Linux GUI Awesome edition", "status": "Community spin / verify current status"}, {"name": "Arch Linux GUI i3 edition", "status": "Community spin / verify current status"}, {"name": "Other Arch-based distribution — enter name", "status": "Custom entry / verify Arch base"}];
  const desktopNames = { default: 'Distribution default', kde: 'KDE Plasma', gnome: 'GNOME', hyprland: 'Hyprland', niri: 'niri', xfce: 'Xfce', cinnamon:'Cinnamon', lxqt:'LXQt', mate:'MATE', budgie:'Budgie', sway:'Sway', i3:'i3', awesome:'AwesomeWM', bspwm:'bspwm', openbox:'Openbox' };
  const finishClass = () => '';
  const model = () => models[state.model - 1];
  const selectedFinish = () => model().colors.find(c => c[0] === state.finish) || model().colors[0];
  const finishGradient = (finish=selectedFinish()) => `linear-gradient(125deg,${finish[2]} 0%,${finish[3]} 52%,${finish[2]} 100%)`;
  const formatMoney = amount => `${CURRENCY_INFO[state.currency].symbol}${new Intl.NumberFormat(CURRENCY_INFO[state.currency].locale, { minimumFractionDigits: state.currency==='AUD' ? 0 : 2, maximumFractionDigits:2 }).format(amount * FX[state.currency])}`;
  const formatBase = amount => new Intl.NumberFormat('en-AU',{style:'currency',currency:'AUD',maximumFractionDigits:0}).format(amount);
  function fillSelect(id, options, preserve=true) {
    const el = $('#'+id); const previous = preserve ? el.value : '';
    el.innerHTML = options.map(o=>`<option value="${o.value}" data-cost="${o.cost || 0}">${o.label}${o.cost > 0 ? ` (+${formatBase(o.cost)})` : o.cost < 0 ? ` (−${formatBase(Math.abs(o.cost))})` : ''}</option>`).join('');
    if (options.some(o=>o.value===previous)) el.value=previous;
    else el.selectedIndex=0;
  }
  function setupHardwareOptions(preserve=true) {
    const index=state.model-1;
    Object.keys(specOptions).forEach(key=>fillSelect(key,specOptions[key][index],preserve));
  }
  function getOption(id) { const el=$('#'+id); return el.options[el.selectedIndex]; }
  function selectedConfiguration() {
    const m=model(), finish=selectedFinish();
    const options={display:getOption('display'),processor:getOption('processor'),memory:getOption('memory'),storage:getOption('storage')};
    const costs=Object.values(options).reduce((sum,opt)=>sum+Number(opt.dataset.cost||0),0);
    const distroOption=getOption('distro');
    const distroName=distroOption?.dataset.name || distroOption?.textContent || 'Arch Linux';
    const distroStatus=distroOption?.dataset.status || '';
    const customDistro=$('#custom-distro').value.trim();
    return { model:m, finish:finish[0], finishName:finish[1], finishGradient:finishGradient(finish), display:options.display.value, displayName:options.display.textContent.replace(/\s+\([+−-].*\)$/,''), processor:options.processor.value, processorName:options.processor.textContent.replace(/\s+\([+−-].*\)$/,''), memory:options.memory.value, memoryName:options.memory.textContent.replace(/\s+\([+−-].*\)$/,''), storage:options.storage.value, storageName:options.storage.textContent.replace(/\s+\([+−-].*\)$/,''), distro:distroName==='Other Arch-based distribution — enter name'?(customDistro||distroName):distroName, distroStatus, desktop:$('#desktop').value, desktopName:desktopNames[$('#desktop').value]||'Distribution default', amount:m.price+costs };
  }
  function renderModelCards() {
    $('#model-grid').innerHTML=models.map(m=>`<button type="button" class="model-choice ${m.id===state.model?'selected':''}" data-model="${m.id}" role="radio" aria-checked="${m.id===state.model}" aria-label="Choose ${m.name}"><span class="model-choice-art" style="--device-a:${m.colors[0][2]};--device-b:${m.colors[0][3]}"><span class="model-choice-mark"><img class="arch-card-symbol" src="archlinux-mark-white.svg" alt="" aria-hidden="true"></span></span><span class="model-choice-info"><strong>${m.name}</strong><small>${m.tag}</small><b>${formatMoney(m.price)} ${state.currency}</b></span><span class="model-choice-index">0${m.id}</span></button>`).join('');
    $('#range-grid').innerHTML=models.map(m=>`<article class="range-card ${m.id===state.model?'active':''}"><div class="range-card-top"><span>ARCHBOOK · 0${m.id}</span><span>${m.id===6?'FLAGSHIP':m.id===1?'ESSENTIAL':`SERIES 0${m.id}`}</span></div><div class="range-device" style="--device-a:${m.colors[0][2]};--device-b:${m.colors[0][3]}"><span class="range-device-mark"><img class="arch-card-symbol" src="archlinux-mark-white.svg" alt="" aria-hidden="true"></span></div><div class="range-card-copy"><p>${m.tag}</p><h3>${m.name}</h3><span class="range-price">From ${formatMoney(m.price)} ${state.currency}</span><button type="button" class="range-select" data-select-model="${m.id}">${m.id===state.model?'Selected':'Configure'} <span>→</span></button></div></article>`).join('');
  }
  function renderFinishes() {
    const m=model();
    $('#finish-description').textContent=`${m.colors.length} finishes available on ${m.name}.`;
    $('#finish-options').innerHTML=m.colors.map(c=>`<button class="finish-option ${c[0]===state.finish?'selected':''}" type="button" data-finish="${c[0]}" role="radio" aria-checked="${c[0]===state.finish}" aria-label="${c[1]} finish"><span class="finish-swatch" style="background:linear-gradient(135deg,${c[2]},${c[3]})"></span><span>${c[1]}</span></button>`).join('');
  }
  function fillSpecList(target, config) {
    const entries=[['Display',config.displayName],['Processor',config.processorName],['Memory',config.memoryName],['Storage',config.storageName],['Operating system',config.distro],['Desktop preference',config.desktopName]];
    target.innerHTML=entries.map(([label,value])=>`<div class="${target.classList.contains('checkout-specs')?'spec-item':''}"><span>${label}</span><strong>${escapeHtml(value)}</strong></div>`).join('');
  }
  function escapeHtml(s) { return String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c])); }
  function updateCurrencyControls() { $$('[data-currency]').forEach(el=>el.value=state.currency); }
  function updateSummary() {
    const c=selectedConfiguration(), m=c.model;
    $('#live-price').textContent=formatMoney(c.amount);
    $('#summary-variant').textContent=`${c.displayName} · ${c.finishName}`;
    $('#summary-model-name').textContent=m.name;
    $('#summary-model-kicker').textContent=`ARCHBOOK 0${m.id}`;
    $('.summary-mark').textContent=`AB·0${m.id}`;
    $('#live-specs').innerHTML=[['Processor',c.processorName],['Memory',c.memoryName],['Storage',c.storageName],['Linux',c.distro]].map(([label,value])=>`<div><span>${label}</span><strong>${escapeHtml(value)}</strong></div>`).join('');
    const surfaces=[['#hero-laptop',c.finishGradient],['#config-device',c.finishGradient],['#checkout-laptop',c.finishGradient],['#order-mini-device',c.finishGradient],['#success-device',c.finishGradient]];
    surfaces.forEach(([sel,bg])=>{const el=$(sel);if(el)el.style.background=bg;});
    $('#hero-model-index').innerHTML=`AB—0${m.id} <span>·</span> PRODUCT STUDY`;
    $('#checkout-model-name').textContent=m.name;
    $('#checkout-header-model').textContent=m.name;
    $('#checkout-model-badge').textContent=`AB—0${m.id}`;
    $('#checkout-price').textContent=formatMoney(c.amount);
    $('#checkout-total').textContent=formatMoney(c.amount);
    $('#checkout-specs').innerHTML=[['Model',m.name],['Finish',c.finishName],['Display',c.displayName],['Processor',c.processorName],['Memory',c.memoryName],['Storage',c.storageName],['Operating system',c.distro],['Desktop preference',c.desktopName]].map(([label,value])=>`<div class="spec-item"><span>${label}</span><strong>${escapeHtml(value)}</strong></div>`).join('');
    $('#order-model-name').textContent=m.name;
    $('#order-model-kicker').textContent=`ARCHBOOK 0${m.id}`;
    $('#order-model-badge').textContent=`AB—0${m.id}`;
    $('#order-device-desc').textContent=`${c.displayName} · ${c.finishName}`;
    $('#order-price').textContent=formatMoney(c.amount);
    $('#order-config-list').innerHTML=[['Model',m.name],['Finish',c.finishName],['Display',c.displayName],['Processor',c.processorName],['Memory',c.memoryName],['Storage',c.storageName],['Operating system',c.distro],['Desktop preference',c.desktopName],['Estimated total',`${formatMoney(c.amount)} (${formatBase(c.amount)} AUD base)`]].map(([label,value])=>`<div><span>${label}</span><strong>${escapeHtml(value)}</strong></div>`).join('');
    $('#order-message-text').value=['Hello ArchBook team,','',`I would like to proceed with an order enquiry for this ${m.name} configuration:`,'',`Model: ${m.name}`,`Base price: ${formatBase(m.price)} AUD`,`Finish: ${c.finishName}`,`Display: ${c.displayName}`,`Processor: ${c.processorName}`,`Memory: ${c.memoryName}`,`Storage: ${c.storageName}`,`Operating system: ${c.distro}`,`Desktop preference: ${c.desktopName}`,`Estimated configuration total: ${formatBase(c.amount)} AUD`,`Indicative converted total: ${formatMoney(c.amount)} (${state.currency}; FX snapshot 16 Oct 2026)`,'','Please confirm availability, final pricing, shipping, payment options and next steps.','','Thank you.'].join('\n');
    $('#success-model-name').textContent=m.name;
    $('#success-model-badge').textContent=`AB—0${m.id}`;
    $('#success-model-details').textContent=`${c.displayName} · ${c.finishName} · ${c.distro}`;
    $('#success-model-price').textContent=formatMoney(c.amount);
    $('#email-configuration').href=`mailto:orders.archbook@outlook.com?subject=${encodeURIComponent(`ArchBook purchase enquiry — ${m.name}`)}&body=${encodeURIComponent($('#order-message-text').value)}`;
    $$('.model-choice').forEach(el=>{const active=Number(el.dataset.model)===state.model;el.classList.toggle('selected',active);el.setAttribute('aria-checked',String(active));});
    $$('.range-card').forEach(el=>el.classList.toggle('active',el.querySelector('[data-select-model]')?.dataset.selectModel==state.model));
    updateCurrencyControls();
  }
  function chooseModel(id) {
    state.model=Number(id); const m=model();
    if(!m.colors.some(c=>c[0]===state.finish)) state.finish=m.colors[0][0];
    setupHardwareOptions(false); renderModelCards(); renderFinishes(); updateSummary();
  }
  function showView(which) {
    state.view=which;
    $('#store-view').classList.toggle('hidden',which!=='store');$('#checkout-view').classList.toggle('hidden',which!=='checkout');$('#order-view').classList.toggle('hidden',which!=='order');$('#purchase-success-view').classList.toggle('hidden',which!=='success');
    document.body.classList.toggle('checkout-active',which!=='store');
    const hashes={store:'#home',checkout:'#checkout',order:'#order',success:'#purchase-complete'};if(location.hash!==hashes[which])history.replaceState(null,'',hashes[which]);
    window.scrollTo({top:0,behavior:'smooth'});$('.site-nav').classList.remove('menu-open');$('.menu-toggle').setAttribute('aria-expanded','false');$('.menu-toggle').setAttribute('aria-label','Open navigation');updateSummary();
  }
  function buildDistroSelect(filter='') {
    const select=$('#distro'); const previous=select.value;
    const filtered=distros.filter(d=>(d.name+' '+d.status).toLowerCase().includes(filter.toLowerCase()));
    select.innerHTML=filtered.map(d=>`<option value="${escapeHtml(d.name)}" data-name="${escapeHtml(d.name)}" data-status="${escapeHtml(d.status)}">${escapeHtml(d.name)} — ${escapeHtml(d.status)}</option>`).join('');
    if(filtered.some(d=>d.name===previous)) select.value=previous;
    else if(filtered.some(d=>d.name==='Arch Linux')) select.value='Arch Linux';
    updateSummary();
  }
  function updateDistroFields() { $('#custom-distro-wrap').classList.toggle('hidden',$('#distro').value!=='Other Arch-based distribution — enter name');updateSummary(); }
  $$('#model-grid').forEach(()=>{});
  $('#model-grid').addEventListener('click',e=>{const b=e.target.closest('[data-model]');if(b)chooseModel(b.dataset.model);});
  $('#range-grid').addEventListener('click',e=>{const b=e.target.closest('[data-select-model]');if(b){chooseModel(b.dataset.selectModel);$('#configure').scrollIntoView({behavior:'smooth'});}});
  $('#finish-options').addEventListener('click',e=>{const b=e.target.closest('[data-finish]');if(!b)return;state.finish=b.dataset.finish;renderFinishes();updateSummary();});
  ['#display','#processor','#memory','#storage','#desktop'].forEach(sel=>$(sel).addEventListener('change',updateSummary));
  $('#distro').addEventListener('change',updateDistroFields);$('#custom-distro').addEventListener('input',updateSummary);
  $('#distro-search').addEventListener('input',e=>buildDistroSelect(e.target.value));
  $$('[data-currency]').forEach(el=>el.addEventListener('change',()=>{state.currency=el.value;renderModelCards();updateSummary();}));
  $$('[data-scroll]').forEach(link=>link.addEventListener('click',event=>{event.preventDefault();if(state.view!=='store')showView('store');const target=document.getElementById(link.dataset.scroll);setTimeout(()=>target?.scrollIntoView({behavior:'smooth',block:'start'}),25);}));
  $$('[data-home]').forEach(link=>link.addEventListener('click',event=>{event.preventDefault();showView('store');setTimeout(()=>window.scrollTo({top:0,behavior:'smooth'}),20);}));
  $('#proceed-button').addEventListener('click',()=>{updateSummary();$('#discount-panel').classList.add('hidden');$('#discount-toggle').setAttribute('aria-expanded','false');$('.discount-chevron').textContent='＋';$('#discount-feedback').textContent='Have a code? Enter it here.';$('#discount-feedback').className='discount-feedback';$('#discount-code').value='';showView('checkout');});
  $('#back-to-config').addEventListener('click',event=>{event.preventDefault();showView('store');setTimeout(()=>$('#configure').scrollIntoView({behavior:'smooth'}),25);});
  $('#discount-toggle').addEventListener('click',()=>{const open=$('#discount-panel').classList.toggle('hidden')===false;$('#discount-toggle').setAttribute('aria-expanded',String(open));$('.discount-chevron').textContent=open?'−':'＋';if(open)$('#discount-code').focus();});
  function redeemCode(){const input=$('#discount-code'),feedback=$('#discount-feedback');if(input.value.trim().toUpperCase()==='DHBXBC'){feedback.textContent='Code accepted. Your configuration details are ready.';feedback.className='discount-feedback success';updateSummary();showView('order');}else{feedback.textContent='That code was not recognised. Check the code and try again.';feedback.className='discount-feedback error';input.focus();}}
  $('#apply-code').addEventListener('click',redeemCode);$('#discount-code').addEventListener('keydown',e=>{if(e.key==='Enter')redeemCode();});
  async function copyText(value){try{if(navigator.clipboard&&window.isSecureContext)await navigator.clipboard.writeText(value);else{const helper=document.createElement('textarea');helper.value=value;helper.style.position='fixed';helper.style.opacity='0';document.body.appendChild(helper);helper.select();const success=document.execCommand('copy');helper.remove();if(!success)throw new Error('Clipboard unavailable');}return true;}catch(_){return false;}}
  $('#copy-order').addEventListener('click',async()=>{const ok=await copyText($('#order-message-text').value);$('#copy-status').textContent=ok?'Configuration copied. Paste it into your email.':'Select the text above and copy it to your clipboard.';});
  $('#copy-email').addEventListener('click',async()=>{const ok=await copyText($('#company-email').textContent.trim());$('#copy-status').textContent=ok?'Company email copied.':'Select the email address above and copy it.';});
  $('#purchase-request').addEventListener('click',()=>{updateSummary();showView('success');});
  $('#success-back').addEventListener('click',()=>showView('order'));
  $('#start-again').addEventListener('click',()=>{showView('store');setTimeout(()=>window.scrollTo({top:0,behavior:'smooth'}),25);});
  $('.menu-toggle').addEventListener('click',()=>{const open=$('.site-nav').classList.toggle('menu-open');$('.menu-toggle').setAttribute('aria-expanded',String(open));$('.menu-toggle').setAttribute('aria-label',open?'Close navigation':'Open navigation');});
  const initialHash=location.hash;
  setupHardwareOptions(false);buildDistroSelect();renderModelCards();renderFinishes();updateSummary();
  if(initialHash==='#checkout')showView('checkout');else if(initialHash==='#order')showView('order');else if(initialHash==='#purchase-complete')showView('success');else showView('store');
})();