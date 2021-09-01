var ie=Object.create;var G=Object.defineProperty;var re=Object.getOwnPropertyDescriptor;var se=Object.getOwnPropertyNames;var ne=Object.getPrototypeOf,ae=Object.prototype.hasOwnProperty;var Z=e=>G(e,"__esModule",{value:!0});var j=(e,t)=>()=>(t||e((t={exports:{}}).exports,t),t.exports),le=(e,t)=>{Z(e);for(var s in t)G(e,s,{get:t[s],enumerable:!0})},ce=(e,t,s)=>{if(t&&typeof t=="object"||typeof t=="function")for(let a of se(t))!ae.call(e,a)&&a!=="default"&&G(e,a,{get:()=>t[a],enumerable:!(s=re(t,a))||s.enumerable});return e},L=e=>ce(Z(G(e!=null?ie(ne(e)):{},"default",e&&e.__esModule&&"default"in e?{get:()=>e.default,enumerable:!0}:{value:e,enumerable:!0})),e);var H=j((k,I)=>{(function(e,t){typeof k=="object"&&typeof I!="undefined"?I.exports=t():typeof define=="function"&&define.amd?define(t):(e=typeof globalThis!="undefined"?globalThis:e||self,e.filesize=t())})(k,function(){"use strict";var e=/^(b|B)$/,t={iec:{bits:["b","Kib","Mib","Gib","Tib","Pib","Eib","Zib","Yib"],bytes:["B","KiB","MiB","GiB","TiB","PiB","EiB","ZiB","YiB"]},jedec:{bits:["b","Kb","Mb","Gb","Tb","Pb","Eb","Zb","Yb"],bytes:["B","KB","MB","GB","TB","PB","EB","ZB","YB"]}},s={iec:["","kibi","mebi","gibi","tebi","pebi","exbi","zebi","yobi"],jedec:["","kilo","mega","giga","tera","peta","exa","zetta","yotta"]},a={floor:Math.floor,ceil:Math.ceil};function n(c){var r=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{},o=[],f=0,i,d,p,m,B,v,w,y,z,u,g,b,S,M,x,$,O,P,U,q,E;if(isNaN(c))throw new TypeError("Invalid number");if(p=r.bits===!0,x=r.unix===!0,b=r.pad===!0,d=r.base||2,S=r.round!==void 0?r.round:x?1:2,w=r.locale!==void 0?r.locale:"",y=r.localeOptions||{},$=r.separator!==void 0?r.separator:"",O=r.spacer!==void 0?r.spacer:x?"":" ",U=r.symbols||{},P=d===2&&r.standard||"jedec",g=r.output||"string",B=r.fullform===!0,v=r.fullforms instanceof Array?r.fullforms:[],i=r.exponent!==void 0?r.exponent:-1,q=a[r.roundingMethod]||Math.round,u=Number(c),z=u<0,m=d>2?1e3:1024,E=isNaN(r.precision)===!1?parseInt(r.precision,10):0,z&&(u=-u),(i===-1||isNaN(i))&&(i=Math.floor(Math.log(u)/Math.log(m)),i<0&&(i=0)),i>8&&(E>0&&(E+=8-i),i=8),g==="exponent")return i;if(u===0)o[0]=0,M=o[1]=x?"":t[P][p?"bits":"bytes"][i];else{f=u/(d===2?Math.pow(2,i*10):Math.pow(1e3,i)),p&&(f=f*8,f>=m&&i<8&&(f=f/m,i++));var D=Math.pow(10,i>0?S:0);o[0]=q(f*D)/D,o[0]===m&&i<8&&r.exponent===void 0&&(o[0]=1,i++),M=o[1]=d===10&&i===1?p?"kb":"kB":t[P][p?"bits":"bytes"][i],x&&(o[1]=P==="jedec"?o[1].charAt(0):i>0?o[1].replace(/B$/,""):o[1],e.test(o[1])&&(o[0]=Math.floor(o[0]),o[1]=""))}if(z&&(o[0]=-o[0]),E>0&&(o[0]=o[0].toPrecision(E)),o[1]=U[o[1]]||o[1],w===!0?o[0]=o[0].toLocaleString():w.length>0?o[0]=o[0].toLocaleString(w,y):$.length>0&&(o[0]=o[0].toString().replace(".",$)),b&&Number.isInteger(o[0])===!1&&S>0){var A=$||".",K=o[0].toString().split(A),R=K[1]||"",Y=R.length,oe=S-Y;o[0]="".concat(K[0]).concat(A).concat(R.padEnd(Y+oe,"0"))}return B&&(o[1]=v[i]?v[i]:s[P][i]+(p?"bit":"byte")+(o[0]===1?"":"s")),g==="array"?o:g==="object"?{value:o[0],symbol:o[1],exponent:i,unit:M}:o.join(O)}return n.partial=function(c){return function(r){return n(r,c)}},n})});var Q=j((ye,J)=>{var pe=require("stream"),de=["write","end","destroy"],fe=["resume","pause"],ue=["data","close"],V=Array.prototype.slice;J.exports=me;function C(e,t){if(e.forEach)return e.forEach(t);for(var s=0;s<e.length;s++)t(e[s],s)}function me(e,t){var s=new pe,a=!1;return C(de,n),C(fe,c),C(ue,r),t.on("end",o),e.on("drain",function(){s.emit("drain")}),e.on("error",f),t.on("error",f),s.writable=e.writable,s.readable=t.readable,s;function n(i){s[i]=d;function d(){return e[i].apply(e,arguments)}}function c(i){s[i]=d;function d(){s.emit(i);var p=t[i];if(p)return p.apply(t,arguments);t.emit(i)}}function r(i){t.on(i,d);function d(){var p=V.call(arguments);p.unshift(i),s.emit.apply(s,p)}}function o(){if(!a){a=!0;var i=V.call(arguments);i.unshift("end"),s.emit.apply(s,i)}}function f(i){s.emit("error",i)}}});var ee=j((ze,h)=>{"use strict";var X=require("fs"),_=require("stream"),F=require("zlib"),{promisify:ge}=require("util"),be=Q(),N=e=>({level:9,...e}),he=ge(F.gzip);h.exports=async(e,t)=>e?(await he(e,N(t))).length:0;h.exports.sync=(e,t)=>F.gzipSync(e,N(t)).length;h.exports.stream=e=>{let t=new _.PassThrough,s=new _.PassThrough,a=be(t,s),n=0,c=F.createGzip(N(e)).on("data",r=>{n+=r.length}).on("error",()=>{a.gzipSize=0}).on("end",()=>{a.gzipSize=n,a.emit("gzip-size",n),s.end()});return t.pipe(c),t.pipe(s,{end:!1}),a};h.exports.file=(e,t)=>new Promise((s,a)=>{let n=X.createReadStream(e);n.on("error",a);let c=n.pipe(h.exports.stream(t));c.on("error",a),c.on("gzip-size",s)});h.exports.fileSync=(e,t)=>h.exports.sync(X.readFileSync(e),t)});le(exports,{activate:()=>ve,deactivate:()=>we});var l=L(require("vscode")),W=L(require("esbuild")),T=L(H()),te=L(ee());function ve(e){let t=l.commands.registerCommand("phaser4examples.create",()=>{let a=l.window.activeTextEditor,n="../../../../../phaser-genesis/srcx";if(a){let r=a.document.fileName.split("\\"),o=r.indexOf("src");n="../".repeat(r.length-o+1)+"phaser-genesis/src"}let c=`//  Phaser 4 Example

        import { BackgroundColor, GlobalVar, Parent, Scenes, WebGL } from '${n}/config';

import { AddChild } from '${n}/display/';
import { Game } from '${n}/Game';
import { LoadImageFile } from '${n}/loader/files/LoadImageFile';
import { Loader } from '${n}/loader/Loader';
import { Scene } from '${n}/scenes/Scene';
import { Sprite } from '${n}/gameobjects/';
import { StaticWorld } from '${n}/world/StaticWorld';

class Demo extends Scene
{
    constructor ()
    {
        super();

        this.create();
    }

    async create ()
    {
        await LoadImageFile('logo', 'assets/logo.png');

        const world = new StaticWorld(this);

        const logo = new Sprite(400, 300, 'logo');

        AddChild(world, logo);
    }
}

new Game(
    WebGL(),
    Parent('gameParent'),
    GlobalVar('Phaser4'),
    BackgroundColor(0x2d2d2d),
    Scenes(Demo)
);
`;l.workspace.openTextDocument({language:"typescript",content:c})});e.subscriptions.push(t);let s=l.commands.registerCommand("phaser4examples.build",()=>{let a=l.window.activeTextEditor;if(a){let n=a.document.fileName,c="d:\\wamp\\www\\dev\\examples\\src",r="/Users/rich/Documents/GitHub/dev/examples/src",o=n.startsWith(c),f=n.startsWith(r);if(o||f){let i="d:\\wamp\\www\\dev\\examples\\live",d="/Users/rich/Documents/GitHub/dev/examples/live",p=o?c:r,m=o?i:d,B=n.replace(p,m).replace(".ts",".js"),v=n.replace(p,m).replace(".ts",".min.js"),w=o?n.replace(`${c}\\`,""):n.replace(`${r}/`,""),y=(0,W.buildSync)({entryPoints:[n],outfile:B,target:"esnext",sourcemap:!0,minify:!1,bundle:!0,metafile:!0,logLevel:"silent"});if(y.errors.length>0)l.window.showInformationMessage(`esbuild error ${y.errors}`);else{let z=w.replace(".ts",".js").replace("\\","/"),u=o?`http://192.168.0.100/dev/examples/live/debug.html?f=${z}`:`https://phaser4.test.local:8890/debug.html?f=${z}`;l.env.clipboard.writeText(u),l.window.showInformationMessage(`Built Phaser 4 Example: ${w}`,"Metafile","Stats","Open").then(g=>{g==="Metafile"?l.workspace.openTextDocument({language:"text",content:JSON.stringify(y.metafile,null,2)}):g==="Open"?l.env.openExternal(l.Uri.parse(u)):g==="Stats"&&((0,W.buildSync)({entryPoints:[n],outfile:v,target:"esnext",sourcemap:!1,minify:!0,bundle:!0,metafile:!1,logLevel:"silent"}),Promise.all([l.workspace.fs.stat(l.Uri.file(B)),l.workspace.fs.stat(l.Uri.file(v)),l.workspace.fs.readFile(l.Uri.file(v))]).then(b=>{let S=(0,T.default)(b[0].size),M=(0,T.default)(b[1].size),x=(0,T.default)(te.default.sync(Buffer.from(b[2])));l.window.showInformationMessage(`Bundle: ${S} - Min: ${M} - Gzip: ${x}`)}).catch(b=>{console.error("arsebags",b)}))})}}else l.window.showErrorMessage("Not a Phaser 4 Example")}});e.subscriptions.push(s)}function we(){}0&&(module.exports={activate,deactivate});
/**
 * filesize
 *
 * @copyright 2021 Jason Mulligan <jason.mulligan@avoidwork.com>
 * @license BSD-3-Clause
 * @version 7.0.0
 */
