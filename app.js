(() => {"use strict";
 const file = document.getElementById('video-file'); const video=document.getElementById('video-preview'); const zone=document.getElementById('upload-zone'); const info=document.getElementById('video-info'); const replace=document.getElementById('replace-video'); const status=document.getElementById('editor-result'); let url=null;
 function setStatus(x){status.textContent=x;}
 function openFile(f){if(!f)return; if(!f.type.startsWith('video/')){setStatus('Выбери видеофайл.');return;}if(url)URL.revokeObjectURL(url);url=URL.createObjectURL(f); video.src=url;zone.classList.add('loaded');replace.style.display='inline-flex';info.textContent=`${f.name} • ${(f.size/1048576).toFixed(1)} МБ`;setStatus('Видео открыто локально.');}
 file.addEventListener('change',()=>openFile(file.files?.[0]));replace.addEventListener('click',()=>{file.click();});
 const title=document.getElementById('clip-title'), desc=document.getElementById('clip-description'),source=document.getElementById('clip-source');
 function makeText(){return `${title.value.trim()}

${desc.value.trim()}${source.value.trim()?`

Источник: ${source.value.trim()}`:''}`;}
 document.getElementById('copy-caption').addEventListener('click',async()=>{try{await navigator.clipboard.writeText(makeText());setStatus('Описание скопировано в буфер обмена.');}catch(e){setStatus('Не удалось скопировать: используйте кнопку сохранения .txt.');}});
 document.getElementById('save-caption').addEventListener('click',()=>{const blob=new Blob([makeText()],{type:'text/plain;charset=utf-8'});const a=document.createElement('a'),u=URL.createObjectURL(blob);a.href=u;a.download='twitchclips-caption.txt';document.body.appendChild(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(u),250);setStatus('Файл с описанием сохранён.');});
 window.addEventListener('pagehide',()=>{if(url)URL.revokeObjectURL(url);});
})();