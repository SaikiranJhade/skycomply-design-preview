const s="pulse-dot 2s ease-in-out infinite",t="poc-status-dots-pulse",o=`
@keyframes pulse-dot {
  0%, 100% {
    transform: scale(1);
    box-shadow: 0 0 0 0 rgba(249, 115, 22, 0.4);
  }
  50% {
    transform: scale(1.15);
    box-shadow: 0 0 0 6px rgba(249, 115, 22, 0);
  }
}
`;if(typeof document<"u"&&!document.getElementById(t)){const e=document.createElement("style");e.id=t,e.textContent=o,document.head.appendChild(e)}export{s as S};
