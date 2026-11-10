(function(){
  var root=document.documentElement;
  var reduce=matchMedia('(prefers-reduced-motion: reduce)').matches;
  var $=function(s,c){return (c||document).querySelector(s)};
  var $$=function(s,c){return Array.prototype.slice.call((c||document).querySelectorAll(s))};

  // nav + progress + hero parallax
  var nav=$('#nav'),prog=$('#progress'),heroImg=$('#heroImg img');
  function onScroll(){
    var y=scrollY,h=document.documentElement.scrollHeight-innerHeight;
    if(prog)prog.style.width=(h>0?y/h*100:0)+'%';
    if(nav)nav.classList.toggle('scrolled',y>30);
    if(!reduce&&heroImg&&y<1200)heroImg.style.transform='scale(1.08) translateY('+(y*0.08)+'px)';
  }
  addEventListener('scroll',onScroll,{passive:true});onScroll();

  // mobile menu
  var burger=$('#burger'),mm=$('#mobileMenu'),mClose=$('#mobileClose');
  function setMenu(o){if(!mm)return;mm.classList.toggle('open',o);burger.setAttribute('aria-expanded',o);document.body.classList.toggle('menu-open',o)}
  if(burger&&mm){
    burger.addEventListener('click',function(){setMenu(!mm.classList.contains('open'))});
    if(mClose)mClose.addEventListener('click',function(){setMenu(false)});
    $$('a',mm).forEach(function(a){a.addEventListener('click',function(){setMenu(false)})});
    addEventListener('keydown',function(e){if(e.key==='Escape')setMenu(false)});
  }

  // desktop dropdowns (click for touch / keyboard, hover handled in CSS)
  $$('.dd > button').forEach(function(b){
    b.addEventListener('click',function(e){
      e.stopPropagation();var d=b.parentElement,o=!d.classList.contains('open');
      $$('.dd.open').forEach(function(x){x.classList.remove('open');x.firstElementChild.setAttribute('aria-expanded',false)});
      d.classList.toggle('open',o);b.setAttribute('aria-expanded',o);
    });
  });
  document.addEventListener('click',function(){$$('.dd.open').forEach(function(x){x.classList.remove('open');x.firstElementChild.setAttribute('aria-expanded',false)})});

  // galleries: data-gallery="marquee" (two scrolling rows) or "grid"
  var lb=$('#lightbox');
  function openLb(src){if(!lb)return;$('img',lb).src=src;lb.classList.add('open')}
  if(lb){
    lb.addEventListener('click',function(){lb.classList.remove('open')});
    addEventListener('keydown',function(e){if(e.key==='Escape')lb.classList.remove('open')});
  }
  $$('[data-gallery]').forEach(function(box){
    var from=+box.dataset.from||1,to=+box.dataset.to||24,imgs=[];
    for(var i=from;i<=to;i++)imgs.push('/img/g'+(i<10?'0':'')+i+'.webp');
    function item(src,hidden){
      var d=document.createElement('div');d.className='g-item';
      d.innerHTML='<img src="'+src+'" alt="Geslaagde leerling van Rijschool 010" loading="lazy">';
      if(hidden)d.setAttribute('aria-hidden','true');
      d.addEventListener('click',function(){openLb(src)});
      return d;
    }
    if(box.dataset.gallery==='grid'){
      imgs.forEach(function(src){box.appendChild(item(src))});
      return;
    }
    var half=Math.ceil(imgs.length/2);
    [imgs.slice(0,half),imgs.slice(half)].forEach(function(set,ri){
      var row=document.createElement('div');row.className='g-row'+(ri?' rev':'');
      set.concat(set).forEach(function(src,k){row.appendChild(item(src,k>=set.length))});
      box.appendChild(row);
    });
  });

  // reveal + stagger
  $$('.rv').forEach(function(el){
    var idx=Array.prototype.indexOf.call(el.parentElement.children,el);
    el.style.transitionDelay=Math.min(idx,6)*70+'ms';
  });
  var io=new IntersectionObserver(function(es){
    es.forEach(function(e){if(e.isIntersecting){var t=e.target;t.classList.add('in');io.unobserve(t);setTimeout(function(){t.style.transitionDelay=''},1400)}});
  },{threshold:.12,rootMargin:'0px 0px -40px 0px'});
  $$('.rv,.steps').forEach(function(el){io.observe(el)});

  // counters
  var cio=new IntersectionObserver(function(es){
    es.forEach(function(e){
      if(!e.isIntersecting)return;cio.unobserve(e.target);
      var el=e.target,end=parseFloat(el.dataset.count),dec=+(el.dataset.dec||0),plain=el.hasAttribute('data-plain');
      var start=plain?end-15:0,t0=null,dur=1600;
      if(reduce)return;
      function step(t){if(!t0)t0=t;var p=Math.min((t-t0)/dur,1),v=start+(end-start)*(1-Math.pow(1-p,3));
        el.textContent=dec?v.toFixed(dec).replace('.',','):Math.round(v);if(p<1)requestAnimationFrame(step)}
      requestAnimationFrame(step);
    });
  },{threshold:.6});
  $$('[data-count]').forEach(function(el){cio.observe(el)});

  // FAQ
  $$('.faq button').forEach(function(b){
    b.addEventListener('click',function(){var f=b.parentElement,o=f.classList.toggle('open');b.setAttribute('aria-expanded',o)});
  });

  // tilt + magnetic (pointer devices only)
  if(!reduce&&matchMedia('(hover:hover)').matches){
    $$('.tilt').forEach(function(c){
      c.addEventListener('mousemove',function(e){var r=c.getBoundingClientRect(),x=(e.clientX-r.left)/r.width-.5,y=(e.clientY-r.top)/r.height-.5;
        c.style.transform='perspective(800px) rotateY('+x*8+'deg) rotateX('+(-y*8)+'deg) translateY(-4px)'});
      c.addEventListener('mouseleave',function(){c.style.transform=''});
    });
    $$('.magnetic').forEach(function(m){
      m.addEventListener('mousemove',function(e){var r=m.getBoundingClientRect();
        m.style.transform='translate('+(e.clientX-r.left-r.width/2)*.18+'px,'+(e.clientY-r.top-r.height/2)*.25+'px)'});
      m.addEventListener('mouseleave',function(){m.style.transform=''});
    });
  }

  // preselect form options from links: /contact/?instructeur=vrouw&pakket=compleet&auto=schakel
  var q=new URLSearchParams(location.search);
  function pick(name,val){var i=$('input[name="'+name+'"][value="'+val+'"]');if(i)i.checked=true;var s=$('select[name="'+name+'"]');if(s)s.value=val}
  if(q.get('instructeur')==='vrouw')pick('instr','Vrouwelijke instructrice');
  if(q.get('auto')==='schakel')pick('auto','Schakel');
  if(q.get('pakket'))pick('pakket',q.get('pakket'));
  $$('[data-pick-lady]').forEach(function(a){a.addEventListener('click',function(){var r=$('#pickLady');if(r)r.checked=true})});

  // form: Web3Forms als er een key is, anders demo (direct naar /bedankt/)
  var form=$('#form');
  if(form)form.addEventListener('submit',function(e){
    e.preventDefault();
    var bad=null;$$('[required]',form).forEach(function(i){i.style.borderColor='';if(!i.value.trim()){i.style.borderColor='var(--pink)';bad=bad||i}});
    if(bad){bad.focus();return}
    var key=form.getAttribute('data-key');
    if(!key){location.href='/bedankt/';return}
    var btn=form.querySelector('button[type=submit]'),txt=btn.innerHTML,old=form.querySelector('.form-err');
    if(old&&old.parentNode)old.parentNode.removeChild(old);
    btn.disabled=true;btn.textContent='Versturen...';
    var data=new FormData(form);data.append('access_key',key);
    if(data.get('naam'))data.set('name',data.get('naam'));
    if(data.get('mail'))data.set('email',data.get('mail'));
    fetch('https://api.web3forms.com/submit',{method:'POST',headers:{Accept:'application/json'},body:data})
      .then(function(r){return r.json()})
      .then(function(res){if(res&&res.success){location.href='/bedankt/'}else{throw 0}})
      .catch(function(){
        btn.disabled=false;btn.innerHTML=txt;
        var p=document.createElement('p');p.className='form-err';
        p.innerHTML='Versturen lukte niet. Stuur ons een <a href="https://wa.me/31638661729">WhatsApp</a> of bel <a href="tel:+31638661729">06 - 38 66 17 29</a>.';
        btn.insertAdjacentElement('afterend',p);
      });
  });

  // hero flakes (blue/pink particles)
  var cv=$('#flakes');
  if(cv&&!reduce){
    var ctx=cv.getContext('2d'),W,H,dpr=Math.min(devicePixelRatio||1,2),P=[];
    function size(){W=cv.offsetWidth;H=cv.offsetHeight;cv.width=W*dpr;cv.height=H*dpr;ctx.setTransform(dpr,0,0,dpr,0,0)}
    size();addEventListener('resize',size);
    var n=W<700?24:(+cv.dataset.n||60);
    for(var j=0;j<n;j++)P.push({x:Math.random()*W,y:Math.random()*H,r:Math.random()*2.6+.6,vy:Math.random()*.35+.1,vx:(Math.random()-.5)*.25,a:Math.random()*Math.PI*2,c:Math.random()<.55?'blue':'pink'});
    var mx=-999,my=-999;addEventListener('mousemove',function(e){var r=cv.getBoundingClientRect();mx=e.clientX-r.left;my=e.clientY-r.top});
    var visible=true;new IntersectionObserver(function(es){visible=es[0].isIntersecting}).observe(cv);
    (function loop(){
      requestAnimationFrame(loop);if(!visible)return;
      var cs=getComputedStyle(root),cb=cs.getPropertyValue('--blue').trim(),cp=cs.getPropertyValue('--pink').trim();
      ctx.clearRect(0,0,W,H);
      P.forEach(function(p){
        p.a+=.01;p.y+=p.vy;p.x+=p.vx+Math.sin(p.a)*.3;
        var dx=p.x-mx,dy=p.y-my,d=Math.hypot(dx,dy);if(d<110){p.x+=dx/d*1.6;p.y+=dy/d*1.6}
        if(p.y>H+10){p.y=-10;p.x=Math.random()*W}if(p.x<-10)p.x=W+10;if(p.x>W+10)p.x=-10;
        ctx.globalAlpha=.25+Math.sin(p.a*2)*.2+.25;ctx.fillStyle=p.c==='blue'?cb:cp;
        ctx.beginPath();ctx.arc(p.x,p.y,p.r,0,Math.PI*2);ctx.fill();
      });
    })();
  }
})();
