
var lastTab = "status";

function selectTab(btn) {
    var nextTab = btn.id.substring("tabbtn-".length);

    if(nextTab == lastTab) return;

    var nextTabContent = document.getElementById("tabcontent-" + nextTab);
    var lastTabContent = document.getElementById("tabcontent-" + lastTab);
    
    nextTabContent.style.display = "";
    lastTabContent.style.display = "none";

    btn.classList.add("selected");
    document.getElementById("tabbtn-" + lastTab).classList.remove("selected");


    lastTab = nextTab;

}

fetch("/idip").then(async (got)=>{
    var txt = await got.text();
    document.getElementById("status_idip").innerText = txt;
});