const btnsContainer = document.getElementById("btns-container");

const totalIssueCount = document.getElementById("totalIssueCount");

const loadingSpinner = document.getElementById("loading-spinner");

const allIssuesContainer = document.getElementById("allIssuesContainer");

// all issues array
let allIssues = [];

const showloading = () =>{
    loadingSpinner.classList.remove("hidden");
    loadingSpinner.classList.add("flex");

    allIssuesContainer.innerHTML = ""; //spinner show while no card loaded
}
const hideLoading = ()=>{
    loadingSpinner.classList.remove("flex");
    loadingSpinner.classList.add("hidden");
}

// buttons load function
async function loadAllButtons(){
    // show loading spinner

    const res = await fetch("https://phi-lab-server.vercel.app/api/v1/lab/issues");
    const data = await res.json();
    console.log(data.data); //data property load -> success

    allIssues = data.data;

    btnsContainer.innerHTML = "";

    // 'All' button
    const allBtn = document.createElement('button');
    allBtn.className = "load-btns active-btn w-[120px] py-2 px-3 rounded-sm capitalize active-btn";
    allBtn.textContent = 'All';
    allBtn.onclick = () => selectBtnCategory("All", allBtn);
    btnsContainer.appendChild(allBtn);

    const filterBtn = [];
    allIssues.forEach(issue => {
        if(!filterBtn.includes(issue.status)){
            filterBtn.push(issue.status);
        }
    });

    // btn er status property dhore 
    filterBtn.forEach(status =>{
        const btn = document.createElement('button');
        btn.className = "load-btns neutral-btn w-[120px] py-2 px-3 rounded-sm capitalize";
        btn.textContent = status; //btn er je nam thakbe

        btn.onclick = () => selectBtnCategory(status, btn);
        btnsContainer.appendChild(btn);
    });

    // total number of issues jekhane dekhabe
    totalIssueCount.innerText = `${allIssues.length} Issues`;

    // hide loading spinner
};

// any button a click korle je function hobe
const selectBtnCategory = async(categoryStatus, btn) =>{
    // show loading spinner

    const allTypeBtn = document.querySelectorAll('#btns-container button');
    console.log(allTypeBtn);

    allTypeBtn.forEach(button => {
        button.className= 'neutral-btn w-[120px] py-2 px-3 border border-[#E4E4E7] rounded-sm capitalize';

    })
    // clicked button highlight
    btn.className = "load-btns active-btn w-[120px] py-2 px-3 rounded-sm capitalize ";

    let filteredIssues = [];

    if(categoryStatus === "All"){
        filteredIssues = allIssues;
    }
    else{
        filteredIssues = allIssues.filter(issue => issue.status === categoryStatus);

    }

    displayAllIssues(filteredIssues);
    totalIssueCount.innerText = `${filteredIssues.length} Issues`;

    // hide loading spinner
}

// calculate total count of issues
function totalCount(){
    document.getElementById("totalIssueCount").innerText = allIssuesContainer.children.length;
}

// all issue button
async function loadAllIssues(){

    showloading();

    const res = await fetch("https://phi-lab-server.vercel.app/api/v1/lab/issues");
    const jData = await res.json();

    // all issues display
    displayAllIssues(jData.data);

    totalIssueCount.innerText = jData.data.length;

    hideLoading();
}

// all  cards display
const displayAllIssues = (issues) =>{
    console.log(issues);
    allIssuesContainer.innerHTML = "";

    issues.forEach(issue =>{
        const issueCard = document.createElement("div");

        // priority type er moddhe conditional rendering
        let priorityTypeClass = "";
        
        if(issue.priority === "high"){
            priorityTypeClass = "bg-[#FEECEC] text-[#EF4444]";
        }
        else if(issue.priority === "medium"){
            priorityTypeClass = "bg-[#FFF6D1] text-[#F59E0B]";

        }
        else if(issue.priority === "low"){
            priorityTypeClass = "bg-[#EEEFF2] text-[#9CA3AF]";
        }

        issueCard.className = "shadow h-full w-full";
        issueCard.dataset.id = issue.id;

        issueCard.innerHTML = `
            <div class="border-t-[3px] ${issue.status === "open"? "border-t-[#00A96E]" : "border-t-[#A855F7]"} p-4 rounded-sm space-y-4">

                <div class="flex justify-between items-center">

                    <span><img src="${issue.status === "open" ? './assets/open-status.png' : './assets/closed-status.png'}" alt=""></span>
                    <span class="rounded-[100px] ${priorityTypeClass} py-1.5 px-[25px]">
                        ${issue.priority.toUpperCase()}
                    </span>
                </div>

                <div class="space-y-2">
                    <h3 class="font-semibold text-[14px]">${issue.title}</h3>
                    <p class="text-[#64748B] text-[12px] line-clamp-2">
                        ${issue.description}
                    </p>
                </div>
                <div class="flex flex-wrap justify-start items-center gap-1">
                    ${labels(issue.labels)}  //labels - function create
                </div>
            </div>

            <div class="border-t border-[#E4E4E7] p-4 text-[12px] space-y-2 text-[#64748B]">
                <p>#${issue.id} by ${issue.author}</p>
                <p>${new Date(issue.createdAt).toLocaleDateString("en-US")}</p>
            </div>
        `;
        allIssuesContainer.appendChild(issueCard);
    })
}

// displayAllIssues er moddhe used
const labels = (labelStatus) =>{
    let result = "";

    labelStatus.forEach(label =>{

        let badgeClass = "";
        let borderClass = "";
        let imgSrc = "";

        if(label === "bug"){
            badgeClass = "text-[#EF4444] bg-[#FEECEC]";
            borderClass = "border-[#EF4444]/30";
            imgSrc = "./assets/bug.png";
        }
        else if (label === "help wanted") {
            badgeClass = "text-[#D97706] bg-[#FFF8DB]";
            borderClass = "border-[#D97706]/30";
            imgSrc = "./assets/help-wanted.png";
        }
        else {
            badgeClass = "text-[#00A96E] bg-[#DEFCE8]";
            borderClass = "border-[#00A96E]/30";
            imgSrc = "./assets/enhancement.png";
        }

        // result a ai part add hobe
        result +=`
        <div class="py-1.5 px-2 flex items-center text-[12px] ${badgeClass} rounded-[100px] border ${borderClass} gap-1">
            <span>
                <img src="${imgSrc}" class="w-3 h-3 inline-block" alt="">
            </span>
            ${label.toUpperCase()}
            
        </div>
        `;
    });

    return result;
}
loadAllButtons();