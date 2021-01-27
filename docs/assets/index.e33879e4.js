import{r as e,c as t,a as o,p as r,b as a,o as i,d as n,e as s,t as l,w as c,f as d,g as u,F as m,h as f,i as p,j as h,k as y,l as v,m as w,T as g,n as b,q as D}from"./vendor.8da4a569.js";!function(e=".",t="__import__"){try{self[t]=new Function("u","return import(u)")}catch(o){const r=new URL(e,location),a=e=>{URL.revokeObjectURL(e.src),e.remove()};self[t]=e=>new Promise(((o,i)=>{const n=new URL(e,r);if(self[t].moduleMap[n])return o(self[t].moduleMap[n]);const s=new Blob([`import * as m from '${n}';`,`${t}.moduleMap['${n}']=m;`],{type:"text/javascript"}),l=Object.assign(document.createElement("script"),{type:"module",src:URL.createObjectURL(s),onerror(){i(new Error(`Failed to import: ${e}`)),a(l)},onload(){o(self[t].moduleMap[n]),a(l)}});document.head.appendChild(l)})),self[t].moduleMap={}}}("/stardew-valley-mod-manager/assets/");function P(e){e.prototype.symbol=Symbol(e.name)}const k=(e,t)=>{let o=0,r=0;const a=[[]];for(const i of e)a[r]||(a[r]=[]),a[r].push(i),o++,o===t&&(r++,o=0);return a};function M(){return new Worker("/stardew-valley-mod-manager/assets/file-system.d0695737.js",{type:"module"})}class F{static async getDirectory(e,t=!1,o=e.name,r=e){const a={name:o,handle:e,parentHandle:r||null,directories:{},files:{}},i=await this.getFile(e,"manifest.json");for await(const n of e.values())if("file"===n.kind)a.files[n.name]=n;else if("directory"===n.kind){if(""===n.name)continue;if(t){a.directories[n.name]=await this.getDirectory(n,t,n.name,e);continue}if(i){a.directories[n.name]={name:n.name,handle:n,parentHandle:r||e,directories:{},files:{}};continue}a.directories[n.name]=await this.getDirectory(n,t,n.name,e)}return a}static getDirectoryArray(e,t=e.name){const o={directories:[],files:[]},r=e=>{o.files.push(e)},a=(e,t="",i=`${t}/${e.name}`)=>{var n;n={name:e.name,parentDirectoryPath:t,directoryPath:i},o.directories.push(n);const s=Object.values(e.files),l=Object.values(e.directories);if(s.length)for(const o of s)r({name:o.name,directoryPath:i,handle:o});if(l.length)for(const o of l)a(o,i)};return a(e,"",e.name),o}static async getFolder(e){const t=e||await window.showDirectoryPicker();return this.getDirectory(t)}static async getFile(e,t,o=!1){let r=null;try{r=await e.getFileHandle(t,{create:o})}catch(a){}return r}static async deleteFolder(e,t){await e.removeEntry(t,{recursive:!0})}static async DEBUG_getHandles(e){console.log(e);for(let t=0;t<5;t++){const o=await e.getFileHandle(`handle${t}`,{create:!0}),r=`${performance.now()}`;console.time(`${r}-creatStream`);const a=await o.createWritable({keepExistingData:!1});console.timeEnd(`${r}-creatStream`),console.time(`${r}-writeFile`),await a.write("hello"),console.timeEnd(`${r}-writeFile`),console.time(`${r}-closeFile`),await a.close(),console.timeEnd(`${r}-closeFile`)}}static async populateDirectory(e,t){const o=new M;o.postMessage({type:"createDirectoryFiles",parentHandle:e,directoryToCreate:t}),await new Promise((e=>{o.onmessage=t=>{"createDirectoryFiles:done"===t.data&&e()}})),o.terminate();for(const r of Object.values(t.directories)){const t=performance.now();this.directoryHandles[t]=await this.createDirectory(e,r.name),await this.populateDirectory(this.directoryHandles[t],r),this.directoryHandles[t]=null}}static async populateDirectoryArray(e,t){const o=this.getDirectoryArray(t),r=k(o.directories,10),a=k(o.files,20),i={};for(const s of r)for(const t of s){const o=await this.createDirectory(i[t.parentDirectoryPath]||e,t.name);i[t.directoryPath]=o}const n=new M;for(const s of a){const e=[];for(const t of s)e.push({name:t.name,contents:await this.getFileContents(t.handle),parentHandle:i[t.directoryPath]});n.postMessage({type:"createDirectoryFile",payload:e}),await new Promise((e=>{n.onmessage=t=>{"createDirectoryFile:done"===t.data&&e()}})),await new Promise((e=>setTimeout((()=>e()),150)))}n.terminate()}static async copyFolder(e,t,o){const r=await this.getDirectory(e,!0);r.name=o,await this.populateDirectoryArray(t,r)}static async renameFolder(e,t,o){await this.copyFolder(e,t,o),await this.deleteFolder(t,e.name)}static async createDirectory(e,t){return e.getDirectoryHandle(t,{create:!0})}static async createFile(e,t){return this.getFile(e,t,!0)}static async addFolder(e,t){}static async requestPermission(e,t="readwrite"){await e.requestPermission({mode:t})}static async getFileContents(e){let t;if(null==e?void 0:e.content)t=new Blob([e.content]);else if("file"===(null==e?void 0:e.kind)){const o=await e.getFile();t=new Blob([await o.text()])}return t}}F.fileHandles={},F.directoryHandles={};var _=Object.defineProperty,j=Object.getOwnPropertyDescriptor;let O=class{constructor(){this.mods=e({directories:{},mods:{}}),this._profiles=e({}),this.profiles=t((()=>Object.values(this._profiles))),this._modDirectory=o(null),this._currentProfile=o(null),this.currentProfile=t((()=>this._profiles[this._currentProfile.value]?this._profiles[this._currentProfile.value]:null)),this.currentProfileName=t((()=>{var e,t;return null==(t=null==(e=null==this?void 0:this.currentProfile)?void 0:e.value)?void 0:t.name}))}get modDirectory(){return this._modDirectory}async setModDirectory(e){this._modDirectory.value=e,F.requestPermission(e.handle)}setCurrentProfile(e){this._currentProfile.value="string"!=typeof e?e.name:e}async getMods(){var e,t;for(const i in this.mods.mods)delete this.mods.mods[i];for(const i in this.mods.directories)delete this.mods.directories[i];for(const i in this._profiles)delete this._profiles[i];const o=null==(t=null==(e=this.modDirectory)?void 0:e.value)?void 0:t.handle,r=await F.getFolder(o);if(this.setModDirectory(r),0===Object.keys(r.directories).length)return;const a=await this.sortDirectoryIntoProfiles(r);if(!this._currentProfile.value){let e=Object.values(a).find((e=>e.active));e||(e=Object.values(a)[0]),this.setCurrentProfile(e)}Object.assign(this._profiles,a)}async sortDirectoryIntoProfiles(e){const t={},o=async(e,t=!0)=>{var r;let a={};if(null==(r=null==e?void 0:e.files)?void 0:r["manifest.json"]){const t=await e.files["manifest.json"].getFile(),o=await t.text(),r=JSON.parse(this.sanitiseJson(o));return a[r.Name]={name:r.Name,author:r.Author,version:r.Version,description:r.Description,configFile:e.files["config.json"]||null,manifestFile:e.files["manifest.json"]||null,files:e.files,directoryHandle:e.handle,parentDirectoryHandle:e.parentHandle,directoryName:e.name,active:!/^\./.test(e.name)},a}const i=Object.values(e.directories);for(const n of i){const e=await o(n);a={...a,...t?e:{}}}return a};let r={};for(const a of Object.values(e.directories)){const e=await o(a,!1);r={...r,...e}}Object.values(r).length&&(t.Default={name:"Default",key:"Default",active:!0,mods:r,directory:e.handle,parentDirectory:e.handle});for(const[a,i]of Object.entries(e.directories)){if(i.files["manifest.json"])continue;let e=a,r=!0;"."===a[0]&&(e=a.substr(1,a.length),t.Default||(r=!1)),t[e]||(t[e]={name:e,key:a,active:r,mods:{},directory:i.handle,parentDirectory:i.parentHandle}),t[e].mods=await o(i)}return t}async createProfile(e){await F.createDirectory(this.modDirectory.value.handle,e),await this.getMods(),await this.setActiveProfile(this._profiles[e])}async deleteMod(e){await F.deleteFolder(e.parentDirectoryHandle,e.directoryName),await this.getMods()}setModActiveStatus(e,t){e.active=t}async toggleMod(e){await F.requestPermission(e.parentDirectoryHandle),e.active?(await F.copyFolder(e.directoryHandle,e.parentDirectoryHandle,`.${e.directoryHandle.name}`),this.setModActiveStatus(e,!1)):(await F.copyFolder(e.directoryHandle,e.parentDirectoryHandle,e.directoryHandle.name.substr(1)),this.setModActiveStatus(e,!0)),await F.deleteFolder(e.parentDirectoryHandle,e.directoryHandle.name),await this.getMods()}async setActiveProfile(e){if("Default"===e.name)return void this.setCurrentProfile(e);if("Default"===this.currentProfile.value.name){"."===e.key[0]&&await F.renameFolder(e.directory,e.parentDirectory,e.name);const t=Object.values(this.profiles.value).filter((e=>"Default"!==e.name&&"."!==e.key[0]));return await Promise.all(t.map((async e=>{const t=`.${e.key}`;return F.renameFolder(e.directory,e.parentDirectory,t)}))),await this.getMods(),void this.setCurrentProfile(e)}if(this.currentProfile.value.name===e.name)return;const t=`.${this.currentProfile.value.name}`;await Promise.all([F.renameFolder(this.currentProfile.value.directory,this.currentProfile.value.parentDirectory,t),"."===e.key[0]?F.renameFolder(e.directory,e.parentDirectory,e.name):null]),await this.getMods(),this.setCurrentProfile(e)}sanitiseJson(e){return e.replace(/\s/g,"").replace(/\r/g,"").replace(/\n/g,"").replace(/\,\}/g,"}")}};O=((e,t,o,r)=>{for(var a,i=r>1?void 0:r?j(t,o):t,n=e.length-1;n>=0;n--)(a=e[n])&&(i=(r?a(t,o,i):a(i))||i);return r&&i&&_(t,o,i),i})([P],O);const C=new O;class H{static extract(e){return window.zip.workerScriptsPath="/stardew-valley-mod-manager/js/zip.js/",new Promise(((t,o)=>{zip.createReader(new zip.BlobReader(e),(e=>{e.getEntries((async r=>{try{const o=await this.sortEntries(r);e.close((()=>{t(o)}))}catch(a){e.close((()=>{o(a)}))}}))}),o)}))}static async sortEntries(e){let t={name:"root",files:{},directories:{}};const o=(e,o=!1)=>{const r=e.split("/");if(1===r.length)return t;o||r.pop();for(let i=t,n=0,s=r.length;n<s;n++)i.directories[r[n]]||(i.directories[r[n]]={name:r[n],directories:{},files:{}}),i=i.directories[r[n]];let a=t;for(const t of r)a=a.directories[t];return a};for(let r of e){const e=r.filename,t=r.filename.split("/").pop();if(""===t)continue;const a=o(e,r.directory);if(!r.directory){let e=await this.readEntryContent(r);a.files[t]={name:t,content:e}}}return t}static readEntryContent(e){return new Promise((t=>{let o;switch(e.filename.split(".")[1]){case"json":case"txt":o=new zip.TextWriter("utf-8");break;default:o=new zip.BlobWriter("binary")}e.getData(o,(e=>{t(e)}),((e,t)=>{}))}))}}var S={name:"mod-list-bar",setup(){t((()=>C.currentProfile.value));return{getMods:()=>C.getMods(),uploadZipFile:async()=>{const e=C.currentProfile;try{const[t]=await window.showOpenFilePicker({}),o=await t.getFile(),r=await H.extract(o);r.name=o.name.split(".")[0],await F.populateDirectoryArray(e.value.directory,r),await C.getMods()}catch(t){console.log(t)}},modDirectory:C.modDirectory,currentProfileName:C.currentProfileName}}};const $=c("data-v-5863b606");r("data-v-5863b606");const x={class:"mod-list-bar"},A={key:0},N={key:1},E={key:0,class:"placeholder"},L={key:1},U=s("i",{class:"btn-icon plus"},null,-1),I=d(" Upload ");a();const R=$(((e,t,o,r,a,c)=>{var d;return i(),n("div",x,[s("button",{class:"mod-list-bar-btn",onClick:t[1]||(t[1]=(...e)=>r.getMods&&r.getMods(...e))},[r.modDirectory?(i(),n("span",N,"Refresh")):(i(),n("span",A,"Choose Folder"))]),s("p",{class:"folder-name",onClick:t[2]||(t[2]=(...e)=>r.getMods&&r.getMods(...e))},[r.modDirectory?(i(),n("span",L,l(null==(d=r.modDirectory)?void 0:d.name),1)):(i(),n("span",E,"Please choose folder"))]),s("button",{onClick:t[3]||(t[3]=(...e)=>r.uploadZipFile&&r.uploadZipFile(...e)),class:["btn mod-list-bar-btn",{disabled:!r.modDirectory||!r.currentProfileName}],disabled:!r.modDirectory},[U,I],10,["disabled"])])}));S.render=R,S.__scopeId="data-v-5863b606";var W=u({name:"mod-list",components:{"mod-list-bar":S},setup:()=>({mods:t((()=>C.currentProfile.value?Object.values(C.currentProfile.value.mods).sort():[])),onDeleteMod:async e=>{C.deleteMod(e)},toggleMod:async e=>{await C.toggleMod(e)},currentProfile:t((()=>C.currentProfile.value)),modDirectory:C.modDirectory})}),z="/stardew-valley-mod-manager/images/sprites/icons/junimo.png";const B=c("data-v-54669928");r("data-v-54669928");const T={class:"mod-list-component"},q={key:0,class:"mod-table"},Z={class:"controls pre-contols"},J={class:"mod-name"},V={class:"controls post-controls"},G=s("i",{class:"btn-icon"},null,-1),Y=d(" Delete "),K={key:1,class:"section-no-things",id:"no-mod-directory"},Q=s("h2",null,"Please choose your mod folder!",-1),X=s("p",null,"Choose your mod folder above. This is main folder you want all your mods to be in!",-1),ee=s("img",{src:z,alt:"Oops!"},null,-1),te={key:2,class:"section-no-things",id:"no-profiles"},oe=s("h2",null,"Looks like you don't have any profiles yet!",-1),re=s("p",null,"You can create a new profile in the navbar 👆",-1),ae=s("img",{src:z,alt:"Oops!"},null,-1),ie={key:3,class:"section-no-things",id:"no-mods"},ne=s("h2",null,"Looks like you don't have any mods installed!",-1),se=s("p",null,"You can use the Upload button above to add a new mod!",-1),le=s("p",null,"Mods will also appear here if you place them into your profile folder.",-1),ce=s("img",{src:z,alt:"Oops!"},null,-1);a();const de=B(((e,t,o,r,a,c)=>{const d=y("mod-list-bar");return i(),n("div",T,[s(d),e.mods.length?(i(),n("div",q,[s("form",{onSubmit:t[1]||(t[1]=p((()=>{}),["prevent"]))},[(i(!0),n(m,null,f(e.mods,(t=>(i(),n("div",{class:"mod",key:t.name},[s("div",Z,[s("input",{onChange:p((o=>e.toggleMod(t)),["prevent"]),type:"checkbox",value:t.name,id:t.name+"check",checked:t.active},null,40,["onChange","value","id","checked"])]),s("p",J,[s("label",{for:t.name+"check"},l(t.name),9,["for"])]),s("div",V,[s("button",{class:"btn delete",onClick:o=>e.onDeleteMod(t)},[G,Y],8,["onClick"])])])))),128))],32)])):h("",!0),e.modDirectory||e.currentProfile?h("",!0):(i(),n("section",K,[Q,X,ee])),e.modDirectory&&!e.currentProfile?(i(),n("section",te,[oe,re,ae])):h("",!0),e.modDirectory&&e.currentProfile&&!e.mods.length?(i(),n("section",ie,[ne,se,le,ce])):h("",!0)])}));W.render=de,W.__scopeId="data-v-54669928";var ue={name:"profile-select",setup(){const e=w("modalService"),r=o(!1),a=()=>{r.value=!1},i=t((()=>C.profiles.value.filter((e=>{var t;return(null==e?void 0:e.name)!==(null==(t=C.currentProfile.value)?void 0:t.name)}))));return{modDirectory:C.modDirectory,currentProfileName:C.currentProfileName,profiles:i,dropdownOpen:v(r),toggleDropdown:()=>{if(r.value)return a();r.value=!0},changeProfile:e=>{C.setActiveProfile(e),a()},createProfile:async t=>{await C.createProfile(t),e.hideModal("new-profile")}}}};const me=c("data-v-7c01f2c0");r("data-v-7c01f2c0");const fe={id:"profile-select"},pe={id:"profile-select",class:"btn"},he={class:"dropdown"},ye={id:"new-profile"},ve=s("p",null,"Please choose a name for your new profile",-1),we={type:"text",ref:"newProfileName"};a();const ge=me(((e,t,o,r,a,c)=>{const d=y("modal");return i(),n(m,null,[s("div",fe,[r.modDirectory&&!r.currentProfileName?(i(),n("button",{key:0,id:"profile-select",class:"btn",onClick:t[1]||(t[1]=t=>e.$modalService.showModal("new-profile"))}," Create new profile ")):h("",!0),r.modDirectory&&r.currentProfileName?(i(),n("div",{key:1,class:["btn-dropdown",{open:r.dropdownOpen}]},[s("button",pe,l(r.currentProfileName||"Profile name"),1),s("button",{onClick:t[2]||(t[2]=(...e)=>r.toggleDropdown&&r.toggleDropdown(...e)),class:"btn toggle"},"👇"),s("div",he,[s("ul",null,[(i(!0),n(m,null,f(r.profiles,(e=>(i(),n("li",{key:e.name,onClick:t=>r.changeProfile(e),class:"cursor-hover"},l(e.name),9,["onClick"])))),128)),s("li",{onClick:t[3]||(t[3]=t=>e.$modalService.showModal("new-profile")),class:"cursor-hover"},"Create new profile")])])],2)):h("",!0)]),(i(),n(g,{to:"#modals"},[s(d,{name:"new-profile"},{default:me((()=>[s("div",ye,[ve,s("input",we,null,512),s("button",{class:"btn",onClick:t[4]||(t[4]=t=>r.createProfile(e.$refs.newProfileName.value))},"Create profile")])])),_:1})]))],64)}));ue.render=ge,ue.__scopeId="data-v-7c01f2c0";var be=u({name:"svmm-header",components:{"profile-select":ue}});const De=c("data-v-354a69f3");r("data-v-354a69f3");const Pe={class:"header"},ke=s("div",{class:"seperator"},null,-1),Me=d(" v1.2 "),Fe=s("h1",null,"Updates",-1),_e=s("section",{id:"v1_2"},[s("h2",null,"v1.2"),s("ul",null,[s("li",null,"Fix a bug where if you have no profiles, the first you create won't be active")])],-1),je=s("section",{id:"v1_1"},[s("h2",null,"v1.1"),s("ul",null,[s("li",null,"Fix a bug where you can't change profile if you're on the Default profile"),s("li",null,"Fixes a bug that wrongly named mod folders when enabling/disabling mods"),s("li",null,"Adds a message when viewing on mobile"),s("li",null,"Updates the app notice board and adds link to new wiki!"),s("li",null,"Adds a message to the mod list when you haven't chosen your app folder yet"),s("li",null,"Adds a favicon")])],-1),Oe=s("section",{id:"v1_0"},[s("h2",null,"v1.0 (It's a Big World Outside) 🔥"),s("ul",null,[s("li",null,"Adding mods from a zip file"),s("li",null,"Adding mod profiles"),s("li",null,"Viewing installed mods")])],-1),Ce=s("a",{href:"https://github.com/svmm/stardew-valley-mod-manager",target:"_blank",class:"github"},[s("img",{src:"/stardew-valley-mod-manager/images/GitHub-Mark-Light-32px.png"})],-1);a();const He=De(((e,t,o,r,a,l)=>{const c=y("profile-select"),d=y("modal");return i(),n("div",Pe,[s(c),ke,s("button",{class:"btn",onClick:t[1]||(t[1]=t=>e.$modalService.showModal("changelog"))},[Me,(i(),n(g,{to:"#modals"},[s(d,{name:"changelog",id:"changelog-modal"},{default:De((()=>[Fe,_e,je,Oe])),_:1})]))]),Ce])}));be.render=He,be.__scopeId="data-v-354a69f3";var Se={name:"App",setup(){const e=async(t,o)=>{const r=await t.getDirectory(o.name,{create:!0});for(const[e,a]of Object.entries(o.files)){const t=await r.getFile(e,{create:!0}),o=await t.createWritable({keepExistingData:!1});await o.write(new Blob([a.content])),await o.close()}for(const a of Object.values(o.directories))await e(r,a);r.resolve()};return{chooseZipFile:async()=>{const t=C.modDirectory.value;try{const[o]=await showOpenFilePicker({accepts:[{extensions:[".zip"]}]}),r=await o.getFile(),a=await H.extract(r);a.name=r.name.split(".")[0],await e(t.handle,a),t.handle.resolve()}catch(o){console.log(o)}}}},components:{"mod-list":W,"svmm-header":be}};const $e=c("data-v-13288368");r("data-v-13288368");const xe=s("div",{class:"container"},[s("div",{class:"panel",id:"town-notice-board"},[s("h1",null,"Welcome to the Stardew Valley Mod Manager!"),s("p",null,"Hello farmer! Stay a while and look around!"),s("a",{href:"https://github.com/svmm/stardew-valley-mod-manager/wiki",target:"_blank"},"Check out the wiki if you're new here.")])],-1),Ae={class:"container space",id:"desktop"},Ne={class:"panel"},Ee=s("h2",null,"Mod list",-1),Le=s("div",{class:"panel",id:"load-order"},[s("h2",null,"Load Order"),s("img",{src:"/stardew-valley-mod-manager/images/sprites/icons/hat_mouse.png"}),s("p",null,"This section is not ready yet, okay poke!")],-1),Ue=s("div",{class:"container space",id:"mobile"},[s("div",{class:"panel"},[s("h2",null,"Sorry!"),s("p",null,"This app is not quite ready for mobile yet! It's best viewed on a desktop at the moment!"),s("img",{src:"/stardew-valley-mod-manager/images/sprites/icons/emote_sad.png",alt:"Not ready yet!"})])],-1);a();const Ie=$e(((e,t,o,r,a,l)=>{const c=y("svmm-header"),d=y("mod-list");return i(),n(m,null,[s(c),xe,s("div",Ae,[s("div",Ne,[Ee,s(d)]),Le]),Ue],64)}));Se.render=Ie,Se.__scopeId="data-v-13288368";var Re={name:"modal",props:["name"],setup(e){const t=w("modalService"),r=o(!1),a=()=>{r.value=!1};return t.addModal(e.name,{show:()=>{r.value=!0},hide:a}),{visible:v(r),hide:a}}};const We={key:0,class:"modal"};Re.render=function(e,t,o,r,a,s){return i(),n("div",{class:["overlay",{visible:r.visible}],onClick:t[1]||(t[1]=p(((...e)=>r.hide&&r.hide(...e)),["self"]))},[r.visible?(i(),n("div",We,[b(e.$slots,"default")])):h("",!0)],2)};var ze=Object.defineProperty,Be=Object.getOwnPropertyDescriptor;let Te=class{constructor(){this._modals=e({}),this._currentlyShownModal=o(null)}get modals(){return this._modals}get currentlyShownModal(){return this._currentlyShownModal}addModal(e,t){this._modals[e]&&console.warn(`Modal ${e} already exists`),this._modals[e]=t}hideModal(e){this._modals[e].hide(),this.currentlyShownModal.value=null}showModal(e){this.currentlyShownModal&&this.hideModal(e),this._modals[e].show(),this.currentlyShownModal.value=e}};Te=((e,t,o,r)=>{for(var a,i=r>1?void 0:r?Be(t,o):t,n=e.length-1;n>=0;n--)(a=e[n])&&(i=(r?a(t,o,i):a(i))||i);return r&&i&&ze(t,o,i),i})([P],Te);var qe={install:e=>{const t=new Te;e.config.globalProperties.$modalService={showModal:t.showModal.bind(t),hideModal:t.hideModal.bind(t),addModal:t.showModal.bind(t)},e.provide("modalService",t),e.component("modal",Re)}};"serviceWorker"in navigator&&window.location.hostname.includes("github")&&window.addEventListener("load",(()=>{navigator.serviceWorker.register("/stardew-valley-mod-manager/service-worker.js")}));const Ze=D(Se);Ze.use(qe),Ze.provide(C.symbol,C),Ze.mount("#app");
