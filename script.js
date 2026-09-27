const P={
 value:{name:"Value",rate:2199,tag:"SMART CHOICE",intro:"A practical construction package focused on quality, functionality and controlled cost.",items:["Structural design & construction","Standard electrical and plumbing works","Quality flooring and wall finishes","Standard doors and windows","Painting and basic external works"]},
 premium:{name:"Premium",rate:2499,tag:"MOST POPULAR",intro:"A balanced package combining modern architecture, upgraded finishes and long-term durability.",items:["Everything in Value package","Superior flooring and sanitaryware","Upgraded doors, windows and fittings","Modern elevation design","Enhanced electrical and lighting provisions"]},
 luxury:{name:"Luxury",rate:2799,tag:"LIVE LUXURY",intro:"A premium specification package for distinctive design and high-end finishes.",items:["Everything in Premium package","High-end flooring and sanitaryware","Premium façade and elevation treatment","Smart-home ready provisions","Luxury fittings and enhanced finish options"]}
};
let selected="premium";
const $=id=>document.getElementById(id);
function openModal(id){$(id).classList.add("show")}
function closeModal(id){$(id).classList.remove("show")}
document.querySelectorAll(".card").forEach(c=>c.addEventListener("click",()=>showDetails(c.dataset.package)));
function showDetails(k){
 selected=k;const p=P[k];
 $("details").innerHTML=`<div class="tiny">${p.tag}</div><h2>${p.name} Package</h2><p>${p.intro}</p><div class="detail-price">₹${p.rate.toLocaleString("en-IN")} <small>/ sq.ft</small></div><div class="detail-grid">${p.items.map((x,i)=>`<div class="detail-box"><b>${i+1}. ${x}</b></div>`).join("")}</div><p class="muted">Final brands, specifications, exclusions and project terms should be confirmed in the BOQ/agreement.</p>`;
 openModal("detailsModal");
}
function openCalc(k){
 if(k) selected=k;
 $("package").value=P[selected].rate;
 openModal("calcModal"); update();
}
["navCalc","heroCalc","bannerCalc"].forEach(id=>$(id).addEventListener("click",()=>openCalc()));
$("detailCalc").addEventListener("click",()=>{closeModal("detailsModal");openCalc(selected)});
document.querySelectorAll(".x").forEach(x=>x.addEventListener("click",()=>closeModal(x.closest(".modal").id)));
document.querySelectorAll(".modal").forEach(m=>m.addEventListener("click",e=>{if(e.target===m)closeModal(m.id)}));
$("packagesBtn").addEventListener("click",()=>document.querySelector("#packages").scrollIntoView({behavior:"smooth"}));
$("autoSetback").addEventListener("click",()=>{
 const road=Number($("road").value)||0;
 $("front").value=road<=12?5:6;
 $("rear").value=3;$("left").value=3;$("right").value=3;
 update();
});
$("areaMode").addEventListener("change",()=>{$("manualWrap").classList.toggle("hidden",$("areaMode").value!=="manual");update()});
$("calcForm").addEventListener("input",update);$("calcForm").addEventListener("change",update);
function n(id,min=0){const v=Number($(id).value);return Number.isFinite(v)?Math.max(min,v):min}
function floorsCount(){
 const f=$("floors").value;
 return f==="G"||f==="Stilt+G"?1:f==="G+1"||f==="Stilt+G+1"?2:3;
}
function update(){
 const w=n("pw",5),d=n("pd",5),front=n("front"),rear=n("rear"),left=n("left"),right=n("right");
 const plot=w*d,fw=Math.max(0,w-left-right),fd=Math.max(0,d-front-rear),foot=Math.max(0,fw*fd);
 const floors=floorsCount(), areaMode=$("areaMode").value;
 const built=areaMode==="manual"?n("manualArea",100):foot*floors;
 const rate=n("package",1),cost=built*rate;
 $("plotResult").textContent=plot.toLocaleString("en-IN")+" sq.ft";
 $("footprintResult").textContent=Math.round(foot).toLocaleString("en-IN")+" sq.ft";
 $("builtResult").textContent=Math.round(built).toLocaleString("en-IN")+" sq.ft";
 $("costResult").textContent="₹"+Math.round(cost).toLocaleString("en-IN");
}
function summary(){
 const w=n("pw",5),d=n("pd",5),f=$("front").value,r=$("rear").value,l=$("left").value,rr=$("right").value;
 const floor=$("floors").value,bhk=$("bhk").value,rate=n("package",1);
 const vastu=$("vastu").checked?`Vastu enabled: NE ${$("ne").value}, SE ${$("se").value}, SW ${$("sw").value}, NW ${$("nw").value}.`:"Vastu not enabled.";
 return `SIVA SAI CONSTRUCTIONS - PRELIMINARY HOUSE PLAN\\nPlot: ${w}' x ${d}' | Facing: ${$("facing").value} | Road: ${$("road").value}'\\nBuilding: ${floor} | ${bhk} | Parking: ${$("parking").value}\\nSetbacks: Front ${f}', Rear ${r}', Left ${l}', Right ${rr}'\\nStair: ${$("stairs").value} | Lift: ${$("lift").checked?"Yes":"No"} | OTS: ${$("ots").checked?"Yes":"No"} | Balcony: ${$("balcony").checked?"Yes":"No"}\\n${vastu}\\nPackage rate: ₹${rate.toLocaleString("en-IN")}/sq.ft`;
}
$("promptBtn").addEventListener("click",async()=>{
 const s=summary()+`\\n\\nCreate a professional 2D architectural floor plan. Treat all dimensions and requirements above as strict. Show dimensions in feet and inches, parking at the road/front side, logical circulation, ventilation and staircase direction. Do not change plot dimensions.`;
 try{await navigator.clipboard.writeText(s);$("promptBtn").textContent="Copied ✓";setTimeout(()=>$("promptBtn").textContent="Copy Floor Plan Prompt",1500)}catch(e){alert(s)}
});
$("quoteBtn").addEventListener("click",async()=>{
 update();const s=summary()+`\\nEstimated built-up area: ${$("builtResult").textContent}\\nIndicative construction cost: ${$("costResult").textContent}`;
 try{await navigator.clipboard.writeText(s);$("quoteBtn").textContent="Copied ✓";setTimeout(()=>$("quoteBtn").textContent="Copy Quote Summary",1500)}catch(e){alert(s)}
});
update();
