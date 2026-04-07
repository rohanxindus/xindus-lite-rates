const fs = require('fs');
const original = fs.readFileSync('index.html', 'utf8');
const lines = original.split('\n');
const ZONE_MAP_LINE = lines[603]; // exact 84KB ZONE_MAP line

const part1 = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8"/>
<meta name="viewport" content="width=device-width,initial-scale=1.0"/>
<title>Xindus - Canada Rate Calculator</title>
<link rel="icon" type="image/svg+xml" href="logo1.svg">
<link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&family=JetBrains+Mono:wght@400;500;600&display=swap" rel="stylesheet"/>
<style>
:root {
  --blue-deep:   #0A3D8F; --blue-mid: #1565C0; --blue-bright: #1E88E5;
  --red: #D32F2F; --gold: #F59E0B; --gold-bright: #FBBF24;
  --white: #FFFFFF; --snow: #F5F9FF; --ink: #0D1B3E;
  --ink-70: rgba(13,27,62,.7); --ink-40: rgba(13,27,62,.4); --ink-10: rgba(13,27,62,.08);
  --border: #D1DCF0; --r8: 8px; --r12: 12px; --r16: 16px; --r24: 24px;
  --shadow-sm: 0 2px 8px rgba(10,61,143,.12); --shadow-md: 0 6px 24px rgba(10,61,143,.16);
  --shadow-xl: 0 32px 80px rgba(10,61,143,.28); --ease: cubic-bezier(.4,0,.2,1);
  --mono: 'JetBrains Mono', monospace; --sans: 'Plus Jakarta Sans', sans-serif;
}
*,*::before,*::after{box-sizing:border-box;margin:0;padding:0;}
html{scroll-behavior:smooth;}
body{font-family:var(--sans);min-height:100vh;background:var(--blue-deep);overflow-x:hidden;}
.bg-layer{position:fixed;inset:0;pointer-events:none;z-index:0;overflow:hidden;}
.bg-layer::before{content:'';position:absolute;inset:0;background:radial-gradient(ellipse 800px 500px at 10% 15%,rgba(30,136,229,.3) 0%,transparent 60%),radial-gradient(ellipse 500px 400px at 90% 75%,rgba(211,47,47,.2) 0%,transparent 55%),radial-gradient(ellipse 600px 400px at 50% 95%,rgba(245,158,11,.12) 0%,transparent 60%),linear-gradient(160deg,#071E52 0%,#0A3D8F 45%,#071E52 100%);}
.bg-layer::after{content:'';position:absolute;inset:0;background-image:linear-gradient(rgba(255,255,255,.03) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.03) 1px,transparent 1px);background-size:56px 56px;mask-image:radial-gradient(ellipse 80% 80% at 50% 50%,black 0%,transparent 100%);}
.orb{position:fixed;border-radius:50%;filter:blur(72px);pointer-events:none;z-index:0;animation:orbDrift 12s ease-in-out infinite alternate;}
.orb-1{width:380px;height:380px;background:rgba(30,136,229,.2);top:-80px;right:4%;animation-duration:15s;}
.orb-2{width:280px;height:280px;background:rgba(211,47,47,.15);bottom:8%;left:2%;animation-duration:11s;animation-delay:-4s;}
.orb-3{width:220px;height:220px;background:rgba(245,158,11,.14);bottom:28%;right:8%;animation-duration:9s;animation-delay:-7s;}
@keyframes orbDrift{0%{transform:translate(0,0) scale(1);}50%{transform:translate(28px,-18px) scale(1.07);}100%{transform:translate(-14px,22px) scale(.94);}}
.page{position:relative;z-index:1;min-height:100vh;display:flex;flex-direction:column;align-items:center;padding:0 16px 60px;}
.header{width:100%;max-width:860px;padding:32px 0 0;display:flex;flex-direction:column;align-items:center;animation:slideDown .7s var(--ease) both;}
.logo-img{height:44px;width:auto;object-fit:contain;margin-bottom:14px;}
.header-badge{display:inline-flex;align-items:center;gap:8px;background:rgba(245,158,11,.15);border:1px solid rgba(245,158,11,.35);border-radius:24px;padding:7px 18px;font-size:12px;font-weight:600;color:var(--gold-bright);letter-spacing:.4px;margin-bottom:22px;backdrop-filter:blur(8px);}
.header-badge .dot{width:7px;height:7px;border-radius:50%;background:var(--gold);animation:pulse 2s ease-in-out infinite;}
@keyframes pulse{0%,100%{box-shadow:0 0 0 0 rgba(245,158,11,.7);}50%{box-shadow:0 0 0 6px rgba(245,158,11,0);}}
.header-title{font-size:clamp(26px,4vw,44px);font-weight:800;color:var(--white);letter-spacing:-1px;line-height:1.15;text-align:center;margin-bottom:10px;}
.header-title .accent{background:linear-gradient(90deg,var(--gold) 0%,var(--gold-bright) 50%,#FB923C 100%);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;}
.header-subtitle{font-size:14.5px;color:rgba(255,255,255,.5);text-align:center;margin-bottom:32px;}
.card{width:100%;max-width:820px;background:rgba(255,255,255,.97);border-radius:var(--r24);box-shadow:var(--shadow-xl),0 0 0 1px rgba(255,255,255,.15);overflow:hidden;animation:slideUp .75s .12s var(--ease) both;}
.card-bar{height:5px;background:linear-gradient(90deg,var(--blue-mid) 0%,var(--blue-bright) 30%,var(--red) 55%,#EF4444 72%,var(--gold) 85%,var(--gold-bright) 100%);}
.card-body{padding:44px 48px 48px;}
@media(max-width:620px){.card-body{padding:28px 22px 32px;}}
.section-label{font-size:10px;font-weight:800;letter-spacing:1.8px;text-transform:uppercase;color:var(--blue-mid);margin-bottom:18px;display:flex;align-items:center;gap:8px;}
.section-label::after{content:'';flex:1;height:1px;background:var(--ink-10);}
.form-row{display:grid;grid-template-columns:1fr 1fr;gap:20px;margin-bottom:20px;}
@media(max-width:580px){.form-row{grid-template-columns:1fr;}}
.field{display:flex;flex-direction:column;gap:6px;}
.field-label{font-size:11px;font-weight:700;letter-spacing:.9px;text-transform:uppercase;color:var(--ink-70);display:flex;align-items:center;gap:7px;}
.input-wrap{position:relative;}
.form-input{width:100%;padding:13px 16px 13px 44px;border:1.5px solid var(--border);border-radius:var(--r12);font-family:var(--sans);font-size:15px;font-weight:500;color:var(--ink);background:var(--snow);transition:all .2s var(--ease);outline:none;-webkit-appearance:none;appearance:none;}
.form-input:hover{border-color:#A8C0E8;background:#fff;}
.form-input:focus{border-color:var(--blue-bright);background:#fff;box-shadow:0 0 0 4px rgba(30,136,229,.12);}
.form-input.error{border-color:var(--red);box-shadow:0 0 0 4px rgba(211,47,47,.12);}
.form-input::placeholder{color:#A8BBCC;font-weight:400;}
.input-icon{position:absolute;left:14px;top:50%;transform:translateY(-50%);font-size:16px;pointer-events:none;}
.select-wrap{position:relative;}
.slab-select{width:100%;padding:13px 40px 13px 16px;border:1.5px solid var(--border);border-radius:var(--r12);font-family:var(--sans);font-size:14px;font-weight:500;color:var(--ink);background:var(--snow);transition:all .2s var(--ease);outline:none;cursor:pointer;-webkit-appearance:none;appearance:none;}
.slab-select:hover{border-color:#A8C0E8;background:#fff;}
.slab-select:focus{border-color:var(--blue-bright);background:#fff;box-shadow:0 0 0 4px rgba(30,136,229,.12);}
.slab-select.error{border-color:var(--red);box-shadow:0 0 0 4px rgba(211,47,47,.12);}
.select-chevron{position:absolute;right:14px;top:50%;transform:translateY(-50%);pointer-events:none;font-size:13px;color:var(--ink-40);}
.ac-wrap{position:relative;}
.ac-dropdown{position:absolute;top:calc(100% + 8px);left:0;right:0;background:#fff;border:1.5px solid rgba(30,136,229,.25);border-radius:var(--r12);box-shadow:var(--shadow-md);z-index:200;max-height:280px;overflow-y:auto;display:none;scrollbar-width:thin;scrollbar-color:var(--border) transparent;}
.ac-dropdown.open{display:block;animation:dropIn .18s var(--ease);}
@keyframes dropIn{from{opacity:0;transform:translateY(-8px);}to{opacity:1;transform:translateY(0);}}
.ac-item{padding:10px 16px;cursor:pointer;display:flex;align-items:center;justify-content:space-between;border-bottom:1px solid rgba(13,27,62,.05);transition:background .12s;}
.ac-item:last-child{border-bottom:none;}
.ac-item:hover,.ac-item.active{background:rgba(30,136,229,.07);}
.ac-code{font-family:var(--mono);font-size:14px;font-weight:600;color:var(--ink);}
.ac-prov{font-size:12px;color:var(--ink-40);margin-left:10px;}
.ac-zone-tag{font-family:var(--mono);font-size:10px;font-weight:700;background:var(--blue-deep);color:#fff;border-radius:5px;padding:2px 7px;}
.ac-empty{padding:16px;text-align:center;color:#9AA3AE;font-size:13px;}
.field-error{font-size:11.5px;color:var(--red);display:none;align-items:center;gap:5px;margin-top:4px;animation:shakeX .3s var(--ease);}
.field-error.show{display:flex;}
@keyframes shakeX{0%{transform:translateX(-6px);}35%{transform:translateX(5px);}65%{transform:translateX(-3px);}100%{transform:translateX(0);}}
.hint{font-size:11px;color:#9AAABB;margin-top:4px;}
.actions{display:flex;gap:12px;margin-top:24px;}
.btn-calc{flex:1;padding:16px 24px;background:linear-gradient(135deg,var(--blue-mid) 0%,var(--blue-deep) 100%);color:#fff;border:none;border-radius:var(--r12);font-family:var(--sans);font-size:15px;font-weight:700;cursor:pointer;position:relative;overflow:hidden;box-shadow:0 6px 20px rgba(10,61,143,.4);transition:all .22s var(--ease);}
.btn-calc::before{content:'';position:absolute;inset:0;background:linear-gradient(135deg,rgba(255,255,255,.15),transparent);opacity:0;transition:opacity .2s;}
.btn-calc:hover{transform:translateY(-2px);box-shadow:0 10px 30px rgba(10,61,143,.5);background:linear-gradient(135deg,var(--blue-bright) 0%,var(--blue-mid) 100%);}
.btn-calc:hover::before{opacity:1;}
.btn-calc:active{transform:translateY(0);}
.btn-calc:disabled{opacity:.65;cursor:not-allowed;transform:none;}
.btn-inner{display:flex;align-items:center;justify-content:center;gap:9px;}
.btn-reset{padding:16px 20px;background:transparent;color:var(--ink-70);border:1.5px solid var(--border);border-radius:var(--r12);font-family:var(--sans);font-size:14px;font-weight:600;cursor:pointer;transition:all .2s;white-space:nowrap;}
.btn-reset:hover{background:var(--snow);border-color:#A8C0E8;color:var(--ink);}
.btn-booking{display:block;width:100%;padding:16px 24px;margin-top:20px;background:linear-gradient(135deg,var(--blue-mid) 0%,var(--blue-deep) 100%);color:#fff;border:none;border-radius:var(--r12);font-family:var(--sans);font-size:15px;font-weight:700;cursor:pointer;position:relative;overflow:hidden;text-decoration:none;box-shadow:0 6px 20px rgba(10,61,143,.4);transition:all .22s var(--ease);text-align:center;}
.btn-booking::before{content:'';position:absolute;inset:0;background:linear-gradient(135deg,rgba(255,255,255,.15),transparent);opacity:0;transition:opacity .2s;}
.btn-booking:hover{transform:translateY(-2px);box-shadow:0 10px 30px rgba(10,61,143,.5);background:linear-gradient(135deg,var(--blue-bright) 0%,var(--blue-mid) 100%);}
.btn-booking:hover::before{opacity:1;}
.btn-booking:active{transform:translateY(0);}
.spinner{width:18px;height:18px;border:2.5px solid rgba(255,255,255,.3);border-top-color:#fff;border-radius:50%;animation:spin .65s linear infinite;}
@keyframes spin{to{transform:rotate(360deg);}}
.divider{border:none;border-top:1.5px dashed var(--border);margin:32px 0;}
.result{display:none;}
.result.show{display:block;animation:revealUp .4s var(--ease) both;}
@keyframes revealUp{from{opacity:0;transform:translateY(20px);}to{opacity:1;transform:translateY(0);}}
.result-header{display:flex;align-items:center;justify-content:space-between;margin-bottom:20px;}
.result-title{font-size:11px;font-weight:800;letter-spacing:1.5px;text-transform:uppercase;color:var(--ink);}
.btn-copy{width:34px;height:34px;border:1.5px solid var(--border);border-radius:var(--r8);background:transparent;cursor:pointer;display:flex;align-items:center;justify-content:center;font-size:14px;transition:all .18s;}
.btn-copy:hover{background:var(--snow);border-color:#A8C0E8;}
.btn-copy.copied{background:var(--blue-bright);color:#fff;border-color:var(--blue-bright);}
.chips{display:grid;grid-template-columns:repeat(3,1fr);gap:10px;margin-bottom:18px;}
@media(max-width:560px){.chips{grid-template-columns:1fr 1fr;}}
.chip{background:var(--snow);border:1.5px solid var(--border);border-radius:var(--r12);padding:12px 14px;transition:transform .2s,box-shadow .2s;}
.chip:hover{transform:translateY(-2px);box-shadow:var(--shadow-sm);}
.chip-label{font-size:9.5px;font-weight:700;letter-spacing:1.2px;text-transform:uppercase;color:#7A9ABB;margin-bottom:5px;}
.chip-val{font-size:14px;font-weight:700;color:var(--ink);font-family:var(--mono);}
.chip-val.red{color:var(--red);}.chip-val.blue{color:var(--blue-mid);}.chip-val.gold{color:var(--gold);}
.chip.wide{grid-column:span 2;}
.entry-pill{display:inline-flex;align-items:center;gap:6px;background:var(--blue-deep);color:#fff;padding:3px 10px;border-radius:6px;font-family:var(--mono);font-size:12px;font-weight:600;}
.pricing{background:var(--snow);border:1.5px solid var(--border);border-radius:var(--r16);overflow:hidden;}
.price-row{display:flex;justify-content:space-between;align-items:center;padding:15px 20px;border-bottom:1px solid #E8EEF8;transition:background .15s;}
.price-row:hover{background:rgba(30,136,229,.04);}
.price-label{display:flex;align-items:center;gap:10px;font-size:13px;color:var(--ink-70);font-weight:500;}
.price-label .dot{width:7px;height:7px;border-radius:50%;background:var(--blue-bright);flex-shrink:0;}
.price-label .dot.red{background:var(--red);}
.price-label .dot.gold{background:var(--gold);}
.price-label .dot.orange{background:#FB923C;}
.price-val{font-family:var(--mono);font-size:15px;font-weight:600;color:var(--ink);}
.price-total{display:flex;justify-content:space-between;align-items:center;padding:22px 24px;background:linear-gradient(135deg,var(--blue-deep) 0%,#0D3070 40%,#1A1A6E 100%);position:relative;overflow:hidden;}
.price-total::after{content:'';position:absolute;left:0;top:0;bottom:0;width:4px;background:linear-gradient(180deg,var(--gold) 0%,var(--gold-bright) 100%);}
.total-label{font-size:11px;font-weight:700;letter-spacing:1px;text-transform:uppercase;color:rgba(255,255,255,.6);}
.total-val{font-family:var(--mono);font-size:30px;font-weight:700;color:#fff;display:flex;align-items:baseline;gap:4px;}
.total-currency{font-size:15px;font-weight:500;color:var(--gold-bright);}
.gst-note{font-size:11px;color:#8AAABB;margin-top:10px;text-align:right;}
/* War Surcharge */
.surcharge-section{background:#FFF8E7;border:1.5px solid rgba(245,158,11,.27);border-radius:var(--r12);padding:16px 20px;margin-bottom:16px;display:flex;align-items:center;gap:16px;flex-wrap:wrap;}
.surcharge-section label{font-size:11px;font-weight:700;letter-spacing:.9px;text-transform:uppercase;color:#92400E;white-space:nowrap;}
.surcharge-input{width:110px;padding:9px 12px;border:1.5px solid rgba(245,158,11,.53);border-radius:var(--r8);font-family:var(--mono);font-size:14px;font-weight:600;color:var(--ink);background:#fff;outline:none;transition:border-color .2s;}
.surcharge-input:focus{border-color:var(--gold);box-shadow:0 0 0 3px rgba(245,158,11,.15);}
.surcharge-hint{font-size:11px;color:#B45309;flex:1;min-width:120px;}
/* Gross weight */
.gross-weight-section{background:var(--snow);border:1.5px solid var(--border);border-radius:var(--r12);padding:16px 20px;margin-bottom:16px;display:flex;align-items:center;gap:16px;flex-wrap:wrap;}
.gross-weight-section label{font-size:11px;font-weight:700;letter-spacing:.9px;text-transform:uppercase;color:var(--ink-70);white-space:nowrap;}
.gross-weight-input{width:120px;padding:9px 12px;border:1.5px solid var(--border);border-radius:var(--r8);font-family:var(--mono);font-size:14px;font-weight:600;color:var(--ink);background:#fff;outline:none;transition:border-color .2s;}
.gross-weight-input:focus{border-color:var(--blue-bright);box-shadow:0 0 0 3px rgba(30,136,229,.12);}
.gross-weight-hint{font-size:11px;color:var(--ink-40);flex:1;min-width:120px;}
/* CSB-5 Toggle */
.csb-toggle-row{display:flex;align-items:center;gap:14px;padding:12px 20px;background:#EFF6FF;border:1.5px solid #BFDBFE;border-radius:var(--r12);margin-bottom:16px;flex-wrap:wrap;}
.csb-label{font-size:12px;font-weight:700;color:var(--blue-mid);letter-spacing:.5px;}
.csb-note{font-size:11px;color:#1E40AF;flex:1;}
.toggle-switch{position:relative;display:inline-block;width:44px;height:24px;flex-shrink:0;}
.toggle-switch input{opacity:0;width:0;height:0;}
.toggle-slider{position:absolute;cursor:pointer;top:0;left:0;right:0;bottom:0;background:#CBD5E1;border-radius:24px;transition:background .2s;}
.toggle-slider:before{content:'';position:absolute;height:18px;width:18px;left:3px;bottom:3px;background:#fff;border-radius:50%;transition:transform .2s;box-shadow:0 1px 4px rgba(0,0,0,.2);}
.toggle-switch input:checked + .toggle-slider{background:var(--blue-bright);}
.toggle-switch input:checked + .toggle-slider:before{transform:translateX(20px);}
/* Volumetric checker */
.vol-checker{margin-top:16px;border:1.5px solid var(--border);border-radius:var(--r12);overflow:hidden;}
.vol-header{display:flex;align-items:center;justify-content:space-between;padding:13px 18px;background:var(--snow);cursor:pointer;user-select:none;font-size:12px;font-weight:700;color:var(--blue-mid);letter-spacing:.4px;transition:background .15s;}
.vol-header:hover{background:#E8F0FD;}
.vol-chevron{font-size:12px;transition:transform .22s;}
.vol-chevron.open{transform:rotate(180deg);}
.vol-body{display:none;padding:18px 20px;background:#fff;border-top:1px solid var(--border);}
.vol-body.open{display:block;animation:revealUp .25s var(--ease);}
.vol-inputs{display:flex;gap:12px;flex-wrap:wrap;margin-bottom:16px;}
.vol-field{display:flex;flex-direction:column;gap:5px;}
.vol-field label{font-size:10px;font-weight:700;letter-spacing:.8px;text-transform:uppercase;color:var(--ink-70);}
.vol-input{width:90px;padding:9px 10px;border:1.5px solid var(--border);border-radius:var(--r8);font-family:var(--mono);font-size:14px;font-weight:500;color:var(--ink);background:var(--snow);outline:none;transition:border-color .2s;}
.vol-input:focus{border-color:var(--blue-bright);box-shadow:0 0 0 3px rgba(30,136,229,.12);background:#fff;}
.vol-result-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:10px;margin-bottom:12px;}
@media(max-width:480px){.vol-result-grid{grid-template-columns:1fr 1fr;}}
.vol-chip{background:var(--snow);border:1.5px solid var(--border);border-radius:var(--r8);padding:10px 12px;}
.vol-chip-label{font-size:9px;font-weight:700;letter-spacing:1px;text-transform:uppercase;color:#7A9ABB;margin-bottom:4px;}
.vol-chip-val{font-size:13px;font-weight:700;color:var(--ink);font-family:var(--mono);}
.vol-chip-val.highlight{color:var(--blue-mid);}
.vol-warning{background:#FEF3C7;border:1.5px solid rgba(245,158,11,.33);border-radius:var(--r8);padding:10px 14px;font-size:12px;color:#92400E;display:none;}
.vol-warning.show{display:block;}
.vol-recalc{background:#EFF6FF;border:1.5px solid #BFDBFE;border-radius:var(--r8);padding:10px 14px;font-size:12px;color:#1E40AF;display:none;margin-top:10px;}
.vol-recalc.show{display:block;}
/* Actual weight */
.actual-weight-row{background:#F0FDF4;border:1.5px solid #BBF7D0;border-radius:var(--r12);padding:14px 18px;margin-bottom:20px;display:flex;align-items:center;gap:14px;flex-wrap:wrap;}
.actual-weight-row label{font-size:11px;font-weight:700;letter-spacing:.9px;text-transform:uppercase;color:#065F46;white-space:nowrap;}
.actual-weight-input{width:120px;padding:9px 12px;border:1.5px solid #6EE7B7;border-radius:var(--r8);font-family:var(--mono);font-size:14px;font-weight:600;color:var(--ink);background:#fff;outline:none;transition:border-color .2s;}
.actual-weight-input:focus{border-color:#10B981;box-shadow:0 0 0 3px rgba(16,185,129,.15);}
.actual-weight-hint{font-size:11px;color:#047857;flex:1;min-width:140px;}
.actual-weight-tag{font-size:11px;font-weight:600;background:#D1FAE5;color:#059669;border-radius:6px;padding:3px 8px;display:none;}
/* Footer */
.footer{margin-top:28px;text-align:center;font-size:12px;color:rgba(255,255,255,.2);position:relative;z-index:1;animation:slideUp .7s .3s var(--ease) both;}
.admin-link{color:rgba(255,255,255,.12);text-decoration:none;font-size:10px;margin-left:8px;transition:color .2s;}
.admin-link:hover{color:rgba(255,255,255,.35);}
/* Toast */
.toast{position:fixed;bottom:32px;left:50%;transform:translateX(-50%) translateY(16px);background:var(--blue-deep);color:#fff;padding:10px 22px;border-radius:24px;font-size:13px;font-weight:500;border:1px solid rgba(245,158,11,.3);box-shadow:var(--shadow-md);opacity:0;transition:all .28s var(--ease);pointer-events:none;z-index:999;white-space:nowrap;}
.toast.show{opacity:1;transform:translateX(-50%) translateY(0);}
/* Admin Modal */
.admin-overlay{position:fixed;inset:0;z-index:9000;background:rgba(5,15,40,.82);backdrop-filter:blur(6px);display:none;align-items:center;justify-content:center;padding:20px;}
.admin-overlay.open{display:flex;animation:fadeIn .2s ease;}
@keyframes fadeIn{from{opacity:0;}to{opacity:1;}}
.admin-modal{background:#fff;border-radius:var(--r24);box-shadow:var(--shadow-xl);width:100%;max-width:560px;overflow:hidden;animation:slideUp .3s var(--ease);}
.admin-modal-bar{height:4px;background:linear-gradient(90deg,var(--blue-mid),var(--gold));}
.admin-modal-body{padding:32px 36px 36px;}
@media(max-width:580px){.admin-modal-body{padding:24px 20px 28px;}}
.admin-title{font-size:18px;font-weight:800;color:var(--ink);margin-bottom:6px;}
.admin-subtitle{font-size:12px;color:var(--ink-40);margin-bottom:24px;}
.admin-field{display:flex;flex-direction:column;gap:6px;margin-bottom:18px;}
.admin-label{font-size:10px;font-weight:700;letter-spacing:1px;text-transform:uppercase;color:var(--ink-70);}
.admin-input{padding:11px 14px;border:1.5px solid var(--border);border-radius:var(--r8);font-family:var(--sans);font-size:14px;color:var(--ink);background:var(--snow);outline:none;transition:border-color .2s;}
.admin-input:focus{border-color:var(--blue-bright);box-shadow:0 0 0 3px rgba(30,136,229,.1);background:#fff;}
.admin-input.error{border-color:var(--red);}
.admin-err{font-size:11.5px;color:var(--red);display:none;margin-top:4px;}
.admin-err.show{display:block;}
.admin-actions{display:flex;gap:10px;margin-top:4px;}
.btn-admin-login{flex:1;padding:12px 20px;background:linear-gradient(135deg,var(--blue-mid),var(--blue-deep));color:#fff;border:none;border-radius:var(--r8);font-family:var(--sans);font-size:14px;font-weight:700;cursor:pointer;transition:all .2s;}
.btn-admin-login:hover{background:linear-gradient(135deg,var(--blue-bright),var(--blue-mid));}
.btn-admin-cancel{padding:12px 18px;background:transparent;color:var(--ink-70);border:1.5px solid var(--border);border-radius:var(--r8);font-family:var(--sans);font-size:14px;font-weight:600;cursor:pointer;transition:all .2s;}
.btn-admin-cancel:hover{background:var(--snow);}
.admin-panel{display:none;}
.admin-panel.open{display:block;}
.admin-section-title{font-size:11px;font-weight:800;letter-spacing:1.5px;text-transform:uppercase;color:var(--blue-mid);margin-bottom:12px;margin-top:20px;display:flex;align-items:center;gap:8px;}
.admin-section-title::after{content:'';flex:1;height:1px;background:var(--ink-10);}
.admin-textarea{width:100%;height:160px;padding:12px 14px;border:1.5px solid var(--border);border-radius:var(--r8);font-family:var(--mono);font-size:12px;color:var(--ink);background:var(--snow);outline:none;resize:vertical;transition:border-color .2s;}
.admin-textarea:focus{border-color:var(--blue-bright);background:#fff;box-shadow:0 0 0 3px rgba(30,136,229,.1);}
.admin-upload-row{display:flex;gap:10px;align-items:center;margin-top:10px;flex-wrap:wrap;}
.btn-admin-apply{padding:10px 20px;background:linear-gradient(135deg,#059669,#047857);color:#fff;border:none;border-radius:var(--r8);font-family:var(--sans);font-size:13px;font-weight:700;cursor:pointer;transition:all .2s;}
.btn-admin-apply:hover{background:linear-gradient(135deg,#10B981,#059669);}
.btn-admin-reset-rates{padding:10px 16px;background:transparent;color:var(--red);border:1.5px solid #FCA5A5;border-radius:var(--r8);font-family:var(--sans);font-size:13px;font-weight:600;cursor:pointer;transition:all .2s;}
.btn-admin-reset-rates:hover{background:#FEF2F2;}
.admin-status{font-size:12px;padding:8px 12px;border-radius:var(--r8);display:none;margin-top:10px;}
.admin-status.success{background:#D1FAE5;color:#065F46;display:block;}
.admin-status.error{background:#FEE2E2;color:#991B1B;display:block;}
.custom-rates-indicator{display:inline-flex;align-items:center;gap:6px;background:#D1FAE5;color:#065F46;font-size:10px;font-weight:700;letter-spacing:.5px;border-radius:6px;padding:3px 9px;margin-left:8px;}
@keyframes slideDown{from{opacity:0;transform:translateY(-18px);}to{opacity:1;transform:translateY(0);}}
@keyframes slideUp{from{opacity:0;transform:translateY(18px);}to{opacity:1;transform:translateY(0);}}
</style>
</head>
<body>
<div class="bg-layer"></div>
<div class="orb orb-1"></div><div class="orb orb-2"></div><div class="orb orb-3"></div>
<div class="page">
  <header class="header">
    <img class="logo-img" src="Logo.svg" alt="Xindus Logo"/>
    <div class="header-badge"><span class="dot"></span>Canada is now Live with Xindus Lite</div>
    <h1 class="header-title">Canada Shipping<br/><span class="accent">Rate Calculator</span></h1>
    <p class="header-subtitle">Rates are available across all provinces &amp; territories</p>
  </header>
  <div class="card">
    <div class="card-bar"></div>
    <div class="card-body">
      <div class="section-label">&#128230; Shipment Details <span id="custom-rates-badge" class="custom-rates-indicator" style="display:none">&#10003; Custom Rates Active</span></div>
      <div class="actual-weight-row">
        <label for="actual-weight">&#9878;&#65039; Actual Weight (kg)</label>
        <input type="number" id="actual-weight" class="actual-weight-input" placeholder="e.g. 12.5" min="0" step="0.01" oninput="autoSelectSlab(this.value)"/>
        <span class="actual-weight-hint">Enter weight to auto-select slab</span>
        <span class="actual-weight-tag" id="actual-weight-tag"></span>
      </div>
      <div class="form-row">
        <div class="field">
          <label class="field-label">&#128205; Destination FSA</label>
          <div class="ac-wrap">
            <div class="input-wrap">
              <input id="fsa" class="form-input" type="text" placeholder="e.g. M5V, V6B, K1A" maxlength="3" autocomplete="off" spellcheck="false"/>
              <span class="input-icon">&#128269;</span>
            </div>
            <div class="ac-dropdown" id="ac-list" role="listbox"></div>
          </div>
          <span class="hint">First 3 characters of Canadian postal code</span>
          <div class="field-error" id="fsa-err">&#9888; Please select a valid FSA from suggestions</div>
        </div>
        <div class="field">
          <label class="field-label">&#9878;&#65039; Weight Slab</label>
          <div class="select-wrap">
            <select class="slab-select" id="slab-select"><option value="">&#8212; Select weight range &#8212;</option></select>
            <span class="select-chevron">&#9662;</span>
          </div>
          <span class="hint">Choose the weight bracket for your shipment</span>
          <div class="field-error" id="slab-err">&#9888; Please select a weight slab</div>
        </div>
      </div>
      <div class="actions">
        <button class="btn-calc" id="calc-btn" onclick="calculate()">
          <span class="btn-inner" id="btn-text"><span>&#127464;&#127462;</span><span>Get Shipping Rate</span></span>
        </button>
        <button class="btn-reset" onclick="resetForm()">&#8634; Reset</button>
      </div>
      <div class="result" id="result">
        <hr class="divider"/>
        <div class="result-header">
          <span class="result-title">&#128202; Rate Breakdown</span>
          <button class="btn-copy" id="copy-btn" onclick="copyResult()" title="Copy result">&#128203;</button>
        </div>
        <div class="chips">
          <div class="chip"><div class="chip-label">Zone</div><div class="chip-val red" id="r-zone">&#8212;</div></div>
          <div class="chip"><div class="chip-label">Province</div><div class="chip-val" id="r-prov">&#8212;</div></div>
          <div class="chip"><div class="chip-label">Entry Airport</div><div class="chip-val blue" id="r-entry">&#8212;</div></div>
          <div class="chip"><div class="chip-label">Postal Code</div><div class="chip-val gold" id="r-zip">&#8212;</div></div>
          <div class="chip wide"><div class="chip-label">Weight Slab Applied</div><div class="chip-val" id="r-slab">&#8212;</div></div>
        </div>
        <div class="surcharge-section">
          <label for="war-surcharge">&#128737; War Surcharge (&#8377;/kg)</label>
          <input type="number" id="war-surcharge" class="surcharge-input" value="75" min="0" step="1" oninput="recalcBreakdown()"/>
          <span class="surcharge-hint">War risk surcharge per kg &middot; applied to base before GST</span>
        </div>
        <div class="gross-weight-section" id="gross-weight-section" style="display:none">
          <label for="gross-weight">&#128230; Gross Weight (kg)</label>
          <input type="number" id="gross-weight" class="gross-weight-input" placeholder="e.g. 12.5" min="0" step="0.01" oninput="recalcBreakdown()"/>
          <span class="gross-weight-hint">Enter actual gross weight to calculate total freight</span>
        </div>
        <div class="csb-toggle-row" id="csb-toggle-row" style="display:none">
          <span class="csb-label">CSB-5 Shipment</span>
          <label class="toggle-switch"><input type="checkbox" id="csb-toggle" onchange="recalcBreakdown()"/><span class="toggle-slider"></span></label>
          <span class="csb-note">* For CSB-5 shipments, &#8377;50 extra clearance charge applies</span>
        </div>
        <div class="pricing" id="pricing-box">
          <div class="price-row" id="row-rate-per-kg" style="display:none">
            <span class="price-label"><span class="dot"></span>Rate per kg</span>
            <span class="price-val" id="r-rate-per-kg">&#8377;0.00</span>
          </div>
          <div class="price-row" id="row-base">
            <span class="price-label" id="base-label"><span class="dot"></span>Base Freight Rate</span>
            <span class="price-val" id="r-base">&#8377;0.00</span>
          </div>
          <div class="price-row" id="row-war">
            <span class="price-label"><span class="dot gold"></span>War Surcharge</span>
            <span class="price-val" id="r-war">&#8377;0.00</span>
          </div>
          <div class="price-row" id="row-csb" style="display:none">
            <span class="price-label"><span class="dot orange"></span>CSB-5 Clearance</span>
            <span class="price-val">&#8377;50.00</span>
          </div>
          <div class="price-row" id="row-subtotal" style="display:none">
            <span class="price-label"><span class="dot"></span>Sub-total</span>
            <span class="price-val" id="r-subtotal">&#8377;0.00</span>
          </div>
          <div class="price-row">
            <span class="price-label"><span class="dot red"></span>GST (18%)</span>
            <span class="price-val" id="r-gst">&#8377;0.00</span>
          </div>
          <div class="price-total">
            <span class="total-label">&#128176; Total Payable</span>
            <span class="total-val"><span class="total-currency">&#8377;</span><span id="r-total">0</span></span>
          </div>
        </div>
        <div class="vol-checker" id="vol-checker" style="display:none">
          <div class="vol-header" onclick="toggleVolChecker()">
            <span>&#128208; Check if going Volumetric</span>
            <span class="vol-chevron" id="vol-chevron">&#9662;</span>
          </div>
          <div class="vol-body" id="vol-body">
            <div class="vol-inputs">
              <div class="vol-field"><label for="vol-l">Length (cm)</label><input type="number" id="vol-l" class="vol-input" placeholder="L" min="0" step="0.1" oninput="calcVolumetric()"/></div>
              <div class="vol-field"><label for="vol-b">Breadth (cm)</label><input type="number" id="vol-b" class="vol-input" placeholder="B" min="0" step="0.1" oninput="calcVolumetric()"/></div>
              <div class="vol-field"><label for="vol-h">Height (cm)</label><input type="number" id="vol-h" class="vol-input" placeholder="H" min="0" step="0.1" oninput="calcVolumetric()"/></div>
            </div>
            <div class="vol-result-grid" id="vol-result-grid" style="display:none">
              <div class="vol-chip"><div class="vol-chip-label">Gross Weight</div><div class="vol-chip-val" id="vol-gross-disp">&#8212;</div></div>
              <div class="vol-chip"><div class="vol-chip-label">Volumetric Wt.</div><div class="vol-chip-val" id="vol-vol-disp">&#8212;</div></div>
              <div class="vol-chip"><div class="vol-chip-label">Chargeable Wt.</div><div class="vol-chip-val highlight" id="vol-charge-disp">&#8212;</div></div>
            </div>
            <div class="vol-warning" id="vol-warning">&#9888;&#65039; Volumetric weight exceeds gross weight. Chargeable weight is <strong id="vol-charge-bold">&#8212;</strong> kg.</div>
            <div class="vol-recalc" id="vol-recalc">&#8505;&#65039; Recalculated rate using chargeable weight: <strong id="vol-recalc-val">&#8212;</strong> &middot; Total Payable: <strong id="vol-recalc-total">&#8212;</strong></div>
          </div>
        </div>
        <a href="https://one.xindus.net/new-booking" class="btn-booking" target="_blank" rel="noopener noreferrer">
          <span class="btn-inner"><span>&#128230;</span><span>Book Shipment</span></span>
        </a>
        <p class="gst-note" id="gst-note">* GST @ 18% applicable &middot; Rates above 5 kg are per kg</p>
      </div>
    </div>
  </div>
  <footer class="footer">
    <p>&#169; 2026 All Rights Reserved by Xindus &middot; Canada Lite Rate Calculator &middot; <a class="admin-link" href="#" onclick="openAdminModal();return false;">Admin</a></p>
  </footer>
</div>
<div class="toast" id="toast"></div>
<div class="admin-overlay" id="admin-overlay">
  <div class="admin-modal">
    <div class="admin-modal-bar"></div>
    <div class="admin-modal-body">
      <div id="admin-login-form">
        <div class="admin-title">&#128274; Admin Panel</div>
        <div class="admin-subtitle">Enter credentials to manage rate settings</div>
        <div class="admin-field"><label class="admin-label">Admin ID</label><input type="text" id="admin-id" class="admin-input" placeholder="Admin ID" autocomplete="off"/></div>
        <div class="admin-field"><label class="admin-label">Password</label><input type="password" id="admin-pass" class="admin-input" placeholder="Password"/><div class="admin-err" id="admin-login-err">&#9888; Invalid credentials. Please try again.</div></div>
        <div class="admin-actions"><button class="btn-admin-login" onclick="adminLogin()">Login</button><button class="btn-admin-cancel" onclick="closeAdminModal()">Cancel</button></div>
      </div>
      <div class="admin-panel" id="admin-panel">
        <div class="admin-title">&#9881;&#65039; Rate Management</div>
        <div class="admin-subtitle">Modify rates or upload a JSON file to override the default RATE_CARD</div>
        <div class="admin-section-title">Upload JSON Rates File</div>
        <div class="admin-upload-row"><input type="file" id="admin-file-input" accept=".json" onchange="handleAdminFileUpload(event)" style="font-size:12px;color:var(--ink-70)"/></div>
        <div class="admin-section-title">Edit RATE_CARD JSON Directly</div>
        <textarea class="admin-textarea" id="admin-json-editor" placeholder="Paste or edit RATE_CARD JSON here..."></textarea>
        <div id="admin-status" class="admin-status"></div>
        <div class="admin-upload-row" style="margin-top:12px">
          <button class="btn-admin-apply" onclick="applyCustomRates()">&#10003; Apply Rates</button>
          <button class="btn-admin-reset-rates" onclick="resetToDefaultRates()">&#10005; Reset to Default</button>
          <button class="btn-admin-cancel" onclick="closeAdminModal()">Close</button>
        </div>
      </div>
    </div>
  </div>
</div>
<script>`;

const part2 = `
const PROVINCE_NAMES = {
  AB: 'Alberta', BC: 'British Columbia', MB: 'Manitoba',
  NB: 'New Brunswick', NL: 'Newfoundland & Labrador',
  NS: 'Nova Scotia', NT: 'Northwest Territories',
  NU: 'Nunavut', ON: 'Ontario',
  PE: 'Prince Edward Island', QC: 'Quebec',
  SK: 'Saskatchewan', YT: 'Yukon'
};

const HARDCODED_RATE_CARD = {
  "0.00 - 0.05": {"D01":655,"D02":655,"D03":674,"D04":686,"D05":692,"D06":730,"D07":766,"D08":804,"D09":980,"D10":982,"D11":1141,"D12":1151,"D13":1199,"D14":1357,"D15":1437,"D16":1483},
  "0.05 - 0.10": {"D01":683,"D02":683,"D03":701,"D04":714,"D05":719,"D06":757,"D07":794,"D08":831,"D09":1049,"D10":1052,"D11":1212,"D12":1222,"D13":1266,"D14":1429,"D15":1546,"D16":1595},
  "0.10 - 0.15": {"D01":709,"D02":709,"D03":727,"D04":740,"D05":747,"D06":783,"D07":821,"D08":859,"D09":1160,"D10":1163,"D11":1327,"D12":1337,"D13":1371,"D14":1549,"D15":1736,"D16":1791},
  "0.15 - 0.20": {"D01":779,"D02":784,"D03":790,"D04":797,"D05":803,"D06":840,"D07":878,"D08":915,"D09":1271,"D10":1274,"D11":1442,"D12":1452,"D13":1477,"D14":1669,"D15":1927,"D16":1988},
  "0.20 - 0.25": {"D01":852,"D02":859,"D03":864,"D04":870,"D05":877,"D06":915,"D07":951,"D08":989,"D09":1383,"D10":1385,"D11":1557,"D12":1567,"D13":1583,"D14":1788,"D15":2117,"D16":2183},
  "0.25 - 0.50": {"D01":1053,"D02":1058,"D03":1065,"D04":1071,"D05":1078,"D06":1115,"D07":1152,"D08":1190,"D09":1677,"D10":1682,"D11":1905,"D12":1915,"D13":1859,"D14":2096,"D15":2486,"D16":2566},
  "0.50 - 0.75": {"D01":1238,"D02":1245,"D03":1251,"D04":1256,"D05":1263,"D06":1301,"D07":1338,"D08":1375,"D09":1925,"D10":1935,"D11":2183,"D12":2194,"D13":2139,"D14":2395,"D15":2826,"D16":2910},
  "0.75 - 1.00": {"D01":1408,"D02":1413,"D03":1420,"D04":1426,"D05":1433,"D06":1469,"D07":1507,"D08":1544,"D09":2136,"D10":2148,"D11":2414,"D12":2426,"D13":2370,"D14":2640,"D15":3098,"D16":3185},
  "1.00 - 1.25": {"D01":1559,"D02":1566,"D03":1572,"D04":1579,"D05":1584,"D06":1622,"D07":1659,"D08":1696,"D09":2309,"D10":2322,"D11":2598,"D12":2608,"D13":2554,"D14":2831,"D15":3301,"D16":3390},
  "1.25 - 1.50": {"D01":1729,"D02":1736,"D03":1741,"D04":1747,"D05":1754,"D06":1791,"D07":1828,"D08":1866,"D09":2519,"D10":2536,"D11":2829,"D12":2841,"D13":2786,"D14":3076,"D15":3574,"D16":3663},
  "1.50 - 1.75": {"D01":1887,"D02":1893,"D03":1900,"D04":1906,"D05":1912,"D06":1949,"D07":1987,"D08":2023,"D09":2742,"D10":2762,"D11":3079,"D12":3089,"D13":3035,"D14":3342,"D15":3873,"D16":3966},
  "1.75 - 2.00": {"D01":2040,"D02":2045,"D03":2051,"D04":2058,"D05":2064,"D06":2101,"D07":2139,"D08":2176,"D09":2935,"D10":2956,"D11":3289,"D12":3301,"D13":3246,"D14":3563,"D15":4117,"D16":4211},
  "2.00 - 2.25": {"D01":2191,"D02":2198,"D03":2203,"D04":2209,"D05":2216,"D06":2254,"D07":2290,"D08":2328,"D09":3128,"D10":3152,"D11":3499,"D12":3511,"D13":3457,"D14":3785,"D15":4361,"D16":4456},
  "2.25 - 2.50": {"D01":2343,"D02":2349,"D03":2356,"D04":2361,"D05":2367,"D06":2405,"D07":2443,"D08":2479,"D09":3323,"D10":3348,"D11":3710,"D12":3722,"D13":3669,"D14":4007,"D15":4605,"D16":4702},
  "2.50 - 2.75": {"D01":2514,"D02":2520,"D03":2525,"D04":2532,"D05":2538,"D06":2576,"D07":2612,"D08":2650,"D09":3513,"D10":3529,"D11":3918,"D12":3929,"D13":3867,"D14":4224,"D15":4846,"D16":4943},
  "2.75 - 3.00": {"D01":2727,"D02":2838,"D03":2843,"D04":2921,"D05":2958,"D06":3017,"D07":3185,"D08":3185,"D09":3771,"D10":3795,"D11":4181,"D12":4191,"D13":4160,"D14":4538,"D15":5197,"D16":5300},
  "3.00 - 3.25": {"D01":2915,"D02":3096,"D03":3100,"D04":3226,"D05":3282,"D06":3356,"D07":3611,"D08":3586,"D09":3989,"D10":4018,"D11":4401,"D12":4412,"D13":4400,"D14":4794,"D15":5478,"D16":5582},
  "3.25 - 3.50": {"D01":3103,"D02":3353,"D03":3357,"D04":3531,"D05":3606,"D06":3696,"D07":4038,"D08":3988,"D09":4207,"D10":4241,"D11":4622,"D12":4632,"D13":4640,"D14":5049,"D15":5758,"D16":5864},
  "3.50 - 3.75": {"D01":3291,"D02":3611,"D03":3613,"D04":3836,"D05":3932,"D06":4036,"D07":4465,"D08":4389,"D09":4425,"D10":4464,"D11":4842,"D12":4852,"D13":4880,"D14":5303,"D15":6038,"D16":6147},
  "3.75 - 4.00": {"D01":3479,"D02":3868,"D03":3870,"D04":4141,"D05":4256,"D06":4376,"D07":4891,"D08":4792,"D09":4642,"D10":4687,"D11":5061,"D12":5073,"D13":5119,"D14":5559,"D15":6317,"D16":6429},
  "4.00 - 4.25": {"D01":3693,"D02":4187,"D03":4188,"D04":4530,"D05":4675,"D06":4817,"D07":5463,"D08":5327,"D09":4902,"D10":4952,"D11":5324,"D12":5336,"D13":5413,"D14":5874,"D15":6670,"D16":6785},
  "4.25 - 4.50": {"D01":3881,"D02":4443,"D03":4445,"D04":4835,"D05":5000,"D06":5156,"D07":5890,"D08":5728,"D09":5119,"D10":5175,"D11":5545,"D12":5555,"D13":5652,"D14":6128,"D15":6949,"D16":7067},
  "4.50 - 4.75": {"D01":4068,"D02":4701,"D03":4701,"D04":5140,"D05":5324,"D06":5496,"D07":6316,"D08":6130,"D09":5337,"D10":5398,"D11":5765,"D12":5775,"D13":5892,"D14":6384,"D15":7229,"D16":7350},
  "4.75 - 5.00": {"D01":689,"D02":689,"D03":691,"D04":692,"D05":693,"D06":700,"D07":706,"D08":711,"D09":795,"D10":796,"D11":833,"D12":836,"D13":825,"D14":866,"D15":932,"D16":946},
  "5 - 6":   {"D01":674,"D02":674,"D03":675,"D04":677,"D05":677,"D06":683,"D07":688,"D08":693,"D09":771,"D10":773,"D11":808,"D12":809,"D13":802,"D14":837,"D15":898,"D16":910},
  "6 - 7":   {"D01":660,"D02":662,"D03":662,"D04":663,"D05":664,"D06":669,"D07":673,"D08":677,"D09":749,"D10":751,"D11":784,"D12":785,"D13":778,"D14":811,"D15":866,"D16":876},
  "7 - 8":   {"D01":649,"D02":649,"D03":651,"D04":652,"D05":652,"D06":656,"D07":660,"D08":664,"D09":729,"D10":730,"D11":760,"D12":762,"D13":755,"D14":785,"D15":835,"D16":844},
  "8 - 9":   {"D01":642,"D02":643,"D03":643,"D04":644,"D05":644,"D06":649,"D07":652,"D08":655,"D09":717,"D10":718,"D11":746,"D12":747,"D13":743,"D14":769,"D15":817,"D16":825},
  "9 - 10":  {"D01":636,"D02":637,"D03":637,"D04":638,"D05":638,"D06":641,"D07":644,"D08":648,"D09":708,"D10":710,"D11":737,"D12":738,"D13":733,"D14":759,"D15":804,"D16":813},
  "10 - 11": {"D01":630,"D02":630,"D03":631,"D04":631,"D05":631,"D06":634,"D07":638,"D08":640,"D09":699,"D10":700,"D11":726,"D12":727,"D13":723,"D14":747,"D15":791,"D16":798},
  "11 - 12": {"D01":625,"D02":626,"D03":626,"D04":626,"D05":626,"D06":629,"D07":632,"D08":634,"D09":691,"D10":693,"D11":717,"D12":718,"D13":714,"D14":737,"D15":778,"D16":785},
  "12 - 13": {"D01":620,"D02":621,"D03":621,"D04":622,"D05":622,"D06":625,"D07":626,"D08":630,"D09":684,"D10":686,"D11":710,"D12":711,"D13":707,"D14":729,"D15":768,"D16":774},
  "13 - 14": {"D01":618,"D02":618,"D03":619,"D04":619,"D05":620,"D06":622,"D07":625,"D08":626,"D09":678,"D10":680,"D11":703,"D12":704,"D13":700,"D14":722,"D15":759,"D16":766},
  "14 - 15": {"D01":618,"D02":625,"D03":625,"D04":629,"D05":631,"D06":634,"D07":644,"D08":644,"D09":677,"D10":678,"D11":700,"D12":702,"D13":700,"D14":721,"D15":758,"D16":763},
  "15 - 16": {"D01":616,"D02":626,"D03":626,"D04":633,"D05":637,"D06":641,"D07":655,"D08":653,"D09":674,"D10":675,"D11":696,"D12":696,"D13":696,"D14":717,"D15":754,"D16":759},
  "16 - 17": {"D01":616,"D02":629,"D03":629,"D04":638,"D05":641,"D06":645,"D07":663,"D08":660,"D09":671,"D10":673,"D11":692,"D12":693,"D13":693,"D14":714,"D15":749,"D16":754},
  "17 - 18": {"D01":615,"D02":630,"D03":631,"D04":641,"D05":645,"D06":651,"D07":671,"D08":667,"D09":669,"D10":671,"D11":689,"D12":689,"D13":691,"D14":711,"D15":745,"D16":751},
  "18 - 19": {"D01":615,"D02":632,"D03":632,"D04":644,"D05":649,"D06":655,"D07":677,"D08":673,"D09":666,"D10":669,"D11":685,"D12":686,"D13":688,"D14":707,"D15":741,"D16":746},
  "19 - 20": {"D01":615,"D02":636,"D03":636,"D04":651,"D05":656,"D06":663,"D07":689,"D08":684,"D09":666,"D10":669,"D11":684,"D12":685,"D13":689,"D14":707,"D15":741,"D16":746},
  "20 - 21": {"D01":615,"D02":637,"D03":637,"D04":653,"D05":660,"D06":666,"D07":695,"D08":689,"D09":664,"D10":666,"D11":682,"D12":682,"D13":686,"D14":705,"D15":738,"D16":743},
  "21 - 22": {"D01":614,"D02":638,"D03":638,"D04":655,"D05":662,"D06":669,"D07":700,"D08":693,"D09":663,"D10":666,"D11":678,"D12":680,"D13":684,"D14":703,"D15":736,"D16":740},
  "22 - 23": {"D01":612,"D02":638,"D03":642,"D04":655,"D05":662,"D06":669,"D07":700,"D08":693,"D09":660,"D10":663,"D11":677,"D12":677,"D13":681,"D14":700,"D15":732,"D16":736},
  "23 - 24": {"D01":611,"D02":638,"D03":641,"D04":653,"D05":660,"D06":666,"D07":697,"D08":691,"D09":659,"D10":660,"D11":674,"D12":674,"D13":678,"D14":696,"D15":727,"D16":732},
  "24 - 25": {"D01":610,"D02":638,"D03":642,"D04":653,"D05":660,"D06":666,"D07":697,"D08":689,"D09":658,"D10":660,"D11":672,"D12":672,"D13":677,"D14":695,"D15":726,"D16":730},
  "25 - 26": {"D01":609,"D02":637,"D03":641,"D04":651,"D05":658,"D06":664,"D07":695,"D08":688,"D09":656,"D10":659,"D11":670,"D12":670,"D13":675,"D14":693,"D15":723,"D16":727},
  "26 - 27": {"D01":608,"D02":636,"D03":640,"D04":649,"D05":656,"D06":663,"D07":693,"D08":686,"D09":655,"D10":658,"D11":667,"D12":667,"D13":674,"D14":691,"D15":721,"D16":724},
  "27 - 28": {"D01":607,"D02":634,"D03":638,"D04":649,"D05":655,"D06":662,"D07":691,"D08":684,"D09":653,"D10":655,"D11":666,"D12":666,"D13":672,"D14":689,"D15":717,"D16":722},
  "28 - 29": {"D01":605,"D02":634,"D03":638,"D04":648,"D05":655,"D06":660,"D07":689,"D08":682,"D09":652,"D10":655,"D11":663,"D12":663,"D13":671,"D14":686,"D15":715,"D16":718},
  "29 - 30": {"D01":604,"D02":634,"D03":638,"D04":648,"D05":655,"D06":660,"D07":689,"D08":682,"D09":652,"D10":655,"D11":662,"D12":662,"D13":670,"D14":686,"D15":714,"D16":718},
  "30 - 31": {"D01":604,"D02":633,"D03":638,"D04":647,"D05":653,"D06":659,"D07":686,"D08":681,"D09":651,"D10":653,"D11":660,"D12":660,"D13":669,"D14":684,"D15":711,"D16":715},
  "31 - 32": {"D01":604,"D02":632,"D03":637,"D04":645,"D05":652,"D06":658,"D07":685,"D08":678,"D09":649,"D10":652,"D11":659,"D12":659,"D13":667,"D14":683,"D15":710,"D16":713},
  "32 - 33": {"D01":603,"D02":632,"D03":637,"D04":644,"D05":651,"D06":656,"D07":684,"D08":677,"D09":649,"D10":651,"D11":658,"D12":658,"D13":666,"D14":681,"D15":707,"D16":711},
  "33 - 34": {"D01":601,"D02":631,"D03":636,"D04":644,"D05":649,"D06":655,"D07":682,"D08":677,"D09":648,"D10":649,"D11":656,"D12":656,"D13":664,"D14":680,"D15":706,"D16":710},
  "34 - 35": {"D01":601,"D02":631,"D03":636,"D04":644,"D05":649,"D06":655,"D07":682,"D08":677,"D09":648,"D10":649,"D11":655,"D12":655,"D13":664,"D14":680,"D15":705,"D16":708},
  "35 - 36": {"D01":600,"D02":631,"D03":636,"D04":643,"D05":649,"D06":655,"D07":681,"D08":675,"D09":647,"D10":649,"D11":655,"D12":655,"D13":663,"D14":678,"D15":704,"D16":707},
  "36 - 37": {"D01":600,"D02":630,"D03":634,"D04":642,"D05":649,"D06":655,"D07":680,"D08":674,"D09":645,"D10":649,"D11":653,"D12":653,"D13":662,"D14":677,"D15":702,"D16":705},
  "37 - 38": {"D01":599,"D02":629,"D03":634,"D04":642,"D05":648,"D06":653,"D07":678,"D08":673,"D09":645,"D10":648,"D11":652,"D12":652,"D13":660,"D14":675,"D15":700,"D16":704},
  "38 - 39": {"D01":599,"D02":629,"D03":634,"D04":641,"D05":647,"D06":652,"D07":677,"D08":672,"D09":644,"D10":647,"D11":651,"D12":651,"D13":660,"D14":674,"D15":700,"D16":703},
  "39 - 40": {"D01":599,"D02":629,"D03":634,"D04":641,"D05":647,"D06":652,"D07":677,"D08":672,"D09":644,"D10":647,"D11":651,"D12":651,"D13":660,"D14":674,"D15":699,"D16":702},
  "40 - 41": {"D01":598,"D02":629,"D03":633,"D04":640,"D05":647,"D06":652,"D07":677,"D08":671,"D09":643,"D10":647,"D11":649,"D12":649,"D13":660,"D14":673,"D15":697,"D16":700},
  "41 - 42": {"D01":598,"D02":627,"D03":633,"D04":640,"D05":645,"D06":651,"D07":675,"D08":671,"D09":643,"D10":645,"D11":649,"D12":649,"D13":659,"D14":672,"D15":696,"D16":700},
  "42 - 43": {"D01":597,"D02":627,"D03":633,"D04":638,"D05":645,"D06":649,"D07":675,"D08":670,"D09":642,"D10":644,"D11":648,"D12":648,"D13":658,"D14":672,"D15":695,"D16":699},
  "43 - 44": {"D01":597,"D02":627,"D03":633,"D04":638,"D05":645,"D06":649,"D07":675,"D08":670,"D09":642,"D10":644,"D11":648,"D12":648,"D13":658,"D14":672,"D15":695,"D16":699},
  "44 - 45": {"D01":597,"D02":627,"D03":633,"D04":638,"D05":644,"D06":649,"D07":674,"D08":669,"D09":642,"D10":644,"D11":647,"D12":647,"D13":658,"D14":671,"D15":694,"D16":697},
  "45 - 46": {"D01":596,"D02":626,"D03":632,"D04":638,"D05":644,"D06":649,"D07":673,"D08":669,"D09":641,"D10":643,"D11":645,"D12":645,"D13":656,"D14":670,"D15":693,"D16":696},
  "46 - 47": {"D01":596,"D02":626,"D03":632,"D04":638,"D05":643,"D06":649,"D07":673,"D08":667,"D09":641,"D10":643,"D11":644,"D12":644,"D13":655,"D14":669,"D15":692,"D16":695},
  "47 - 48": {"D01":594,"D02":626,"D03":632,"D04":638,"D05":643,"D06":648,"D07":672,"D08":666,"D09":640,"D10":643,"D11":644,"D12":644,"D13":655,"D14":669,"D15":691,"D16":694},
  "48 - 49": {"D01":594,"D02":626,"D03":632,"D04":638,"D05":643,"D06":649,"D07":672,"D08":666,"D09":641,"D10":643,"D11":644,"D12":644,"D13":655,"D14":669,"D15":691,"D16":694},
  "49 - 50": {"D01":594,"D02":626,"D03":632,"D04":638,"D05":643,"D06":648,"D07":671,"D08":666,"D09":640,"D10":642,"D11":643,"D12":643,"D13":655,"D14":667,"D15":689,"D16":693},
  "50 - 51": {"D01":594,"D02":626,"D03":631,"D04":637,"D05":642,"D06":648,"D07":671,"D08":666,"D09":640,"D10":642,"D11":642,"D12":642,"D13":655,"D14":666,"D15":689,"D16":692},
  "51 - 52": {"D01":593,"D02":626,"D03":631,"D04":637,"D05":642,"D06":647,"D07":670,"D08":666,"D09":638,"D10":641,"D11":642,"D12":642,"D13":653,"D14":666,"D15":689,"D16":691},
  "52 - 53": {"D01":593,"D02":626,"D03":631,"D04":636,"D05":641,"D06":647,"D07":670,"D08":664,"D09":638,"D10":641,"D11":641,"D12":641,"D13":653,"D14":666,"D15":688,"D16":691},
  "53 - 54": {"D01":593,"D02":626,"D03":631,"D04":637,"D05":642,"D06":647,"D07":670,"D08":664,"D09":638,"D10":641,"D11":641,"D12":641,"D13":653,"D14":666,"D15":688,"D16":691},
  "54 - 55": {"D01":593,"D02":626,"D03":631,"D04":636,"D05":641,"D06":647,"D07":669,"D08":664,"D09":638,"D10":641,"D11":641,"D12":641,"D13":653,"D14":666,"D15":686,"D16":689},
  "55 - 56": {"D01":592,"D02":625,"D03":631,"D04":636,"D05":641,"D06":645,"D07":669,"D08":663,"D09":638,"D10":640,"D11":640,"D12":640,"D13":652,"D14":664,"D15":686,"D16":689},
  "56 - 57": {"D01":592,"D02":625,"D03":630,"D04":636,"D05":640,"D06":645,"D07":667,"D08":663,"D09":638,"D10":640,"D11":640,"D12":640,"D13":652,"D14":664,"D15":685,"D16":689},
  "57 - 58": {"D01":592,"D02":625,"D03":630,"D04":634,"D05":640,"D06":644,"D07":667,"D08":663,"D09":638,"D10":640,"D11":638,"D12":638,"D13":651,"D14":663,"D15":684,"D16":688},
  "58 - 59": {"D01":592,"D02":625,"D03":630,"D04":634,"D05":640,"D06":645,"D07":667,"D08":663,"D09":638,"D10":640,"D11":638,"D12":638,"D13":651,"D14":663,"D15":685,"D16":688},
  "59 - 60": {"D01":592,"D02":625,"D03":630,"D04":634,"D05":640,"D06":644,"D07":666,"D08":662,"D09":637,"D10":638,"D11":638,"D12":638,"D13":651,"D14":663,"D15":684,"D16":686}
};

let RATE_CARD = HARDCODED_RATE_CARD;

(function loadCustomRates() {
  try {
    const saved = localStorage.getItem('xindus_custom_rates');
    if (saved) {
      const parsed = JSON.parse(saved);
      if (parsed && typeof parsed === 'object' && !Array.isArray(parsed)) {
        RATE_CARD = parsed;
        document.getElementById('custom-rates-badge').style.display = 'inline-flex';
      }
    }
  } catch(e) {}
})();

const SLAB_META = [
  { label:"0.00 - 0.05", group:"Light (0 - 5 kg)", isPerKg:false },
  { label:"0.05 - 0.10", group:"Light (0 - 5 kg)", isPerKg:false },
  { label:"0.10 - 0.15", group:"Light (0 - 5 kg)", isPerKg:false },
  { label:"0.15 - 0.20", group:"Light (0 - 5 kg)", isPerKg:false },
  { label:"0.20 - 0.25", group:"Light (0 - 5 kg)", isPerKg:false },
  { label:"0.25 - 0.50", group:"Light (0 - 5 kg)", isPerKg:false },
  { label:"0.50 - 0.75", group:"Light (0 - 5 kg)", isPerKg:false },
  { label:"0.75 - 1.00", group:"Light (0 - 5 kg)", isPerKg:false },
  { label:"1.00 - 1.25", group:"Light (0 - 5 kg)", isPerKg:false },
  { label:"1.25 - 1.50", group:"Light (0 - 5 kg)", isPerKg:false },
  { label:"1.50 - 1.75", group:"Light (0 - 5 kg)", isPerKg:false },
  { label:"1.75 - 2.00", group:"Light (0 - 5 kg)", isPerKg:false },
  { label:"2.00 - 2.25", group:"Light (0 - 5 kg)", isPerKg:false },
  { label:"2.25 - 2.50", group:"Light (0 - 5 kg)", isPerKg:false },
  { label:"2.50 - 2.75", group:"Light (0 - 5 kg)", isPerKg:false },
  { label:"2.75 - 3.00", group:"Light (0 - 5 kg)", isPerKg:false },
  { label:"3.00 - 3.25", group:"Light (0 - 5 kg)", isPerKg:false },
  { label:"3.25 - 3.50", group:"Light (0 - 5 kg)", isPerKg:false },
  { label:"3.50 - 3.75", group:"Light (0 - 5 kg)", isPerKg:false },
  { label:"3.75 - 4.00", group:"Light (0 - 5 kg)", isPerKg:false },
  { label:"4.00 - 4.25", group:"Light (0 - 5 kg)", isPerKg:false },
  { label:"4.25 - 4.50", group:"Light (0 - 5 kg)", isPerKg:false },
  { label:"4.50 - 4.75", group:"Light (0 - 5 kg)", isPerKg:false },
  { label:"4.75 - 5.00", group:"Light (0 - 5 kg)", isPerKg:true },
  { label:"5 - 6",   group:"Medium (5 - 30 kg)", isPerKg:true },
  { label:"6 - 7",   group:"Medium (5 - 30 kg)", isPerKg:true },
  { label:"7 - 8",   group:"Medium (5 - 30 kg)", isPerKg:true },
  { label:"8 - 9",   group:"Medium (5 - 30 kg)", isPerKg:true },
  { label:"9 - 10",  group:"Medium (5 - 30 kg)", isPerKg:true },
  { label:"10 - 11", group:"Medium (5 - 30 kg)", isPerKg:true },
  { label:"11 - 12", group:"Medium (5 - 30 kg)", isPerKg:true },
  { label:"12 - 13", group:"Medium (5 - 30 kg)", isPerKg:true },
  { label:"13 - 14", group:"Medium (5 - 30 kg)", isPerKg:true },
  { label:"14 - 15", group:"Medium (5 - 30 kg)", isPerKg:true },
  { label:"15 - 16", group:"Medium (5 - 30 kg)", isPerKg:true },
  { label:"16 - 17", group:"Medium (5 - 30 kg)", isPerKg:true },
  { label:"17 - 18", group:"Medium (5 - 30 kg)", isPerKg:true },
  { label:"18 - 19", group:"Medium (5 - 30 kg)", isPerKg:true },
  { label:"19 - 20", group:"Medium (5 - 30 kg)", isPerKg:true },
  { label:"20 - 21", group:"Medium (5 - 30 kg)", isPerKg:true },
  { label:"21 - 22", group:"Medium (5 - 30 kg)", isPerKg:true },
  { label:"22 - 23", group:"Medium (5 - 30 kg)", isPerKg:true },
  { label:"23 - 24", group:"Medium (5 - 30 kg)", isPerKg:true },
  { label:"24 - 25", group:"Medium (5 - 30 kg)", isPerKg:true },
  { label:"25 - 26", group:"Medium (5 - 30 kg)", isPerKg:true },
  { label:"26 - 27", group:"Medium (5 - 30 kg)", isPerKg:true },
  { label:"27 - 28", group:"Medium (5 - 30 kg)", isPerKg:true },
  { label:"28 - 29", group:"Medium (5 - 30 kg)", isPerKg:true },
  { label:"29 - 30", group:"Medium (5 - 30 kg)", isPerKg:true },
  { label:"30 - 31", group:"Heavy (30 - 60 kg)", isPerKg:true },
  { label:"31 - 32", group:"Heavy (30 - 60 kg)", isPerKg:true },
  { label:"32 - 33", group:"Heavy (30 - 60 kg)", isPerKg:true },
  { label:"33 - 34", group:"Heavy (30 - 60 kg)", isPerKg:true },
  { label:"34 - 35", group:"Heavy (30 - 60 kg)", isPerKg:true },
  { label:"35 - 36", group:"Heavy (30 - 60 kg)", isPerKg:true },
  { label:"36 - 37", group:"Heavy (30 - 60 kg)", isPerKg:true },
  { label:"37 - 38", group:"Heavy (30 - 60 kg)", isPerKg:true },
  { label:"38 - 39", group:"Heavy (30 - 60 kg)", isPerKg:true },
  { label:"39 - 40", group:"Heavy (30 - 60 kg)", isPerKg:true },
  { label:"40 - 41", group:"Heavy (30 - 60 kg)", isPerKg:true },
  { label:"41 - 42", group:"Heavy (30 - 60 kg)", isPerKg:true },
  { label:"42 - 43", group:"Heavy (30 - 60 kg)", isPerKg:true },
  { label:"43 - 44", group:"Heavy (30 - 60 kg)", isPerKg:true },
  { label:"44 - 45", group:"Heavy (30 - 60 kg)", isPerKg:true },
  { label:"45 - 46", group:"Heavy (30 - 60 kg)", isPerKg:true },
  { label:"46 - 47", group:"Heavy (30 - 60 kg)", isPerKg:true },
  { label:"47 - 48", group:"Heavy (30 - 60 kg)", isPerKg:true },
  { label:"48 - 49", group:"Heavy (30 - 60 kg)", isPerKg:true },
  { label:"49 - 50", group:"Heavy (30 - 60 kg)", isPerKg:true },
  { label:"50 - 51", group:"Heavy (30 - 60 kg)", isPerKg:true },
  { label:"51 - 52", group:"Heavy (30 - 60 kg)", isPerKg:true },
  { label:"52 - 53", group:"Heavy (30 - 60 kg)", isPerKg:true },
  { label:"53 - 54", group:"Heavy (30 - 60 kg)", isPerKg:true },
  { label:"54 - 55", group:"Heavy (30 - 60 kg)", isPerKg:true },
  { label:"55 - 56", group:"Heavy (30 - 60 kg)", isPerKg:true },
  { label:"56 - 57", group:"Heavy (30 - 60 kg)", isPerKg:true },
  { label:"57 - 58", group:"Heavy (30 - 60 kg)", isPerKg:true },
  { label:"58 - 59", group:"Heavy (30 - 60 kg)", isPerKg:true },
  { label:"59 - 60", group:"Heavy (30 - 60 kg)", isPerKg:true }
];

const FSA_LIST = Object.entries(ZONE_MAP).map(([fsa, d]) => ({ fsa, province: d.province, zone: d.zone, entry: d.entry }));

(function buildSlabDropdown() {
  const sel = document.getElementById('slab-select');
  const groups = {};
  SLAB_META.forEach(m => { if (!groups[m.group]) groups[m.group] = []; groups[m.group].push(m); });
  Object.entries(groups).forEach(([groupName, slabs]) => {
    const og = document.createElement('optgroup');
    og.label = groupName;
    slabs.forEach(m => {
      const opt = document.createElement('option');
      opt.value = m.label;
      opt.textContent = m.label + ' kg';
      og.appendChild(opt);
    });
    sel.appendChild(og);
  });
})();

function autoSelectSlab(val) {
  const wt = parseFloat(val);
  const tag = document.getElementById('actual-weight-tag');
  tag.style.background = '#D1FAE5'; tag.style.color = '#059669';
  if (isNaN(wt) || wt <= 0) { tag.style.display = 'none'; return; }
  for (const m of SLAB_META) {
    const parts = m.label.split(' - ');
    if (parts.length !== 2) continue;
    const lo = parseFloat(parts[0]), hi = parseFloat(parts[1]);
    if (wt > lo && wt <= hi) {
      document.getElementById('slab-select').value = m.label;
      document.getElementById('slab-select').classList.remove('error');
      clearFieldError('slab-err');
      tag.textContent = 'Slab: ' + m.label + ' kg';
      tag.style.display = 'inline-flex';
      return;
    }
  }
  tag.textContent = 'No slab for ' + wt + ' kg';
  tag.style.display = 'inline-flex';
  tag.style.background = '#FEE2E2'; tag.style.color = '#991B1B';
}

let selectedFSA = null, acIdx = -1;
const fsaInput = document.getElementById('fsa');
const acList   = document.getElementById('ac-list');

fsaInput.addEventListener('input', function () {
  selectedFSA = null;
  const q = this.value.trim().toUpperCase();
  if (!q) { closeAC(); return; }
  const matches = FSA_LIST.filter(x => x.fsa.startsWith(q)).slice(0, 14);
  renderAC(matches);
  if (q.length === 3 && ZONE_MAP[q]) selectedFSA = q;
});

fsaInput.addEventListener('keydown', function (e) {
  const items = acList.querySelectorAll('.ac-item');
  if (e.key === 'ArrowDown') { e.preventDefault(); acIdx = Math.min(acIdx+1, items.length-1); highlightAC(items); }
  else if (e.key === 'ArrowUp') { e.preventDefault(); acIdx = Math.max(acIdx-1, 0); highlightAC(items); }
  else if (e.key === 'Enter') {
    if (acIdx >= 0 && items[acIdx]) items[acIdx].click();
    else if (items.length === 1) items[0].click();
    else if (this.value.length === 3 && ZONE_MAP[this.value.toUpperCase()]) { selectedFSA = this.value.toUpperCase(); closeAC(); }
  } else if (e.key === 'Escape') closeAC();
});

function renderAC(matches) {
  acIdx = -1;
  if (!matches.length) {
    acList.innerHTML = '<div class="ac-empty">No FSA found. Try a different code.</div>';
  } else {
    acList.innerHTML = matches.map(m =>
      '<div class="ac-item" data-fsa="' + m.fsa + '" role="option">' +
      '<div style="display:flex;align-items:center"><span class="ac-code">' + m.fsa + '</span>' +
      '<span class="ac-prov">' + (PROVINCE_NAMES[m.province] || m.province) + '</span></div>' +
      '<span class="ac-zone-tag">' + m.zone + '</span></div>'
    ).join('');
    acList.querySelectorAll('.ac-item').forEach(el => {
      el.addEventListener('mousedown', e => { e.preventDefault(); pickFSA(el.dataset.fsa); });
      el.addEventListener('touchend',  e => { e.preventDefault(); pickFSA(el.dataset.fsa); });
    });
  }
  acList.classList.add('open');
}

function pickFSA(fsa) {
  selectedFSA = fsa; fsaInput.value = fsa; closeAC();
  clearFieldError('fsa-err'); fsaInput.classList.remove('error');
  document.getElementById('slab-select').focus();
}

function highlightAC(items) {
  items.forEach((el, i) => el.classList.toggle('active', i === acIdx));
  if (items[acIdx]) items[acIdx].scrollIntoView({ block: 'nearest' });
}

function closeAC() { acList.classList.remove('open'); acIdx = -1; }
fsaInput.addEventListener('blur', () => setTimeout(closeAC, 200));
document.addEventListener('mousedown', e => { if (!e.target.closest('.ac-wrap')) closeAC(); });

let _currentCalc = null;

function getSlabMidpoint(label) {
  const parts = label.split(' - ');
  if (parts.length !== 2) return 1;
  return (parseFloat(parts[0]) + parseFloat(parts[1])) / 2;
}

function calculate() {
  const fsaVal  = (selectedFSA || fsaInput.value.trim().toUpperCase());
  const slabVal = document.getElementById('slab-select').value;
  let valid = true;

  if (!fsaVal || fsaVal.length !== 3 || !ZONE_MAP[fsaVal]) {
    showFieldError('fsa-err'); fsaInput.classList.add('error'); valid = false;
  } else { clearFieldError('fsa-err'); fsaInput.classList.remove('error'); }

  if (!slabVal) {
    showFieldError('slab-err'); document.getElementById('slab-select').classList.add('error'); valid = false;
  } else { clearFieldError('slab-err'); document.getElementById('slab-select').classList.remove('error'); }

  if (!valid) { hideResult(); return; }
  setLoading(true);

  setTimeout(() => {
    const zoneData = ZONE_MAP[fsaVal];
    const rates    = RATE_CARD[slabVal];
    if (!rates) { showToast('Rate data not found for this slab.'); setLoading(false); return; }
    const baseRate = rates[zoneData.zone];
    if (baseRate === undefined) { showToast('No rate found for zone ' + zoneData.zone); setLoading(false); return; }

    const slabMeta = SLAB_META.find(m => m.label === slabVal);
    const isPerKg  = slabMeta ? slabMeta.isPerKg : false;
    const prov     = PROVINCE_NAMES[zoneData.province] || zoneData.province;

    document.getElementById('r-zone').textContent  = zoneData.zone;
    document.getElementById('r-prov').textContent  = zoneData.province + ' \u2014 ' + prov;
    document.getElementById('r-entry').innerHTML   = '<span class="entry-pill">\u2708 ' + zoneData.entry + '</span>';
    document.getElementById('r-zip').textContent   = fsaVal + '-' + zoneData.province;
    document.getElementById('r-slab').textContent  = slabVal + ' kg';

    _currentCalc = { baseRatePerKg: baseRate, isPerKg, slabLabel: slabVal, slabMidpoint: getSlabMidpoint(slabVal) };

    document.getElementById('gross-weight-section').style.display = isPerKg ? 'flex' : 'none';
    document.getElementById('csb-toggle-row').style.display       = isPerKg ? 'flex' : 'none';
    document.getElementById('vol-checker').style.display          = isPerKg ? 'block' : 'none';
    document.getElementById('row-rate-per-kg').style.display      = isPerKg ? 'flex' : 'none';

    document.getElementById('gross-weight').value = '';
    document.getElementById('csb-toggle').checked = false;
    ['vol-l','vol-b','vol-h'].forEach(id => document.getElementById(id).value = '');
    document.getElementById('vol-result-grid').style.display = 'none';
    document.getElementById('vol-warning').classList.remove('show');
    document.getElementById('vol-recalc').classList.remove('show');
    document.getElementById('vol-body').classList.remove('open');
    document.getElementById('vol-chevron').classList.remove('open');

    recalcBreakdown();
    setLoading(false);
    showResult();
  }, 400);
}

function recalcBreakdown() {
  if (!_currentCalc) return;
  const { baseRatePerKg, isPerKg, slabMidpoint } = _currentCalc;
  const surcharge   = parseFloat(document.getElementById('war-surcharge').value) || 0;
  const csbOn       = document.getElementById('csb-toggle').checked;
  const grossWtRaw  = parseFloat(document.getElementById('gross-weight').value);
  const hasGrossWt  = isPerKg && !isNaN(grossWtRaw) && grossWtRaw > 0;
  const weightUsed  = hasGrossWt ? grossWtRaw : slabMidpoint;

  let baseFreight, warSurcharge;
  if (isPerKg) {
    baseFreight  = baseRatePerKg * weightUsed;
    warSurcharge = surcharge * weightUsed;
  } else {
    baseFreight  = baseRatePerKg;
    warSurcharge = surcharge * slabMidpoint;
  }

  const csbExtra = (isPerKg && csbOn) ? 50 : 0;
  const subtotal = baseFreight + warSurcharge + csbExtra;
  const gst      = subtotal * 0.18;
  const total    = subtotal + gst;

  if (isPerKg) {
    document.getElementById('r-rate-per-kg').textContent = '\u20b9' + formatNum(baseRatePerKg) + '/kg';
    const baseLabel = document.getElementById('base-label');
    if (hasGrossWt) {
      baseLabel.innerHTML = '<span class="dot"></span>Total Freight (' + formatNum(baseRatePerKg) + ' \u00d7 ' + grossWtRaw + ' kg)';
    } else {
      baseLabel.innerHTML = '<span class="dot"></span>Base Freight Rate (per kg, midpoint ' + slabMidpoint.toFixed(2) + ' kg)';
    }
  } else {
    document.getElementById('base-label').innerHTML = '<span class="dot"></span>Base Freight Rate';
  }

  document.getElementById('r-base').textContent     = '\u20b9' + formatNum(baseFreight);
  document.getElementById('r-war').textContent      = '\u20b9' + formatNum(warSurcharge);
  document.getElementById('row-csb').style.display  = csbExtra ? 'flex' : 'none';
  const showSub = warSurcharge > 0 || csbExtra > 0;
  document.getElementById('row-subtotal').style.display = showSub ? 'flex' : 'none';
  document.getElementById('r-subtotal').textContent  = '\u20b9' + formatNum(subtotal);
  document.getElementById('r-gst').textContent       = '\u20b9' + formatNum(gst);
  document.getElementById('r-total').textContent     = formatNum(total);

  document.getElementById('gst-note').textContent = isPerKg
    ? '* GST @ 18% applicable \u00b7 Rate shown is per kg' + (csbOn ? ' \u00b7 CSB-5 clearance \u20b950 included' : '')
    : '* GST @ 18% applicable \u00b7 Rate shown is total for this weight slab';

  calcVolumetric();
}

function toggleVolChecker() {
  const body    = document.getElementById('vol-body');
  const chevron = document.getElementById('vol-chevron');
  const isOpen  = body.classList.contains('open');
  body.classList.toggle('open', !isOpen);
  chevron.classList.toggle('open', !isOpen);
}

function calcVolumetric() {
  if (!_currentCalc || !_currentCalc.isPerKg) return;
  const L = parseFloat(document.getElementById('vol-l').value);
  const B = parseFloat(document.getElementById('vol-b').value);
  const H = parseFloat(document.getElementById('vol-h').value);
  if (isNaN(L)||isNaN(B)||isNaN(H)||L<=0||B<=0||H<=0) {
    document.getElementById('vol-result-grid').style.display = 'none';
    document.getElementById('vol-warning').classList.remove('show');
    document.getElementById('vol-recalc').classList.remove('show');
    return;
  }
  const grossWtRaw = parseFloat(document.getElementById('gross-weight').value);
  const grossWt    = (!isNaN(grossWtRaw) && grossWtRaw > 0) ? grossWtRaw : _currentCalc.slabMidpoint;
  const volWt      = (L * B * H) / 5000;
  const chargeWt   = Math.max(grossWt, volWt);

  document.getElementById('vol-gross-disp').textContent  = grossWt.toFixed(2) + ' kg';
  document.getElementById('vol-vol-disp').textContent    = volWt.toFixed(2) + ' kg';
  document.getElementById('vol-charge-disp').textContent = chargeWt.toFixed(2) + ' kg';
  document.getElementById('vol-result-grid').style.display = 'grid';

  if (volWt > grossWt) {
    document.getElementById('vol-charge-bold').textContent = chargeWt.toFixed(2);
    document.getElementById('vol-warning').classList.add('show');
    const surcharge = parseFloat(document.getElementById('war-surcharge').value) || 0;
    const csbOn     = document.getElementById('csb-toggle').checked;
    const newBase   = _currentCalc.baseRatePerKg * chargeWt;
    const newWar    = surcharge * chargeWt;
    const newSub    = newBase + newWar + (csbOn ? 50 : 0);
    const newTotal  = newSub * 1.18;
    document.getElementById('vol-recalc-val').textContent   = '\u20b9' + formatNum(newBase) + ' + war \u20b9' + formatNum(newWar);
    document.getElementById('vol-recalc-total').textContent = '\u20b9' + formatNum(newTotal);
    document.getElementById('vol-recalc').classList.add('show');
  } else {
    document.getElementById('vol-warning').classList.remove('show');
    document.getElementById('vol-recalc').classList.remove('show');
  }
}

function formatNum(n) { return n.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ','); }

function showResult() {
  const r = document.getElementById('result');
  r.style.display = 'none'; r.classList.remove('show');
  requestAnimationFrame(() => {
    r.style.display = 'block';
    requestAnimationFrame(() => r.classList.add('show'));
    r.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  });
}

function hideResult() {
  const r = document.getElementById('result');
  r.classList.remove('show');
  setTimeout(() => { if (!r.classList.contains('show')) r.style.display = 'none'; }, 350);
}

function setLoading(on) {
  const btn = document.getElementById('calc-btn');
  const txt = document.getElementById('btn-text');
  btn.disabled = on;
  txt.innerHTML = on
    ? '<div class="spinner"></div><span>Calculating\u2026</span>'
    : '<span>\ud83c\udde8\ud83c\udde6</span><span>Get Shipping Rate</span>';
}

function showFieldError(id)  { document.getElementById(id).classList.add('show'); }
function clearFieldError(id) { document.getElementById(id).classList.remove('show'); }

function resetForm() {
  fsaInput.value = ''; selectedFSA = null;
  document.getElementById('slab-select').value = '';
  document.getElementById('actual-weight').value = '';
  document.getElementById('actual-weight-tag').style.display = 'none';
  document.getElementById('gross-weight').value = '';
  document.getElementById('war-surcharge').value = '75';
  document.getElementById('csb-toggle').checked = false;
  ['vol-l','vol-b','vol-h'].forEach(id => document.getElementById(id).value = '');
  clearFieldError('fsa-err'); clearFieldError('slab-err');
  fsaInput.classList.remove('error');
  document.getElementById('slab-select').classList.remove('error');
  _currentCalc = null;
  hideResult(); closeAC();
}

function copyResult() {
  const zone  = document.getElementById('r-zone').textContent;
  const prov  = document.getElementById('r-prov').textContent;
  const slab  = document.getElementById('r-slab').textContent;
  const base  = document.getElementById('r-base').textContent;
  const war   = document.getElementById('r-war').textContent;
  const gst   = document.getElementById('r-gst').textContent;
  const total = document.getElementById('r-total').textContent;
  const text = 'Xindus Canada Shipping Rate\nZone: ' + zone + ' | Province: ' + prov +
    '\nWeight Slab: ' + slab + '\nBase Freight: ' + base + '\nWar Surcharge: ' + war +
    '\nGST (18%): ' + gst + '\nTotal Payable: \u20b9' + total;
  navigator.clipboard.writeText(text).then(() => {
    const btn = document.getElementById('copy-btn');
    btn.classList.add('copied'); btn.textContent = '\u2713';
    setTimeout(() => { btn.classList.remove('copied'); btn.textContent = '\ud83d\udccb'; }, 2200);
    showToast('Rate copied to clipboard!');
  });
}

function showToast(msg) {
  const el = document.getElementById('toast');
  el.textContent = msg; el.classList.add('show');
  setTimeout(() => el.classList.remove('show'), 3000);
}

document.getElementById('slab-select').addEventListener('keydown', e => { if (e.key === 'Enter') calculate(); });

/* ── ADMIN PANEL ── */
function openAdminModal() {
  document.getElementById('admin-overlay').classList.add('open');
  document.getElementById('admin-login-form').style.display = 'block';
  document.getElementById('admin-panel').classList.remove('open');
  document.getElementById('admin-id').value = '';
  document.getElementById('admin-pass').value = '';
  document.getElementById('admin-login-err').classList.remove('show');
  document.getElementById('admin-id').classList.remove('error');
  document.getElementById('admin-pass').classList.remove('error');
  setTimeout(() => document.getElementById('admin-id').focus(), 100);
}

function closeAdminModal() { document.getElementById('admin-overlay').classList.remove('open'); }

function adminLogin() {
  const id   = document.getElementById('admin-id').value.trim();
  const pass = document.getElementById('admin-pass').value;
  const err  = document.getElementById('admin-login-err');
  if (id === 'Canada_Rates' && pass === 'rohan_canada') {
    document.getElementById('admin-login-form').style.display = 'none';
    document.getElementById('admin-panel').classList.add('open');
    err.classList.remove('show');
    document.getElementById('admin-json-editor').value = JSON.stringify(RATE_CARD, null, 2);
  } else {
    err.classList.add('show');
    document.getElementById('admin-id').classList.add('error');
    document.getElementById('admin-pass').classList.add('error');
  }
}

document.getElementById('admin-pass').addEventListener('keydown', e => { if (e.key === 'Enter') adminLogin(); });

function handleAdminFileUpload(event) {
  const file = event.target.files[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = function(e) {
    document.getElementById('admin-json-editor').value = e.target.result;
    const st = document.getElementById('admin-status');
    st.textContent = 'File loaded. Click Apply Rates to activate.';
    st.className = 'admin-status success';
  };
  reader.onerror = function() {
    const st = document.getElementById('admin-status');
    st.textContent = 'Failed to read file.';
    st.className = 'admin-status error';
  };
  reader.readAsText(file);
}

function applyCustomRates() {
  const txt    = document.getElementById('admin-json-editor').value.trim();
  const status = document.getElementById('admin-status');
  try {
    const parsed = JSON.parse(txt);
    if (typeof parsed !== 'object' || Array.isArray(parsed)) throw new Error('Must be a JSON object');
    const keys = Object.keys(parsed);
    if (keys.length === 0) throw new Error('Rate card is empty');
    if (typeof parsed[keys[0]] !== 'object') throw new Error('Invalid rate card structure');
    RATE_CARD = parsed;
    localStorage.setItem('xindus_custom_rates', JSON.stringify(parsed));
    document.getElementById('custom-rates-badge').style.display = 'inline-flex';
    status.textContent = 'Custom rates applied and saved! ' + keys.length + ' slabs loaded.';
    status.className = 'admin-status success';
    showToast('Custom rates activated!');
  } catch(e) {
    status.textContent = 'Invalid JSON: ' + e.message;
    status.className = 'admin-status error';
  }
}

function resetToDefaultRates() {
  RATE_CARD = HARDCODED_RATE_CARD;
  localStorage.removeItem('xindus_custom_rates');
  document.getElementById('custom-rates-badge').style.display = 'none';
  document.getElementById('admin-json-editor').value = JSON.stringify(RATE_CARD, null, 2);
  const status = document.getElementById('admin-status');
  status.textContent = 'Rates reset to default hardcoded values.';
  status.className = 'admin-status success';
  showToast('Default rates restored');
}

document.getElementById('admin-overlay').addEventListener('click', function(e) { if (e.target === this) closeAdminModal(); });
</script>
</body>`;

const finalContent = part1 + '\n' + ZONE_MAP_LINE + '\n' + part2;
fs.writeFileSync('index.html', finalContent, 'utf8');
const stat = fs.statSync('index.html');
console.log('SUCCESS! File written:', stat.size, 'bytes');
