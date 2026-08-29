const products=[
 {id:1,name:"Лешника",sku:"BC-353-500-СЛЭГ",volume:500,cat:"vodka",height:"219 мм",diameter:"62,2 мм",desc:"Бутылка из бесцветного стекла для алкогольной продукции."},
 {id:2,name:"Стужа",sku:"КПМ-30-700-СТУЖ",volume:700,cat:"vodka",height:"255 мм",diameter:"70,2 мм",desc:"Стеклянная бутылка 700 мл с классическими пропорциями."},
 {id:3,name:"Серебро",sku:"КПМ-26-700-СSRB",volume:700,cat:"vodka",height:"255 мм",diameter:"70,2 мм",desc:"Бутылка 700 мл для алкогольной продукции."},
 {id:4,name:"Грани",sku:"B-25-2-250-СГРК",volume:250,cat:"liqueur",height:"—",diameter:"—",desc:"Компактная бутылка 250 мл для ликёрной и сувенирной продукции."},
 {id:5,name:"Классик 500",sku:"CAT-500-01",volume:500,cat:"cognac",height:"219 мм",diameter:"62,2 мм",desc:"Универсальная бутылка 500 мл."},
 {id:6,name:"Классик 700",sku:"CAT-700-01",volume:700,cat:"cognac",height:"255 мм",diameter:"70,2 мм",desc:"Универсальная бутылка 700 мл."},
 {id:7,name:"Литровая",sku:"CAT-1000-01",volume:1000,cat:"cognac",height:"300 мм",diameter:"80,6 мм",desc:"Бутылка объёмом 1 литр."},
 {id:8,name:"Фуд 500",sku:"CAT-500-F",volume:500,cat:"food",height:"219 мм",diameter:"62,2 мм",desc:"Бутылка для пищевой продукции и напитков."}
];
const catNames={vodka:"Водка",cognac:"Коньяк",liqueur:"Ликёр",food:"Пищевая продукция"};
const $=s=>document.querySelector(s);
function render(){
 const q=$("#search").value.toLowerCase().trim(), v=$("#volume").value, c=$("#category").value;
 const list=products.filter(p=>(!q||(p.name+" "+p.sku+" "+catNames[p.cat]).toLowerCase().includes(q))&&(!v||p.volume==v)&&(!c||p.cat==c));
 $("#counter").textContent=`Найдено: ${list.length}`;
 $("#products").innerHTML=list.map(p=>`
 <article class="card">
   <div class="card-img"><div class="mini-bottle"></div></div>
   <div class="card-body">
    <span class="tag">${catNames[p.cat]}</span>
    <h3>${p.name}</h3><div class="sku">${p.sku}</div>
    <div class="specs"><span>${p.volume} мл</span><span>${p.diameter}</span></div>
    <button onclick="details(${p.id})">Подробнее</button>
   </div>
 </article>`).join("")||"<p>По вашему запросу ничего не найдено.</p>";
}
function details(id){
 const p=products.find(x=>x.id===id);
 $("#modalContent").innerHTML=`<div class="eyebrow">${catNames[p.cat]}</div><h2>${p.name}</h2><p><b>Артикул:</b> ${p.sku}</p><p><b>Номинальный объём:</b> ${p.volume} мл</p><p><b>Высота:</b> ${p.height}</p><p><b>Диаметр корпуса:</b> ${p.diameter}</p><p>${p.desc}</p><button class="btn" onclick="requestProduct('${p.sku}')">Запросить цену</button>`;
 $("#modal").classList.add("open");
}
function requestProduct(sku){$("#productField").value=sku;$("#modal").classList.remove("open");location.hash="contacts";}
$("#search").addEventListener("input",render);$("#volume").addEventListener("change",render);$("#category").addEventListener("change",render);
document.querySelector(".close").onclick=()=>$("#modal").classList.remove("open");
$("#modal").addEventListener("click",e=>{if(e.target.id==="modal")$("#modal").classList.remove("open")});
$("#leadForm").addEventListener("submit",e=>{e.preventDefault();alert("Заявка подготовлена. Подключите обработчик формы перед публикацией.");});
render();